'use strict';

// Exercise request/append lifecycle without a network, browser or dependencies.
// Real page markup and controls are additionally checked in the mobile browser.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '..', 'continuous-scroll.js'), 'utf8');

function surface() {
    const handlers = new Map();
    return {
        addEventListener(type, fn) { handlers.set(type, [...(handlers.get(type) || []), fn]); },
        emit(type, event = {}) { for (const fn of handlers.get(type) || []) fn(event); },
        dispatchEvent(event) { for (const fn of handlers.get(event.type) || []) fn(event); return true; },
    };
}
function element() {
    const classes = new Set();
    return Object.assign(surface(), {
        children: [], dataset: {}, hidden: false, textContent: '',
        classList: {
            contains: name => classes.has(name),
            toggle(name, enabled) { if (enabled) classes.add(name); else classes.delete(name); },
        },
        append(child) { this.children.push(child); },
        setAttribute(name, value) { this[name] = value; },
        getAttribute(name) { return this[name] ?? null; },
        querySelector: () => null, querySelectorAll: () => [],
    });
}
function fixture({ mobile = true, home = false } = {}) {
    const raf = [], timers = new Map(), requests = [], enhanced = [];
    const body = element(), main = element(), panel = element(), label = element(), description = element(), hint = element(), link = element();
    body.dataset.page = home ? 'home' : 'books';
    main.append(element());
    main.append = child => { main.children.push(child); panel.top += 6000; };
    panel.top = 10000;
    panel.getBoundingClientRect = () => ({ top: panel.top });
    panel.querySelector = selector => selector === '.mobile-next-hint' ? hint : description;
    link.href = 'https://example.test/media/';
    link.querySelector = () => label;
    label.textContent = 'Media';
    const document = Object.assign(surface(), {
        body, visibilityState: 'visible',
        getElementById: id => id === 'main-content' ? main : null,
        createElement: element, importNode: () => element(),
    });
    const media = { matches: mobile };
    const fetch = (url, options) => new Promise((resolve, reject) => requests.push({ url, options, resolve, reject }));
    const observer = { observe() {}, disconnect() { this.disconnected = true; } };
    function IntersectionObserver(callback) { observer.fire = callback; return observer; }
    function DOMParser() {
        this.parseFromString = html => {
            const data = JSON.parse(html);
            const next = data.next ? element() : null;
            if (next) { next.href = data.next; next.querySelector = () => ({ textContent: data.next }); }
            return {
                body: { dataset: { page: data.key } },
                getElementById: id => id === 'main-content' ? (data.invalid ? null : { children: [element()] }) : next,
            };
        };
    }
    const window = Object.assign(surface(), {
        location: { href: home ? 'https://example.test/' : 'https://example.test/books/', origin: 'https://example.test' },
        innerHeight: 844, fetch, DOMParser, IntersectionObserver,
        requestAnimationFrame(fn) { raf.push(fn); },
    });
    let timerId = 0;
    const context = vm.createContext({
        window, document, URL, fetch, DOMParser, IntersectionObserver, AbortController,
        CustomEvent: class { constructor(type, options = {}) { this.type = type; this.detail = options.detail; } },
        setTimeout(fn) { timers.set(++timerId, fn); return timerId; },
        clearTimeout(id) { timers.delete(id); },
        link, panel, mobile: media, enhance: section => enhanced.push(section),
    });
    vm.runInContext(source, context);
    const controller = vm.runInContext('setupMobileContinuousScroll({link, panel, mobile, enhance})', context);
    async function flush() {
        for (let i = 0; i < 5; i++) { while (raf.length) raf.shift()(); await Promise.resolve(); }
    }
    async function near() { panel.top = 1800; window.emit('scroll'); await flush(); }
    async function respond(data = { key: 'media', next: '/news/' }, response = {}) {
        requests.at(-1).resolve({ ok: true, redirected: false, text: async () => JSON.stringify(data), ...response });
        await flush();
    }
    return { body, main, panel, link, hint, media, window, document, requests, enhanced, observer, timers, controller, flush, near, respond };
}

const tests = [];
const test = (name, run) => tests.push([name, run]);
test('desktop and distant mobile content do not fetch eagerly', async () => {
    const desktop = fixture({ mobile: false }); await desktop.near();
    assert.equal(desktop.requests.length, 0);
    assert.equal(desktop.body.classList.contains('stream-pending'), false);
    const phone = fixture(); await phone.flush();
    assert.equal(phone.requests.length, 0);
    await phone.near();
    assert.equal(phone.requests.length, 1);
});
test('repeated scroll events coalesce; append once without changing the address', async () => {
    const f = fixture(); await f.near();
    for (let i = 0; i < 10; i++) { f.observer.fire(); f.window.emit('scroll'); }
    await f.flush();
    assert.equal(f.requests.length, 1);
    await f.respond();
    assert.equal(f.main.children.length, 2);
    assert.equal(f.enhanced.length, 1);
    assert.equal(f.link.href, 'https://example.test/news/');
    assert.equal(f.window.location.href, 'https://example.test/books/');
    assert.equal(f.requests.length, 1, 'do not download all remaining pages at once');
});

