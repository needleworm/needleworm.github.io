'use strict';

// Exercise the shipped handler, without loading a browser or sending requests.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');

function eventSurface() {
    const handlers = new Map();
    return {
        addEventListener(name, fn) {
            if (!handlers.has(name)) handlers.set(name, []);
            handlers.get(name).push(fn);
        },
        emit(name, event = {}) {
            for (const fn of handlers.get(name) || []) fn(event);
        },
    };
}

function classList() {
    const values = new Set();
    return {
        contains: name => values.has(name),
        add: name => values.add(name),
        remove: name => values.delete(name),
        toggle(name, force) {
            const add = force === undefined ? !values.has(name) : force;
            if (add) values.add(name); else values.delete(name);
            return add;
        },
    };
}

function fixture({ mobile = true, nextLink = true, mobileAlternate = false, continuous = false } = {}) {
    const assigned = [];
    let now = 1000;
    const hint = { textContent: '' };
    const label = { textContent: 'Next page' };
    const description = { textContent: 'Continue to the next page' };
    const panel = {
        classList: classList(),
        querySelector: selector => selector === '.mobile-next-hint' ? hint : description,
    };
    const link = {
        href: 'https://example.test/courses/online/', closest: () => panel,
        querySelector: () => label,
        dataset: mobileAlternate ? {
            mobileHref: 'https://example.test/books/', mobileLabel: 'Books', mobileHeading: 'Book details',
        } : {},
    };
    const menu = { classList: classList() };
    const media = Object.assign(eventSurface(), { matches: mobile });
    const document = Object.assign(eventSurface(), {
        baseURI: 'https://example.test/books/',
        visibilityState: 'visible',
        documentElement: { scrollHeight: 2000 },
        activeElement: { matches: () => false },
        getElementById: id => id === 'mobile-next-link' ? (nextLink ? link : null)
            : id === 'nav-links' ? menu : null,
    });
    let selection = '';
    const window = Object.assign(eventSurface(), {
        scrollY: 1200,
        innerHeight: 800,
        visualViewport: { scale: 1 },
        matchMedia: query => {
            assert.equal(query, '(max-width: 768px)');
            return media;
        },
        getSelection: () => ({ toString: () => selection }),
        location: { assign: url => assigned.push(url) },
    });
    const context = vm.createContext({ document, window, URL, performance: { now: () => now },
        ...(continuous ? { setupMobileContinuousScroll: () => ({ isEnabled: () => true, hasAppended: () => true, refresh() {} }) } : {}),
    });
    vm.runInContext(source, context, { filename: 'script.js' });
    vm.runInContext('setupMobilePageNavigation();', context);
    const touch = (x = 100, y = 500, identifier = 1) => ({ clientX: x, clientY: y, identifier });
    const plainTarget = { closest: () => null };
    const start = (point = touch(), target = plainTarget, touches = [point]) => {
        document.emit('touchstart', { touches, target });
    };
    const move = (point = touch(100, 400), touches = [point]) => {
        document.emit('touchmove', { touches });
    };
    const end = (point = touch(100, 400), touches = []) => {
        document.emit('touchend', { changedTouches: [point], touches });
    };
    const wheel = (deltaY = 100, options = {}) => {
        document.emit('wheel', {
            deltaY, deltaX: 0, deltaMode: 0, ctrlKey: false, shiftKey: false,
            defaultPrevented: false, target: plainTarget, ...options,
        });
    };
    return {
        assigned, panel, hint, label, description, menu, document, window, media, link, touch, start, move, end, wheel,
        tick: milliseconds => { now += milliseconds; },
        select: value => { selection = value; },
        swipe() { start(); move(); end(); },
    };
}

let passed = 0;
function test(name, run) {
    run();
    passed++;
    console.log(`PASS ${name}`);
}
function noNavigation(f) { assert.deepEqual(f.assigned, []); }

test('continuous mobile scrolling never invokes the old swipe navigation', () => {
    const f = fixture({ continuous: true }); f.swipe(); noNavigation(f);
});

test('a continuous document remains in place after resizing to desktop', () => {
    const f = fixture({ mobile: false, continuous: true }); f.wheel(1000); noNavigation(f);
});

test('a new upward gesture at the bottom navigates once', () => {
    const f = fixture();
    f.start();
    f.move();
    assert.equal(f.panel.classList.contains('is-ready'), true);
    noNavigation(f);
    f.end();
    assert.deepEqual(f.assigned, [f.link.href]);
    assert.equal(f.panel.classList.contains('is-ready'), false);
    f.swipe();
    assert.equal(f.assigned.length, 1);
});

test('the gesture that merely reaches the bottom does not navigate', () => {
    const f = fixture();
    f.window.scrollY = 1100;
    f.start();
    f.window.scrollY = 1200;
    f.move();
    f.end();
    noNavigation(f);
    f.swipe();
    assert.equal(f.assigned.length, 1);
});

