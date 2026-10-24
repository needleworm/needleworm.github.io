"""Plain-text bibliography entries and portable BibTeX/RIS exports.

Public API: citation_formats(record) -> {apa, mla, chicago, ieee, bibtex, ris}.
Chicago means a Notes/Bibliography bibliography entry, not a footnote. IEEE
numbering is intentionally left to the destination bibliography. Plain text
cannot retain the italics used in the four human-readable styles.

Required: title and authors (nonempty list of names). Existing site metadata is
accepted directly. Optional keys: publication_type, repository, url (the detail
page), pdf_url, title_sentence_case, title_title_case, and author_names (list of
{given, family} or {literal} objects, corresponding to authors). CJK names are
always preserved. Unambiguous existing Latin 'Given Family' names are parsed;
ambiguous ordering can be supplied explicitly through author_names.

Unknown venues, dates, publishers, report numbers and page ranges are omitted.
Original title spelling/capitalization is preserved unless the caller supplies
an editorially verified title_sentence_case or title_title_case override: case
conversion cannot reliably distinguish proper nouns and scientific acronyms.

Style sources consulted 2026-10-24:
https://apastyle.apa.org/style-grammar-guidelines/references/examples/journal-article-references
https://apastyle.apa.org/style-grammar-guidelines/references/examples/preprint-article-references
https://style.mla.org/works-cited/citations-by-format/
https://www.chicagomanualofstyle.org/tools_citationguide/citation-guide-1.html
"""
from __future__ import annotations

from dataclasses import dataclass
from hashlib import sha256
import re
import unicodedata
from urllib.parse import urlsplit


FORMATS = ('apa', 'mla', 'chicago', 'ieee', 'bibtex', 'ris')
_CJK = re.compile(r'[\u3400-\u9fff\uac00-\ud7af\u3040-\u30ff]')
_LATIN_NAME = re.compile(r"^[A-Za-zÀ-ÖØ-öø-ÿ\s.,'’\-]+$")


def _text(value):
    return ' '.join(str(value).split()) if value is not None else ''


def _end(value):
    return value if value.endswith(('.', '?', '!')) else value + '.'


def _quoted(title):
    return '“' + _end(title) + '”'


def _doi(record):
    return re.sub(r'^(?:https?://(?:dx\.)?doi\.org/|doi:\s*)', '', _text(record.get('doi')), flags=re.I)


def _absolute(value):
    value = _text(value)
    return value if urlsplit(value).scheme in {'http', 'https'} and urlsplit(value).netloc else ''


def _url(record):
    return next((_absolute(record.get(k)) for k in ('url', 'canonical_url', 'evidence_url') if _absolute(record.get(k))), '')


def _locator(record):
    doi = _doi(record)
    return 'https://doi.org/' + doi if doi else _url(record)


def _repository(record):
    explicit = _text(record.get('repository'))
    if explicit:
        return explicit
    host = urlsplit(_absolute(record.get('evidence_url')) or _url(record)).netloc.lower()
    for domain, name in [('researchgate.net', 'ResearchGate'), ('preprints.org', 'Preprints.org'),
                         ('arxiv.org', 'arXiv'), ('koasas.kaist.ac.kr', 'KOASAS')]:
        if host == domain or host.endswith('.' + domain):
            return name
    doi = _doi(record).lower()
    if doi.startswith('10.48550/arxiv.'):
        return 'arXiv'
    return ''


def _kind(record):
    if record.get('dissertation_institution'):
        return 'thesis'
    if record.get('publication_type') == 'preprint':
        return 'preprint'
    if record.get('journal_title'):
        return 'journal'
    if record.get('conference_title'):
        return 'conference'
    if _repository(record) in {'ResearchGate', 'Preprints.org', 'arXiv'}:
        return 'preprint'
    return 'manuscript'


@dataclass(frozen=True)
class _Name:
    original: str
    family: str = ''
    given: str = ''

    def inverted(self):
        return f'{self.family}, {self.given}' if self.family and self.given else self.original

    def initials(self):
        if not self.given:
            return ''
        words = []
        for word in self.given.split():
            parts = [part for part in word.split('-') if part]
            words.append('-'.join(part[0].upper() + '.' for part in parts))
        return ' '.join(words)

    def apa(self):
        return f'{self.family}, {self.initials()}' if self.family and self.given else self.original

    def ieee(self):
        return f'{self.initials()} {self.family}' if self.family and self.given else self.original


