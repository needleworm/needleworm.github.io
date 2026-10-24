"""Render source-derived paper readers, abstracts and scholarly metadata."""
from html import escape, unescape
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from paper_fulltext import load_fulltext, render_fulltext, render_toc
from paper_citations import citation_formats

ROOT = Path(__file__).resolve().parents[1]


class Text(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self.feed(source)

    def handle_data(self, value):
        self.parts.append(value)


def plain(source):
    return ' '.join(''.join(Text(source).parts).split())


def load_records(cards):
    records = json.loads((ROOT / 'content/papers.json').read_text(encoding='utf8'))
    by_id, slugs = {}, set()
    for record in records:
        ident, slug = record['record_id'], record['slug']
        if ident in by_id or slug in slugs or not re.fullmatch(r'[a-z0-9-]+', slug):
            raise ValueError(f'Duplicate or unsafe paper identity: {ident}')
        if not record.get('authors') or any(not isinstance(a, str) or not a.strip() for a in record['authors']):
            raise ValueError(f'Missing paper authors: {ident}')
        by_id[ident] = record.copy()
        slugs.add(slug)
    found = set()
    for card in cards:
        ident = re.search(r'\bdata-record-id="([^"]+)"', card)[1]
        if ident not in by_id:
            raise ValueError(f'Missing scholarly metadata for {ident}')
        record = by_id[ident]
        title = plain(re.search(r'<h5\b[^>]*>(.*?)</h5>', card, re.S)[1])
        abstract = plain(re.search(r'<p class="abstract"[^>]*>(.*?)</p>', card, re.S)[1])
        year = int(re.search(r'\bdata-publication-year="(\d{4})"', card)[1])
        publication_type = re.search(r'\bdata-publication-type="([^"]+)"', card)[1]
        if title != record['title'] or year != record['year'] or not abstract:
            raise ValueError(f'Paper card and scholarly metadata differ: {ident}')
        record.update(card=card, abstract=abstract, publication_type=publication_type)
        record['language'] = 'ko' if re.search(r'[가-힣]', title) else 'en'
        record['path'] = '/papers/' + record['slug'] + '/'
        full_pdf = record.get('full_pdf')
        if full_pdf:
            source = ROOT / full_pdf
            if not full_pdf.startswith('src/paperPdf/') or not source.is_file() or 'preview' in full_pdf.lower() or ident in {'paper-0', 'paper-14', 'paper-2026-p01'}:
                raise ValueError(f'Full-text metadata cannot refer to an excluded PDF: {ident}')
            data = source.read_bytes()
            if not data.startswith(b'%PDF-') or len(data) > 5 * 1024 * 1024:
                raise ValueError(f'Scholar PDF must be a PDF under 5 MB: {ident}')
        found.add(ident)
    if found != set(by_id):
        raise ValueError('Scholarly metadata refers to missing paper cards')
    load_fulltext(by_id)
    return by_id


def link_card_titles(source, records):
    for record in records.values():
        original = record['card']
        linked = re.sub(r'(<h5\b[^>]*>)(.*?)(</h5>)',
            lambda m: m[1] + f'<a class="paper-detail-link" href="{record["path"]}">' + m[2] + '</a>' + m[3],
            original, count=1, flags=re.S)
        linked = linked.replace('<div ', f'<div id="{record["record_id"]}" ', 1)
        source = source.replace(original, linked, 1)
    return source


def scholar_meta(record, site_url):
    values = [('citation_title', record['title'])]
    values += [('citation_author', author) for author in record['authors']]
    values += [('citation_publication_date', str(record['year'])),
               ('citation_language', record['language']),
               ('citation_abstract_html_url', site_url + record['path'])]
    for field, name in [('journal_title', 'citation_journal_title'), ('conference_title', 'citation_conference_title'),
                        ('volume', 'citation_volume'), ('issue', 'citation_issue'),
                        ('firstpage', 'citation_firstpage'), ('lastpage', 'citation_lastpage'),
                        ('doi', 'citation_doi'), ('dissertation_institution', 'citation_dissertation_institution')]:
        if record.get(field):
            values.append((name, str(record[field])))
    if record.get('full_pdf'):
        values.append(('citation_pdf_url', site_url + record['path'] + 'paper.pdf'))
    return '\n'.join(f'<meta name="{name}" content="{escape(value, quote=True)}">' for name, value in values)


def article_schema(record, site_url):
    url = site_url + record['path']
    result = {'@type': 'Thesis' if record.get('dissertation_institution') else 'ScholarlyArticle',
              '@id': url + '#article', 'url': url, 'name': record['title'], 'headline': record['title'],
              'author': [{'@type': 'Person', 'name': name} for name in record['authors']],
              'datePublished': str(record['year']), 'inLanguage': record['language'],
              'abstract': record['abstract'], 'mainEntityOfPage': {'@id': url + '#page'}}
    if record['publication_type'] == 'preprint':
        result['creativeWorkStatus'] = 'Preprint'
    if record.get('title_en'):
        result['alternativeHeadline'] = record['title_en']
    if record.get('article_number'):
        result['pagination'] = 'Article ' + str(record['article_number'])
    if record.get('journal_title'):
        venue = {'@type': 'Periodical', 'name': record['journal_title']}
        if record.get('volume'):
            venue = {'@type': 'PublicationVolume', 'volumeNumber': str(record['volume']), 'isPartOf': venue}
        if record.get('issue'):
            venue = {'@type': 'PublicationIssue', 'issueNumber': str(record['issue']), 'isPartOf': venue}
        result['isPartOf'] = venue
    elif record.get('conference_title'):
        result['isPartOf'] = {'@type': 'CreativeWork', 'name': record['conference_title']}
    if record.get('dissertation_institution'):
        result['sourceOrganization'] = {'@type': 'CollegeOrUniversity', 'name': record['dissertation_institution']}
    for field, name in [('firstpage', 'pageStart'), ('lastpage', 'pageEnd')]:
        if record.get(field):
            result[name] = str(record[field])
    if record.get('doi'):
        result['identifier'] = {'@type': 'PropertyValue', 'propertyID': 'DOI', 'value': record['doi']}
    if record.get('full_pdf'):
        result['encoding'] = {'@type': 'MediaObject', 'contentUrl': url + 'paper.pdf', 'encodingFormat': 'application/pdf'}
    return result


def render_article(record):
    card = record['card']
    footer = re.search(r'<div class="gitIcons">.*?</div>', card, re.S)[0]
    if record.get('full_pdf'):
        full_pdf_url = record['path'] + 'paper.pdf'
        footer, replaced = re.subn(r'(<a\b[^>]*href=")[^"]+("[^>]*\bdownload\b)', lambda m: m[1] + full_pdf_url + m[2], footer, count=1)
        if not replaced:
            footer = footer.replace('<div class="gitIcons">', '<div class="gitIcons"><a href="' + full_pdf_url + '" download title="PDF 다운로드" aria-label="PDF 다운로드"><span aria-hidden="true">PDF</span></a>', 1)
    footer = re.sub(r'\bhref="\./src/', 'href="/src/', footer)
    image = re.search(r'<img\b[^>]*>', card, re.S)[0]
    image = re.sub(r'\bsrc="\./src/', 'src="/src/', image)
    image = image.replace('class="websiteImage"', 'class="paper-detail-image"')
    venue = record.get('journal_title', record.get('conference_title', record.get('dissertation_institution', '')))
    parts = [str(record['year'])]
    if venue:
        parts.append(venue)
    if record.get('volume'):
        volume = str(record['volume']) + ('(' + str(record['issue']) + ')' if record.get('issue') else '')
        parts.append(volume)
    if record.get('firstpage'):
        parts.append(str(record['firstpage']) + ('–' + str(record['lastpage']) if record.get('lastpage') else ''))
    if record.get('article_number'):
        parts.append('Article ' + str(record['article_number']))
    kind = 'Preprint · not peer-reviewed' if record['publication_type'] == 'preprint' else "Master’s thesis" if record.get('dissertation_institution') else 'Published research'
    full = record.get('full_text')
    jumps = ('<nav class="paper-reader-jumps" aria-label="논문 바로가기"><a href="#abstract-heading">Abstract</a>'
             + ('<a href="#full-text">Full text</a>' if full else '') + '<a href="#citation-heading">Cite</a></nav>')
    return ('<nav class="paper-breadcrumbs" aria-label="현재 위치"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/papers/">Papers</a></nav>'
        '<article id="tab-papers" class="paper-detail" data-paper-id="' + record['record_id'] + '">'
        '<header><p class="paper-kind">' + kind + '</p><h1 id="paper-title" lang="' + record['language'] + '">' + escape(record['title']) + '</h1>'
        + ('<p class="paper-alternative-title" lang="en">' + escape(record['title_en']) + '</p>' if record.get('title_en') else '')
        + '<p class="paper-authors">' + escape(', '.join(record['authors'])) + '</p>'
        '<p class="paper-venue">' + escape(' · '.join(parts)) + '</p>' + jumps + footer + '</header>'
        '<div class="paper-reader-layout">' + render_toc(record) + '<div class="paper-reading-column">'
        '<section class="paper-abstract" aria-labelledby="abstract-heading"><h2 id="abstract-heading">Abstract</h2>'
        '<p class="abstract" lang="en">' + escape(record['abstract']) + '</p></section>' + render_fulltext(record)
        + render_citations(record)
        + ('' if full else '<figure class="paper-first-page">' + image + '<figcaption>논문 첫 페이지</figcaption></figure>')
        + '<a class="paper-back-link" href="/papers/">← 논문 목록으로 돌아가기</a></div></div></article>')


def render_citations(record):
    formats = citation_formats(record)
    labels = {'apa': 'APA', 'mla': 'MLA', 'chicago': 'Chicago', 'ieee': 'IEEE', 'bibtex': 'BibTeX', 'ris': 'RIS'}
    buttons = ''.join('<button type="button" data-citation-format="' + key + '" aria-controls="citation-text" aria-pressed="'
                      + ('true' if key == 'apa' else 'false') + '" title="' + label + ' 형식 복사">' + label + ' 복사</button>'
                      for key, label in labels.items())
    data = json.dumps(formats, ensure_ascii=False).replace('<', '\\u003c')
    return ('<section class="paper-citation" aria-labelledby="citation-heading"><h2 id="citation-heading">Citation</h2>'
            '<p class="citation-help">형식을 누르면 인용 정보가 복사됩니다.</p><div class="citation-formats">' + buttons + '</div>'
            '<label for="citation-text" class="citation-preview-label">인용 미리보기 · <span id="citation-current-format">APA</span></label>'
            '<textarea id="citation-text" rows="7" readonly spellcheck="false">' + escape(formats['apa']) + '</textarea>'
            '<p id="citation-status" class="citation-status" role="status" aria-live="polite"></p>'
            '<p class="citation-downloads"><a href="' + record['path'] + 'citation.bib" download>BibTeX 파일</a><a href="'
            + record['path'] + 'citation.ris" download>RIS 파일</a></p>'
            '<script type="application/json" id="citation-formats-data">' + data + '</script></section>')


def pdf_outputs(records):
    return {record['path'].lstrip('/') + 'paper.pdf': (ROOT / record['full_pdf']).read_bytes()
            for record in records.values() if record.get('full_pdf')}


def citation_outputs(records):
    outputs = {}
    for record in records.values():
        formats = citation_formats(record)
        outputs[record['path'].lstrip('/') + 'citation.bib'] = formats['bibtex'].rstrip('\n') + '\n'
        outputs[record['path'].lstrip('/') + 'citation.ris'] = formats['ris'].rstrip('\n') + '\n'
    return outputs
