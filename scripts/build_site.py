#!/usr/bin/env python3
"""Generate real HTML pages from content/. Requires only Python's standard library."""
from __future__ import annotations
import argparse
from datetime import date
from hashlib import sha256
from html import escape
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET
from paper_pages import load_records, link_card_titles, scholar_meta, article_schema, render_article, pdf_outputs, citation_outputs
from lecture_pages import load_lecture_records, link_lecture_cards, render_lecture
from site_feeds import generate_feeds

ROOT = Path(__file__).resolve().parents[1]
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
CARD_CLASSES = {'singleBookContainer', 'singleLectureContainer', 'singleProjectContainer'}
NESTED_HTML_ENTITY = re.compile(r'&amp;(?:amp|quot|apos|lt|gt|nbsp);|&amp;#(?:[0-9]+|[xX][0-9A-Fa-f]+);')
LECTURE_CATEGORIES = [
    ('companies', '기업'), ('public', '공공기관'), ('education', '교육기관'),
    ('research', '연구기관'), ('conferences', '컨퍼런스'),
]
GROUPS = [
    ('about', 'About', ['home']), ('media', 'Media', ['media']),
    ('books', 'Books', ['books']), ('lectures', 'Lectures', ['lectures']),
    ('courses', 'Courses', ['courses-online', 'courses-offline']),
    ('news', 'News', ['news']),
    ('research', 'R&D', ['papers', 'patents', 'projects']),
    ('activities', 'ETC', ['activities', 'memberships', 'collections']),
    ('contact', 'Contact', ['contact']),
]


class Blocks(HTMLParser):
    """Locate whole cards while preserving their original markup."""
    def __init__(self, source):
        super().__init__(convert_charrefs=False)
        self.source = source
        self.lines = [0] + [m.end() for m in re.finditer('\n', source)]
        self.stack, self.cards = [], []
        self.feed(source)

    def source_offset(self):
        row, col = self.getpos()
        return self.lines[row - 1] + col

    def handle_starttag(self, tag, attrs):
        if tag not in VOID:
            classes = (dict(attrs).get('class') or '').split()
            self.stack.append((tag, self.source_offset(), bool(CARD_CLASSES.intersection(classes))))

    def handle_startendtag(self, tag, attrs):
        pass

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                matching = self.stack[i:]
                del self.stack[i:]
                for _, start, is_card in matching:
                    if is_card:
                        self.cards.append((start, self.source.index('>', self.source_offset()) + 1))
                break


def latest_date(text):
    if re.fullmatch(r'\s*\d{4}년?\s*', text):
        return int(re.search(r'\d{4}', text)[0]) * 10000
    year, latest = 0, 0
    for explicit, month, day in re.findall(r'(?:(\d{4})\s*\.\s*)?(\d{1,2})\s*\.\s*(\d{1,2})\.?', text):
        year = int(explicit) if explicit else year
        if year:
            try:
                latest = max(latest, int(date(year, int(month), int(day)).strftime('%Y%m%d')))
            except ValueError:
                continue
    return latest


def visit_dates(text):
    """Count distinct visit dates; a year-only value does not establish visits."""
    year, dates = 0, set()
    for explicit, month, day in re.findall(r'(?:(\d{4})\s*\.\s*)?(\d{1,2})\s*\.\s*(\d{1,2})\.?', text):
        year = int(explicit) if explicit else year
        if year:
            try:
                dates.add(date(year, int(month), int(day)))
            except ValueError:
                pass
    return dates


def card_id(card, source_key):
    explicit = re.search(r'\bdata-record-id="([^"]+)"', card)
    if explicit:
        return explicit[1]
    image = re.search(r'<img\b[^>]*\bsrc="([^"]+)"', card)
    prefix = 'lecture-' if source_key=='lectures' else 'course-'
    # Distinct events may reuse one thumbnail. Curated cross-list records have
    # explicit stable IDs; legacy records also need an unambiguous fallback.
    stem = Path(image[1]).stem + '-' if image else ''
    return prefix + stem + sha256(card.encode()).hexdigest()[:16]


