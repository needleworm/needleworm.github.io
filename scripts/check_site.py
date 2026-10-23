#!/usr/bin/env python3
"""Check generated content preservation, real routes, metadata and local assets."""
from collections import Counter
from html import unescape
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit
from build_site import ROOT, Blocks, VOID, GROUPS, LECTURE_CATEGORIES, latest_date, source_views


class Document(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.tags, self.text = [], Counter()
        self.stack, self.unclosed_layout = [], []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))
        if tag not in VOID:
            self.stack.append(tag)

    def handle_startendtag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1,-1,-1):
            if self.stack[i] == tag:
                if tag in {'section','main'} and 'div' in self.stack[i+1:]:
                    self.unclosed_layout.append(tag)
                del self.stack[i:]
                break

    def handle_data(self, data):
        value = ' '.join(data.split())
        if value:
            self.text[value] += 1


def normalize_asset(url):
    return '/' + url.removeprefix('./') if url.startswith(('./src/', 'src/')) else url


class ElementSpans(HTMLParser):
    """Locate complete elements so section and navigation checks stay scoped."""
    def __init__(self, source):
        super().__init__(convert_charrefs=False)
        self.source = source
        self.lines = [0] + [m.end() for m in re.finditer('\n', source)]
        self.stack, self.elements = [], []
        self.feed(source)

    def source_offset(self):
        row, col = self.getpos()
        return self.lines[row - 1] + col

    def handle_starttag(self, tag, attrs):
        element = {'tag': tag, 'attrs': dict(attrs), 'start': self.source_offset(),
                   'end': self.source_offset() + len(self.get_starttag_text())}
        self.elements.append(element)
        if tag not in VOID:
            self.stack.append(element)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.stack.pop()

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i]['tag'] == tag:
                self.stack[i]['end'] = self.source.index('>', self.source_offset()) + 1
                del self.stack[i:]
                break


def check_lecture_sections(source, expected_source, require):
    """All records start in one chronological grid with institution filters."""
    elements = ElementSpans(source).elements
    def fragment(element):
        return source[element['start']:element['end']]
    def has_class(element, name):
        return name in element['attrs'].get('class', '').split()
    def text(html):
        return ' '.join(unescape(re.sub(r'<[^>]+>', '', html)).split())
    def visible(attrs):
        style = attrs.get('style', '')
        return ('hidden' not in attrs and 'inert' not in attrs
                and attrs.get('aria-hidden', '').lower() != 'true'
                and not re.search(r'(?:^|;)\s*(?:display\s*:\s*none|visibility\s*:\s*hidden)\b', style, re.I))

    expected_counts = Counter()
    for a, b in sorted(Blocks(expected_source).cards):
        expected_counts[Document(expected_source[a:b]).tags[0][1].get('data-category')] += 1
    names = [name for _, name in LECTURE_CATEGORIES]
    require(set(expected_counts).issubset(names), 'Lectures: source has an unknown category')
    expected_total = sum(expected_counts.values())
    containers = [e for e in elements if e['attrs'].get('id') == 'lecture-list']
    require(len(containers) == 1, 'Lectures: expected one complete lecture-list wrapper')
    if containers:
        require(has_class(containers[0], 'lecturesContainer'), 'Lectures: lecture-list must be one card grid')
        require(visible(containers[0]['attrs']), 'Lectures: complete list is hidden')
    require(not any(has_class(e, 'lecture-category') or has_class(e, 'lecture-category-heading') for e in elements),
            'Lectures: all view must not have institution sections or headings')

    listing = fragment(containers[0]) if containers else ''
    cards = [listing[a:b] for a, b in sorted(Blocks(listing).cards)]
    actual_counts = Counter()
    dates = []
    for card in cards:
        card_doc = Document(card)
        name = card_doc.tags[0][1].get('data-category')
        actual_counts[name] += 1
        require(all(visible(a) for _, a in card_doc.tags), f'Lectures: hidden card/content in {name}')
        field = re.search(r'class="firstCommitDate"[^>]*>(.*?)</', card, re.S)
        require(bool(field), f'Lectures: missing date in {name}')
        if field:
            dates.append(latest_date(text(field[1])))
    require(dates == sorted(dates, reverse=True), 'Lectures: all view is not globally sorted by latest date')
    require(actual_counts == expected_counts, 'Lectures: visible category counts do not match source records')
    require(sum(actual_counts.values()) == len(Blocks(source).cards) == expected_total,
            'Lectures: cards are outside the grid, duplicated, or missing')

    navs = [e for e in elements if e['attrs'].get('id') == 'lecture-category-nav']
    require(len(navs) == 1, 'Lectures: expected one static category navigation')
    if navs:
        nav = navs[0]
        require(visible(nav['attrs']), 'Lectures: category navigation is hidden')
        buttons = [e for e in elements if e['tag'] == 'button' and nav['start'] < e['start'] < e['end'] < nav['end']]
        expected_buttons = [('전체', expected_total)] + [(name, expected_counts[name]) for _, name in LECTURE_CATEGORIES]
        require([e['attrs'].get('data-category') for e in buttons] == [name for name, _ in expected_buttons],
                'Lectures: category filter order/targets mismatch')
        for button, (name, count) in zip(buttons, expected_buttons):
            require(has_class(button, 'lecture-filter'), f'Lectures: {name} navigation class missing')
            require(button['attrs'].get('aria-controls') == 'lecture-list', f'Lectures: {name} filter target mismatch')
            require(button['attrs'].get('aria-pressed') == str(name == '전체').lower(), f'Lectures: {name} initial filter state mismatch')
            require(bool(re.fullmatch(re.escape(name) + r'\s*' + str(count), text(fragment(button)))),
                    f'Lectures: {name} navigation label/count mismatch')


