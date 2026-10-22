#!/usr/bin/env python3
"""Check generated content preservation, real routes, metadata and local assets."""
from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit
from build_site import ROOT, Blocks, VOID, GROUPS, latest_date, source_views


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
        require(sum(t=='h1' for t,a in doc.tags)==1, f'{page["key"]}: expected one h1')
        require(not any(t=='template' for t,a in doc.tags), f'{page["key"]}: inert templates remain')
        require(not doc.unclosed_layout,f'{page["key"]}: layout div is not closed before {doc.unclosed_layout}')
        expected_url = config['url'] + ('/'+page['slug']+'/' if page['slug'] else '/')
        require([a.get('href') for t,a in doc.tags if t=='link' and a.get('rel')=='canonical']==[expected_url],f'{page["key"]}: canonical mismatch')
        require(any(t=='meta' and a.get('name')=='description' and a.get('content')==page['description'] for t,a in doc.tags),f'{page["key"]}: description missing')
        schema = re.findall(r'<script type="application/ld\+json">(.*?)</script>',source,re.S)
        require(len(schema)==1 and bool(json.loads(schema[0])['@graph']),f'{page["key"]}: invalid structured data')
        expected_cards = 0
        for key in page['sections']:
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
            dates = [re.search(r'class="firstCommitDate"[^>]*>(.*?)</',source[a:b],re.S)[1].strip() for a,b in sorted(Blocks(source).cards)]
            require([latest_date(x) for x in dates]==sorted((latest_date(x) for x in dates),reverse=True),'Lectures are not sorted by latest date')
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