test('short, downward and horizontal gestures do not navigate', () => {
    for (const [x, y] of [[100, 411], [100, 600], [160, 400], [145, 410]]) {
        const f = fixture();
        f.start();
        f.move(f.touch(x, y));
        f.end(f.touch(x, y));
        noNavigation(f);
    }
});

test('90 vertical pixels are sufficient and leaving the bottom cancels', () => {
    const f = fixture();
    f.start(); f.end(f.touch(100, 410));
    assert.equal(f.assigned.length, 1);
    const g = fixture();
    g.start(); g.move(); g.window.scrollY = 1000; g.end();
    noNavigation(g);
});

test('desktop or a media-query change cannot trigger navigation', () => {
    const f = fixture({ mobile: false });
    f.swipe();
    noNavigation(f);
    const g = fixture();
    g.start(); g.move(); g.media.matches = false; g.end();
    noNavigation(g);
    assert.ok(f.hint.textContent.length > 0);
});

test('an open menu blocks gestures at start and during a swipe', () => {
    const f = fixture();
    f.menu.classList.add('active'); f.swipe();
    noNavigation(f);
    f.menu.classList.remove('active'); f.start();
    f.menu.classList.add('active'); f.move(); f.end();
    noNavigation(f);
});

test('focused form fields, selected text, zoom and hidden pages block navigation', () => {
    for (const block of [
        f => { f.document.activeElement = { matches: () => true }; },
        f => f.select('selected text'),
        f => { f.window.visualViewport.scale = 1.2; },
        f => { f.document.visibilityState = 'hidden'; },
    ]) {
        const f = fixture(); block(f); f.swipe(); noNavigation(f);
        const g = fixture(); g.start(); block(g); g.move(); g.end(); noNavigation(g);
    }
});

test('gestures beginning on interactive controls do not navigate', () => {
    const f = fixture();
    f.start(f.touch(), { closest: () => ({}) });
    f.move(); f.end();
    noNavigation(f);
});

test('the next-page link itself remains a valid place to start a swipe', () => {
    const f = fixture();
    f.start(f.touch(), { closest: () => f.link });
    f.move(); f.end();
    assert.deepEqual(f.assigned, [f.link.href]);
});

test('touch cancellation, multiple fingers and a changed finger cancel safely', () => {
    const sequences = [
        f => { f.start(); f.document.emit('touchcancel'); f.end(); },
        f => { f.start(f.touch(), undefined, [f.touch(), f.touch(120, 500, 2)]); f.end(); },
        f => { f.start(); f.move(f.touch(), [f.touch(), f.touch(120, 500, 2)]); f.end(); },
        f => { f.start(); f.move(f.touch(100, 400, 2)); f.end(); },
        f => { f.start(); f.end(f.touch(100, 400, 2)); },
        f => { f.start(); f.end(f.touch(100, 400), [f.touch(120, 400, 2)]); },
    ];
    for (const run of sequences) { const f = fixture(); run(f); noNavigation(f); }
});

test('resize and visibility changes discard an in-progress gesture', () => {
    for (const surface of ['resize', 'visibilitychange']) {
        const f = fixture(); f.start(); f.move();
        (surface === 'resize' ? f.window : f.document).emit(surface);
        f.end(); noNavigation(f);
        assert.equal(f.panel.classList.contains('is-ready'), false);
    }
});

test('bfcache pageshow resets the navigation guard without automatic navigation', () => {
    const f = fixture();
    f.swipe();
    f.window.emit('pageshow', { persisted: true });
    f.end();
    assert.equal(f.assigned.length, 1);
    f.swipe();
    assert.equal(f.assigned.length, 2);
});

test('a page without a next link installs no swipe navigation', () => {
    const f = fixture({ nextLink: false });
    f.swipe(); f.window.emit('pageshow', { persisted: true });
    noNavigation(f);
});

test('desktop downward wheel input at the bottom navigates once', () => {
    const f = fixture({ mobile: false });
    f.wheel();
    assert.deepEqual(f.assigned, [f.link.href]);
    f.wheel(); f.tick(400); f.wheel();
    assert.equal(f.assigned.length, 1);
});

test('small trackpad deltas accumulate within a deliberate bottom gesture', () => {
    const f = fixture({ mobile: false });
    for (let i = 0; i < 9; i++) { f.wheel(10); f.tick(20); }
    noNavigation(f);
    f.wheel(10);
    assert.deepEqual(f.assigned, [f.link.href]);
});

test('a wheel burst and its momentum cannot navigate merely by reaching the bottom', () => {
    const f = fixture({ mobile: false });
    f.window.scrollY = 1100;
    f.wheel(60);
    f.window.scrollY = 1200;
    for (let i = 0; i < 5; i++) { f.tick(100); f.wheel(60); }
    noNavigation(f);
    f.tick(301); f.wheel(100);
    assert.deepEqual(f.assigned, [f.link.href]);
});

test('idle gaps separate trackpad gestures instead of accumulating forever', () => {
    const f = fixture({ mobile: false });
    f.wheel(60); f.tick(301); f.wheel(60);
    noNavigation(f);
    f.tick(30); f.wheel(40);
    assert.equal(f.assigned.length, 1);
});

