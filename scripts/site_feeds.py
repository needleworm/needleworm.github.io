"""Build public, static catalogs and subscription feeds from published cards."""
from hashlib import sha256
from html import escape
import json
from pathlib import PurePosixPath
import re
from urllib.parse import urljoin, urlsplit
import xml.etree.ElementTree as ET

from lecture_pages import Elements, has_class, inside, plain

LABELS = {'lectures': '강의', 'books': '저서', 'papers': '논문', 'news': '언론 보도'}


def absolute(base, value):
    """Only publish ordinary web destinations already present in the source."""
    url = urljoin(base + '/', value)
    return url if urlsplit(url).scheme in {'http', 'https'} else ''


def text_field(card, elements, class_name):
    return ' '.join(plain(inside(card, e)) for e in elements if has_class(e, class_name))


def links(card, base):
    result, seen = [], set()
    elements = Elements(card).elements
    for e in elements:
        if e['tag'] != 'a' or not e['attrs'].get('href'):
            continue
        href = absolute(base, e['attrs']['href'])
        if not href or href in seen:
            continue
        seen.add(href)
        label = plain(inside(card, e)) or e['attrs'].get('aria-label') or e['attrs'].get('title')
        if not label:
            image = next((i for i in elements if i['tag'] == 'img' and e['start'] < i['start'] < e['end']), None)
            label = image['attrs'].get('alt') if image else None
        result.append({'title': label or urlsplit(href).hostname, 'url': href})
    return result


def date_key(text):
    """Sort recorded dates without inventing missing months or days."""
    year, latest = 0, 0
    for match in re.finditer(r'(?<!\d)(?:(\d{4})[.년/-]\s*)?(\d{1,2})[.월/-]\s*(\d{1,2})[.일]?', text):
        if match[1]:
            year = int(match[1])
        month, day = int(match[2]), int(match[3])
        if year and 1 <= month <= 12 and 1 <= day <= 31:
            latest = max(latest, year * 10000 + month * 100 + day)
    for match in re.finditer(r'(?<!\d)(\d{4})(?:[.년/-]\s*(\d{1,2})(?=[.월\s]|$))?', text):
        month = int(match[2] or 0)
        latest = max(latest, int(match[1]) * 10000 + (month * 100 if 1 <= month <= 12 else 0))
    return latest


def generic_records(kind, cards, base):
    result = []
    for card in cards:
        elements = Elements(card).elements
        headings = [e for e in elements if e['tag'] == 'h5']
        if kind == 'news':
            body = next((e for e in elements if has_class(e, 'projectText')), None)
            if body:
                headings = [e for e in headings if body['start'] < e['start'] < body['end']]
        if not headings:
            raise ValueError('Missing public title for ' + kind)
        heading = headings[0]
        title = plain(inside(card, heading))
        image = next((e['attrs']['src'] for e in elements if e['tag'] == 'img' and e['attrs'].get('src')), '')
        resources = links(card, base)
        if kind == 'books':
            date_text = text_field(card, elements, 'bookDescription')
            ident = 'books:' + PurePosixPath(urlsplit(image).path).stem
            url, description = base + '/books/', date_text
        else:
            parent = next((e for e in elements if e['tag'] == 'a' and e['start'] < heading['start'] < e['end']), None)
            url = absolute(base, parent['attrs'].get('href', '')) if parent else ''
            url = url or (resources[0]['url'] if resources else base + '/news/')
            ident = 'news:' + sha256(url.encode('utf8')).hexdigest()[:20]
            date_text = text_field(card, elements, 'firstCommitDate')
            description = text_field(card, elements, 'abstract')
        if not title:
            raise ValueError('Empty public title for ' + kind)
        result.append({'id': ident, 'type': kind, 'title': title, 'url': url,
                       'image': absolute(base, image) if image else '', 'date_text': date_text,
                       'description': description, 'links': resources})
    return result


