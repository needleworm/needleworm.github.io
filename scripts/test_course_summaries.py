"""Course summaries must not duplicate individually listed lecture sessions."""
import json
import unittest
from unittest.mock import patch
import build_site


def card(ident):
    return f'<div class="singleLectureContainer" data-record-id="{ident}" data-category="교육기관"><div class="firstCommitDate">2026.10.14.</div></div>'


class CourseSummaryTests(unittest.TestCase):
    def views(self, sessions, course='course-group'):
        sources = {'lectures': '<section>' + ''.join(card(f'lecture-{i}') for i in range(3)) + '</section>',
                   'courses-offline': '<section>' + card('course-group') + card('course-legacy') + '</section>',
                   'courses-online': '<section></section>'}
        policy = {'minimum_visits': {}, 'delivery': {}, 'course_lectures': {course: sessions}}
        with patch.object(build_site.Path, 'read_text', return_value=json.dumps(policy)):
            return build_site.source_views(sources)

    def test_grouped_course_keeps_sessions_once_and_legacy_course_crosslisted(self):
        views = self.views(['lecture-0', 'lecture-1', 'lecture-2'])
        self.assertEqual(len(build_site.Blocks(views['lectures']).cards), 4)
        self.assertNotIn('data-record-id="course-group"', views['lectures'])
        self.assertIn('data-record-id="course-legacy"', views['lectures'])
        self.assertEqual(len(build_site.Blocks(views['courses-offline']).cards), 2)

    def test_missing_session_is_rejected(self):
        with self.assertRaises(ValueError):
            self.views(['lecture-0', 'lecture-1', 'lecture-missing'])

    def test_repeated_session_is_rejected(self):
        with self.assertRaises(ValueError):
            self.views(['lecture-0', 'lecture-1', 'lecture-1'])

    def test_fewer_than_three_sessions_is_rejected(self):
        with self.assertRaises(ValueError):
            self.views(['lecture-0', 'lecture-1'])

    def test_missing_course_is_rejected(self):
        with self.assertRaises(ValueError):
            self.views(['lecture-0', 'lecture-1', 'lecture-2'], 'course-missing')


if __name__ == '__main__':
    unittest.main()