test('new sections notify navigation after controls have been enhanced', async () => {
    const f = fixture();
    const announced = [];
    f.document.addEventListener('site:section-added', event => {
        assert.ok(f.enhanced.includes(event.detail.section), 'enhance controls before announcing the section');
        assert.ok(f.main.children.includes(event.detail.section), 'announce only attached content');
        announced.push(event.detail.section);
    });
    await f.near();
    await f.respond();
    assert.equal(announced.length, 1);
    assert.equal(announced[0].dataset.page, 'media');
});

test('a collapsed or expanded list rechecks the next section without requiring a new scroll', async () => {
    const f = fixture();
    await f.flush();
    assert.equal(f.requests.length, 0);
    f.panel.top = 1800;
    f.document.dispatchEvent({ type: 'site:content-resized' });
    await f.flush();
    assert.equal(f.requests.length, 1);
    f.document.dispatchEvent({ type: 'site:content-resized' });
    await f.flush();
    assert.equal(f.requests.length, 1, 'do not duplicate the pending request');
});
test('home starts after its existing Books, then follows each page next link', async () => {
    const f = fixture({ home: true }); await f.near(); await f.respond();
    await f.near(); await f.respond({ key: 'news', next: '/lectures/' });
    assert.deepEqual(f.requests.map(r => r.url), ['https://example.test/media/', 'https://example.test/news/']);
    assert.equal(f.link.href, 'https://example.test/lectures/');
    assert.equal(f.window.location.href, 'https://example.test/');
});
test('last section ends the stream and reveals the sole existing footer', async () => {
    const f = fixture(); await f.near(); await f.respond({ key: 'contact' });
    assert.equal(f.main.children.length, 2);
    assert.equal(f.panel.hidden, true);
    assert.equal(f.body.classList.contains('stream-pending'), false);
    assert.equal(f.observer.disconnected, true);
    await f.near(); assert.equal(f.requests.length, 1);
});
test('HTTP error, redirect, malformed and empty pages preserve the content and offer retry', async () => {
    for (const kind of ['http', 'redirect', 'json', 'empty']) {
        const f = fixture(); await f.near();
        await f.respond({ key: 'media', invalid: kind === 'empty' }, {
            ok: kind !== 'http', redirected: kind === 'redirect',
            ...(kind === 'json' ? { text: async () => 'broken' } : {}),
        });
        assert.equal(f.main.children.length, 1);
        assert.equal(f.panel.classList.contains('is-stream-error'), true);
        assert.equal(f.body.classList.contains('stream-pending'), false);
        await f.near(); assert.equal(f.requests.length, 1, 'no automatic retry loop');
        f.panel.children[0].emit('click'); await f.flush();
        await f.respond(); assert.equal(f.main.children.length, 2);
    }
});
test('stale in-flight mobile response cannot append after switching to desktop', async () => {
    const f = fixture(); await f.near();
    f.media.matches = false; f.controller.refresh();
    assert.equal(f.requests[0].options.signal.aborted, true);
    await f.respond(); assert.equal(f.main.children.length, 1);
    f.media.matches = true; f.controller.refresh(); await f.flush();
    assert.equal(f.requests.length, 2);
    await f.respond(); assert.equal(f.main.children.length, 2);
});
test('a loaded stream survives rotation without dropping content or fetching duplicates', async () => {
    const f = fixture(); await f.near(); await f.respond();
    f.media.matches = false; f.controller.refresh(); await f.flush();
    assert.equal(f.controller.isEnabled(), true);
    assert.equal(f.main.children.length, 2);
    await f.near(); await f.respond({ key: 'news', next: '/media/' });
    await f.near();
    assert.equal(f.requests.length, 2, 'a cycle must not append the same page twice');
    assert.equal(f.panel.classList.contains('is-stream-error'), true);
});
test('off-origin pages are not fetched, and hidden pages wait until visible', async () => {
    const f = fixture(); f.link.href = 'https://other.test/news/'; await f.near();
    assert.equal(f.requests.length, 0);
    const g = fixture(); g.document.visibilityState = 'hidden'; await g.near();
    assert.equal(g.requests.length, 0);
    g.document.visibilityState = 'visible'; g.document.emit('visibilitychange'); await g.flush();
    assert.equal(g.requests.length, 1);
});
test('network failure can recover online; timeout aborts without removing earlier content', async () => {
    const f = fixture(); await f.near();
    f.requests[0].reject(new Error('offline')); await f.flush();
    f.window.emit('online'); await f.flush(); assert.equal(f.requests.length, 2);
    for (const timeout of f.timers.values()) timeout();
    assert.equal(f.requests[1].options.signal.aborted, true);
    f.requests[1].reject(new Error('timeout')); await f.flush();
    assert.equal(f.main.children.length, 1);
    assert.equal(f.panel.classList.contains('is-stream-error'), true);
});

(async () => {
    for (const [name, run] of tests) { await run(); console.log('PASS ' + name); }
    console.log(`\n${tests.length} continuous scroll checks passed.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
