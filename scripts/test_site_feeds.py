"""Check static feed identity, escaping, dates and the public export boundary."""
import json
import unittest
import xml.etree.ElementTree as ET

from site_feeds import date_key, generate_feeds
from lecture_pages import plain


BOOK = '''<div class="singleBookContainer"><img src="./src/images/books/covers/35.webp">
<h5>A &amp; B</h5><p class="bookDescription">2026.11. 출판사</p>
<a href="https://store.example/book"><img alt="서점" src="./store.png"></a></div>'''
NEWS = '''<div class="singleProjectContainer"><a href="https://news.example/article"><h5>매체</h5></a>
<div class="projectText"><a href="https://news.example/article"><h5>기사 &amp; 제목</h5></a>
<p class="firstCommitDate">기사 발행일 2026.10.20.</p><p class="abstract">설명 &lt;예시&gt;</p></div></div>'''
LECTURE_CARD = '<div><a class="lec_inst" href="https://institution.example/">기관</a></div>'
PAPER_CARD = '<div><img src="./src/images/paper.png"><a href="./src/paperPdf/preview.pdf">미리보기</a></div>'


class FeedTests(unittest.TestCase):
    def make(self, book=BOOK, news=NEWS, lecture_title='강의 제목'):
        lectures = {'lecture-1': {'record_id': 'lecture-1', 'path': '/lectures/lecture-1/',
            'title': lecture_title, 'image': './src/images/lecture.webp', 'date_text': '2026.10.19. 10.23.',
            'abstract': '기존 설명', 'institution': '기관', 'category': '교육기관', 'card': LECTURE_CARD,
            'private_source': 'not-public'}}
        papers = {'paper-1': {'record_id': 'paper-1', 'path': '/papers/test/', 'title': 'Paper',
            'year': 2026, 'abstract': 'Original abstract', 'authors': ['A', 'B'],
            'publication_type': 'published', 'card': PAPER_CARD, 'private_source': 'not-public'}}
        return generate_feeds('https://example.test', [book], [news], lectures, papers)

    def test_every_catalog_and_both_feeds_are_complete(self):
        outputs = self.make()
        self.assertEqual(len(outputs), 7)
        feed = json.loads(outputs['feed.json'])
        self.assertEqual(len(feed['items']), 4)
        rss = ET.fromstring(outputs['feed.xml'])
        self.assertEqual(len(rss.findall('./channel/item')), 4)
        for kind in ['books', 'news', 'lectures', 'papers']:
            self.assertEqual(json.loads(outputs['api/' + kind + '.json'])['count'], 1)

    def test_ids_survive_title_and_abstract_edits(self):
        first = self.make()
        second = self.make(BOOK.replace('A &amp; B', 'New title'), NEWS.replace('설명', '다른 설명'), '바뀐 강의명')
        for kind in ['books', 'news', 'lectures', 'papers']:
            key = 'api/' + kind + '.json'
            self.assertEqual(json.loads(first[key])['items'][0]['id'], json.loads(second[key])['items'][0]['id'])

    def test_news_title_comes_from_article_not_publisher(self):
        item = json.loads(self.make()['api/news.json'])['items'][0]
        self.assertEqual(item['title'], '기사 & 제목')
        self.assertEqual(item['url'], 'https://news.example/article')

    def test_xml_and_html_escaping_round_trip(self):
        root = ET.fromstring(self.make()['feed.xml'])
        news = next(i for i in root.findall('./channel/item') if i.findtext('category') == '언론 보도')
        self.assertEqual(news.findtext('title'), '기사 & 제목')
        self.assertIn('설명 &lt;예시&gt;', news.findtext('description'))
        self.assertIn('기사 & 제목', plain(news.findtext('description')))
        self.assertNotIn('&amp;', plain(news.findtext('description')))

    def test_export_only_public_fields_with_absolute_destinations(self):
        outputs = self.make()
        self.assertNotIn('not-public', ''.join(outputs.values()))
        lecture = json.loads(outputs['api/lectures.json'])['items'][0]
        self.assertEqual(lecture['url'], 'https://example.test/lectures/lecture-1/')
        self.assertEqual(lecture['image'], 'https://example.test/src/images/lecture.webp')
        self.assertEqual(lecture['links'][0]['url'], 'https://institution.example/')

    def test_original_date_precision_and_no_invented_feed_publication_date(self):
        outputs = self.make()
        self.assertEqual(json.loads(outputs['api/books.json'])['items'][0]['date_text'], '2026.11. 출판사')
        self.assertNotIn('date_published', outputs['feed.json'])
        self.assertNotIn('<pubDate>', outputs['feed.xml'])

    def test_repeated_dates_and_partial_dates_sort_without_inventing_months(self):
        self.assertEqual(date_key('2026.10.19. 10.23.'), 20261023)
        self.assertEqual(date_key('2025.12.20. 2026.01.10.'), 20260110)
        self.assertEqual(date_key('2026.11. 출판사'), 20261100)
        self.assertEqual(date_key('2024년'), 20240000)
        self.assertEqual(date_key('2025.3Q'), 20250000)
        self.assertEqual(date_key('2016.22. 출판사'), 20160000)

    def test_build_is_deterministic(self):
        self.assertEqual(self.make(), self.make())


if __name__ == '__main__':
    unittest.main()
