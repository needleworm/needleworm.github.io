"""Deterministic static translations; original scholarly text remains untouched."""
from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date
from hashlib import sha256
from html import escape, unescape
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import unquote, urljoin, urlsplit, urlunsplit

SITE_ROOT = Path(__file__).resolve().parents[1]

LOCALES = {
    'en': ('English', 'en_US'), 'zh': ('简体中文', 'zh_CN'),
    'hi': ('हिन्दी', 'hi_IN'), 'es': ('Español', 'es_ES'),
    'ar': ('العربية', 'ar_AR'), 'fr': ('Français', 'fr_FR'),
    'bn': ('বাংলা', 'bn_BD'), 'pt': ('Português', 'pt_BR'),
}
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
INLINE = set('a abbr b bdi bdo br cite code del em i img ins kbd mark q s samp small span strong sub sup time u var wbr'.split())
PHRASES = set('p h1 h2 h3 h4 h5 h6 li td th label button a span summary figcaption dt dd title'.split())
SKIP_TAGS = {'script', 'style', 'textarea', 'pre', 'code', 'svg', 'math'}
PROTECTED_CLASSES = {'paper-fulltext', 'paper-alternative-title', 'paper-authors', 'paper-venue', 'paper-detail-link'}
TEXT_ATTRS = {'alt', 'title', 'aria-label', 'placeholder'}
RUNTIME_SOURCE = {
    'menuOpen': '메뉴 열기', 'menuClose': '메뉴 닫기',
    'submenuExpand': '{label} 하위 메뉴 펼치기', 'submenuCollapse': '{label} 하위 메뉴 접기',
    'nextSwipeHint': '끝까지 내려온 뒤 한 번 더 위로 밀면 이동합니다.',
    'nextScrollHint': '끝까지 내려온 뒤 한 번 더 아래로 스크롤하면 이동합니다.',
    'lectureResults': '{category} {count}건 · 최신 강의순',
    'categoryAll': '전체', 'categoryCompany': '기업', 'categoryPublic': '공공기관',
    'categoryEducation': '교육기관', 'categoryResearch': '연구기관', 'categoryConference': '컨퍼런스',
    'listMedia': '영상', 'listNews': '언론 보도', 'listLectures': '강의',
    'listCoursesOnline': '온라인 강좌', 'listCoursesOffline': '오프라인 교육과정',
    'listPapers': '논문', 'listPatents': '특허', 'listProjects': '프로젝트',
    'listActivities': '활동', 'listMemberships': '회원 활동', 'listCollections': '소장품',
    'listDonations': '기부 내역', 'listGeneric': '목록',
    'listStatus': '{total}건 중 {visible}건 표시', 'listMore': '{label} 더 보기 ({remaining}건 남음)',
    'citationCopyLabel': '인용 정보 복사', 'citationCopied': '인용 정보를 복사했습니다.',
    'citationError': '인용 정보를 복사하지 못했습니다. 브라우저의 클립보드 설정을 확인해 주세요.',
    'contactLoadError': '문의 전송 기능을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.',
    'contactSent': '문의가 접수되었습니다.', 'contactError': '오류가 발생했습니다. 다시 시도해주세요.',
    'contactSending': 'Sending...', 'streamRetry': '다시 불러오기',
    'streamError': '다음 내용을 불러오지 못했습니다. 다시 시도하거나 위 링크로 이동해 주세요.',
    'streamLoading': '{label} 내용을 이어 불러오는 중입니다.',
}


def normalize(text):
    return re.sub(r'\s+', ' ', text).strip()


def string_id(text):
    return sha256(text.encode('utf8')).hexdigest()[:20]


def translatable(text):
    return bool(re.search(r'[A-Za-z\uAC00-\uD7AF\u4E00-\u9FFF]', text)) and not re.fullmatch(r'(?:https?://|mailto:).*', text)


@dataclass
class Node:
    tag: str
    attrs: dict
    start: int
    content_start: int
    end: int = 0
    content_end: int = 0
    children: list = field(default_factory=list)
    parent: object = None