def source_views(sources):
    """Cross-list canonical cards without maintaining duplicate copies of their text."""
    policy = json.loads((ROOT/'content/cross-listing.json').read_text(encoding='utf8'))
    def cards(key):
        return [sources[key][a:b] for a,b in sorted(Blocks(sources[key]).cards)]
    lectures = cards('lectures')
    offline = cards('courses-offline')
    extras = {'courses-online': [], 'courses-offline': []}
    known_ids = {card_id(card,'lectures') for card in lectures}
    if not set(policy['minimum_visits']).issubset(known_ids) or not set(policy['delivery']).issubset(known_ids):
        raise ValueError('Cross-list policy refers to a missing lecture record')
    for card in lectures:
        record = card_id(card,'lectures')
        field = re.search(r'class="firstCommitDate"[^>]*>(.*?)</', card, re.S)
        visits = len(visit_dates(field[1])) if field else 0
        if max(visits, policy['minimum_visits'].get(record,0)) < 3:
            continue
        delivery = policy['delivery'].get(record)
        if delivery not in {'online','offline'}:
            raise ValueError(f'Confirm Online/Offline delivery for repeated lecture {record}')
        extras['courses-'+delivery].append((record,card))
    result = dict(sources)
    additions = {'lectures': [(card_id(card,'courses-offline'),card) for card in offline], **extras}
    for key, additions_for_key in additions.items():
        spans = sorted(Blocks(sources[key]).cards)
        known = {card_id(card,key) for card in cards(key)}
        appended = []
        for record, card in additions_for_key:
            if record in known:
                continue
            if key=='lectures' and not re.search(r'\bdata-category="[^"]+"',card):
                raise ValueError(f'Confirm institution category for offline course {record}')
            known.add(record)
            appended.append(card.replace('<div ',f'<div data-cross-listed-from="{escape(record,quote=True)}" ',1))
        if appended:
            end = spans[-1][1]
            result[key] = sources[key][:end]+'\n\n'+'\n\n'.join(appended)+sources[key][end:]
    return result


def card_latest_date(card):
    match = re.search(r'class="firstCommitDate"[^>]*>(.*?)</', card, re.S)
    return latest_date(match[1].strip()) if match else 0


def lecture_sections(source):
    """Render one chronological list, with optional institution filters."""
    spans = sorted(Blocks(source).cards)
    opening = re.search(r'<div\b[^>]*\bid=["\']lecture-list["\'][^>]*>', source)
    if not spans or not opening or spans[0][0] < opening.end():
        raise ValueError('Lectures must have a lecture-list wrapper containing all cards')
    closing = re.match(r'\s*</div\s*>', source[spans[-1][1]:])
    if not closing:
        raise ValueError('Lectures list must close immediately after its cards')
    groups = {name: [] for _, name in LECTURE_CATEGORIES}
    for start, end in spans:
        card = source[start:end]
        category = re.search(r'\bdata-category="([^"]+)"', card[:card.index('>') + 1])
        if not category or category[1] not in groups:
            raise ValueError(f'Unknown institution category for lecture {card_id(card, "lectures")}')
        groups[category[1]].append(card)
    buttons = [f'<button type="button" class="lecture-filter" aria-controls="lecture-list" aria-pressed="true" data-category="전체">전체<span class="lecture-filter-count">{len(spans)}</span></button>']
    for slug, name in LECTURE_CATEGORIES:
        buttons.append(f'<button type="button" class="lecture-filter" aria-controls="lecture-list" aria-pressed="false" data-category="{name}" data-category-id="lectures-{slug}">{name}<span class="lecture-filter-count">{len(groups[name])}</span></button>')
    cards = sorted((source[a:b] for a, b in spans), key=card_latest_date, reverse=True)
    navigation = '<nav class="lecture-filters" id="lecture-category-nav" aria-label="강의 기관 분류">' + ''.join(buttons) + '</nav>'
    result = f'<p class="lecture-results" id="lecture-results" role="status" aria-live="polite">전체 {len(spans)}건 · 최신 강의순</p>'
    listing = '<div id="lecture-list" class="lecturesContainer">\n' + '\n\n'.join(cards) + '\n</div>'
    end = spans[-1][1] + closing.end()
    return source[:opening.start()] + navigation + '\n' + result + '\n' + listing + source[end:]


