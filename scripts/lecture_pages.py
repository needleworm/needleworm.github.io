"""Individual lecture pages derived only from the existing canonical cards."""
from html import escape
from html.parser import HTMLParser
import re

VOID = set('area base br col embed hr img input link meta param source track wbr'.split())


class Elements(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=False)
        self.source, self.elements, self.stack = source, [], []
        self.lines = [0] + [m.end() for m in re.finditer('\n', source)]
        self.feed(source)

    def source_offset(self):
        row, column = self.getpos()
        return self.lines[row - 1] + column

    def handle_starttag(self, tag, attrs):
        element = {'tag': tag, 'attrs': dict(attrs), 'start': self.source_offset(),
                   'open_end': self.source_offset() + len(self.get_starttag_text())}
        element['end'] = element['close_start'] = element['open_end']
        self.elements.append(element)
        if tag not in VOID:
            self.stack.append(element)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.stack.pop()

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index]['tag'] == tag:
                self.stack[index]['close_start'] = self.source_offset()
                self.stack[index]['end'] = self.source.index('>', self.source_offset()) + 1
                del self.stack[index:]
                break


def has_class(element, name):
    return name in element['attrs'].get('class', '').split()


def plain(source):
    class Text(HTMLParser):
        def __init__(self):
            super().__init__(convert_charrefs=True)
            self.parts = []

        def handle_data(self, data):
            self.parts.append(data)
    parser = Text()
    parser.feed(source)
    return ' '.join(''.join(parser.parts).split())


def inside(source, element):
    return source[element['open_end']:element['close_start']]


def load_lecture_records(cards):
    records = {}
    for card in cards:
        elements = Elements(card).elements
        ident = elements[0]['attrs'].get('data-record-id')
        if not ident or not re.fullmatch(r'[a-z0-9-]+', ident) or ident in records:
            raise ValueError('Lecture cards need unique stable identities: ' + str(ident))
        titles = [e for e in elements if e['tag'] == 'h5' and has_class(e, 'lecture_title')]
        images = [e for e in elements if e['tag'] == 'img']
        dates = [e for e in elements if has_class(e, 'firstCommitDate')]
        if len(titles) != 1 or len(images) != 1 or len(dates) != 1:
            raise ValueError('Missing or ambiguous lecture card content: ' + ident)
        institution = [e for e in elements if has_class(e, 'lec_inst')]
        abstracts = [e for e in elements if has_class(e, 'abstract')]
        title = plain(inside(card, titles[0]))
        if not title:
            raise ValueError('Empty lecture title: ' + ident)
        records[ident] = {'record_id': ident, 'path': '/lectures/' + ident + '/', 'card': card,
                          'title': title, 'date_text': plain(inside(card, dates[0])),
                          'institution': plain(inside(card, institution[0])) if institution else '',
                          'abstract': ' '.join(plain(inside(card, e)) for e in abstracts),
                          'image': images[0]['attrs']['src'],
                          'category': elements[0]['attrs'].get('data-category', '')}
    return records


def link_lecture_cards(source, records):
    """Replace institution destinations; retain their exact original labels."""
    cards = [e for e in Elements(source).elements if has_class(e, 'singleLectureContainer')]
    edits = []
    for element in cards:
        ident = element['attrs'].get('data-record-id')
        if ident not in records:
            continue
        route = records[ident]['path']
        card = source[element['start']:element['end']]
        fields = Elements(card).elements
        changes = []
        for field in fields:
            if field['tag'] == 'a' and has_class(field, 'lec_inst'):
                opening = card[field['start']:field['open_end']]
                opening = re.sub(r'\bhref\s*=\s*(["\']).*?\1', 'href="' + route + '"', opening, count=1)
                opening = re.sub(r'\s+(?:target|rel)\s*=\s*(["\']).*?\1', '', opening)
                changes.append((field['start'], field['open_end'], opening))
            elif field['tag'] == 'h5' and has_class(field, 'lecture_title'):
                content = inside(card, field)
                changes.append((field['open_end'], field['close_start'],
                                '<a class="lecture-detail-link" href="' + route + '">' + content + '</a>'))
        for start, end, replacement in sorted(changes, reverse=True):
            card = card[:start] + replacement + card[end:]
        edits.append((element['start'], element['end'], card))
    for start, end, replacement in sorted(edits, reverse=True):
        source = source[:start] + replacement + source[end:]
    return source


def render_lecture(record):
    card = record['card']
    root = Elements(card).elements[0]
    card = card[root['open_end']:root['close_start']]
    card = re.sub(r'(<h)5(\b[^>]*class="lecture_title"[^>]*>)(.*?)(</h)5>', r'\g<1>1\2\3\g<4>1>', card, count=1, flags=re.S)
    card = re.sub(r'\b(src|href)=(["\'])(?:\./)?src/', r'\1=\2/src/', card)
    card = re.sub(r'<img\b(?![^>]*\bdecoding=)', '<img decoding="async"', card)
    return ('<nav class="lecture-breadcrumbs" aria-label="현재 위치"><a href="/lectures/">Lectures</a></nav>'
            '<article class="lecture-detail" data-lecture-id="' + record['record_id'] + '">' + card + '</article>')
