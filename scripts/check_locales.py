#!/usr/bin/env python3
"""Audit all static language versions without trusting the generated manifest."""
from __future__ import annotations

from collections import Counter
from hashlib import sha256
from html import unescape
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urljoin, urlsplit, urlunsplit
import xml.etree.ElementTree as ET

from build_site import ROOT, Blocks, path, output_path, source_views
from lecture_pages import load_lecture_records

LOCALES = ('en', 'zh', 'hi', 'es', 'ar', 'fr', 'bn', 'pt')
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
TOKENS = re.compile(r'\{\{\d+\}\}|(?<!\{)\{[A-Za-z_][A-Za-z0-9_]*\}(?!\})')
HANGUL = re.compile(r'[\uAC00-\uD7AF]')


def locale_path(locale, route):
    return '/' + locale + route


def locale_target(locale, target):
    return locale + '/' + target


def base_routes(config):
    routes = {path(page): output_path(page) for page in config['pages']}
    for record in json.loads((ROOT / 'content/papers.json').read_text(encoding='utf8')):
        route = '/papers/' + record['slug'] + '/'
        routes[route] = route.lstrip('/') + 'index.html'
    sources = {p.stem: p.read_text(encoding='utf8') for p in (ROOT / 'content/sections').glob('*.html')}
    lectures = source_views(sources)['lectures']
    records = load_lecture_records([lectures[a:b] for a, b in sorted(Blocks(lectures).cards)])
    for record in records.values():
        routes[record['path']] = record['path'].lstrip('/') + 'index.html'
    return routes


class Node:
    def __init__(self, tag, attrs, start, content_start, parent):
        self.tag, self.attrs, self.parent = tag, dict(attrs), parent
        self.start, self.content_start = start, content_start
        self.end, self.content_end = content_start, content_start
        self.children = []
        self.text = []

    @property
    def classes(self):
        return set((self.attrs.get('class') or '').split())

    def ancestry(self):
        node = self
        while node is not None:
            yield node
            node = node.parent


class Document(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.source = source
        self.lines = [0] + [m.end() for m in re.finditer('\n', source)]
        self.nodes, self.stack = [], []
        self.feed(source)

    def position(self):
        row, column = self.getpos()
        return self.lines[row - 1] + column

    def handle_starttag(self, tag, attrs):
        start = self.position()
        node = Node(tag, attrs, start, start + len(self.get_starttag_text()), self.stack[-1] if self.stack else None)
        self.nodes.append(node)
        if node.parent:
            node.parent.children.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.stack.pop()

    def handle_endtag(self, tag):
        start = self.position()
        end = self.source.index('>', start) + 1
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index].tag == tag:
                for node in self.stack[index:]:
                    node.content_end, node.end = start, end
                del self.stack[index:]
                break

    def handle_data(self, data):
        if self.stack:
            self.stack[-1].text.append(data)

    def inner(self, node):
        return self.source[node.content_start:node.content_end]


def research_node(node):
    return any(p.attrs.get('data-publication-type') or p.attrs.get('data-paper-id') or
               p.attrs.get('id') == 'tab-papers' for p in node.ancestry())


def protected_node(node):
    """Independent selector rules, to catch accidental over/under-protection."""
    for parent in node.ancestry():
        if parent.tag in {'script', 'style', 'textarea', 'pre', 'code', 'svg', 'math'}:
            return True
        if parent.classes & {'paper-fulltext', 'paper-alternative-title', 'paper-authors', 'paper-venue', 'paper-detail-link'}:
            return True
        if parent.attrs.get('id') == 'paper-title':
            return True
        if parent.classes & {'abstract', 'bookDescription', 'lecture_title'} and research_node(parent):
            return True
        if 'paper-toc' in parent.classes and node.tag != 'summary':
            return True
    return False


def protected_fragments(doc):
    result = []
    for node in doc.nodes:
        selected = (node.classes & {'paper-fulltext', 'paper-alternative-title', 'paper-authors', 'paper-venue'} or
                    node.attrs.get('id') in {'paper-title', 'citation-text', 'citation-formats-data'} or
                    (node.classes & {'abstract', 'bookDescription', 'lecture_title'} and research_node(node)) or
                    (node.tag == 'nav' and any('paper-toc' in p.classes for p in node.ancestry())))
        if selected:
            result.append((node.tag, node.attrs.get('id', ''), tuple(sorted(node.classes)),
                           node.attrs.get('lang'), node.attrs.get('dir'), doc.inner(node)))
    return result


