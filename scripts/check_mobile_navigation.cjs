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

function fixture({ mobile = true, nextLink = true } = {}) {
    const assigned = [];
    const hint = { textContent: '' };
    const panel = { classList: classList(), querySelector: () => hint };
    const link = { href: 'https://example.test/courses/online/', closest: () => panel };
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
    const context = vm.createContext({ document, window, URL });
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
    return {
        assigned, panel, hint, menu, document, window, media, link, touch, start, move, end,
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
    assert.match(f.hint.textContent, /버튼/);
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

console.log(`\n${passed} mobile navigation checks passed.`);
