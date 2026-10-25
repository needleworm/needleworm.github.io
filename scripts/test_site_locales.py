"""URL rewrites keep published fragments intact and shared assets reachable."""
from pathlib import Path
from tempfile import TemporaryDirectory
import json
import re
import unittest
from unittest.mock import patch

import site_locales


class LocaleURLTests(unittest.TestCase):
    origin = 'https://bhban.kr'
    routes = {'/', '/books/', '/lectures/', '/papers/example/'}

    def rewrite(self, html, base='/papers/example/'):
        return site_locales.rewrite_urls(html, base, 'en', self.routes, self.origin)

    def test_existing_published_relative_references_are_unchanged(self):
        html = '<p><a href="t">X</a> and <a href="t-1">X</a></p>'
        self.assertEqual(self.rewrite(html), html)

    def test_malformed_imported_href_keeps_original_quoting(self):
        html = '<a href="After%202023\'s%20exam%20was%20held." rel="noopener">repository</a>'
        self.assertEqual(self.rewrite(html), html)

    def test_original_fragment_and_entities_are_not_reserialized(self):
        html = '<a href="#figure&#45;1">Figure 1</a><a href="/feed.xml?x=1&amp;y=2">RSS</a>'
        self.assertEqual(self.rewrite(html), html)

    def test_existing_relative_image_uses_shared_root_path(self):
        with TemporaryDirectory() as temp:
            root = Path(temp).resolve()
            image = root / 'src/images/book cover.webp'
            image.parent.mkdir(parents=True)
            image.write_bytes(b'image fixture')
            with patch.object(site_locales, 'SITE_ROOT', root):
                html = '<img src="../../src/images/book%20cover.webp?size=2&amp;fit=contain">'
                expected = '<img src="/src/images/book%20cover.webp?size=2&amp;fit=contain">'
                self.assertEqual(self.rewrite(html), expected)

    def test_root_asset_stays_shared_and_preserves_attribute_bytes(self):
        html = '<img src="/src/images/logo.webp?name=author\'s&amp;size=2">'
        self.assertEqual(self.rewrite(html), html)

    def test_known_relative_page_keeps_query_and_fragment(self):
        html = '<a href="../../books/?sort=date&amp;page=1#book">Books</a>'
        expected = '<a href="/en/books/?sort=date&amp;page=1#book">Books</a>'
        self.assertEqual(self.rewrite(html), expected)

    def test_explicit_index_page_is_localized_once(self):
        self.assertEqual(self.rewrite('<a href="/books/index.html">Books</a>'),
                         '<a href="/en/books/">Books</a>')

    def test_same_origin_absolute_page_keeps_absolute_form(self):
        html = '<a href="https://bhban.kr/lectures/#lecture-list">Lectures</a>'
        expected = '<a href="https://bhban.kr/en/lectures/#lecture-list">Lectures</a>'
        self.assertEqual(self.rewrite(html), expected)

    def test_external_and_special_links_are_unchanged(self):
        html = '<a href="https://example.org/paper?author=O\'Neil&amp;v=1">Paper</a><a href="mailto:author@example.org">Email</a>'
        self.assertEqual(self.rewrite(html), html)

    def test_existing_untranslated_project_directory_keeps_shared_route(self):
        with TemporaryDirectory() as temp:
            root = Path(temp).resolve()
            project = root / 'example-project/index.html'
            project.parent.mkdir()
            project.write_text('example', encoding='utf8')
            with patch.object(site_locales, 'SITE_ROOT', root):
                self.assertEqual(self.rewrite('<a href="../../example-project/">Project</a>'),
                                 '<a href="/example-project/">Project</a>')

    def test_thesis_schema_preserves_published_metadata_and_original_url(self):
        thesis = {'@type': 'Thesis', '@id': self.origin + '/papers/example/#article',
                  'name': '석사논문', 'inLanguage': 'ko',
                  'url': self.origin + '/papers/example/',
                  'author': {'@type': 'Person', 'name': '저자'}}
        page = {'@type': 'WebPage', 'name': '석사논문',
                'url': self.origin + '/papers/example/'}
        source = ('<title>Thesis page</title><meta name="description" content="Research">'
                  '<script type="application/ld+json">'
                  + json.dumps({'@graph': [thesis, page]}, ensure_ascii=False) + '</script>')
        translated = site_locales.rewrite_schema(
            source, 'en', {site_locales.string_id('석사논문'): 'Master thesis'},
            '/papers/example/', self.routes, self.origin)
        graph = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>', translated)[1])['@graph']
        self.assertEqual(graph[0], thesis)
        self.assertEqual(graph[1]['url'], self.origin + '/en/papers/example/')
        self.assertEqual(graph[1]['inLanguage'], 'en')


if __name__ == '__main__':
    unittest.main()
