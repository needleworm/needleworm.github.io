'use strict';

// Exercise localized routes and visible dynamic labels without a server.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');

function fixture({ locale = 'ko', htmlLang = locale, pathname = '/', hash = '', messages = {} } = {}) {
    const redirected = [];
    const document = {
        body: { dataset: locale === null ? {} : { locale } },
        documentElement: { lang: htmlLang },
        baseURI: 'https://example.test' + pathname,
        getElementById: id => id === 'site-i18n' ? { textContent: typeof messages === 'string' ? messages : JSON.stringify(messages) } : null,
        addEventListener() {},
    };
    const window = {
        location: { href: document.baseURI + hash, pathname, hash, replace: url => redirected.push(url) },
    };
    const context = vm.createContext({ document, window, URL });
    vm.runInContext(source, context);
    return { call: expression => vm.runInContext(expression, context), redirected };
}

let passed = 0;
function test(name, run) { run(); passed++; console.log('PASS ' + name); }

test('all eight translated homes retain their locale for legacy hash links', () => {
    for (const locale of ['en', 'zh', 'hi', 'es', 'ar', 'fr', 'bn', 'pt']) {
        for (const ending of ['/', '/index.html']) {
            const f = fixture({ locale, pathname: '/' + locale + ending, hash: '#books' });
            f.call('restoreLegacyNavigation()');
            assert.deepEqual(f.redirected, ['/' + locale + '/books/']);
        }
    }
});
test('Korean legacy links still resolve to the original root routes', () => {
    const f = fixture({ hash: '#education-section' });
    f.call('restoreLegacyNavigation()');
    assert.deepEqual(f.redirected, ['/lectures/']);
});
test('ordinary page anchors are not treated as legacy home navigation', () => {
    const f = fixture({ locale: 'es', pathname: '/es/lectures/', hash: '#books' });
    f.call('restoreLegacyNavigation()');
    assert.deepEqual(f.redirected, []);
});
test('existing locale prefixes are replaced once while query and category hash remain', () => {
    const f = fixture({ locale: 'fr', pathname: '/fr/' });
    assert.equal(f.call("siteLocalePath('/es/lectures/?view=all#education')"), '/fr/lectures/?view=all#education');
    assert.equal(f.call("siteLocalePath('/fr/books/')"), '/fr/books/');
});
test('external destinations are never rewritten as a local translated page', () => {
    const f = fixture({ locale: 'en', pathname: '/en/' });
    assert.equal(f.call("siteLocalePath('https://other.test/books/?lang=ko')"), 'https://other.test/books/?lang=ko');
});
test('html language variants are supported when no body locale exists', () => {
    const f = fixture({ locale: null, htmlLang: 'zh-CN', pathname: '/zh/' });
    assert.equal(f.call("siteLocalePath('/contact/')"), '/zh/contact/');
});
test('translated status interpolates data and Korean fallback stays available', () => {
    const f = fixture({ locale: 'en', messages: { listStatus: 'Showing {visible} of {total}', citationCopied: 'Citation copied.' } });
    assert.equal(f.call("siteText('listStatus', 'fallback', {visible:4,total:29})"), 'Showing 4 of 29');
    assert.equal(f.call("siteText('citationCopied', '인용 정보를 복사했습니다.')"), 'Citation copied.');
    assert.equal(f.call("siteText('missing', '{count}건', {count:2})"), '2건');
});
test('malformed UI dictionaries fall back without breaking page controls', () => {
    const f = fixture({ messages: '{invalid' });
    assert.equal(f.call("siteText('menuOpen', '메뉴 열기')"), '메뉴 열기');
});

console.log(`\n${passed} locale runtime checks passed.`);