def section_html(key, source):
    if key == 'lectures':
        source = lecture_sections(source)
    elif key.startswith('courses-'):
        spans = sorted(Blocks(source).cards)
        cards = [source[a:b] for a, b in spans]
        if key == 'courses-offline':
            ordered = sorted(cards, key=card_latest_date, reverse=True)
        else:
            # Stable partition: Inflearn courses first, then other providers.
            inflearn_link = re.compile(r'\bhref\s*=\s*["\']https?://(?:www\.)?(?:inflearn\.com|inf\.run)(?:[/#?]|["\'])', re.I)
            ordered = sorted(cards, key=lambda card: not bool(inflearn_link.search(card)))
        pieces, cursor = [], 0
        for (start, end), card in zip(spans, ordered):
            pieces.extend([source[cursor:start], card])
            cursor = end
        source = ''.join(pieces) + source[cursor:]
    elif key == 'papers':
        spans = sorted(Blocks(source).cards)
        cards = [source[a:b] for a, b in spans]
        def publication_order(card):
            opening = card[:card.index('>') + 1]
            publication_type = re.search(r'\bdata-publication-type="([^"]+)"', opening)
            year = re.search(r'\bdata-publication-year="(\d{4})"', opening)
            if not publication_type or publication_type[1] not in {'published', 'preprint'} or not year:
                raise ValueError('Every paper needs its publication type and verified year')
            return publication_type[1] == 'preprint', -int(year[1])
        ordered = sorted(cards, key=publication_order)
        pieces, cursor = [], 0
        for (start, end), card in zip(spans, ordered):
            pieces.extend([source[cursor:start], card])
            cursor = end
        source = ''.join(pieces) + source[cursor:]
    source = re.sub(r'\b(src|href|poster)=(["\'])(?:\./)?src/', r'\1=\2/src/', source)
    source = re.sub(r'(<section\b[^>]*\bclass=")([^"]*)"', lambda m: m[1] + 'content-section ' + ' '.join(c for c in m[2].split() if c not in {'animated', 'bounceInDown'}) + '"', source, count=1)
    source = re.sub(r'<img\b(?![^>]*\bloading=)', '<img loading="lazy"', source)
    source = re.sub(r'<iframe\b(?![^>]*\bloading=)', '<iframe loading="lazy"', source)
    source = re.sub(r'<img\b(?![^>]*\bdecoding=)', '<img decoding="async"', source)
    return f'<div id="tab-{key}" class="tab-content-item active-tab-content">\n{source}\n</div>'


def path(page):
    return f"/{page['slug']}/" if page['slug'] else '/'


def validate_source_entities(sources):
    """Catch accidentally re-escaped content before publishing visible entity names."""
    for key, source in sources.items():
        match = NESTED_HTML_ENTITY.search(source)
        if match:
            line = source.count('\n', 0, match.start()) + 1
            raise ValueError(f'Nested HTML entity in content/sections/{key}.html:{line}: {match[0]}')


def navigation(page, pages):
    items = []
    for group, label, keys in GROUPS:
        first = pages[keys[0]]
        css = 'btn-contact' if group == 'contact' else 'nav-link' + (' active' if page['group'] == group else '')
        aria = ' aria-current="page"' if page['key'] == first['key'] else ''
        link = f'<a href="{path(first)}" class="{css} nav-main-link" data-nav-page="{first["key"]}"{aria}>{escape(label)}</a>'
        submenu_id = 'submenu-' + group
        toggle = (f'<button type="button" class="submenu-toggle" aria-controls="{submenu_id}"'
            f' aria-expanded="false" aria-label="{escape(label)} 하위 메뉴 펼치기" hidden>'
            '<span aria-hidden="true">⌄</span></button>')
        heading = f'<div class="nav-group-heading">{link}{toggle}</div>'
        if group == 'lectures':
            categories = [('lecture-list', '전체')] + [('lectures-' + slug, name) for slug, name in LECTURE_CATEGORIES]
            children = ''.join(
                f'<li><a href="{path(first)}#{target}" data-nav-page="lectures" data-lecture-category="{name}"'
                + (' aria-current="true"' if page['key'] == 'lectures' and name == '전체' else '')
                + f'>{name}</a></li>' for target, name in categories)
            items.append(f'<li class="nav-item" data-nav-group="{group}">{heading}<ul id="{submenu_id}" class="dropdown-menu" aria-label="강의 분류">{children}</ul></li>')
        elif len(keys) > 1:
            children = ''.join(f'<li><a href="{path(pages[k])}" data-nav-page="{k}"' + (' aria-current="page"' if page['key'] == k else '') + f'>{escape(pages[k]["label"])}</a></li>' for k in keys)
            items.append(f'<li class="nav-item" data-nav-group="{group}">{heading}<ul id="{submenu_id}" class="dropdown-menu">{children}</ul></li>')
        else:
            items.append(f'<li data-nav-group="{group}">{link}</li>')
    return '<nav class="navbar" aria-label="주 메뉴"><div class="navbar-brand"><a href="/" aria-label="반병현 홈"><img src="/src/images/logo.webp" alt="NaNa Lab" class="logo-img"></a></div><button class="menu-toggle" id="mobile-menu-btn" type="button" aria-controls="nav-links" aria-expanded="false" aria-label="메뉴 열기">☰</button><ul class="nav-links" id="nav-links">' + ''.join(items) + '</ul></nav>'