class Tree(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=False)
        self.source = source
        self.lines = [0] + [m.end() for m in re.finditer('\n', source)]
        self.root = Node('root', {}, 0, 0, len(source), len(source))
        self.stack = [self.root]
        self.nodes = []
        self.text_nodes = []
        self.feed(source)

    def source_offset(self):
        row, column = self.getpos()
        return self.lines[row - 1] + column

    def handle_starttag(self, tag, attrs):
        start = self.source_offset()
        end = start + len(self.get_starttag_text())
        node = Node(tag, dict(attrs), start, end, end, end, parent=self.stack[-1])
        self.stack[-1].children.append(node)
        self.nodes.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.stack.pop()

    def handle_endtag(self, tag):
        start = self.source_offset()
        end = self.source.index('>', start) + 1
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                for node in self.stack[index:]:
                    node.content_end, node.end = start, end
                del self.stack[index:]
                break

    def handle_data(self, data):
        start = self.source_offset()
        self.text_nodes.append((start, start + len(data), data, self.stack[-1]))


def ancestors(node):
    while node is not None:
        yield node
        node = node.parent


def protected(node, paper_page=False):
    is_research = paper_page or any(p.attrs.get('data-publication-type') or p.attrs.get('id') == 'tab-papers' for p in ancestors(node))
    for parent in ancestors(node):
        classes = set((parent.attrs.get('class') or '').split())
        if parent.tag in SKIP_TAGS or classes & PROTECTED_CLASSES or parent.attrs.get('id') == 'paper-title':
            return True
        if is_research and 'abstract' in classes:
            return True
        if parent.attrs.get('class') == 'paper-toc' and node.tag != 'summary':
            return True
        # Bibliographic authors, journal names and identifiers stay as published.
        if 'bookDescription' in classes and any(p.attrs.get('data-publication-type') for p in ancestors(parent)):
            return True
        if paper_page and parent.tag == 'head' and (node.tag == 'title' or node.tag == 'meta'):
            return True
    return False


def phrase_possible(node):
    return all(child.tag in INLINE and phrase_possible(child) for child in node.children)


def text_units(source, paper_page=False):
    """Yield nonoverlapping text/attribute spans; inline markup uses {{N}} tokens."""
    tree = Tree(source)
    occupied = []
    units = []
    for node in tree.nodes:
        if protected(node, paper_page):
            continue
        has_protected_child = any(protected(child, paper_page) for child in node.children)
        if node.tag in PHRASES and phrase_possible(node) and not has_protected_child and node.content_end > node.content_start:
            if any(a <= node.content_start < b for a, b in occupied):
                continue
            raw = source[node.content_start:node.content_end]
            tags = []
            def token(match):
                tags.append(match[0])
                return '{{' + str(len(tags) - 1) + '}}'
            text = normalize(unescape(re.sub(r'<[^>]+>', token, raw)))
            if translatable(re.sub(r'\{\{\d+\}\}', '', text)):
                units.append((node.content_start, node.content_end, text, tags, False))
                occupied.append((node.content_start, node.content_end))
        start_tag = source[node.start:node.content_start]
        for match in re.finditer(r'\b([\w:-]+)\s*=\s*([\"\'])(.*?)\2', start_tag, re.S):
            name, value = match[1], unescape(match[3])
            is_meta = node.tag == 'meta' and name == 'content' and (node.attrs.get('name') in {'description', 'author'} or node.attrs.get('property') in {'og:title', 'og:description', 'og:site_name'})
            if (name in TEXT_ATTRS or is_meta) and translatable(value):
                units.append((node.start + match.start(3), node.start + match.end(3), normalize(value), [], True))
    for start, end, value, parent in tree.text_nodes:
        text = normalize(value)
        if translatable(text) and not protected(parent, paper_page) and not any(a <= start < b for a, b in occupied):
            units.append((start, end, text, [], False))
    return units


def source_catalog(outputs, manifest):
    strings = {}
    for target, entry in manifest.items():
        for _, _, text, _, _ in text_units(outputs[target], bool(entry.get('paper_id'))):
            strings[string_id(text)] = text
    runtime_path = Path(__file__).resolve().parents[1] / 'content/locales/runtime-source.json'
    runtime = json.loads(runtime_path.read_text(encoding='utf8')) if runtime_path.exists() else RUNTIME_SOURCE
    for text in runtime.values():
        strings[string_id(text)] = text
    strings[string_id('언어 선택')] = '언어 선택'
    strings[string_id('한국어')] = '한국어'
    return {'version': 1, 'contract': 'Values are source text. Preserve every {{N}} inline-markup token and {named} runtime token exactly, in the same order. Do not insert HTML. Original research is excluded.',
            'languages': list(LOCALES), 'strings': dict(sorted(strings.items())), 'runtime': runtime}