def catalogs(base, books, news, lectures, papers):
    result = {'books': generic_records('books', books, base), 'news': generic_records('news', news, base),
              'lectures': [], 'papers': []}
    for record in lectures.values():
        result['lectures'].append({
            'id': 'lectures:' + record['record_id'], 'type': 'lectures', 'title': record['title'],
            'url': base + record['path'], 'image': absolute(base, record['image']),
            'date_text': record['date_text'], 'description': record['abstract'],
            'institution': record['institution'], 'category': record['category'],
            'links': links(record['card'], base)})
    for record in papers.values():
        image = next((e['attrs'].get('src') for e in Elements(record['card']).elements if e['tag'] == 'img'), '')
        result['papers'].append({
            'id': 'papers:' + record['record_id'], 'type': 'papers', 'title': record['title'],
            'url': base + record['path'], 'image': absolute(base, image) if image else '',
            'date_text': str(record['year']), 'description': record['abstract'],
            'authors': record['authors'], 'publication_type': record['publication_type'],
            'doi': record.get('doi', ''), 'links': links(record['card'], base)})
    for kind, items in result.items():
        items.sort(key=lambda item: -date_key(item['date_text']))
        if kind == 'papers':
            items.sort(key=lambda item: item['publication_type'] == 'preprint')
        ids = [item['id'] for item in items]
        if len(ids) != len(set(ids)):
            raise ValueError('Public catalog IDs must be unique: ' + kind)
    return result


def item_content(item):
    metadata = ' · '.join(value for value in [LABELS[item['type']], item['date_text'], item.get('institution', '')] if value)
    content = '<p>' + escape(metadata) + '</p>'
    if item['description'] and item['description'] != item['date_text']:
        content += '<p>' + escape(item['description']) + '</p>'
    return content + '<p><a href="' + escape(item['url'], quote=True) + '">' + escape(item['title']) + '</a></p>'


def json_text(data):
    return json.dumps(data, ensure_ascii=False, indent=2) + '\n'


def generate_feeds(base, books, news, lectures, papers):
    """No runtime timestamp: identical published content produces identical files."""
    base = base.rstrip('/')
    data = catalogs(base, books, news, lectures, papers)
    title = '반병현 · 강의, 저서, 논문과 언론 보도'
    outputs, endpoints = {}, {}
    for kind, items in data.items():
        route = '/api/' + kind + '.json'
        outputs[route.lstrip('/')] = json_text({
            'version': 1, 'title': LABELS[kind], 'home_page_url': base + '/' + kind + '/',
            'count': len(items), 'items': items})
        endpoints[kind] = {'url': base + route, 'count': len(items)}
    outputs['api/index.json'] = json_text({'version': 1, 'title': '반병현 공개 콘텐츠',
        'home_page_url': base + '/', 'rss_url': base + '/feed.xml', 'json_feed_url': base + '/feed.json',
        'catalogs': endpoints})
    items = [item for group in data.values() for item in group]
    items.sort(key=lambda item: -date_key(item['date_text']))
    feed = {'version': 'https://jsonfeed.org/version/1.1', 'title': title, 'home_page_url': base + '/',
            'feed_url': base + '/feed.json', 'language': 'ko',
            'description': '사이트에 공개된 강의·저서·논문·언론 보도를 기록된 날짜순으로 제공합니다.',
            'items': []}
    for item in items:
        entry = {'id': item['id'], 'url': item['url'], 'title': item['title'],
                 'content_html': item_content(item), 'tags': [LABELS[item['type']]]}
        if item['image']:
            entry['image'] = item['image']
        feed['items'].append(entry)
    outputs['feed.json'] = json_text(feed)
    rss = ET.Element('rss', {'version': '2.0'})
    channel = ET.SubElement(rss, 'channel')
    for key, value in [('title', title), ('link', base + '/'), ('description', feed['description']), ('language', 'ko')]:
        ET.SubElement(channel, key).text = value
    for item in items:
        entry = ET.SubElement(channel, 'item')
        ET.SubElement(entry, 'title').text = item['title']
        ET.SubElement(entry, 'link').text = item['url']
        ET.SubElement(entry, 'guid', {'isPermaLink': 'false'}).text = item['id']
        ET.SubElement(entry, 'category').text = LABELS[item['type']]
        ET.SubElement(entry, 'description').text = item_content(item)
    ET.indent(rss, space='  ')
    outputs['feed.xml'] = '<?xml version="1.0" encoding="UTF-8"?>\n' + ET.tostring(rss, encoding='unicode') + '\n'
    return outputs