def main():
    config = json.loads((ROOT/'content/site.json').read_text(encoding='utf8'))
    runtime = (ROOT/'script.js').read_text(encoding='utf8')
    runtime_functions = set(re.findall(r'function\s+(\w+)\s*\(',runtime))
    sources = {p.stem:p.read_text(encoding='utf8') for p in (ROOT/'content/sections').glob('*.html')}
    views = source_views(sources)
    pages = {p['key']: p for p in config['pages']}
    sequence = [pages[key] for _, _, keys in GROUPS for key in keys]
    failures, report = [], []
    def require(condition, message):
        if not condition:
            failures.append(message)
    for page in config['pages']:
        target = ROOT/page['slug']/'index.html' if page['slug'] else ROOT/'index.html'
        require(target.is_file(), f'Missing physical file: {target}')
        source = target.read_text(encoding='utf8')
        doc = Document(source)
        position = next(i for i, item in enumerate(sequence) if item['key'] == page['key'])
        next_links = [a for tag, a in doc.tags if tag == 'a' and a.get('id') == 'mobile-next-link']
        expected_next = sequence[position + 1] if position + 1 < len(sequence) else None
        require(len(next_links) == (1 if expected_next else 0), f'{page["key"]}: incorrect mobile next-page link count')
        if next_links and expected_next:
            require(next_links[0].get('href') == '/' + expected_next['slug'] + '/', f'{page["key"]}: incorrect mobile next-page order')
            require(next_links[0].get('rel') == 'next', f'{page["key"]}: missing next-page relation')
            require(source.index('</main>') < source.index('id="mobile-next-link"') < source.index('<footer'), f'{page["key"]}: next-page prompt must be between main content and footer')
            if page['key'] == 'home':
                require(next_links[0].get('data-mobile-href') == '/media/', 'Home mobile continuation must skip the Books list already shown')
                require(next_links[0].get('data-mobile-label') == pages['media']['label'], 'Home mobile continuation label mismatch')
                require(next_links[0].get('data-mobile-heading') == pages['media']['heading'], 'Home mobile continuation heading mismatch')
        require(sum(t=='h1' for t,a in doc.tags)==1, f'{page["key"]}: expected one h1')
        require(not any(t=='template' for t,a in doc.tags), f'{page["key"]}: inert templates remain')
        require(not doc.unclosed_layout,f'{page["key"]}: layout div is not closed before {doc.unclosed_layout}')
        expected_url = config['url'] + ('/'+page['slug']+'/' if page['slug'] else '/')
        require([a.get('href') for t,a in doc.tags if t=='link' and a.get('rel')=='canonical']==[expected_url],f'{page["key"]}: canonical mismatch')
        require(any(t=='meta' and a.get('name')=='description' and a.get('content')==page['description'] for t,a in doc.tags),f'{page["key"]}: description missing')
        schema = re.findall(r'<script type="application/ld\+json">(.*?)</script>',source,re.S)
        require(len(schema)==1 and bool(json.loads(schema[0])['@graph']),f'{page["key"]}: invalid structured data')
        expected_cards = 0
        display_sections = page['sections'] + (['books'] if page['key'] == 'home' else [])
        if page['key'] == 'home':
            home_books_sections = [a for t,a in doc.tags if t=='section' and 'home-books-mobile' in a.get('class','').split()]
            require(len(home_books_sections)==1, 'Home must have one canonical mobile Books list')
            require(source.index('id="tab-about"') < source.index('class="section-group home-books-mobile"') < source.index('</main>'), 'Home mobile Books must follow the About content')
        for key in display_sections:
            section = views[key]
            expected = Document(section)
            missing_text = expected.text - doc.text
            require(not missing_text,f'{page["key"]}: missing original text {list(missing_text)[:3]}')
            for tag, attr in [('img','src'),('a','href'),('iframe','src')]:
                wanted = Counter(normalize_asset(a[attr]) for t,a in expected.tags if t==tag and attr in a)
                got = Counter(a[attr] for t,a in doc.tags if t==tag and attr in a)
                require(not (wanted-got),f'{page["key"]}: missing {tag} references {list(wanted-got)[:3]}')
            expected_cards += len(Blocks(section).cards)
        actual_cards = len(Blocks(source).cards)
        require(actual_cards==expected_cards,f'{page["key"]}: card count {actual_cards} != {expected_cards}')
        for tag, attrs in doc.tags:
            for handler in [value for name,value in attrs.items() if name.startswith('on')]:
                called = re.match(r'\s*(\w+)\(',handler)
                if called:
                    require(called[1] in runtime_functions,f'{page["key"]}: missing event handler {called[1]}')
            for attr in ['href','src','poster']:
                url = attrs.get(attr,'')
                if not url.startswith('/') or url.startswith('//'):
                    continue
                local = ROOT/unquote(urlsplit(url).path.lstrip('/'))
                if tag=='a' and url.endswith('/'):
                    require((local/'index.html').is_file(),f'{page["key"]}: missing route {url}')
                elif tag in ['img','script','link']:
                    require(local.is_file(),f'{page["key"]}: missing asset {url}')
        ids = [a['id'] for t,a in doc.tags if 'id' in a]
        require(len(ids)==len(set(ids)),f'{page["key"]}: duplicate IDs {list(k for k,v in Counter(ids).items() if v>1)}')
        if page['key']=='lectures':
            check_lecture_sections(source, views['lectures'], require)
        report.append({'page':expected_url,'file':str(target.relative_to(ROOT)),'cards':actual_cards,'bytes':target.stat().st_size})
    for redirect in config.get('redirects', []):
        target = ROOT/redirect['from']/'index.html'
        require(target.is_file(), f'Missing redirect file: {target}')
        if not target.is_file():
            continue
        doc = Document(target.read_text(encoding='utf8'))
        destination = '/' + redirect['to'] + '/'
        require([a.get('href') for t,a in doc.tags if t=='link' and a.get('rel')=='canonical']==[config['url']+destination], f'{redirect["from"]}: incorrect redirect canonical')
        require(any(t=='meta' and a.get('http-equiv')=='refresh' and a.get('content')=='0; url='+destination for t,a in doc.tags), f'{redirect["from"]}: missing static redirect')
        require((ROOT/redirect['to']/'index.html').is_file(), f'{redirect["from"]}: missing destination {destination}')
        for t,a in doc.tags:
            if t=='a' and a.get('href','').startswith('/'):
                require((ROOT/a['href'].strip('/')/'index.html').is_file(), f'{redirect["from"]}: missing fallback link {a["href"]}')
    print(json.dumps({'pages':report,'redirects':config.get('redirects', []),'failures':failures},ensure_ascii=False,indent=2))
    return bool(failures)


if __name__=='__main__':
    sys.exit(main())