def prepare_catalog(root, outputs, manifest):
    catalog = source_catalog(outputs, manifest)
    path = root / 'content/locales/source.json'
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
    return catalog


def route(target):
    return '/' + target[:-10] if target.endswith('index.html') else '/' + target


def locale_route(base_route, locale):
    return base_route if locale == 'ko' else '/' + locale + base_route


def alternates(base_route, base_url):
    return [('ko', base_url + base_route)] + [(code, base_url + locale_route(base_route, code)) for code in LOCALES] + [('x-default', base_url + base_route)]


def validate_translation(source, translated, context):
    if not isinstance(translated, str) or not translated.strip():
        raise ValueError(f'Empty translation: {context}')
    tokens = r'\{\{\d+\}\}|\{[A-Za-z_][A-Za-z_0-9]*\}'
    if re.findall(tokens, source) != re.findall(tokens, translated):
        raise ValueError(f'Translation placeholder mismatch: {context}')
    if re.search(r'<\s*[/!A-Za-z]', translated):
        raise ValueError(f'HTML is not allowed in translation values: {context}')


def translate(source, translations):
    key = string_id(normalize(source))
    return translations.get(key, source)


def translate_tag(tag, translations):
    """Translate attributes inside a protected inline-markup token."""
    def replace(match):
        if match[1] not in TEXT_ATTRS | {'data-mobile-label', 'data-mobile-heading'}:
            return match[0]
        value = translate(unescape(match[3]), translations)
        return match[1] + '=' + match[2] + escape(value, quote=True) + match[2]
    return re.sub(r'\b([\w:-]+)\s*=\s*([\"\'])(.*?)\2', replace, tag, flags=re.S)


def apply_translation(source, translations, paper_page):
    units = text_units(source, paper_page)
    phrases = [(start, end) for start, end, _, _, attr in units if not attr]
    edits = []
    for start, end, text, tags, attr in units:
        if attr and any(a <= start < b for a, b in phrases):
            continue
        translated = translations[string_id(text)]
        rendered = escape(translated, quote=attr)
        for index, tag in enumerate(tags):
            rendered = rendered.replace('{{' + str(index) + '}}', translate_tag(tag, translations))
        original = source[start:end]
        if not attr:
            # Keep boundary whitespace when a bare text node sits beside inline markup.
            rendered = re.match(r'^\s*', original)[0] + rendered + re.search(r'\s*$', original)[0]
        edits.append((start, end, rendered))
    for start, end, replacement in sorted(edits, reverse=True):
        source = source[:start] + replacement + source[end:]
    # These presentation-only data attributes are consumed by mobile navigation.
    source = re.sub(r'\b(data-mobile-label|data-mobile-heading)=([\"\'])(.*?)\2',
                    lambda m: m[1] + '=' + m[2] + escape(translate(unescape(m[3]), translations), quote=True) + m[2], source)
    return source


def localized_url(value, base_route, locale, known_routes, base_url):
    if not value or value.startswith(('#', 'mailto:', 'tel:', 'data:', 'javascript:')):
        return value
    parsed = urlsplit(value)
    origin = urlsplit(base_url)
    if parsed.scheme and parsed.scheme not in {'http', 'https'}:
        return value
    if parsed.netloc and parsed.netloc != origin.netloc:
        return value
    absolute = urlsplit(urljoin(base_url + base_route, value))
    path = absolute.path
    if path in known_routes:
        path = locale_route(path, locale)
    elif path.endswith('/index.html') and path[:-10] in known_routes:
        path = locale_route(path[:-10], locale)
    elif not parsed.scheme and not parsed.netloc and not parsed.path.startswith('/'):
        # Original research may contain imperfect imported hrefs (for example
        # mathematical "t"/"t-1" references). Preserve those byte-for-byte rather
        # than making them look like deliberate site routes. Valid relative
        # resources must still resolve against the original, untranslated page.
        try:
            resource = (SITE_ROOT / unquote(path.lstrip('/'))).resolve()
            existing = resource.is_relative_to(SITE_ROOT) and (
                resource.is_file() or (resource / 'index.html').is_file())
        except (OSError, ValueError):
            existing = False
        if not existing:
            return value
    # Root-relative non-page resources are shared; no duplicate PDF/image copies.
    return urlunsplit((absolute.scheme if parsed.netloc else '', absolute.netloc if parsed.netloc else '', path, absolute.query, absolute.fragment))