def _names(record):
    authors = record.get('authors')
    if not isinstance(authors, list) or not authors or any(not isinstance(a, str) or not a.strip() for a in authors):
        raise ValueError('A nonempty list of author names is required')
    overrides = record.get('author_names')
    if overrides is not None and len(overrides) != len(authors):
        raise ValueError('author_names must correspond to authors')
    result = []
    for i, raw in enumerate(authors):
        value = _text(raw)
        if overrides:
            item = overrides[i]
            if item.get('literal'):
                result.append(_Name(_text(item['literal'])))
                continue
            family, given = _text(item.get('family')), _text(item.get('given'))
            if not family:
                raise ValueError('Explicit names need family or literal')
            result.append(_Name((given + ' ' + family).strip(), family, given))
        elif _CJK.search(value) or not _LATIN_NAME.fullmatch(value):
            result.append(_Name(value))
        elif ',' in value:
            family, given = [part.strip() for part in value.split(',', 1)]
            result.append(_Name((given + ' ' + family).strip(), family, given))
        elif len(value.split()) > 1:
            given, family = value.rsplit(' ', 1)
            result.append(_Name(value, family, given))
        else:
            result.append(_Name(value))
    return result


def _and(values, conjunction='and'):
    if len(values) == 1:
        return values[0]
    if len(values) == 2:
        return values[0] + ' ' + conjunction + ' ' + values[1]
    return ', '.join(values[:-1]) + ', ' + conjunction + ' ' + values[-1]


def _pages(record, separator='–', compress=False):
    first, last = _text(record.get('firstpage')), _text(record.get('lastpage'))
    if not first:
        return ''
    if not last or first == last:
        return first
    if compress and first.isdigit() and last.isdigit() and len(first) == len(last) and int(first) >= 100 and int(first) % 100:
        common = 0
        while common < len(first) - 1 and first[common] == last[common]:
            common += 1
        minimum = 1 if int(first) % 100 < 10 else 2
        last = last[min(common, len(last) - minimum):]
    return first + separator + last


def _apa(record, names, kind, title, year, locator):
    values = [n.apa() for n in names]
    author = (', '.join(values[:-1]) + ', & ' + values[-1]) if 1 < len(values) <= 20 else values[0] if len(values) == 1 else ', '.join(values[:19]) + ', … ' + values[-1]
    start = _end(author) + f' ({year or "n.d."}). '
    pages = _pages(record)
    if kind == 'thesis':
        body = title + ' [Master’s thesis, ' + _text(record['dissertation_institution']) + '].'
        if _repository(record):
            body += ' ' + _end(_repository(record))
    else:
        body = _end(title)
        if kind == 'journal':
            venue = _text(record['journal_title'])
            volume, issue = _text(record.get('volume')), _text(record.get('issue'))
            if volume or issue:
                venue += ', ' + volume + ('(' + issue + ')' if issue else '')
            if record.get('article_number'):
                venue += ', Article ' + _text(record['article_number'])
            elif pages:
                venue += ', ' + pages
            body += ' ' + _end(venue)
        elif kind == 'conference':
            venue = 'In ' + _text(record['conference_title'])
            if pages:
                venue += ' (' + ('pp. ' if '–' in pages else 'p. ') + pages + ')'
            body += ' ' + _end(venue)
        elif _repository(record):
            body += ' ' + _end(_repository(record))
        else:
            body = title + (' [Preprint].' if kind == 'preprint' else ' [Unpublished manuscript].')
    return start + body + (' ' + locator if locator else '')