def link_is_language_choice(node):
    return bool(node.attrs.get('hreflang')) or any(
        re.search(r'(?:language|locale)', p.attrs.get('class', '') + ' ' + p.attrs.get('id', ''))
        for p in node.ancestry())


def localized_url(value, origin, locale, routes):
    parsed = urlsplit(value)
    if parsed.netloc and parsed.netloc != urlsplit(origin).netloc:
        return value
    if parsed.path not in routes:
        return value
    return urlunsplit((parsed.scheme, parsed.netloc, locale_path(locale, parsed.path), parsed.query, parsed.fragment))


def local_file(value, origin):
    parsed = urlsplit(urljoin(origin + '/', value))
    if parsed.netloc != urlsplit(origin).netloc:
        return None
    file_path = ROOT / unquote(parsed.path.lstrip('/'))
    return file_path / 'index.html' if parsed.path.endswith('/') else file_path


def localized_fragments(fragments, origin, locale, routes):
    def fragment_links(raw):
        return re.sub(r'(\bhref\s*=\s*)([\"\'])(.*?)\2',
                      lambda match: match[1] + match[2] + localized_url(match[3], origin, locale, routes) + match[2], raw)
    return [(tag, ident, classes, lang, direction, fragment_links(raw))
            for tag, ident, classes, lang, direction, raw in fragments]


def scholarly_schema(doc):
    articles = []
    for node in doc.nodes:
        if node.tag != 'script' or node.attrs.get('type') != 'application/ld+json':
            continue
        payload = json.loads(doc.inner(node))
        graph = payload.get('@graph', [payload])
        articles.extend(item for item in graph if item.get('@type') in {'ScholarlyArticle', 'Article', 'Thesis'})
    return articles


def check_catalogs(require):
    file_path = ROOT / 'content/locales/source.json'
    require(file_path.is_file(), 'Locales: source catalog missing')
    if not file_path.is_file():
        return {}
    source = json.loads(file_path.read_text(encoding='utf8'))
    strings = source.get('strings', {})
    require(set(source.get('languages', [])) == set(LOCALES), 'Locales: source language set mismatch')
    require(bool(strings), 'Locales: empty source catalog')
    for ident, value in strings.items():
        require(isinstance(value, str) and ident == sha256(value.encode('utf8')).hexdigest()[:20],
                f'Locales: invalid source identity {ident}')
    reports = {}
    for locale in LOCALES:
        target = ROOT / 'content/locales' / (locale + '.json')
        require(target.is_file(), f'{locale}: translation catalog missing')
        if not target.is_file():
            continue
        catalog = json.loads(target.read_text(encoding='utf8'))
        translated = catalog.get('strings', {})
        require(set(strings).issubset(translated), f'{locale}: catalog coverage mismatch; missing={len(set(strings)-set(translated))}')
        untranslated = []
        for ident, value in translated.items():
            if ident not in strings:
                continue
            require(isinstance(value, str) and bool(value.strip()), f'{locale}: empty/nontext translation {ident}')
            if not isinstance(value, str):
                continue
            require(TOKENS.findall(value) == TOKENS.findall(strings[ident]), f'{locale}: placeholder order/count changed in {ident}')
            require(not re.search(r'<\s*/?\s*[A-Za-z][^>]*>', value), f'{locale}: unexpected raw markup in translation {ident}')
            require('\ufffd' not in value, f'{locale}: damaged Unicode in translation {ident}')
            if HANGUL.search(value):
                untranslated.append(ident)
        require(not untranslated, f'{locale}: Korean remains in translated catalog strings {untranslated[:10]}')
        for key, value in source.get('runtime', {}).items():
            ident = sha256(value.encode('utf8')).hexdigest()[:20]
            require(ident in translated, f'{locale}: missing runtime translation {key}')
            if key in catalog.get('runtime', {}):
                runtime = catalog['runtime'][key]
                require(TOKENS.findall(runtime) == TOKENS.findall(value), f'{locale}: runtime placeholders changed for {key}')
                require(runtime == translated.get(ident), f'{locale}: runtime translation differs from string catalog for {key}')
        reports[locale] = {'strings': len(translated), 'runtime': len(source.get('runtime', {}))}
    return reports


