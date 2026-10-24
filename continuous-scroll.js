// Mobile enhancement over the real, independently accessible static pages.
// Only main content is appended: the address, header and browser history stay put.
function setupMobileContinuousScroll({ link, panel, mobile, enhance }) {
    const main = document.getElementById('main-content');
    if (!main || !window.IntersectionObserver || !window.fetch || !window.DOMParser) return null;

    const hint = panel.querySelector('.mobile-next-hint');
    const label = link.querySelector('.next-page-label');
    const description = panel.querySelector('.mobile-next-description');
    const visited = new Set([new URL(window.location.href).pathname.replace(/index\.html$/, '')]);
    // Home already includes all Books on mobile.
    if (document.body.dataset.page === 'home') visited.add('/books/');
    let appended = false;
    let loading = false;
    let failed = false;
    let finished = false;
    let controller = null;
    let generation = 0;
    let scheduled = false;
    const enabled = () => mobile.matches || appended;
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'stream-retry';
    retry.textContent = '다시 불러오기';
    retry.hidden = true;
    panel.append(retry);
    hint.setAttribute('role', 'status');
    hint.setAttribute('aria-live', 'polite');

    function render() {
        const active = enabled();
        document.body.classList.toggle('continuous-scroll', active);
        document.body.classList.toggle('stream-pending', active && !finished && !failed);
        panel.classList.toggle('is-stream', active);
        panel.classList.toggle('is-stream-loading', active && loading);
        panel.classList.toggle('is-stream-error', active && failed);
        panel.hidden = finished;
        retry.hidden = !active || !failed;
        if (active) hint.textContent = failed
            ? '다음 내용을 불러오지 못했습니다. 다시 시도하거나 위 링크로 이동해 주세요.'
            : loading ? `${label.textContent} 내용을 이어 불러오는 중입니다.` : '';
    }

    function check() {
        scheduled = false;
        if (!enabled() || finished || failed || loading || document.visibilityState !== 'visible') return;
        if (document.getElementById('nav-links')?.classList.contains('active')) return;
        // Fetch before the current content ends; keep ordinary native scrolling.
        if (panel.getBoundingClientRect().top <= window.innerHeight + 1800) loadNext();
    }

    function scheduleCheck() {
        if (scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(check);
    }

    function prepareSection(page, destination) {
        const source = page.getElementById('main-content');
        const key = page.body.dataset.page;
        if (!source || !source.children.length || !/^[a-z-]+$/.test(key || '') || key === 'home') {
            throw new Error('Missing page content');
        }
        const section = document.createElement('section');
        section.className = 'stream-page';
        section.dataset.page = key;
        section.dataset.source = destination.pathname;
        for (const child of source.children) section.append(document.importNode(child, true));
        // Imported content never executes scripts or brings another header/footer.
        section.querySelectorAll('script').forEach(script => script.remove());

        // Some standalone pages share wrapper IDs. Keep anchors and labels valid.
        const renamed = new Map();
        section.querySelectorAll('[id]').forEach(element => {
            if (!document.getElementById(element.id)) return;
            const previous = element.id;
            element.id = `stream-${key}-${previous}`;
            renamed.set(previous, element.id);
        });
        section.querySelectorAll('[href], [for], [aria-labelledby], [aria-controls], [aria-describedby]').forEach(element => {
            const href = element.getAttribute('href');
            if (href?.startsWith('#') && renamed.has(href.slice(1))) element.setAttribute('href', '#' + renamed.get(href.slice(1)));
            for (const attribute of ['for', 'aria-labelledby', 'aria-controls', 'aria-describedby']) {
                const value = element.getAttribute(attribute);
                if (value) element.setAttribute(attribute, value.split(/\s+/).map(id => renamed.get(id) || id).join(' '));
            }
        });
        // Resolve relative resources against the fetched page, not the starting URL.
        section.querySelectorAll('[src], [href], [poster], [action]').forEach(element => {
            for (const attribute of ['src', 'href', 'poster', 'action']) {
                const value = element.getAttribute(attribute);
                if (value && !value.startsWith('#')) element.setAttribute(attribute, new URL(value, destination).href);
            }
        });
        const title = section.querySelector(':scope > .group-header h1');
        if (title) {
            const heading = document.createElement('h2');
            heading.className = title.className;
            heading.id = `stream-${key}-title`;
            const permalink = document.createElement('a');
            permalink.href = destination.href;
            permalink.textContent = title.textContent;
            permalink.className = 'stream-permalink';
            heading.append(permalink);
            title.replaceWith(heading);
            section.setAttribute('aria-labelledby', heading.id);
        }
        return section;
    }

    async function loadNext() {
        if (!enabled() || loading || finished) return;
        const destination = new URL(link.href, window.location.href);
        if (destination.origin !== window.location.origin || visited.has(destination.pathname)) {
            failed = true;
            render();
            return;
        }
        loading = true;
        failed = false;
        const request = ++generation;
        const requestController = new AbortController();
        controller = requestController;
        const timeout = setTimeout(() => requestController.abort(), 15000);
        render();
        try {
            const response = await fetch(destination.href, { signal: requestController.signal, credentials: 'same-origin' });
            if (!response.ok || response.redirected) throw new Error('Page request failed');
            const html = await response.text();
            if (request !== generation || !enabled()) return;
            const page = new DOMParser().parseFromString(html, 'text/html');
            const section = prepareSection(page, destination);
            const next = page.getElementById('mobile-next-link');
            main.append(section);
            visited.add(destination.pathname);
            appended = true;
            if (next) {
                link.href = new URL(next.getAttribute('href'), destination).href;
                label.textContent = next.querySelector('.next-page-label').textContent;
                description.textContent = next.querySelector('.mobile-next-description').textContent;
            } else {
                finished = true;
                observer.disconnect();
            }
            // Page-specific controls must also work when reached by scrolling.
            enhance(section);
            document.dispatchEvent(new CustomEvent('site:section-added', { detail: { section } }));
        } catch (error) {
            if (request === generation && enabled()) failed = true;
        } finally {
            clearTimeout(timeout);
            if (request === generation) {
                loading = false;
                controller = null;
                render();
                scheduleCheck();
            }
        }
    }

    const observer = new IntersectionObserver(scheduleCheck, { rootMargin: '0px 0px 1800px 0px' });
    observer.observe(panel);
    // Scrolling also handles short pages that leave the observer intersecting.
    window.addEventListener('scroll', scheduleCheck, { passive: true });
    window.addEventListener('resize', scheduleCheck, { passive: true });
    window.addEventListener('pageshow', scheduleCheck);
    document.addEventListener('visibilitychange', scheduleCheck);
    document.addEventListener('site:content-resized', scheduleCheck);
    window.addEventListener('online', () => { if (failed) { failed = false; render(); scheduleCheck(); } });
    retry.addEventListener('click', loadNext);
    link.addEventListener('click', event => {
        if (!enabled() || failed || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        loadNext();
    });

    function refresh() {
        // Before the first append, resizing to desktop restores normal pagination.
        // After an append, retain the content and position through rotations/resizes.
        if (!enabled() && controller) {
            generation++;
            controller.abort();
            controller = null;
            loading = false;
        }
        render();
        scheduleCheck();
    }
    refresh();
    return { isEnabled: enabled, hasAppended: () => appended, refresh };
}