def _mla(record, names, kind, title, year, locator):
    author = names[0].inverted()
    if len(names) == 2:
        author += ', and ' + names[1].original
    elif len(names) > 2:
        author += ', et al.'
    start = _end(author) + ' '
    if kind == 'thesis':
        body = _end(title) + ' ' + _text(record['dissertation_institution'])
        if year:
            body += ', ' + year
        body += '. Master’s thesis.'
    else:
        body = _quoted(title)
        fields = []
        venue = _text(record.get('journal_title') if kind == 'journal' else record.get('conference_title') if kind == 'conference' else _repository(record))
        if venue:
            fields.append(venue)
        if kind == 'journal':
            if record.get('volume'):
                fields.append('vol. ' + _text(record['volume']))
            if record.get('issue'):
                fields.append('no. ' + _text(record['issue']))
        if year:
            fields.append(year)
        pages = _pages(record, '-', compress=True)
        if record.get('article_number'):
            fields.append('article ' + _text(record['article_number']))
        elif pages:
            fields.append(('pp. ' if '-' in pages else 'p. ') + pages)
        if fields:
            body += ' ' + _end(', '.join(fields))
        if kind in {'preprint', 'manuscript'}:
            body += ' ' + ('Preprint.' if kind == 'preprint' else 'Unpublished manuscript.')
    return start + body + (' ' + _end(locator) if locator else '')


def _chicago(record, names, kind, title, year, locator):
    values = [names[0].inverted()] + [n.original for n in names[1:]]
    author = ', '.join(values[:3]) + ', et al.' if len(values) > 6 else values[0] + ', and ' + values[1] if len(values) == 2 else _and(values)
    start = _end(author) + ' '
    if kind == 'thesis':
        body = _quoted(title) + ' Master’s thesis, ' + _text(record['dissertation_institution'])
        if year:
            body += ', ' + year
        body = _end(body)
    elif kind == 'journal':
        venue = _text(record['journal_title'])
        if record.get('volume'):
            venue += ' ' + _text(record['volume'])
        if record.get('issue'):
            venue += ', no. ' + _text(record['issue'])
        venue += ' (' + (year or 'n.d.') + ')'
        page = _text(record.get('article_number')) or _pages(record, compress=True)
        if page:
            venue += ': ' + page
        body = _quoted(title) + ' ' + _end(venue)
    elif kind == 'conference':
        venue = 'In ' + _text(record['conference_title'])
        if _pages(record):
            venue += ', ' + _pages(record, compress=True)
        body = _quoted(title) + ' ' + _end(venue)
        if year:
            body += ' ' + _end(year)
    else:
        fields = ['Preprint' if kind == 'preprint' else 'Unpublished manuscript']
        if _repository(record):
            fields.append(_repository(record))
        if year:
            fields.append(year)
        body = _quoted(title) + ' ' + _end(', '.join(fields))
    return start + body + (' ' + _end(locator) if locator else '')


def _ieee(record, names, kind, title, year, locator):
    authors = names[0].ieee() + ' et al.' if len(names) > 6 else _and([n.ieee() for n in names])
    quoted = '“' + title.rstrip('.') + ('' if title.endswith(('?', '!')) else ',') + '”'
    parts = [authors, quoted]
    if kind == 'journal':
        parts.append(_text(record['journal_title']))
        if record.get('volume'):
            parts.append('vol. ' + _text(record['volume']))
        if record.get('issue'):
            parts.append('no. ' + _text(record['issue']))
        if not record.get('article_number') and _pages(record):
            parts.append(('pp. ' if '–' in _pages(record) else 'p. ') + _pages(record))
    elif kind == 'conference':
        parts.append('in ' + _text(record['conference_title']))
    elif kind == 'thesis':
        parts += ['master’s thesis', _text(record['dissertation_institution'])]
    else:
        if _repository(record):
            parts.append(_repository(record))
        parts.append('preprint' if kind == 'preprint' else 'unpublished manuscript')
    if year:
        parts.append(year)
    if record.get('article_number'):
        parts.append('Art. no. ' + _text(record['article_number']))
    elif kind == 'conference' and _pages(record):
        parts.append(('pp. ' if '–' in _pages(record) else 'p. ') + _pages(record))
    if _doi(record):
        parts.append('doi: ' + _doi(record))
    # The quoted title already contains its separator, inside the quotation mark.
    result = parts[0] + ', ' + parts[1] + (' ' + ', '.join(parts[2:]) if len(parts) > 2 else '')
    result = _end(result)
    if not _doi(record) and locator:
        result += ' [Online]. Available: ' + locator
    return result


def _tex(value):
    mapping = {'\\': r'\textbackslash{}', '&': r'\&', '%': r'\%', '$': r'\$', '#': r'\#',
               '_': r'\_', '{': r'\{', '}': r'\}', '~': r'\textasciitilde{}', '^': r'\textasciicircum{}'}
    return ''.join(mapping.get(char, char) for char in _text(value))


