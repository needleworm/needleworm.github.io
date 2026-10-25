/* Run: node scripts/check_locale_routing.cjs */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '..', 'locale-routing.js'), 'utf8');
const locales = ['ko', 'en', 'zh', 'hi', 'es', 'ar', 'fr', 'bn', 'pt'];
let checks = 0;
const storage = (values = {}, blocked = false) => ({
    values,
    getItem(key) { if (blocked) throw Error('Storage blocked'); return values[key] ?? null; },
    setItem(key, value) { if (blocked) throw Error('Storage blocked'); values[key] = value; }
});
function page(options = {}) {
    const location = { href: options.href || 'https://bhban.kr/books/?from=test#chapter', replace(value) { this.replaced = value; } };
    const parsed = new URL(location.href);
    const route = options.route || parsed.pathname.replace(/^\/(en|zh|hi|es|ar|fr|bn|pt)(?=\/|$)/, '');
    const element = attributes => ({ getAttribute: key => attributes[key] ?? null, setAttribute: (key, value) => { attributes[key] = value; }, attributes });
    const canonical = element({ href: options.canonical || parsed.origin + route });
    const alternates = (options.alternates || locales).map(locale => element({ hreflang: locale, href: parsed.origin + (locale === 'ko' ? '' : '/' + locale) + route }));
    if (options.modifyAlternates) options.modifyAlternates(alternates);
    const listeners = new Map();
    const document = {
        hidden: !!options.hidden,
        documentElement: { lang: options.lang || 'ko' },
        querySelector: () => options.noCanonical ? null : canonical,
        querySelectorAll: () => alternates,
        addEventListener(name, callback) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(callback); },
        removeEventListener(name, callback) { listeners.get(name)?.delete(callback); }
    };
    const fire = (name, event = {}) => [...(listeners.get(name) || [])].forEach(callback => callback(event));
    let fetchCalls = 0;
    let request;
    const timers = new Map();
    let serial = 0;
    let resolveFetch;
    const pendingFetch = new Promise(resolve => { resolveFetch = resolve; });
    const localStorage = options.localStorage || storage(options.saved ? { 'nana-language': options.saved } : {}, options.blocked);
    const sessionStorage = options.sessionStorage || storage({}, options.blocked);
    const window = { location, localStorage, sessionStorage };
    const context = {
        window, document,
        navigator: { languages: options.languages || ['en-US'], userAgent: options.agent || 'Mozilla/5.0', language: 'en' },
        URL, AbortController,
        setTimeout(callback, duration) { assert.equal(duration, 1800); const id = ++serial; timers.set(id, callback); return id; },
        clearTimeout(id) { timers.delete(id); },
        fetch(url, init) {
            fetchCalls++;
            request = { url, init };
            if (options.error) return Promise.reject(Error('Offline'));
            if (options.pending) return pendingFetch;
            return Promise.resolve({ ok: options.ok !== false, text: async () => options.body ?? ('ip=198.51.100.8\nloc=' + (options.country || 'KR') + '\n') });
        }
    };
    vm.createContext(context);
    vm.runInContext(source, context, { filename: 'locale-routing.js' });
    return {
        api: window.NaNaLocaleRouting, window, document, location, localStorage, sessionStorage, fire, element,
        resolve(country) { resolveFetch({ ok: true, text: async () => 'loc=' + country + '\n' }); },
        timeout() { [...timers.values()].forEach(callback => callback()); },
        get calls() { return fetchCalls; }, get request() { return request; }, get timers() { return timers.size; }
    };
}
async function check(name, run) {
    await run();
    checks++;
    process.stdout.write('PASS ' + name + '\n');
}
async function main() {
    await check('all supported country defaults and country groups', async () => {
        const cases = {
            KR: 'ko', US: 'en', GB: 'en', AU: 'en', NZ: 'en', IE: 'en', CN: 'zh', TW: 'zh', HK: 'zh', MO: 'zh',
            IN: 'hi', BD: 'bn', ES: 'es', MX: 'es', AR: 'es', BR: 'pt', PT: 'pt', AO: 'pt',
            AE: 'ar', SA: 'ar', EG: 'ar', FR: 'fr', SN: 'fr', GH: 'en', ZA: 'en'
        };
        for (const [country, locale] of Object.entries(cases)) {
            const p = page({ country, languages: ['ja'] });
            const answer = await p.api.ready;
            assert.equal(answer.locale, locale, country);
            assert.equal(answer.redirected, locale !== 'ko', country);
            assert.equal(answer.reason, 'country');
            assert.equal(p.calls, 1);
            assert.deepEqual(Object.keys(p.sessionStorage.values), ['nana-auto-language']);
            assert.equal(p.sessionStorage.values['nana-auto-language'], locale);
            assert.deepEqual(p.localStorage.values, {});
            assert.equal(p.timers, 0);
        }
    });
    await check('multilingual countries honor only locally plausible browser languages', async () => {
        for (const [country, languages, expected] of [
            ['IN', ['bn-BD', 'en'], 'bn'], ['IN', ['fr'], 'hi'], ['IN', ['en', 'hi'], 'en'],
            ['CA', ['fr-CA'], 'fr'], ['CA', ['zh'], 'en'], ['BE', ['en', 'fr'], 'fr'],
            ['CH', ['zh'], 'fr'], ['SG', ['zh-CN'], 'zh'], ['SG', ['hi'], 'en']
        ]) assert.equal((await page({ country, languages }).api.ready).locale, expected, country + languages);
    });
    await check('unknown country and failed requests use first supported browser language', async () => {
        for (const options of [{ country: 'JP' }, { error: true }, { ok: false }, { body: 'ip=198.51.100.1\nloc=bad\n' }, { body: 'loc=US malicious\n' }]) {
            const answer = await page({ ...options, languages: ['ja', 'es-MX', 'fr'] }).api.ready;
            assert.equal(answer.locale, 'es');
        }
        assert.equal((await page({ country: 'DE', languages: ['de'] }).api.ready).locale, 'en');
    });
    await check('request privacy, bounded timeout, and browser fallback', async () => {
        const p = page({ pending: true, languages: ['fr'] });
        assert.equal(p.request.url, 'https://www.cloudflare.com/cdn-cgi/trace');
        assert.equal(p.request.init.credentials, 'omit');
        assert.equal(p.request.init.referrerPolicy, 'no-referrer');
        assert.equal(p.request.init.cache, 'no-store');
        p.timeout();
        const answer = await p.api.ready;
        assert.equal(answer.locale, 'fr');
        assert.equal(answer.reason, 'browser-fallback');
        assert.equal(p.request.init.signal.aborted, true);
        assert.equal(p.timers, 0);
    });
    await check('uses actual alternates and preserves query/hash on deep pages', async () => {
        const p = page({ country: 'CN', href: 'https://bhban.kr/books/?q=a%20b&sort=desc#chapter-2' });
        assert.equal((await p.api.ready).redirected, true);
        assert.equal(p.location.replaced, 'https://bhban.kr/zh/books/?q=a%20b&sort=desc#chapter-2');
        const home = page({ country: 'US', href: 'https://bhban.kr/index.html?source=home#about', route: '/' });
        await home.api.ready;
        assert.equal(home.location.replaced, 'https://bhban.kr/en/?source=home#about');
        const privacy = page({ country: 'US', href: 'https://bhban.kr/privacy.html?from=footer#contact' });
        assert.equal((await privacy.api.ready).redirected, true);
        assert.equal(privacy.location.replaced, 'https://bhban.kr/en/privacy.html?from=footer#contact');
    });
    await check('explicit locale paths win without any lookup', async () => {
        for (const locale of locales.filter(locale => locale !== 'ko')) {
            const p = page({ href: 'https://bhban.kr/' + locale + '/books/', saved: 'fr' });
            const answer = await p.api.ready;
            assert.equal(answer.locale, locale);
            assert.equal(answer.reason, 'explicit-path');
            assert.equal(p.calls, 0);
            assert.equal(p.location.replaced, undefined);
        }
    });
    await check('saved and query choices take priority over IP, including Korean', async () => {
        for (const saved of ['ko', 'fr']) {
            const p = page({ country: 'CN', saved });
            assert.equal((await p.api.ready).locale, saved);
            assert.equal(p.calls, 0);
        }
        const p = page({ href: 'https://bhban.kr/books/?lang=pt#part', saved: 'fr' });
        assert.equal((await p.api.ready).reason, 'query-choice');
        assert.equal(p.localStorage.values['nana-language'], 'pt');
        assert.equal(p.location.replaced, 'https://bhban.kr/pt/books/?lang=pt#part');
        const blocked = page({ href: 'https://bhban.kr/?lang=ko', blocked: true, country: 'US' });
        assert.equal((await blocked.api.ready).locale, 'ko');
        assert.equal(blocked.calls, 0);
        const invalid = page({ href: 'https://bhban.kr/books/?lang=evil', country: 'KR' });
        assert.equal((await invalid.api.ready).reason, 'country');
        const explicit = page({ href: 'https://bhban.kr/en/books/?lang=ko', saved: 'fr' });
        assert.equal((await explicit.api.ready).locale, 'en');
        assert.equal(explicit.localStorage.values['nana-language'], 'ko');
        assert.equal(explicit.calls, 0);
        assert.equal(explicit.location.replaced, undefined);
    });
    await check('manual clicks persist, win a pending request, and ignore foreign links', async () => {
        const p = page({ pending: true });
        const anchor = p.element({ href: '/fr/books/', hreflang: 'fr' });
        p.fire('click', { target: { closest: () => anchor } });
        p.resolve('CN');
        assert.equal((await p.api.ready).reason, 'interrupted');
        assert.equal(p.location.replaced, undefined);
        assert.equal(p.localStorage.values['nana-language'], 'fr');
        assert.deepEqual(p.sessionStorage.values, {});
        const foreign = page({ country: 'KR' });
        const link = foreign.element({ href: 'https://example.org/fr/', hreflang: 'fr' });
        foreign.fire('click', { target: { closest: () => link } });
        await foreign.api.ready;
        assert.deepEqual(foreign.localStorage.values, {});
    });
    await check('blocked storage Korean click carries an explicit stay-Korean query', async () => {
        const p = page({ pending: true, blocked: true });
        const anchor = p.element({ href: '/books/?ref=footer#top', hreflang: 'ko' });
        p.fire('click', { target: { closest: () => anchor } });
        assert.equal(anchor.getAttribute('href'), 'https://bhban.kr/books/?ref=footer&lang=ko#top');
        assert.equal((await p.api.ready).reason, 'interrupted');
    });
    await check('interaction and visibility changes cancel late automatic navigation', async () => {
        for (const name of ['pointerdown', 'keydown', 'touchstart', 'wheel', 'visibilitychange', 'href-change']) {
            const p = page({ pending: true });
            if (name === 'visibilitychange') p.document.hidden = true;
            if (name === 'href-change') p.location.href = 'https://bhban.kr/books/#user-navigation';
            else p.fire(name);
            p.resolve('US');
            assert.equal((await p.api.ready).reason, 'interrupted', name);
            assert.equal(p.location.replaced, undefined, name);
            assert.deepEqual(p.sessionStorage.values, {});
        }
    });
    await check('one country lookup per session and idempotent start', async () => {
        const session = storage();
        const first = page({ country: 'KR', sessionStorage: session });
        assert.equal(first.api.start(), first.api.ready);
        await first.api.ready;
        assert.equal(first.calls, 1);
        const second = page({ country: 'CN', sessionStorage: session });
        assert.equal((await second.api.ready).reason, 'session-choice');
        assert.equal(second.calls, 0);
        assert.equal(second.location.replaced, undefined);
        const foreignSession = storage({ 'nana-auto-language': 'es' });
        const foreign = page({ sessionStorage: foreignSession });
        assert.equal((await foreign.api.ready).locale, 'es');
        assert.equal(foreign.calls, 0);
    });
    await check('assets, unrelated projects, mismatched canonical, and absent Korean alternate skip lookup', async () => {
        for (const options of [
            { href: 'https://bhban.kr/src/sample.pdf' }, { href: 'https://bhban.kr/projects/demo/', alternates: [] },
            { canonical: 'https://bhban.kr/other/' }, { canonical: 'https://example.org/books/' },
            { alternates: ['en', 'fr'] }, { noCanonical: true }, { lang: 'en' }
        ]) {
            const p = page(options);
            assert.equal((await p.api.ready).reason, 'unsupported-page');
            assert.equal(p.calls, 0);
        }
    });
    await check('missing or unsafe destination never invents a locale route', async () => {
        for (const href of ['https://evil.example/en/books/', 'https://bhban.kr/en/other/', 'https://bhban.kr/en/books/?inject=1', 'javascript:alert(1)']) {
            const p = page({ country: 'US', modifyAlternates: links => { links.find(link => link.getAttribute('hreflang') === 'en').setAttribute('href', href); } });
            assert.equal((await p.api.ready).reason, 'missing-alternate', href);
            assert.equal(p.location.replaced, undefined);
        }
        const p = page({ country: 'US', alternates: ['ko', 'fr'] });
        assert.equal((await p.api.ready).reason, 'missing-alternate');
    });
    await check('legacy home hashes defer to existing section routing', async () => {
        for (const hash of ['#books', '#tab-media', '#education-section', '#tab-websites', '#membership', '#contact']) {
            const p = page({ href: 'https://bhban.kr/' + hash });
            assert.equal((await p.api.ready).reason, 'legacy-route');
            assert.equal(p.calls, 0);
        }
    });
    await check('bots, localhost, and initially hidden documents do not request location', async () => {
        for (const options of [{ agent: 'Googlebot' }, { href: 'http://localhost:8000/' }, { href: 'http://127.0.0.1/' }, { href: 'http://[::1]/' }, { hidden: true }]) {
            const p = page(options);
            await p.api.ready;
            assert.equal(p.calls, 0);
            assert.equal(p.location.replaced, undefined);
        }
    });
    process.stdout.write('\n' + checks + ' locale-routing checks passed.\n');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
