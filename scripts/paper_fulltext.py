"""Load source-derived full paper bodies and build a crawlable reader outline."""
from html import escape
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]


class Outline(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.headings, self.ids, self.images, self.text = [], [], [], []
        self.active = None
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in {'script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'textarea', 'button', 'h1'}:
            raise ValueError('Unsupported element in paper body: ' + tag)
        if any(name.startswith('on') for name in attrs):
            raise ValueError('Event handlers are not allowed in paper bodies')
        for attr in ['href', 'src']:
            value = attrs.get(attr, '')
            if value and urlsplit(value).scheme not in {'', 'https', 'http'}:
                raise ValueError('Unsafe paper body reference: ' + value)
        if attrs.get('id'):
            self.ids.append(attrs['id'])
        if tag in {'h2', 'h3', 'h4', 'h5', 'h6'}:
            self.active = {'level': int(tag[1]), 'id': attrs.get('id'), 'parts': []}
        if tag == 'img':
            self.images.append(attrs)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag):
        if self.active and tag == 'h' + str(self.active['level']):
            item = self.active
            item['title'] = ' '.join(''.join(item.pop('parts')).split())
            self.headings.append(item)
            self.active = None

    def handle_data(self, text):
        self.text.append(text)
        if self.active:
            self.active['parts'].append(text)


def load_fulltext(records):
    index = json.loads((ROOT / 'content/paper-bodies.json').read_text(encoding='utf8'))
    expected = set(records) - {'paper-0'}
    if set(index) != expected:
        raise ValueError('Full-text catalogue must cover every paper except the excluded thesis')
    for ident, entry in index.items():
        if entry.get('source_kind') not in {'published', 'author-manuscript', 'preprint'} or not entry.get('source_label'):
            raise ValueError('Missing full-text version information: ' + ident)
        if not re.fullmatch(r'[a-f0-9]{64}', entry.get('source_sha256', '')):
            raise ValueError('Missing original source fingerprint: ' + ident)
        path = ROOT / 'content/paper-bodies' / (ident + '.html')
        body = path.read_text(encoding='utf8')
        # Keep the native MathML layout model. Scroll its wrapper, never turn
        # <math> into a generic CSS block (that destroys fractions/scripts).
        def wrap_inline(match):
            before = body[max(0, match.start() - 160):match.start()]
            if re.search(r'<span\b[^>]*class="[^"]*paper-inline-math[^>]*>\s*$', before):
                return match[0]
            return '<span class="paper-inline-math">' + match[0] + '</span>'
        body = re.sub(r'<math\b[^>]*\bdisplay="inline"[^>]*>.*?</math>', wrap_inline, body, flags=re.S)
        if re.search(r'(?:\b[A-Z]:[\\/]|drive\.google\.com|\.private\.|file://)', body, re.I):
            raise ValueError('Private provenance leaked into paper body: ' + ident)
        outline = Outline(body)
        ids = outline.ids
        if len(set(ids)) != len(ids) or any(not value.startswith(ident + '-') for value in ids):
            raise ValueError('Paper body IDs must be unique and record-scoped: ' + ident)
        if not outline.headings or any(not heading['id'] or not heading['title'] for heading in outline.headings):
            raise ValueError('Missing full-text section anchors: ' + ident)
        if len(''.join(outline.text).strip()) < 1000:
            raise ValueError('Full paper body is unexpectedly short: ' + ident)
        for image in outline.images:
            src = image.get('src', '')
            if not src.startswith('/src/images/paper-body/' + ident + '/') or not (ROOT / unquote(src.lstrip('/'))).is_file():
                raise ValueError('Missing or external full-text figure: ' + ident + ': ' + src)
            if not image.get('alt'):
                raise ValueError('Paper figures require a source-based label: ' + ident)
        records[ident]['full_text'] = {**entry, 'html': body, 'headings': outline.headings,
                                      'language': 'ko' if ident in {'paper-12', 'paper-2026-p01'} else 'en',
                                      'text': ' '.join(''.join(outline.text).split()),
                                      'images': len(outline.images)}


def render_toc(record):
    full = record.get('full_text')
    links = '<li><a href="#abstract-heading">Abstract</a></li>'
    if full:
        links += ''.join('<li class="toc-level-' + str(item['level']) + '"><a href="#' + escape(item['id'], quote=True) + '">'
                         + escape(item['title']) + '</a></li>' for item in full['headings'] if item['level'] <= 3)
    links += '<li><a href="#citation-heading">Citation</a></li>'
    return ('<aside class="paper-sidebar"><details class="paper-toc" open><summary>목차 · Contents</summary>'
            '<nav aria-label="논문 목차"><ol>' + links + '</ol></nav></details></aside>')


def render_fulltext(record):
    full = record.get('full_text')
    if not full:
        return ''
    return ('<section id="full-text" class="paper-fulltext" lang="' + full['language'] + '" aria-label="논문 전문">'
            + full['html'] + '</section>')