def check_locales(config, require):
    routes = base_routes(config)
    origin = config['url']
    manifest = json.loads((ROOT / 'content/build-manifest.json').read_text(encoding='utf8'))
    expected = {locale_target(locale, target) for locale in LOCALES for target in routes.values()}
    actual = {target for target, entry in manifest.items() if entry.get('locale') in LOCALES}
    require(all(entry.get('locale') in (None, 'ko') + LOCALES for entry in manifest.values()), 'Locales: unexpected manifest language')
    require(actual == expected, f'Locales: generated manifest coverage mismatch; missing={len(expected-actual)}, extra={len(actual-expected)}')
    catalogs = check_catalogs(require)
    protected_count, assets_checked, pages_checked = 0, 0, 0
    for route, target in routes.items():
        original_path = ROOT / target
        if not original_path.is_file():
            require(False, f'Locales: original page missing {target}')
            continue
        original_source = original_path.read_text(encoding='utf8')
        original = Document(original_source)
        original_protected = protected_fragments(original)
        original_assets = Counter((node.tag, key, node.attrs[key]) for node in original.nodes
                                 for key in ('src', 'srcset', 'poster') if node.attrs.get(key))
        original_citations = Counter(node.attrs['data-citation'] for node in original.nodes if node.attrs.get('data-citation'))
        original_scholar_meta = Counter((node.attrs.get('name'), node.attrs.get('content')) for node in original.nodes
                                       if node.tag == 'meta' and node.attrs.get('name', '').startswith('citation_'))
        original_scholar_schema = scholarly_schema(original)
        original_links = [node.attrs['href'] for node in original.nodes if node.tag == 'a' and node.attrs.get('href') and not link_is_language_choice(node)]
        original_ids = Counter(node.attrs['id'] for node in original.nodes if node.attrs.get('id'))
        for locale in ('ko',) + LOCALES:
            localized_target = target if locale == 'ko' else locale_target(locale, target)
            file_path = ROOT / localized_target
            require(file_path.is_file(), f'{locale}: missing generated HTML {localized_target}')
            if not file_path.is_file():
                continue
            source = original_source if locale == 'ko' else file_path.read_text(encoding='utf8')
            doc = original if locale == 'ko' else Document(source)
            current_route = route if locale == 'ko' else locale_path(locale, route)
            canonical = origin + current_route
            expected_alternates = {'ko': origin + route, 'x-default': origin + route}
            expected_alternates.update({lang: origin + locale_path(lang, route) for lang in LOCALES})
            alternates = [(node.attrs.get('hreflang'), node.attrs.get('href')) for node in doc.nodes if node.tag == 'link' and node.attrs.get('rel') == 'alternate' and node.attrs.get('hreflang')]
            require(len(alternates) == 10 and dict(alternates) == expected_alternates, f'{localized_target}: nonreciprocal/missing hreflang links')
            canonical_tags = [node.attrs.get('href') for node in doc.nodes if node.tag == 'link' and node.attrs.get('rel') == 'canonical']
            require(canonical_tags == [canonical], f'{localized_target}: canonical mismatch')
            require([node.attrs.get('content') for node in doc.nodes if node.tag == 'meta' and node.attrs.get('property') == 'og:url'] == [canonical], f'{localized_target}: og:url mismatch')
            require(not any(node.tag == 'meta' and node.attrs.get('name', '').lower() == 'robots' and re.search(r'\bnoindex\b', node.attrs.get('content', ''), re.I) for node in doc.nodes), f'{localized_target}: canonical page is noindex')
            entry = manifest.get(localized_target, {})
            require(entry.get('sha256') == sha256(source.encode('utf8')).hexdigest(), f'{localized_target}: manifest digest mismatch')
            if locale == 'ko':
                continue
            pages_checked += 1
            require(entry.get('locale') == locale and entry.get('source') == target, f'{localized_target}: manifest locale/source mismatch')
            root = next((node for node in doc.nodes if node.tag == 'html'), None)
            require(root is not None and root.attrs.get('lang') == locale, f'{localized_target}: document language mismatch')
            require(root is not None and root.attrs.get('dir', 'ltr') == ('rtl' if locale == 'ar' else 'ltr'), f'{localized_target}: document direction mismatch')
            ids = Counter(node.attrs['id'] for node in doc.nodes if node.attrs.get('id'))
            require(not (original_ids - ids), f'{localized_target}: original element IDs missing')
            require(not [key for key, count in ids.items() if count > 1], f'{localized_target}: duplicate IDs')
            assets = Counter((node.tag, key, node.attrs[key]) for node in doc.nodes for key in ('src', 'srcset', 'poster') if node.attrs.get(key))
            require(not (original_assets - assets), f'{localized_target}: original media/script assets changed or missing')
            require(Counter(node.attrs['data-citation'] for node in doc.nodes if node.attrs.get('data-citation')) == original_citations, f'{localized_target}: citation data changed')
            scholar_meta = Counter((node.attrs.get('name'), node.attrs.get('content')) for node in doc.nodes
                                   if node.tag == 'meta' and node.attrs.get('name', '').startswith('citation_'))
            require(scholar_meta == original_scholar_meta, f'{localized_target}: scholarly metadata changed')
            require(scholarly_schema(doc) == original_scholar_schema, f'{localized_target}: scholarly article schema changed')
            fragments = protected_fragments(doc)
            require(fragments == localized_fragments(original_protected, origin, locale, routes), f'{localized_target}: published research/citation text changed')
            protected_count += len(fragments)
            got_links = Counter(node.attrs['href'] for node in doc.nodes if node.tag == 'a' and node.attrs.get('href') and not link_is_language_choice(node))
            wanted_links = Counter(localized_url(value, origin, locale, routes) for value in original_links)
            require(not (wanted_links - got_links), f'{localized_target}: missing/incorrect locale links {list((wanted_links-got_links))[:3]}')
            for node in doc.nodes:
                for attr in ('href', 'src', 'poster', 'data-mobile-href'):
                    value = node.attrs.get(attr, '')
                    if not value or value.startswith(('#', 'data:', 'mailto:', 'tel:')):
                        continue
                    parsed = urlsplit(value)
                    if parsed.netloc and parsed.netloc != urlsplit(origin).netloc:
                        continue
                    if node.tag == 'a' and attr == 'href' and not link_is_language_choice(node):
                        require(parsed.path not in routes, f'{localized_target}: navigation escaped current locale: {value}')
                    if attr == 'data-mobile-href':
                        require(parsed.path.startswith('/' + locale + '/'), f'{localized_target}: mobile continuation escaped locale')
                    if parsed.path.startswith('/') and (node.tag in {'img', 'script', 'link', 'source'} or parsed.path.endswith(('.pdf', '.bib', '.ris'))):
                        asset = local_file(value, origin)
                        require(asset is not None and asset.is_file(), f'{localized_target}: missing local asset {value}')
                        assets_checked += 1
            is_paper = '/papers/' in route and route != '/papers/'
            remaining = []
            for node in doc.nodes:
                if protected_node(node) or link_is_language_choice(node):
                    continue
                if is_paper and any(parent.tag == 'head' for parent in node.ancestry()):
                    continue
                for text in node.text:
                    if HANGUL.search(text):
                        remaining.append(' '.join(text.split())[:90])
            require(not remaining, f'{localized_target}: unexpected Korean display text {remaining[:3]}')
    sitemap = ET.parse(ROOT / 'sitemap.xml').getroot()
    ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    urls = [node.text for node in sitemap.findall('sm:url/sm:loc', ns)]
    require(len(urls) == len(set(urls)), 'Locales: sitemap duplicate URL')
    expected_urls = {origin + locale_path(locale, route) for locale in LOCALES for route in routes}
    require(expected_urls.issubset(urls), f'Locales: sitemap missing {len(expected_urls-set(urls))} language pages')
    return {'languages': list(LOCALES), 'base_pages': len(routes), 'localized_pages': pages_checked,
            'catalogs': catalogs, 'protected_fragments': protected_count, 'local_asset_checks': assets_checked}


def main():
    failures = []
    def require(condition, message):
        if not condition:
            failures.append(message)
    config = json.loads((ROOT / 'content/site.json').read_text(encoding='utf8'))
    report = check_locales(config, require)
    print(json.dumps({**report, 'failures': failures}, ensure_ascii=False, indent=2))
    return bool(failures)


if __name__ == '__main__':
    sys.exit(main())