def related_nav(page, pages):
    siblings = [p for p in pages.values() if p['group'] == page['group']]
    if len(siblings) < 2:
        return ''
    return '<nav class="sub-nav-pills" aria-label="관련 페이지">' + ''.join(f'<a href="{path(p)}" class="pill-btn"' + (' aria-current="page"' if p['key'] == page['key'] else '') + f'>{escape(p["label"])}</a>' for p in siblings) + '</nav>'


def mobile_next_page(page, pages):
    """Continue through the same order as the visible navigation, without wrapping."""
    ordered = [pages[key] for _, _, keys in GROUPS for key in keys]
    index = next(i for i, item in enumerate(ordered) if item['key'] == page['key'])
    if index == len(ordered) - 1:
        return ''
    destination = ordered[index + 1]
    label = destination['label']
    if destination['group'] == 'courses':
        label = 'Courses · ' + label
    mobile_destination = pages['books'] if page['key'] == 'home' else None
    mobile_attrs = (f' data-mobile-href="{path(mobile_destination)}"'
        f' data-mobile-label="{escape(mobile_destination["label"], quote=True)}"'
        f' data-mobile-heading="{escape(mobile_destination["heading"], quote=True)}"') if mobile_destination else ''
    return ('<nav class="mobile-next-page" aria-label="다음 페이지">'
        f'<a class="mobile-next-link" id="mobile-next-link" rel="next" href="{path(destination)}"{mobile_attrs}>'
        '<span class="mobile-next-eyebrow">다음 페이지</span>'
        f'<strong><span class="next-page-label">{escape(label)}</span><span aria-hidden="true">↑</span></strong>'
        '<span class="mobile-next-description">' + escape(destination['heading']) + '</span>'
        '</a><p class="mobile-next-hint">위 버튼을 누르면 이동합니다.</p></nav>')


def home_hero(counts):
    courses_total = sum(count for key, count in counts.items() if key.startswith('courses-'))
    stats = [('books', 'Books', counts['books'], 'book'), ('papers', 'R&D', counts['papers'] + counts['patents'] + counts['websites'], 'flask'), ('lectures', 'Lectures', courses_total + counts['lectures'], 'chalkboard-teacher')]
    stats_html = '<span class="stat-divider"></span>'.join(f'<a href="/{key}/" class="stat-item"><i class="fas fa-{icon} stat-icon"></i><span class="stat-info"><span class="stat-label">{label}</span><span class="stat-value">{count}+</span></span></a>' for key, label, count, icon in stats)
    return '''<header class="hero"><div class="hero-content">
    <img src="/src/images/profile.webp" alt="반병현" class="profile-img" fetchpriority="high" width="320" height="320">
    <h1 class="hero-title">Byunghyun Ban</h1><p class="hero-subtitle">Researcher · Developer · Author</p>
    <div class="hero-socials"><a href="https://github.com/needleworm" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="GitHub"><i class="fab fa-github"></i></a><a href="https://www.youtube.com/channel/UCpV0ZdloVwvSjxHfnYYQPQg?sub_confirmation=1" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="YouTube"><i class="fab fa-youtube"></i></a><a href="https://brunch.co.kr/@needleworm" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Brunch"><i class="fas fa-pen-nib"></i></a><a href="https://www.inflearn.com/users/1040535/@bhban" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Inflearn"><i class="fas fa-chalkboard-teacher"></i></a></div>
    <div class="hero-buttons"><a href="/contact/" class="btn-hero btn-primary">강의/강연 문의</a></div>
    <div class="hero-stats-banner">''' + stats_html + '</div></div></header>'


def home_directory(pages, counts):
    items = [('books','저서','AI부터 업무 자동화까지, 책으로 만나는 이야기',counts['books']), ('lectures','강의·교육','기업·공공기관·교육기관의 강의와 출강 이력',counts['lectures']), ('media','방송·인터뷰','영상으로 만나는 AI와 기술 이야기',counts['media']), ('news','언론 보도','언론에 소개된 연구, 저서와 활동',counts['news']), ('papers','논문·연구','인공지능과 데이터, 기술을 탐구한 기록',counts['papers']), ('projects','개발 프로젝트','공개 소프트웨어와 직접 만든 웹 도구',counts['websites'])]
    return '<section class="section-group home-directory" aria-labelledby="directory-title"><div class="group-header"><h2 id="directory-title" class="group-title">Explore</h2><p class="group-desc">책과 강의, 연구와 개발</p></div><div class="grid-container">' + ''.join(f'<a class="singleWebsiteCard directory-card" href="{path(pages[key])}"><h3>{title}</h3><p>{desc}</p><span class="directory-link">전체 {count}건 보기 <span aria-hidden="true">→</span></span></a>' for key, title, desc, count in items) + '</div></section>'