def rewrite_urls(source, base_route, locale, known_routes, base_url):
    def replace(match):
        original = unescape(match[3])
        value = localized_url(original, base_route, locale, known_routes, base_url)
        if value == original:
            return match[0]
        return match[1] + '=' + match[2] + escape(value, quote=True) + match[2]
    return re.sub(r'\b(href|src|poster|action|data-mobile-href)=([\"\'])(.*?)\2', replace, source, flags=re.S)


def language_switcher(base_route, locale, translations):
    label = translate('언어 선택', translations)
    languages = [('ko', '한국어')] + [(code, settings[0]) for code, settings in LOCALES.items()]
    current = dict(languages)[locale]
    links = ''.join('<a href="' + locale_route(base_route, code) + '" hreflang="' + code + '" lang="' + code + '"'
                    + (' aria-current="true"' if code == locale else '') + (' dir="rtl"' if code == 'ar' else '') + '>' + name + '</a>' for code, name in languages)
    return '<details class="language-switcher"><summary aria-label="' + escape(label, quote=True) + '"><span aria-hidden="true">🌐</span> <span>' + current + '</span></summary><nav class="language-options" aria-label="' + escape(label, quote=True) + '">' + links + '</nav></details>'


def enhance_page(source, base_route, locale, translations, runtime, base_url):
    source = re.sub(r'<html\b[^>]*>', '<html lang="' + locale + '"' + (' dir="rtl"' if locale == 'ar' else '') + '>', source, count=1)
    source = re.sub(r'<body\b', '<body data-locale="' + locale + '"', source, count=1)
    canonical = base_url + locale_route(base_route, locale)
    source = re.sub(r'(<link rel="canonical" href=")[^"]+(">)', lambda m: m[1] + canonical + m[2], source)
    source = re.sub(r'(<meta property="og:url" content=")[^"]+(">)', lambda m: m[1] + canonical + m[2], source)
    source = re.sub(r'(<meta property="og:locale" content=")[^"]+(">)', lambda m: m[1] + ('ko_KR' if locale == 'ko' else LOCALES[locale][1]) + m[2], source)
    alternate_html = '\n'.join('    <link rel="alternate" hreflang="' + code + '" href="' + url + '">' for code, url in alternates(base_route, base_url))
    data = json.dumps(runtime, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c')
    source = source.replace('</head>', alternate_html + '\n    <script id="site-i18n" type="application/json">' + data + '</script>\n</head>', 1)
    # Place switcher between menu links and the hamburger without changing menu IDs.
    navbar = re.search(r'<nav class="navbar".*?</nav>', source, re.S)
    if navbar:
        markup = navbar[0]
        button = re.search(r'<button\b[^>]*\bid="mobile-menu-btn"[^>]*>.*?</button>', markup, re.S)
        if button:
            markup = markup[:button.start()] + markup[button.end():]
        markup = markup[:-6] + language_switcher(base_route, locale, translations) + (button[0] if button else '') + '</nav>'
        source = source[:navbar.start()] + markup + source[navbar.end():]
    return source


def rewrite_schema(source, locale, translations, base_route, known_routes, base_url):
    """Localize page navigation metadata while retaining scholarly bibliographic data."""
    title_match = re.search(r'<title>(.*?)</title>', source, re.S)
    desc_match = re.search(r'<meta name="description" content="([^"]*)"', source)
    title = unescape(title_match[1]) if title_match else ''
    description = unescape(desc_match[1]) if desc_match else ''
    def visit(value):
        if isinstance(value, list):
            return [visit(item) for item in value]
        if not isinstance(value, dict):
            return value
        if value.get('@type') in {'ScholarlyArticle', 'Thesis', 'Person'}:
            return value
        result = {}
        for key, item in value.items():
            if isinstance(item, (dict, list)):
                result[key] = visit(item)
            elif isinstance(item, str) and key in {'url', '@id', 'item'}:
                result[key] = item if item.endswith(('#person', '#article')) else localized_url(item, base_route, locale, known_routes, base_url)
            elif isinstance(item, str) and key in {'name', 'description', 'jobTitle'}:
                result[key] = translate(item, translations)
            else:
                result[key] = item
        if value.get('@type') in {'WebPage', 'ProfilePage', 'CollectionPage'}:
            result.update(name=title, description=description, inLanguage=locale)
        elif value.get('@type') == 'WebSite':
            result['inLanguage'] = locale
        return result
    def replace(match):
        data = visit(json.loads(match[1]))
        return '<script type="application/ld+json">' + json.dumps(data, ensure_ascii=False).replace('<', '\\u003c') + '</script>'
    return re.sub(r'<script type="application/ld\+json">(.*?)</script>', replace, source, flags=re.S)


def localize_outputs(root, outputs, manifest, previous, base_url, redirect_targets):
    catalog = json.loads((root / 'content/locales/source.json').read_text(encoding='utf8'))
    required = source_catalog(outputs, manifest)
    missing_source = set(required['strings']) - set(catalog['strings'])
    if missing_source:
        raise ValueError('Localization catalog is stale; run --prepare-locales and translate new strings: ' + ', '.join(sorted(missing_source)[:8]))
    base_manifest = dict(manifest)
    base_outputs = {target: outputs[target] for target in base_manifest}
    known_routes = {route(target) for target in base_manifest} | {route(target) for target in redirect_targets}
    translations = {'ko': catalog['strings']}
    runtimes = {'ko': required['runtime']}
    for locale in LOCALES:
        data = json.loads((root / f'content/locales/{locale}.json').read_text(encoding='utf8'))
        strings = data['strings']
        missing = set(required['strings']) - set(strings)
        if missing:
            raise ValueError(f'Missing {locale} translations ({len(missing)}): ' + ', '.join(sorted(missing)[:8]))
        for key, original in required['strings'].items():
            validate_translation(original, strings[key], locale + '/' + key)
        translations[locale] = strings
        runtime = {key: data.get('runtime', {}).get(key, strings[string_id(text)]) for key, text in required['runtime'].items()}
        for key, original in required['runtime'].items():
            validate_translation(original, runtime[key], locale + '/runtime/' + key)
        runtimes[locale] = runtime
    for target, entry in base_manifest.items():
        base_path = route(target)
        for locale in ['ko', *LOCALES]:
            html = base_outputs[target]
            if locale != 'ko':
                html = apply_translation(html, translations[locale], bool(entry.get('paper_id')))
                html = rewrite_urls(html, base_path, locale, known_routes, base_url)
                html = rewrite_schema(html, locale, translations[locale], base_path, known_routes, base_url)
            html = enhance_page(html, base_path, locale, translations[locale], runtimes[locale], base_url)
            output_target = target if locale == 'ko' else locale + '/' + target
            outputs[output_target] = html
            digest = sha256(html.encode('utf8')).hexdigest()
            old = previous.get(output_target, {})
            lastmod = old.get('lastmod', date.today().isoformat()) if old.get('sha256') == digest else date.today().isoformat()
            manifest[output_target] = {**entry, 'sha256': digest, 'lastmod': lastmod, 'locale': locale, 'source': target}
    for target in redirect_targets:
        base_html = outputs[target]
        for locale in LOCALES:
            # Redirects are intentionally not indexed or listed in sitemap.
            html = rewrite_urls(base_html, route(target), locale, known_routes, base_url)
            html = html.replace('<html lang="ko">', '<html lang="' + locale + '"' + (' dir="rtl"' if locale == 'ar' else '') + '>')
            html = re.sub(r'(http-equiv="refresh" content="0; url=)([^"]+)', lambda m: m[1] + localized_url(m[2], route(target), locale, known_routes, base_url), html)
            # Reuse the localized destination title and description rather than expose Korean redirect copy.
            destination = re.search(r'<meta http-equiv="refresh" content="0; url=([^"]+)"', html)[1]
            label = translate('Courses', translations[locale])
            html = re.sub(r'<title>.*?</title>', '<title>' + escape(label) + '</title>', html)
            html = re.sub(r'<main\b.*?</main>', '<main class="container section-group"><a href="' + destination + '">' + escape(label) + '</a></main>', html, flags=re.S)
            outputs[locale + '/' + target] = html
    return len(base_manifest) * len(LOCALES)


if __name__ == '__main__':
    raise SystemExit('Use python scripts/build_site.py --prepare-locales to refresh from original source content.')