test('line and page wheel modes normalize to a usable pixel threshold', () => {
    const f = fixture({ mobile: false });
    f.wheel(3, { deltaMode: 1 }); f.tick(10); f.wheel(3, { deltaMode: 1 });
    noNavigation(f);
    f.wheel(1, { deltaMode: 1 });
    assert.equal(f.assigned.length, 1);
    const g = fixture({ mobile: false });
    g.wheel(1, { deltaMode: 2 });
    assert.equal(g.assigned.length, 1);
});

test('horizontal, upward, zero and modified wheel input cannot navigate', () => {
    const inputs = [
        [-100, {}], [0, {}], [100, { deltaX: 100 }], [100, { deltaX: 150 }],
        [100, { ctrlKey: true }], [100, { shiftKey: true }],
        [100, { defaultPrevented: true }],
    ];
    for (const [deltaY, options] of inputs) {
        const f = fixture({ mobile: false });
        f.wheel(deltaY, options);
        noNavigation(f);
    }
});

test('a blocked wheel event breaks an otherwise eligible accumulation', () => {
    for (const options of [{ deltaX: 120 }, { ctrlKey: true }, { shiftKey: true }, { defaultPrevented: true }]) {
        const f = fixture({ mobile: false });
        f.wheel(60);
        assert.equal(f.panel.classList.contains('is-ready'), true);
        f.tick(10); f.wheel(60, options);
        assert.equal(f.panel.classList.contains('is-ready'), false);
        f.tick(10); f.wheel(60);
        noNavigation(f);
        f.tick(301); f.wheel(100);
        assert.equal(f.assigned.length, 1);
    }
});

test('desktop menu, focus, selection, zoom and hidden state block the entire wheel burst', () => {
    for (const [block, clear] of [
        [f => f.menu.classList.add('active'), f => f.menu.classList.remove('active')],
        [f => { f.document.activeElement = { matches: () => true }; }, f => { f.document.activeElement = { matches: () => false }; }],
        [f => f.select('text'), f => f.select('')],
        [f => { f.window.visualViewport.scale = 1.2; }, f => { f.window.visualViewport.scale = 1; }],
        [f => { f.document.visibilityState = 'hidden'; }, f => { f.document.visibilityState = 'visible'; }],
    ]) {
        const f = fixture({ mobile: false });
        block(f); f.wheel(); noNavigation(f);
        clear(f); f.tick(301); f.wheel(100); assert.equal(f.assigned.length, 1);
        const g = fixture({ mobile: false });
        g.wheel(60); block(g); g.tick(10); g.wheel(60); clear(g); g.tick(10); g.wheel(60);
        noNavigation(g);
    }
});

test('interactive wheel origins are excluded, while the next link is allowed', () => {
    const f = fixture({ mobile: false });
    f.wheel(100, { target: { closest: () => ({}) } });
    noNavigation(f);
    const g = fixture({ mobile: false });
    g.wheel(100, { target: { closest: () => g.link } });
    assert.deepEqual(g.assigned, [g.link.href]);
});

test('mobile screens do not respond to desktop wheel navigation', () => {
    const f = fixture(); f.wheel(1000); noNavigation(f);
});

test('desktop pageshow resets its guard without advancing until new input', () => {
    const f = fixture({ mobile: false });
    f.wheel(); f.window.emit('pageshow', { persisted: true });
    assert.equal(f.assigned.length, 1);
    f.tick(400); f.wheel();
    assert.equal(f.assigned.length, 2);
});

test('a page without a next link also ignores wheel input', () => {
    const f = fixture({ mobile: false, nextLink: false });
    f.wheel(); noNavigation(f);
});

test('resize and visibility changes discard incomplete desktop wheel accumulation', () => {
    for (const surface of ['resize', 'visibilitychange']) {
        const f = fixture({ mobile: false });
        f.wheel(60);
        (surface === 'resize' ? f.window : f.document).emit(surface);
        f.tick(10); f.wheel(60);
        noNavigation(f);
        f.tick(10); f.wheel(40);
        assert.equal(f.assigned.length, 1);
    }
});

test('responsive route variants restore the original desktop route and reset gestures', () => {
    const f = fixture({ mobile: false, mobileAlternate: true });
    const defaultHref = f.link.href;
    f.wheel(60);
    f.media.matches = true; f.media.emit('change');
    assert.equal(f.link.href, 'https://example.test/books/');
    assert.equal(f.label.textContent, 'Books');
    assert.equal(f.description.textContent, 'Book details');
    f.media.matches = false; f.media.emit('change');
    assert.equal(f.link.href, defaultHref);
    assert.equal(f.label.textContent, 'Next page');
    assert.equal(f.description.textContent, 'Continue to the next page');
    f.wheel(60); noNavigation(f);
    f.tick(10); f.wheel(40); assert.deepEqual(f.assigned, [defaultHref]);
});

console.log(`\n${passed} page navigation checks passed.`);
