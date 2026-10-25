/* Country-based entry routing. Explicit URLs and the footer language choice win. */
(() => {
    'use strict';
    if (window.NaNaLocaleRouting) return;

    const supported = new Set(['ko', 'en', 'zh', 'hi', 'es', 'ar', 'fr', 'bn', 'pt']);
    const manualKey = 'nana-language';
    const automaticKey = 'nana-auto-language';
    const initialHref = window.location.href;
    const current = new URL(initialHref);
    const normalize = path => path.replace(/index\.html$/, '') || '/';
    const localeOf = value => typeof value === 'string' && supported.has(value) ? value : null;
    const read = (storage, key) => {
        try { return localeOf(window[storage].getItem(key)); } catch { return null; }
    };
    const write = (storage, key, value) => {
        try { window[storage].setItem(key, value); return true; } catch { return false; }
    };
    const browserLanguages = () => {
        const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
        return languages.map(value => localeOf(String(value || '').toLowerCase().split(/[-_]/)[0])).filter(Boolean);
    };
    const browserLocale = () => browserLanguages()[0] || 'en';

    const countries = Object.create(null);
    const group = (locale, codes) => codes.split(' ').forEach(code => { countries[code] = locale; });
    group('ko', 'KR KP');
    group('zh', 'CN TW HK MO');
    group('hi', 'IN');
    group('bn', 'BD');
    group('es', 'ES MX AR BO CL CO CR CU DO EC SV GQ GT HN NI PA PY PE PR UY VE');
    group('pt', 'PT BR AO CV GW MZ ST TL');
    group('ar', 'DZ BH KM DJ EG IQ JO KW LB LY MR MA OM PS QA SA SO SD SY TN AE YE');
    group('fr', 'FR CA BE CH LU MC BJ BF BI CM CF TD CG CD CI GA GN MG ML NE RW SN SC TG VU HT');
    group('en', 'US GB AU NZ IE SG AG BS BB BZ BW DM FJ GM GH GD GY JM KE KI LS LR MW MT MH MU FM NA NG PW PG PH KN LC VC SL SB ZA SS SZ TZ TO TT TV UG ZM ZW');
    // Only multilingual countries use a browser preference ahead of their default.
    const multilingual = { IN: ['hi', 'bn', 'en'], CA: ['en', 'fr'], BE: ['fr'], CH: ['fr'], SG: ['en', 'zh'] };
    countries.CA = 'en';
    countries.SG = 'en';
    const countryLocale = country => {
        const plausible = multilingual[country];
        return (plausible && browserLanguages().find(locale => plausible.includes(locale))) || countries[country] || browserLocale();
    };

    let interrupted = false;
    let manualChoice = false;
    let resolveInterruption;
    const interruption = new Promise(resolve => { resolveInterruption = resolve; });
    const stop = () => { interrupted = true; resolveInterruption(null); };
    const visibility = () => { if (document.hidden) stop(); };
    const interactionEvents = ['pointerdown', 'keydown', 'touchstart', 'wheel'];
    interactionEvents.forEach(name => document.addEventListener(name, stop, { passive: true, capture: true }));
    document.addEventListener('visibilitychange', visibility);

    // Delegation is installed before the asynchronous country request starts.
    document.addEventListener('click', event => {
        const anchor = event.target?.closest?.('.language-switcher a[hreflang]');
        if (!anchor) return;
        const locale = localeOf(anchor.getAttribute('hreflang'));
        if (!locale) return;
        let target;
        try { target = new URL(anchor.getAttribute('href'), window.location.href); } catch { return; }
        if (target.origin !== current.origin || !/^https?:$/.test(target.protocol)) return;
        manualChoice = true;
        stop();
        const persisted = write('localStorage', manualKey, locale);
        // A Korean link still works when privacy settings disable persistent storage.
        if (!persisted && locale === 'ko') {
            target.searchParams.set('lang', 'ko');
            anchor.setAttribute('href', target.href);
        }
    }, true);

    const result = (locale, redirected, reason) => ({ locale, redirected, reason });
    const targetsForPage = () => {
        if (!/^https?:$/.test(current.protocol) || !['ko', 'ko-kr'].includes((document.documentElement.lang || '').toLowerCase())) return null;
        if (/\.[^/]+$/.test(current.pathname) && !/\.html$/.test(current.pathname)) return null;
        const canonicalElement = document.querySelector('link[rel="canonical"]');
        if (!canonicalElement) return null;
        let canonical;
        try { canonical = new URL(canonicalElement.getAttribute('href'), initialHref); } catch { return null; }
        if (canonical.origin !== current.origin || canonical.search || canonical.hash || normalize(canonical.pathname) !== normalize(current.pathname)) return null;
        const targets = new Map();
        document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => {
            const locale = localeOf(link.getAttribute('hreflang'));
            if (!locale) return;
            let target;
            try { target = new URL(link.getAttribute('href'), initialHref); } catch { return; }
            const expected = (locale === 'ko' ? '' : '/' + locale) + normalize(canonical.pathname);
            if (target.origin === current.origin && !target.search && !target.hash && normalize(target.pathname) === expected) targets.set(locale, target);
        });
        return targets.has('ko') ? targets : null;
    };
    const legacyHashes = new Set(('#books #books-section #tab-books #media-section #media #tab-media #news #tab-news ' +
        '#education-section #lectures #tab-lectures #courses #tab-courses #rnd-section #papers #tab-papers #patents #tab-patents ' +
        '#codes #tab-codes #websites #tab-websites #etc-section #social #tab-social #membership #tab-membership ' +
        '#collections #tab-collections #contact').split(' '));

    const lookupCountry = async () => {
        const controller = new AbortController();
        let timer;
        const timeout = new Promise(resolve => {
            timer = setTimeout(() => { controller.abort(); resolve(null); }, 1800);
        });
        try {
            const request = fetch('https://www.cloudflare.com/cdn-cgi/trace', {
                credentials: 'omit', referrerPolicy: 'no-referrer', cache: 'no-store', signal: controller.signal
            }).then(response => response.ok ? response.text() : '').then(body => {
                // Discard the trace body; never read, log, or retain its IP field.
                const match = /^loc=([A-Z]{2})\r?$/m.exec(body);
                return match ? match[1] : null;
            }).catch(() => null);
            return await Promise.race([request, timeout, interruption]);
        } finally {
            clearTimeout(timer);
            controller.abort();
        }
    };

    let ready;
    const start = () => {
        if (ready) return ready;
        ready = (async () => {
            const override = localeOf(current.searchParams.get('lang'));
            if (override) write('localStorage', manualKey, override);
            const explicit = /^\/(en|zh|hi|es|ar|fr|bn|pt)(?=\/|$)/.exec(current.pathname);
            if (explicit) return result(explicit[1], false, 'explicit-path');
            const targets = targetsForPage();
            if (!targets) return result('ko', false, 'unsupported-page');
            if (normalize(current.pathname) === '/' && legacyHashes.has(current.hash)) return result('ko', false, 'legacy-route');
            const apply = (locale, reason) => {
                if (manualChoice || interrupted || document.hidden || window.location.href !== initialHref) return result(locale, false, 'interrupted');
                const target = targets.get(locale);
                if (!target) return result(locale, false, 'missing-alternate');
                if (locale === 'ko') return result(locale, false, reason);
                target.search = current.search;
                target.hash = current.hash;
                window.location.replace(target.href);
                return result(locale, true, reason);
            };
            const manual = override || read('localStorage', manualKey);
            if (manual) return apply(manual, override ? 'query-choice' : 'saved-choice');
            if (/(?:bot|crawler|spider|slurp|bingpreview|headless)/i.test(navigator.userAgent || '') || /^(localhost|127(?:\.\d+){3}|\[::1\])$/.test(current.hostname)) return result('ko', false, 'local-or-bot');
            if (document.hidden || interrupted) return result('ko', false, 'interrupted');
            const cached = read('sessionStorage', automaticKey);
            if (cached) return apply(cached, 'session-choice');
            const country = await lookupCountry();
            const locale = country ? countryLocale(country) : browserLocale();
            if (manualChoice || interrupted || document.hidden || window.location.href !== initialHref) return result(locale, false, 'interrupted');
            write('sessionStorage', automaticKey, locale);
            return apply(locale, country ? 'country' : 'browser-fallback');
        })().finally(() => {
            interactionEvents.forEach(name => document.removeEventListener(name, stop, true));
            document.removeEventListener('visibilitychange', visibility);
        });
        return ready;
    };
    window.NaNaLocaleRouting = { start, get ready() { return ready; } };
    start();
})();