def _bibtex(record, names, kind, title, year):
    identity = _text(record.get('record_id') or record.get('slug') or _doi(record))
    if not identity:
        identity = title + '|' + year + '|' + '|'.join(n.original for n in names)
    stem = unicodedata.normalize('NFKD', names[0].family or names[0].original).encode('ascii', 'ignore').decode()
    stem = re.sub(r'[^a-z0-9]', '', stem.lower()) or 'paper'
    key = stem + (year or 'nd') + '_' + sha256(identity.encode('utf8')).hexdigest()[:12]
    entry = {'journal': 'article', 'conference': 'inproceedings', 'thesis': 'mastersthesis'}.get(kind, 'misc')
    authors = ' and '.join(_tex(n.inverted()) if n.family else '{' + _tex(n.original) + '}' for n in names)
    fields = [('author', authors), ('title', '{' + _tex(title) + '}')]
    if year:
        fields.append(('year', _tex(year)))
    for field, value in [('journal', record.get('journal_title') if kind == 'journal' else None),
                         ('booktitle', record.get('conference_title') if kind == 'conference' else None),
                         ('school', record.get('dissertation_institution') if kind == 'thesis' else None),
                         ('volume', record.get('volume')), ('number', record.get('issue')),
                         ('pages', _pages(record, '--')), ('eid', record.get('article_number')),
                         ('doi', _doi(record)), ('url', _url(record) or _locator(record))]:
        if value:
            fields.append((field, _tex(value)))
    if kind in {'preprint', 'manuscript'}:
        fields.append(('note', 'Preprint' if kind == 'preprint' else 'Unpublished manuscript'))
        if _repository(record):
            fields.append(('howpublished', _tex(_repository(record))))
    return '@' + entry + '{' + key + ',\n' + ',\n'.join('  ' + field + ' = {' + value + '}' for field, value in fields) + '\n}'


def _ris(record, names, kind, title, year):
    fields = [('TY', {'journal': 'JOUR', 'conference': 'CONF', 'thesis': 'THES'}.get(kind, 'UNPB'))]
    fields += [('AU', n.inverted()) for n in names]
    fields.append(('TI', title))
    if year:
        fields.append(('PY', year))
    venue = record.get('journal_title') if kind == 'journal' else record.get('conference_title') if kind == 'conference' else None
    if venue:
        fields.append(('T2', venue))
    for field, value in [('VL', record.get('volume')), ('IS', record.get('issue')),
                         ('SP', record.get('firstpage')), ('EP', record.get('lastpage')),
                         ('DO', _doi(record)), ('UR', _url(record) or _locator(record)),
                         ('AB', record.get('abstract')), ('LA', record.get('language')),
                         ('PB', record.get('dissertation_institution') if kind == 'thesis' else None),
                         ('L1', _absolute(record.get('pdf_url')))]:
        if value:
            fields.append((field, value))
    if record.get('article_number'):
        fields.append(('C7', record['article_number']))
    if kind in {'preprint', 'manuscript', 'thesis'}:
        fields.append(('M3', {'preprint': 'Preprint', 'manuscript': 'Unpublished manuscript', 'thesis': 'Master’s thesis'}[kind]))
    fields.append(('ER', ''))
    return '\n'.join((tag + '  - ' + _text(value)).rstrip() for tag, value in fields) + '\n'


def citation_formats(record) -> dict[str, str]:
    """Return six plain-text entries without changing the supplied dictionary."""
    title = _text(record.get('title'))
    if not title:
        raise ValueError('A paper title is required')
    names, kind = _names(record), _kind(record)
    year = _text(record.get('year'))
    if year and not re.fullmatch(r'\d{4}', year):
        raise ValueError('year must be a four-digit year or omitted')
    sentence_title = _text(record.get('title_sentence_case')) or title
    title_title = _text(record.get('title_title_case')) or title
    locator = _locator(record)
    return dict(zip(FORMATS, (
        _apa(record, names, kind, sentence_title, year, locator),
        _mla(record, names, kind, title_title, year, locator),
        _chicago(record, names, kind, title_title, year, locator),
        _ieee(record, names, kind, sentence_title, year, locator),
        _bibtex(record, names, kind, title, year),
        _ris(record, names, kind, title, year),
    )))