def home_mobile_section(page, source):
    """Use the first content page in the mobile home flow, with no copy to sync."""
    subtitle = page.get('subtitle', page['heading'])
    return (f'<section class="section-group home-section-mobile" data-page="{page["key"]}" aria-labelledby="home-section-title">'
        f'<header class="group-header"><h2 id="home-section-title" class="group-title">{escape(page["label"])}</h2>'
        f'<p class="group-desc">{escape(subtitle)}</p></header>'
        + section_html(page['key'], source) + '</section>')


def build(check=False):
    config = json.loads((ROOT / 'content/site.json').read_text(encoding='utf8'))
    pages = {p['key']: p for p in config['pages']}
    slugs = [p['slug'] for p in pages.values()]
    if len(slugs) != len(set(slugs)) or any(slug and not re.fullmatch(r'[a-z0-9-]+(?:/[a-z0-9-]+)*', slug) for slug in slugs):
        raise ValueError('Page folders must be unique, safe relative paths')
    redirects = config.get('redirects', [])
    redirect_slugs = [entry['from'] for entry in redirects]
    if len(redirect_slugs) != len(set(redirect_slugs)) or any(not re.fullmatch(r'[a-z0-9-]+(?:/[a-z0-9-]+)*', slug) or slug in slugs for slug in redirect_slugs):
        raise ValueError('Redirect folders must be unique, safe paths distinct from content pages')
    if any(entry['to'] not in slugs for entry in redirects):
        raise ValueError('Redirect destinations must be real content pages')
    sources = {p.stem: p.read_text(encoding='utf8') for p in (ROOT / 'content/sections').glob('*.html')}
    validate_source_entities(sources)
    references = [key for p in pages.values() for key in p['sections']]
    if set(references) != set(sources) or len(references) != len(set(references)):
        raise ValueError('Every source section must appear on exactly one page')
    counts = {key: len(Blocks(source).cards) for key, source in sources.items()}
    views = source_views(sources)
    lecture_records = load_lecture_records([views['lectures'][a:b] for a, b in sorted(Blocks(views['lectures']).cards)])
    for key in ['lectures', 'courses-online', 'courses-offline']:
        views[key] = link_lecture_cards(views[key], lecture_records)
    paper_records = load_records([sources['papers'][a:b] for a, b in sorted(Blocks(sources['papers']).cards)])
    views['papers'] = link_card_titles(views['papers'], paper_records)
    view_counts = {key: len(Blocks(source).cards) for key, source in views.items()}
    layout = (ROOT / 'content/layout.html').read_text(encoding='utf8')
    asset_versions = {key: sha256((ROOT / name).read_text(encoding='utf8').encode('utf8')).hexdigest()[:12] for key, name in {
        'STYLE_CSS_VERSION': 'style.css', 'PAGE_CSS_VERSION': 'page.css', 'SCROLL_VERSION': 'continuous-scroll.js', 'SCRIPT_VERSION': 'script.js'
    }.items()}
    reader_version = sha256((ROOT / 'paper-reader.js').read_bytes()).hexdigest()[:12]
    manifest_path = ROOT / 'content/build-manifest.json'
    previous = json.loads(manifest_path.read_text(encoding='utf8')) if manifest_path.exists() else {}
    manifest, outputs = {}, {}
    person = {'@type':'Person','@id':config['url']+'/#person','name':'반병현','alternateName':'Byunghyun Ban','url':config['url']+'/','image':config['url']+'/src/images/profile.webp','jobTitle':'AI 엔지니어, 작가, 나나랩 대표','knowsAbout':['인공지능','생성형 AI','AI 에이전트','업무 자동화'],'sameAs':['https://github.com/needleworm','https://brunch.co.kr/@needleworm','https://www.inflearn.com/users/1040535/@bhban']}
    for page in pages.values():
        url = config['url'] + path(page)
        body = ''.join(section_html(key, views[key]) for key in page['sections'])
        wrapper = {'media':'media-section','lectures':'lectures-section','courses':'courses-section','research':'rnd-section','activities':'etc-section'}.get(page['group'])
        if wrapper:
            body = f'<div id="{wrapper}">{body}</div>'
        if page['key'] == 'home':
            body = ('<div class="section-group"><header class="group-header"><h2 class="group-title">About</h2></header>'
                + body + '</div>' + home_directory(pages, view_counts) + home_mobile_section(pages['media'], views['media']))
            hero = home_hero(counts)
            page_header = ''
        else:
            hero = ''
            subtitle = page.get('subtitle', page['heading'])
            page_header = f'<header class="group-header"><h1 class="group-title">{escape(page.get("page_label", page["label"]))}</h1><p class="group-desc">{escape(subtitle)}</p>{related_nav(page,pages)}</header>'
        schema = {'@type':'ProfilePage' if page['key']=='home' else 'WebPage','@id':url+'#page','url':url,'name':page['title'],'description':page['description'],'inLanguage':'ko-KR','about':{'@id':person['@id']},'isPartOf':{'@id':config['url']+'/#website'}}
        if page['key'] == 'home':
            schema['mainEntity'] = {'@id':person['@id']}
        elif page['key'] == 'papers':
            schema['@type'] = 'CollectionPage'
            schema['mainEntity'] = {'@type': 'ItemList', 'itemListElement': [
                {'@type': 'ListItem', 'position': index + 1, 'name': record['title'], 'url': config['url'] + record['path']}
                for index, record in enumerate(paper_records.values())]}
        schemas = [person, {'@type':'WebSite','@id':config['url']+'/#website','url':config['url']+'/','name':'반병현','inLanguage':'ko-KR'}, schema]
        if page['key'] != 'home':
            crumbs = [{'@type':'ListItem','position':1,'name':'Home','item':config['url']+'/'}]
            if page['group'] == 'courses':
                crumbs.append({'@type':'ListItem','position':2,'name':'Courses','item':config['url']+'/courses/'})
            crumbs.append({'@type':'ListItem','position':len(crumbs)+1,'name':page['heading'],'item':url})
            schemas.append({'@type':'BreadcrumbList','itemListElement':crumbs})
        libraries = '<script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>' if page['key']=='projects' else '<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js" defer></script>' if page['key']=='contact' else ''
        values = {
            **asset_versions,
            'TITLE': escape(page['title']),
            'LANG': 'ko', 'EXTRA_HEAD': '', 'OG_TYPE': 'website', 'OG_LOCALE': 'ko_KR',
            'OG_IMAGE': 'https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io@9a7f553312705d9178fbdb73676d681727aa85ac/src/images/bookcovers.webp',
            'DESCRIPTION': escape(page['description'], quote=True),
            'URL': url,
            'STRUCTURED_DATA': json.dumps({'@context':'https://schema.org','@graph':schemas}, ensure_ascii=False).replace('<', '\\u003c'),
            'LIBRARIES': libraries,
            'BODY_CLASS': 'home-page' if page['key']=='home' else 'content-page',
            'PAGE_KEY': page['key'],
            'NAVIGATION': navigation(page, pages),
            'HERO': hero,
            'MAIN': body,
            'FOOTER_LINKS': ''.join(f'<a href="{path(p)}">{escape(p["heading"])}</a>' for p in pages.values()),
            'MOBILE_NEXT_PAGE': mobile_next_page(page, pages),
        }
        values.update(PAGE_HEADER=page_header, MAIN_CLASS='' if page['key']=='home' else 'section-group')
        output = layout
        for key, value in values.items():
            output = output.replace('{{'+key+'}}', value)
        if re.search(r'\{\{[A-Z_]+\}\}', output):
            raise ValueError('Unresolved layout variable')
        output = '\n'.join(line.rstrip() for line in output.splitlines()) + '\n'
        target = f"{page['slug']}/index.html" if page['slug'] else 'index.html'
        outputs[target] = output
        digest = sha256(output.encode('utf8')).hexdigest()
        lastmod = previous.get(target,{}).get('lastmod',date.today().isoformat()) if previous.get(target,{}).get('sha256') == digest else date.today().isoformat()
        display_sections = page['sections'] + (['media'] if page['key'] == 'home' else [])
        manifest[target] = {'sha256':digest,'lastmod':lastmod,'sections':display_sections,'cards':sum(view_counts[k] for k in display_sections)}
    for record in paper_records.values():
        url = config['url'] + record['path']
        description = record['abstract'] if len(record['abstract']) <= 180 else record['abstract'][:177].rstrip() + '…'
        page = {'key': 'paper-detail', 'group': 'research'}
        article = article_schema(record, config['url'])
        schema = {'@type': 'WebPage', '@id': url + '#page', 'url': url, 'name': record['title'],
                  'description': description, 'inLanguage': record['language'],
                  'mainEntity': {'@id': article['@id']}, 'isPartOf': {'@id': config['url'] + '/#website'}}
        schemas = [person, {'@type': 'WebSite', '@id': config['url'] + '/#website', 'url': config['url'] + '/', 'name': '반병현'},
                   schema, article, {'@type': 'BreadcrumbList', 'itemListElement': [
                       {'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': config['url'] + '/'},
                       {'@type': 'ListItem', 'position': 2, 'name': 'Papers', 'item': config['url'] + '/papers/'},
                       {'@type': 'ListItem', 'position': 3, 'name': record['title'], 'item': url}]}]
        image = re.search(r'<img\b[^>]*\bsrc="([^"]+)"', record['card'])[1]
        image = config['url'] + '/' + image.removeprefix('./') if image.startswith('./') else image
        values = {**asset_versions, 'TITLE': escape(record['title'] + ' | Byunghyun Ban'),
                  'DESCRIPTION': escape(description, quote=True), 'URL': url, 'LANG': record['language'],
                  'EXTRA_HEAD': scholar_meta(record, config['url']), 'OG_TYPE': 'article',
                  'OG_LOCALE': 'ko_KR' if record['language'] == 'ko' else 'en_US', 'OG_IMAGE': image,
                  'STRUCTURED_DATA': json.dumps({'@context': 'https://schema.org', '@graph': schemas}, ensure_ascii=False).replace('<', '\\u003c'),
                  'LIBRARIES': '<script src="/paper-reader.js?v=' + reader_version + '" defer></script>', 'BODY_CLASS': 'content-page paper-detail-page', 'PAGE_KEY': 'paper-detail',
                  'NAVIGATION': navigation(page, pages), 'HERO': '', 'PAGE_HEADER': '',
                  'MAIN_CLASS': '', 'MAIN': render_article(record), 'MOBILE_NEXT_PAGE': '',
                  'FOOTER_LINKS': ''.join(f'<a href="{path(p)}">{escape(p["heading"])}</a>' for p in pages.values())}
        output = layout
        for key, value in values.items():
            output = output.replace('{{' + key + '}}', value)
        if re.search(r'\{\{[A-Z_]+\}\}', output):
            raise ValueError('Unresolved paper layout variable')
        output = '\n'.join(line.rstrip() for line in output.splitlines()) + '\n'
        target = record['path'].strip('/') + '/index.html'
        outputs[target] = output
        digest = sha256(output.encode('utf8')).hexdigest()
        lastmod = previous.get(target, {}).get('lastmod', date.today().isoformat()) if previous.get(target, {}).get('sha256') == digest else date.today().isoformat()
        manifest[target] = {'sha256': digest, 'lastmod': lastmod, 'sections': ['papers'], 'cards': 0, 'paper_id': record['record_id']}
    outputs.update(pdf_outputs(paper_records))
    outputs.update(citation_outputs(paper_records))
    for record in lecture_records.values():
        url = config['url'] + record['path']
        description = record['abstract'] or record['title']
        page = {'key': 'lecture-detail', 'group': 'lectures'}
        schema = {'@type': 'WebPage', '@id': url + '#page', 'url': url, 'name': record['title'],
                  'description': description, 'inLanguage': 'ko-KR',
                  'about': {'@id': person['@id']}, 'isPartOf': {'@id': config['url'] + '/#website'}}
        schemas = [person, {'@type': 'WebSite', '@id': config['url'] + '/#website', 'url': config['url'] + '/', 'name': '반병현'},
                   schema, {'@type': 'BreadcrumbList', 'itemListElement': [
                       {'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': config['url'] + '/'},
                       {'@type': 'ListItem', 'position': 2, 'name': 'Lectures', 'item': config['url'] + '/lectures/'},
                       {'@type': 'ListItem', 'position': 3, 'name': record['title'], 'item': url}]}]
        image = record['image']
        image = config['url'] + '/' + image.removeprefix('./') if image.startswith(('./', 'src/')) else image
        values = {**asset_versions, 'TITLE': escape(record['title'] + ' | 반병현'),
                  'DESCRIPTION': escape(description, quote=True), 'URL': url, 'LANG': 'ko',
                  'EXTRA_HEAD': '', 'OG_TYPE': 'article', 'OG_LOCALE': 'ko_KR', 'OG_IMAGE': image,
                  'STRUCTURED_DATA': json.dumps({'@context': 'https://schema.org', '@graph': schemas}, ensure_ascii=False).replace('<', '\\u003c'),
                  'LIBRARIES': '', 'BODY_CLASS': 'content-page lecture-detail-page', 'PAGE_KEY': 'lecture-detail',
                  'NAVIGATION': navigation(page, pages), 'HERO': '', 'PAGE_HEADER': '',
                  'MAIN_CLASS': '', 'MAIN': render_lecture(record), 'MOBILE_NEXT_PAGE': '',
                  'FOOTER_LINKS': ''.join(f'<a href="{path(p)}">{escape(p["heading"])}</a>' for p in pages.values())}
        output = layout
        for key, value in values.items():
            output = output.replace('{{' + key + '}}', value)
        if re.search(r'\{\{[A-Z_]+\}\}', output):
            raise ValueError('Unresolved lecture layout variable')
        output = '\n'.join(line.rstrip() for line in output.splitlines()) + '\n'
        target = record['path'].strip('/') + '/index.html'
        outputs[target] = output
        digest = sha256(output.encode('utf8')).hexdigest()
        lastmod = previous.get(target, {}).get('lastmod', date.today().isoformat()) if previous.get(target, {}).get('sha256') == digest else date.today().isoformat()
        manifest[target] = {'sha256': digest, 'lastmod': lastmod, 'sections': ['lectures'], 'cards': 0, 'lecture_id': record['record_id']}
    outputs.update(generate_feeds(config['url'],
        [sources['books'][a:b] for a, b in sorted(Blocks(sources['books']).cards)],
        [sources['news'][a:b] for a, b in sorted(Blocks(sources['news']).cards)],
        lecture_records, paper_records))
    for entry in redirects:
        destination = next(p for p in pages.values() if p['slug'] == entry['to'])
        destination_path = path(destination)
        siblings = [p for p in pages.values() if p['group'] == destination['group']]
        links = ''.join(f'<a class="pill-btn" href="{path(p)}">{escape(p["label"])}</a>' for p in siblings)
        outputs[entry['from']+'/index.html'] = ('<!DOCTYPE html>\n<html lang="ko"><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width, initial-scale=1"><title>Courses | 반병현</title>'
            f'<link rel="canonical" href="{config["url"]+destination_path}">'
            f'<meta http-equiv="refresh" content="0; url={destination_path}">'
            '<meta name="robots" content="noindex, follow"><link rel="stylesheet" href="/style.css">'
            '<link rel="stylesheet" href="/page.css"></head><body class="static-site content-page">'
            '<main class="container section-group"><header class="group-header"><h1 class="group-title">Courses</h1>'
            '<p class="group-desc">온라인 강좌와 오프라인 교육과정</p>'
            f'<nav class="sub-nav-pills" aria-label="교육과정">{links}</nav></header></main></body></html>\n')
    ns = 'http://www.sitemaps.org/schemas/sitemap/0.9'
    ET.register_namespace('',ns)
    sitemap = ET.Element('{'+ns+'}urlset')
    current_urls = set()
    for page in pages.values():
        url = config['url']+path(page)
        current_urls.add(url)
        node = ET.SubElement(sitemap,'{'+ns+'}url')
        ET.SubElement(node,'{'+ns+'}loc').text = url
        target = f"{page['slug']}/index.html" if page['slug'] else 'index.html'
        ET.SubElement(node,'{'+ns+'}lastmod').text = manifest[target]['lastmod']
    for record in paper_records.values():
        url = config['url'] + record['path']
        current_urls.add(url)
        node = ET.SubElement(sitemap, '{' + ns + '}url')
        ET.SubElement(node, '{' + ns + '}loc').text = url
        ET.SubElement(node, '{' + ns + '}lastmod').text = manifest[record['path'].strip('/') + '/index.html']['lastmod']
    for record in lecture_records.values():
        url = config['url'] + record['path']
        current_urls.add(url)
        node = ET.SubElement(sitemap, '{' + ns + '}url')
        ET.SubElement(node, '{' + ns + '}loc').text = url
        ET.SubElement(node, '{' + ns + '}lastmod').text = manifest[record['path'].strip('/') + '/index.html']['lastmod']
    for node in ET.parse(ROOT/'content/project-sitemap.xml').getroot():
        loc = node.find('{'+ns+'}loc')
        if loc is not None and loc.text not in current_urls:
            sitemap.append(node)
    ET.indent(sitemap,space='  ')
    outputs['sitemap.xml'] = '<?xml version="1.0" encoding="UTF-8"?>\n'+ET.tostring(sitemap,encoding='unicode')+'\n'
    outputs['content/build-manifest.json'] = json.dumps(manifest,ensure_ascii=False,indent=2)+'\n'
    stale = []
    for name, output in outputs.items():
        target = ROOT/name
        current = target.read_bytes() if target.exists() and isinstance(output, bytes) else target.read_text(encoding='utf8') if target.exists() else None
        if current != output:
            stale.append(name)
            if not check:
                target.parent.mkdir(parents=True,exist_ok=True)
                if isinstance(output, bytes):
                    target.write_bytes(output)
                else:
                    target.write_text(output,encoding='utf8',newline='\n')
    print(json.dumps({'pages':len(pages),'paper_pages':len(paper_records),'lecture_pages':len(lecture_records),'source_cards':counts,'display_cards':view_counts,'changed':stale,'check':check},ensure_ascii=False))
    return bool(check and stale)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check',action='store_true',help='Fail when generated HTML is stale; write nothing')
    sys.exit(build(parser.parse_args().check))
