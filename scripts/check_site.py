#!/usr/bin/env python3
"""Check generated content preservation, real routes, metadata and local assets."""
from collections import Counter
from datetime import date
from html import unescape
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET
from build_site import ROOT, Blocks, VOID, GROUPS, LECTURE_CATEGORIES, latest_date, source_views
from paper_pages import load_records, plain
from paper_citations import citation_formats


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


def check_sitemap(config, require):
    """Keep the index in sync with canonical pages, without indexing UI states."""
    ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    try:
        sitemap = ET.parse(ROOT/'sitemap.xml').getroot()
        projects = ET.parse(ROOT/'content/project-sitemap.xml').getroot()
        manifest = json.loads((ROOT/'content/build-manifest.json').read_text(encoding='utf8'))
    except (OSError, ET.ParseError, json.JSONDecodeError) as error:
        require(False, f'Sitemap: cannot read index or source metadata: {error}')
        return {}

    require(sitemap.tag == '{'+ns['sm']+'}urlset', 'Sitemap: invalid urlset namespace')
    page_urls = {
        config['url'] + ('/'+p['slug']+'/' if p['slug'] else '/'):
        (p['slug']+'/index.html' if p['slug'] else 'index.html')
        for p in config['pages']
    }
    for record in json.loads((ROOT/'content/papers.json').read_text(encoding='utf8')):
        page_urls[config['url']+'/papers/'+record['slug']+'/'] = 'papers/'+record['slug']+'/index.html'
    project_urls = {node.text for node in projects.findall('sm:url/sm:loc', ns)} - set(page_urls)
    expected_urls = set(page_urls) | project_urls
    urls = []
    for entry in sitemap:
        require(entry.tag == '{'+ns['sm']+'}url', 'Sitemap: unexpected entry element')
        locations = entry.findall('sm:loc', ns)
        require(len(locations) == 1 and bool(locations[0].text), 'Sitemap: each entry needs one nonempty loc')
        if len(locations) != 1 or not locations[0].text:
            continue
        url = locations[0].text
        urls.append(url)
        parsed = urlsplit(url)
        require(parsed.scheme == 'https' and parsed.netloc == urlsplit(config['url']).netloc,
                f'Sitemap: URL must use the canonical HTTPS host: {url}')
        require(not parsed.query and not parsed.fragment, f'Sitemap: query or fragment view must not be indexed: {url}')
        if url in page_urls:
            dates = entry.findall('sm:lastmod', ns)
            expected_date = manifest.get(page_urls[url], {}).get('lastmod')
            require(len(dates) == 1 and bool(expected_date) and dates[0].text == expected_date,
                    f'Sitemap: lastmod does not match the generated page: {url}')
            if len(dates) == 1:
                try:
                    modified = date.fromisoformat(dates[0].text or '')
                    require(modified <= date.today(), f'Sitemap: lastmod is in the future: {url}')
                except ValueError:
                    require(False, f'Sitemap: invalid lastmod date: {url}')

    require(len(urls) == len(set(urls)), 'Sitemap: duplicate URLs')
    require(set(urls) == expected_urls,
            f'Sitemap: URL mismatch; missing={sorted(expected_urls-set(urls))}, extra={sorted(set(urls)-expected_urls)}')
    for redirect in config.get('redirects', []):
        require(config['url']+'/'+redirect['from']+'/' not in urls,
                f'Sitemap: redirect page must not be indexed: {redirect["from"]}')
    robots = (ROOT/'robots.txt').read_text(encoding='utf8')
    robots_maps = re.findall(r'^\s*Sitemap:\s*(\S+)\s*$', robots, re.I | re.M)
    require(robots_maps == [config['url']+'/sitemap.xml'], 'robots.txt: sitemap declaration mismatch')
    return {'urls': len(urls), 'canonical_pages': len(page_urls), 'project_pages': len(project_urls),
            'robots_sitemap': robots_maps}


