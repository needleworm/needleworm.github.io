"""Bibliographic behavior, escaping, and real-catalog integration tests."""
import copy
import json
from pathlib import Path
import re
import unittest

from paper_citations import citation_formats, FORMATS


class CitationTests(unittest.TestCase):
    def setUp(self):
        self.journal = {
            'record_id': 'sample-journal',
            'title': 'A Reliable AI Study',
            'title_sentence_case': 'A reliable AI study',
            'authors': ['Byunghyun Ban', 'Hyoseok Lee'],
            'year': 2024,
            'journal_title': 'Journal of Tests',
            'volume': '5', 'issue': '2', 'firstpage': '57', 'lastpage': '72',
            'doi': 'https://doi.org/10.1234/example',
            'url': 'https://example.test/papers/reliable-ai/',
        }

    def test_journal_apa_reference(self):
        self.assertEqual(citation_formats(self.journal)['apa'],
            'Ban, B., & Lee, H. (2024). A reliable AI study. Journal of Tests, 5(2), 57–72. https://doi.org/10.1234/example')

    def test_journal_mla_reference(self):
        self.assertEqual(citation_formats(self.journal)['mla'],
            'Ban, Byunghyun, and Hyoseok Lee. “A Reliable AI Study.” Journal of Tests, vol. 5, no. 2, 2024, pp. 57-72. https://doi.org/10.1234/example.')

    def test_journal_chicago_bibliography(self):
        self.assertEqual(citation_formats(self.journal)['chicago'],
            'Ban, Byunghyun, and Hyoseok Lee. “A Reliable AI Study.” Journal of Tests 5, no. 2 (2024): 57–72. https://doi.org/10.1234/example.')

    def test_journal_ieee_without_invented_reference_number(self):
        self.assertEqual(citation_formats(self.journal)['ieee'],
            'B. Ban and H. Lee, “A reliable AI study,” Journal of Tests, vol. 5, no. 2, pp. 57–72, 2024, doi: 10.1234/example.')

    def test_article_number_is_not_a_page_range(self):
        record = dict(self.journal, article_number='e012345')
        record.pop('firstpage'); record.pop('lastpage')
        result = citation_formats(record)
        self.assertIn('Article e012345', result['apa'])
        self.assertIn('Art. no. e012345', result['ieee'])
        self.assertIn('eid = {e012345}', result['bibtex'])
        self.assertNotIn('pages =', result['bibtex'])
        self.assertIn('C7  - e012345', result['ris'])
        self.assertNotIn('SP  -', result['ris'])

    def test_missing_fields_are_omitted(self):
        result = citation_formats({'title': 'An AI study', 'authors': ['Byunghyun Ban'], 'year': 2026,
                                   'journal_title': 'Journal of Tests'})
        self.assertEqual(result['apa'], 'Ban, B. (2026). An AI study. Journal of Tests.')
        for field in ['volume =', 'number =', 'pages =', 'doi =']:
            self.assertNotIn(field, result['bibtex'])
        for value in result.values():
            self.assertNotIn('None', value)
            self.assertNotIn('()', value)

    def test_preprint_has_its_own_source_not_a_journal(self):
        record = {'title': 'An AI draft', 'authors': ['Byunghyun Ban'], 'year': 2026,
                  'publication_type': 'preprint', 'doi': '10.13140/RG.2.2.1234.5678',
                  'evidence_url': 'https://www.researchgate.net/publication/123'}
        result = citation_formats(record)
        self.assertEqual(result['apa'], 'Ban, B. (2026). An AI draft. ResearchGate. https://doi.org/10.13140/RG.2.2.1234.5678')
        self.assertTrue(result['bibtex'].startswith('@misc{'))
        self.assertIn('note = {Preprint}', result['bibtex'])
        self.assertNotIn('journal =', result['bibtex'])
        self.assertTrue(result['ris'].startswith('TY  - UNPB\n'))
        self.assertIn('M3  - Preprint', result['ris'])

    def test_thesis_is_not_article_and_does_not_add_pdf(self):
        record = {'title': '대립 신경망을 이용한 영상 표지', 'authors': ['Byung-Hyun Ban'], 'year': 2018,
                  'dissertation_institution': 'KAIST', 'evidence_url': 'https://koasas.kaist.ac.kr/handle/123'}
        result = citation_formats(record)
        self.assertIn('Ban, B.-H.', result['apa'])
        self.assertIn('[Master’s thesis, KAIST]. KOASAS.', result['apa'])
        self.assertTrue(result['bibtex'].startswith('@mastersthesis{'))
        self.assertIn('school = {KAIST}', result['bibtex'])
        self.assertTrue(result['ris'].startswith('TY  - THES\n'))
        self.assertNotIn('L1  -', result['ris'])

    def test_cjk_names_are_not_inverted_or_initialised(self):
        record = {'title': 'AI 연구', 'authors': ['반병현', '李明'], 'year': 2026, 'journal_title': '연구지'}
        result = citation_formats(record)
        self.assertIn('반병현, & 李明', result['apa'])
        self.assertIn('author = {{반병현} and {李明}}', result['bibtex'])
        self.assertIn('AU  - 반병현\nAU  - 李明', result['ris'])
        for value in result.values():
            self.assertNotIn('현, 반병', value)

    def test_explicit_name_order_and_family_particles(self):
        record = {'title': 'A study', 'authors': ['Ludwig van Beethoven'], 'year': 2026,
                  'author_names': [{'given': 'Ludwig', 'family': 'van Beethoven'}]}
        result = citation_formats(record)
        self.assertIn('van Beethoven, L.', result['apa'])
        self.assertIn('AU  - van Beethoven, Ludwig', result['ris'])

    def test_multi_word_hyphen_initials(self):
        record = dict(self.journal, authors=['Ha Yeon Lee', 'Kwang-Hyun Cho'])
        self.assertIn('Lee, H. Y., & Cho, K.-H.', citation_formats(record)['apa'])

    def test_author_count_conventions(self):
        record = dict(self.journal, authors=['Byunghyun Ban', 'Hyoseok Lee', 'Minwoo Lee'])
        self.assertTrue(citation_formats(record)['mla'].startswith('Ban, Byunghyun, et al.'))
        record['authors'] = ['Author Family' + chr(65 + i) for i in range(21)]
        result = citation_formats(record)
        self.assertIn('… FamilyU, A.', result['apa'])
        self.assertNotIn('FamilyT', result['apa'])
        self.assertIn('FamilyC, et al.', result['chicago'])
        self.assertTrue(result['ieee'].startswith('A. FamilyA et al.,'))
        self.assertEqual(result['ris'].count('AU  - '), 21)

    def test_conference_and_page_compression(self):
        record = {'title': 'An AI study', 'authors': ['Byunghyun Ban'], 'year': 2023,
                  'conference_title': '2023 ICTC', 'firstpage': '1353', 'lastpage': '1357'}
        result = citation_formats(record)
        self.assertIn('In 2023 ICTC (pp. 1353–1357).', result['apa'])
        self.assertIn('pp. 1353-57', result['mla'])
        self.assertIn('in 2023 ICTC, 2023, pp. 1353–1357.', result['ieee'])
        self.assertIn('pages = {1353--1357}', result['bibtex'])
        self.assertTrue(result['bibtex'].startswith('@inproceedings{'))
        self.assertTrue(result['ris'].startswith('TY  - CONF\n'))

    def test_ris_is_multiline_field_safe_and_keeps_data(self):
        record = dict(self.journal, abstract='First line.\nER  - Not a real field', language='en',
                      pdf_url='https://example.test/papers/reliable-ai/paper.pdf')
        result = citation_formats(record)['ris']
        self.assertIn('AB  - First line. ER - Not a real field\n', result)
        self.assertEqual(sum(line.startswith('ER  -') for line in result.splitlines()), 1)
        self.assertIn('UR  - https://example.test/papers/reliable-ai/\n', result)
        self.assertIn('L1  - https://example.test/papers/reliable-ai/paper.pdf\n', result)

    def test_tex_escapes_and_title_capitalization_protection(self):
        record = dict(self.journal, title=r'AI & R&D: 10% of $x_1$ # {A} ~ ^ \ path')
        result = citation_formats(record)['bibtex']
        for sequence in [r'\&', r'\%', r'\$', r'\_', r'\#', r'\{A\}', r'\textasciitilde{}', r'\textasciicircum{}', r'\textbackslash{}']:
            self.assertIn(sequence, result)
        self.assertIn('title = {{AI', result)

    def test_stable_key_survives_metadata_correction_and_is_unique(self):
        first = citation_formats(self.journal)['bibtex'].splitlines()[0]
        self.assertEqual(first, citation_formats(dict(self.journal, title='Corrected title'))['bibtex'].splitlines()[0])
        self.assertNotEqual(first, citation_formats(dict(self.journal, record_id='different-record'))['bibtex'].splitlines()[0])

    def test_does_not_mutate_input(self):
        before = copy.deepcopy(self.journal)
        citation_formats(self.journal)
        self.assertEqual(before, self.journal)

    def test_invalid_identity_fails_instead_of_fabricating(self):
        with self.assertRaises(ValueError):
            citation_formats({'title': 'A paper', 'authors': [], 'year': 2026})
        with self.assertRaises(ValueError):
            citation_formats({'authors': ['반병현'], 'year': 2026})

    def test_real_catalog_all_six_formats_and_unique_export_keys(self):
        catalog = json.loads((Path(__file__).resolve().parents[1]/'content/papers.json').read_text(encoding='utf8'))
        keys = set()
        for record in catalog:
            with self.subTest(record=record['record_id']):
                result = citation_formats(record)
                self.assertEqual(tuple(result), FORMATS)
                self.assertTrue(all(isinstance(value, str) and value.strip() for value in result.values()))
                key = re.match(r'@\w+\{([^,]+),', result['bibtex'])[1]
                self.assertNotIn(key, keys)
                keys.add(key)
                self.assertIn('TI  - ' + record['title'], result['ris'])
                self.assertEqual(result['ris'].count('AU  - '), len(record['authors']))
        self.assertEqual(len(keys), len(catalog))


if __name__ == '__main__':
    unittest.main()