def check_paper_pages(config, source, require):
    records = load_records([source[a:b] for a, b in sorted(Blocks(source).cards)])
    listing = Document((ROOT/'papers/index.html').read_text(encoding='utf8'))
    listing_links = {a.get('href') for tag, a in listing.tags if tag == 'a'}
    report = []
    titles = set()
    for record in records.values():
        key = record['record_id']
        target = ROOT / record['path'].strip('/') / 'index.html'
        require(target.is_file(), f'{key}: missing paper detail route')
        if not target.is_file():
            continue
        html = target.read_text(encoding='utf8')
        doc = Document(html)
        url = config['url'] + record['path']
        meta = {}
        for tag, attrs in doc.tags:
            if tag == 'meta' and attrs.get('name'):
                meta.setdefault(attrs['name'], []).append(attrs.get('content'))
        require(meta.get('citation_title') == [record['title']], f'{key}: scholarly title mismatch')
        require(meta.get('citation_author') == record['authors'], f'{key}: scholarly author names/order mismatch')
        require(meta.get('citation_publication_date') == [str(record['year'])], f'{key}: publication year mismatch')
        require(meta.get('citation_abstract_html_url') == [url], f'{key}: abstract URL mismatch')
        require([a.get('href') for tag, a in doc.tags if tag == 'link' and a.get('rel') == 'canonical'] == [url], f'{key}: detail canonical mismatch')
        require(not any(re.search(r'\bnoindex\b', value or '', re.I) for value in meta.get('robots', [])), f'{key}: paper must be indexable')
        require(sum(tag == 'h1' for tag, _ in doc.tags) == 1, f'{key}: expected one visible main title')
        title = plain(re.search(r'<title>(.*?)</title>', html, re.S)[1])
        require(title not in titles, f'{key}: duplicate page title')
        titles.add(title)
        abstracts = re.findall(r'<p class="abstract"[^>]*>(.*?)</p>', html, re.S)
        require(len(abstracts) == 1 and plain(abstracts[0]) == record['abstract'], f'{key}: original abstract missing from readable HTML')
        abstract_span = re.search(r'<section class="paper-abstract".*?</section>', html, re.S)
        require(abstract_span and not re.search(r'<(?:template|details)\b', abstract_span[0]), f'{key}: paper abstract cannot require expansion')
        require(not doc.unclosed_layout, f'{key}: unclosed detail layout')
        require(record['path'] in listing_links, f'{key}: missing crawlable link from the paper index')
        ids = [attrs['id'] for _, attrs in doc.tags if attrs.get('id')]
        require(len(ids) == len(set(ids)), f'{key}: duplicate reader anchors')
        for tag, attrs in doc.tags:
            link = attrs.get('href', '')
            if tag == 'a' and link.startswith('#'):
                require(unquote(link[1:]) in ids, f'{key}: broken paper section link {link}')
        body = record.get('full_text')
        require(bool(body) == (key != 'paper-0'), f'{key}: full-text coverage or thesis exclusion mismatch')
        if body:
            require(body['html'] in html, f'{key}: source body missing or changed by rendering')
            require('id="full-text"' in html and body['source_label'] in plain(html), f'{key}: full text needs a visible version label')
            require('paper-reader.js?v=' in html, f'{key}: missing reader utilities')
        else:
            require('id="full-text"' not in html and '초록만 제공합니다' in html, f'{key}: thesis must remain abstract-only')
        citation_data = re.search(r'<script type="application/json" id="citation-formats-data">(.*?)</script>', html, re.S)
        formats = citation_formats(record)
        require(citation_data and json.loads(citation_data[1]) == formats, f'{key}: citation formats differ from verified bibliography')
        require({a.get('data-citation-format') for tag, a in doc.tags if tag == 'button' and 'data-citation-format' in a} == set(formats), f'{key}: missing citation copy button')
        for style, extension in [('bibtex', 'bib'), ('ris', 'ris')]:
            citation_file = target.parent / ('citation.' + extension)
            require(citation_file.is_file() and citation_file.read_text(encoding='utf8').strip() == formats[style].strip(), f'{key}: citation download differs from copyable text')
        schemas = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S)
        graph = json.loads(schemas[0])['@graph'] if len(schemas) == 1 else []
        articles = [node for node in graph if node.get('@type') in {'ScholarlyArticle', 'Thesis'}]
        require(len(articles) == 1, f'{key}: expected one scholarly work per detail page')
        if articles:
            article = articles[0]
            require(article.get('name') == record['title'] and article.get('abstract') == record['abstract'], f'{key}: structured data differs from visible paper')
            require([a.get('name') for a in article.get('author', [])] == record['authors'], f'{key}: structured authors mismatch')
            require(article.get('datePublished') == str(record['year']), f'{key}: structured publication year mismatch')
            require((article.get('creativeWorkStatus') == 'Preprint') == (record['publication_type'] == 'preprint'), f'{key}: publication status mismatch')
        if record.get('full_pdf'):
            expected_pdf = url + 'paper.pdf'
            require(meta.get('citation_pdf_url') == [expected_pdf], f'{key}: full-text PDF must share the abstract directory')
            pdf = target.parent / 'paper.pdf'
            require(pdf.is_file() and pdf.read_bytes() == (ROOT/record['full_pdf']).read_bytes(), f'{key}: full PDF copy differs from verified source')
            require(any(tag == 'a' and a.get('href') == record['path']+'paper.pdf' for tag, a in doc.tags), f'{key}: scholarly PDF has no visible download link')
        else:
            require('citation_pdf_url' not in meta and not (target.parent/'paper.pdf').exists(), f'{key}: preview, excluded or mismatched PDF must not be marked as full text')
            require(not articles or 'encoding' not in articles[0], f'{key}: no full-text encoding without a matching PDF')
        for tag, attrs in doc.tags:
            for attr in ['href', 'src']:
                value = attrs.get(attr, '')
                if value.startswith('/') and not value.startswith('//') and value != '/':
                    route_path = unquote(urlsplit(value).path)
                    local = ROOT / route_path.lstrip('/')
                    require((local/'index.html').is_file() if route_path.endswith('/') else local.is_file(), f'{key}: missing local detail reference {value}')
        report.append({'paper': key, 'url': url, 'full_pdf': bool(record.get('full_pdf')), 'full_text': bool(body),
                       'sections': len(body['headings']) if body else 0, 'citation_formats': len(formats)})
    return report


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
        require(not any(t=='meta' and a.get('name', '').lower()=='robots' and
                        re.search(r'\bnoindex\b', a.get('content', ''), re.I) for t,a in doc.tags),
                f'{page["key"]}: canonical content page must not be noindex')
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
        if page['key']=='papers':
            previous_type, previous_year = 'published', 9999
            for start, end in sorted(Blocks(source).cards):
                attrs = Document(source[start:end]).tags[0][1]
                publication_type = attrs.get('data-publication-type')
                raw_year = attrs.get('data-publication-year', '')
                require(publication_type in {'published', 'preprint'} and bool(re.fullmatch(r'\d{4}', raw_year)), 'Papers: missing publication type or verified year')
                year = int(raw_year) if raw_year.isdigit() else 0
                require(not (previous_type=='preprint' and publication_type=='published'), 'Papers: a formal publication follows a preprint')
                require(publication_type!=previous_type or year<=previous_year, 'Papers: publication years are not newest first within the group')
                previous_type, previous_year = publication_type, year
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
    paper_report = check_paper_pages(config, sources['papers'], require)
    sitemap_report = check_sitemap(config, require)
    print(json.dumps({'pages':report,'paper_pages':paper_report,'redirects':config.get('redirects', []),'sitemap':sitemap_report,'failures':failures},ensure_ascii=False,indent=2))
    return bool(failures)


if __name__=='__main__':
    sys.exit(main())
