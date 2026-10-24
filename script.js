
// Static pages already contain all content. JavaScript only enhances interactions.
document.addEventListener('DOMContentLoaded', () => {
    restoreLegacyNavigation();
    setupPageMenu();
    setupMobilePageNavigation();
    setupLectureFilters();
    setupMobileLists();
    setupSectionNavigation();
    setupNearbyImages();
    setupCitationButtons();
    setupContactForm();
    setupCustomSelect();
    setupSubmenuHover();
    if (document.getElementById('languageChart')) preloadCodesData();
    const topButton = document.getElementById('btn-to-top');
    if (topButton) {
        const update = () => { topButton.style.display = window.scrollY > 300 ? 'flex' : 'none'; };
        window.addEventListener('scroll', update, { passive: true });
        topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        update();
    }
    document.querySelectorAll('img').forEach(image => {
        if (image.getAttribute('src') && image.complete && image.naturalWidth === 0) useImageFallback(image);
    });
});

function restoreLegacyNavigation() {
    if (!['/', '/index.html'].includes(window.location.pathname)) return;
    const routes = {
        '#books': '/books/', '#books-section': '/books/', '#tab-books': '/books/',
        '#media-section': '/media/', '#media': '/media/', '#tab-media': '/media/',
        '#news': '/news/', '#tab-news': '/news/',
        '#education-section': '/lectures/', '#lectures': '/lectures/', '#tab-lectures': '/lectures/',
        '#courses': '/courses/online/', '#tab-courses': '/courses/online/',
        '#rnd-section': '/papers/', '#papers': '/papers/', '#tab-papers': '/papers/',
        '#patents': '/patents/', '#tab-patents': '/patents/',
        '#codes': '/projects/', '#tab-codes': '/projects/', '#websites': '/projects/', '#tab-websites': '/projects/',
        '#etc-section': '/activities/', '#social': '/activities/', '#tab-social': '/activities/',
        '#membership': '/memberships/', '#tab-membership': '/memberships/',
        '#collections': '/collections/', '#tab-collections': '/collections/', '#contact': '/contact/'
    };
    const destination = routes[window.location.hash];
    if (destination) window.location.replace(destination);
}

function setupPageMenu() {
    const button = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('nav-links');
    if (!button || !menu) return;
    const mobile = window.matchMedia('(max-width: 768px)');
    const groups = Array.from(menu.querySelectorAll(':scope > .nav-item'));
    const setOpenGroup = active => {
        groups.forEach(group => {
            const open = group === active;
            const toggle = group.querySelector('.submenu-toggle');
            const label = group.querySelector('.nav-main-link').textContent;
            group.classList.toggle('submenu-open', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', `${label} 하위 메뉴 ${open ? '접기' : '펼치기'}`);
        });
    };
    const openCurrentGroup = () => {
        const current = menu.querySelector('.nav-main-link.active, .nav-main-link[aria-current="page"]');
        setOpenGroup(current?.closest('.nav-item'));
    };
    const updateAccordion = () => {
        menu.classList.add('accordion-ready');
        groups.forEach(group => { group.querySelector('.submenu-toggle').hidden = !mobile.matches; });
        openCurrentGroup();
    };
    groups.forEach(group => {
        group.querySelector('.submenu-toggle').addEventListener('click', () => {
            if (mobile.matches) setOpenGroup(group.classList.contains('submenu-open') ? null : group);
        });
    });
    updateAccordion();
    const close = () => {
        menu.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', '메뉴 열기');
        document.body.style.overflow = '';
    };
    button.addEventListener('click', () => {
        const open = menu.classList.toggle('active');
        button.setAttribute('aria-expanded', String(open));
        button.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) { openCurrentGroup(); menu.scrollTop = 0; }
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && menu.classList.contains('active')) { close(); button.focus(); }
    });
    mobile.addEventListener('change', () => { updateAccordion(); if (!mobile.matches) close(); });
}

function setupSectionNavigation() {
    const main = document.getElementById('main-content');
    const menu = document.getElementById('nav-links');
    if (!main || !menu) return;
    const detailPages = { 'paper-detail': 'papers', 'lecture-detail': 'lectures' };
    const initialPage = detailPages[document.body.dataset.page] || document.body.dataset.page;
    let currentPage = null;
    let scheduled = false;
    let refresh = true;
    let sections = [];
    const collect = () => {
        sections = [{ key: initialPage, element: document.querySelector('.hero') || main }];
        const about = main.querySelector('#tab-about');
        const homeSection = main.querySelector('.home-section-mobile');
        if (about) sections.push({ key: initialPage, element: about });
        if (homeSection) sections.push({ key: homeSection.dataset.page, element: homeSection });
        main.querySelectorAll(':scope > .stream-page[data-page]').forEach(element => {
            sections.push({ key: element.dataset.page, element });
        });
    };
    const update = () => {
        scheduled = false;
        if (refresh) collect();
        const activationLine = Math.max(100, Math.min(window.innerHeight * .3, 250));
        let active = initialPage;
        sections.forEach(({ key, element }) => {
            if (element.getClientRects().length && element.getBoundingClientRect().top <= activationLine) active = key;
        });
        if (active === currentPage && !refresh) return;
        refresh = false;
        currentPage = active;
        document.body.dataset.activePage = active;
        const target = Array.from(menu.querySelectorAll('a[data-nav-page]')).find(link => link.dataset.navPage === active);
        const activeGroup = target?.closest('[data-nav-group]');
        menu.querySelectorAll('a[data-nav-page]').forEach(link => {
            const mainLink = link.classList.contains('nav-main-link');
            const groupActive = mainLink && link.closest('[data-nav-group]') === activeGroup;
            if (mainLink) link.classList.toggle('active', groupActive);
            if (link.dataset.lectureCategory) {
                const category = document.querySelector('#lecture-category-nav [aria-pressed="true"]')?.dataset.category || '전체';
                if (active === 'lectures' && link.dataset.lectureCategory === category) link.setAttribute('aria-current', 'true');
                else link.removeAttribute('aria-current');
            } else if (link.dataset.navPage === active) link.setAttribute('aria-current', 'page');
            else if (groupActive) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
        });
    };
    const schedule = () => {
        if (scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(update);
    };
    document.addEventListener('site:section-added', () => { refresh = true; schedule(); });
    document.addEventListener('site:content-resized', schedule);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', () => { refresh = true; schedule(); });
    window.addEventListener('pageshow', () => { refresh = true; schedule(); });
    update();
}

function setupMobilePageNavigation() {
    const link = document.getElementById('mobile-next-link');
    if (!link) return;
    const panel = link.closest('.mobile-next-page');
    const hint = panel.querySelector('.mobile-next-hint');
    const label = link.querySelector('.next-page-label');
    const description = panel.querySelector('.mobile-next-description');
    const defaultRoute = { href: link.href, label: label?.textContent, heading: description?.textContent };
    const mobile = window.matchMedia('(max-width: 768px)');
    let stream = null;
    const interactive = 'a, button, input, textarea, select, iframe, [contenteditable]:not([contenteditable="false"])';
    let gesture = null;
    let navigating = false;
    let lastWheelAt = -Infinity;
    let wheelFromBottom = false;
    let wheelDistance = 0;
    const atBottom = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 12;
    const blocked = () => document.visibilityState !== 'visible'
        || document.getElementById('nav-links')?.classList.contains('active')
        || !!document.activeElement?.matches('input, textarea, select, [contenteditable]:not([contenteditable="false"])')
        || !!window.getSelection()?.toString().trim()
        || (window.visualViewport && window.visualViewport.scale > 1.05);
    const reset = () => {
        gesture = null;
        panel.classList.remove('is-ready');
    };
    const resetAll = () => {
        reset();
        lastWheelAt = -Infinity;
        wheelFromBottom = false;
        wheelDistance = 0;
    };
    const navigate = () => {
        if (navigating) return;
        navigating = true;
        resetAll();
        window.location.assign(link.href);
    };
    const updateHint = () => {
        resetAll();
        if (stream?.hasAppended()) { stream.refresh(); return; }
        const alternate = mobile.matches && link.dataset.mobileHref;
        link.href = alternate ? link.dataset.mobileHref : defaultRoute.href;
        if (label) label.textContent = alternate ? link.dataset.mobileLabel : defaultRoute.label;
        if (description) description.textContent = alternate ? link.dataset.mobileHeading : defaultRoute.heading;
        hint.textContent = mobile.matches ? '끝까지 내려온 뒤 한 번 더 위로 밀면 이동합니다.' : '끝까지 내려온 뒤 한 번 더 아래로 스크롤하면 이동합니다.';
        stream?.refresh();
    };
    document.addEventListener('touchstart', event => {
        reset();
        const control = event.target.closest(interactive);
        if (stream?.isEnabled() || !mobile.matches || navigating || event.touches.length !== 1 || !atBottom() || blocked()
            || (control && control !== link)) return;
        const touch = event.touches[0];
        gesture = { id: touch.identifier, x: touch.clientX, y: touch.clientY };
    }, { passive: true });
    document.addEventListener('touchmove', event => {
        if (!gesture) return;
        if (event.touches.length !== 1 || blocked()) { reset(); return; }
        const touch = event.touches[0];
        if (touch.identifier !== gesture.id) { reset(); return; }
        const upward = gesture.y - touch.clientY;
        const sideways = Math.abs(touch.clientX - gesture.x);
        panel.classList.toggle('is-ready', upward >= 90 && sideways < upward / 2);
    }, { passive: true });
    document.addEventListener('touchend', event => {
        if (!gesture) return;
        const start = gesture;
        reset();
        const touch = Array.from(event.changedTouches).find(item => item.identifier === start.id);
        if (!touch || event.touches.length || !mobile.matches || navigating || !atBottom() || blocked()) return;
        const upward = start.y - touch.clientY;
        if (upward < 90 || Math.abs(touch.clientX - start.x) >= upward / 2) return;
        navigate();
    }, { passive: true });
    document.addEventListener('wheel', event => {
        const now = performance.now();
        const newGesture = now - lastWheelAt > 300;
        lastWheelAt = now;
        if (newGesture) { wheelFromBottom = atBottom(); wheelDistance = 0; }
        const control = event.target.closest(interactive);
        if (stream?.isEnabled() || mobile.matches || navigating || event.defaultPrevented || event.ctrlKey || event.shiftKey
            || event.deltaY <= 0 || Math.abs(event.deltaX) >= Math.abs(event.deltaY)
            || blocked() || (control && control !== link) || !atBottom()) {
            wheelFromBottom = false;
            wheelDistance = 0;
            panel.classList.remove('is-ready');
            return;
        }
        // A wheel/trackpad burst that reaches the footer must settle before it
        // can turn the page. Momentum from that burst cannot trigger a turn.
        if (!wheelFromBottom) return;
        const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
        wheelDistance += event.deltaY * unit;
        panel.classList.toggle('is-ready', wheelDistance >= 50);
        if (wheelDistance >= 100) navigate();
    }, { passive: true });
    document.addEventListener('touchcancel', reset, { passive: true });
    document.addEventListener('visibilitychange', resetAll);
    window.addEventListener('pageshow', () => { navigating = false; resetAll(); });
    window.addEventListener('resize', resetAll);
    mobile.addEventListener('change', updateHint);
    updateHint();
    if (typeof setupMobileContinuousScroll === 'function') {
        stream = setupMobileContinuousScroll({ link, panel, mobile, enhance: enhanceStreamSection });
    }
}

function loadStreamLibrary(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.append(script);
    });
}

function enhanceStreamSection(section) {
    if (section.querySelector('#lecture-list')) setupLectureFilters();
    setupMobileLists(section);
    setupNearbyImages(section);
    setupCitationButtons(section);
    if (section.querySelector('#contact-form')) {
        setupContactForm();
        setupCustomSelect();
        if (typeof emailjs === 'undefined') {
            loadStreamLibrary('https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js')
                .then(() => emailjs.init(EMAILJS_PUBLIC_KEY))
                .catch(() => console.warn('Contact library could not be loaded.'));
        }
    }
    if (section.querySelector('#languageChart')) {
        const ready = typeof Chart === 'undefined'
            ? loadStreamLibrary('https://cdn.jsdelivr.net/npm/chart.js') : Promise.resolve();
        ready.then(preloadCodesData).catch(() => console.warn('Project chart could not be loaded.'));
    }
}

function setupLectureFilters() {
    const list = document.getElementById('lecture-list');
    const nav = document.getElementById('lecture-category-nav');
    const results = document.getElementById('lecture-results');
    if (!list || !nav || !results || nav.dataset.filtersReady) return;
    nav.dataset.filtersReady = 'true';
    const cards = Array.from(list.querySelectorAll('.singleLectureContainer'));
    const buttons = Array.from(nav.querySelectorAll('.lecture-filter'));
    const menuLinks = Array.from(document.querySelectorAll('#nav-links a[data-lecture-category]'));
    const apply = (category, scroll = false) => {
        let count = 0;
        cards.forEach(card => {
            card.hidden = category !== '전체' && card.dataset.category !== category;
            if (!card.hidden) count++;
        });
        buttons.forEach(button => {
            button.setAttribute('aria-pressed', String(button.dataset.category === category));
        });
        menuLinks.forEach(link => {
            if (link.dataset.lectureCategory === category) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
        });
        results.textContent = `${category} ${count}건 · 최신 강의순`;
        document.dispatchEvent(new CustomEvent('site:list-filtered', { detail: { list } }));
        if (scroll) results.scrollIntoView({ block: 'start', behavior: 'instant' });
    };
    const updateOffset = () => {
        const headerHeight = document.querySelector('.navbar')?.getBoundingClientRect().height || 70;
        const offset = `${headerHeight + nav.getBoundingClientRect().height + 28}px`;
        list.style.setProperty('--lecture-anchor-offset', offset);
        results.style.setProperty('--lecture-anchor-offset', offset);
    };
    buttons.forEach(button => button.addEventListener('click', () => apply(button.dataset.category, true)));
    menuLinks.forEach(link => link.addEventListener('click', event => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        apply(link.dataset.lectureCategory, true);
    }));
    window.addEventListener('hashchange', () => {
        const category = buttons.find(button => button.dataset.categoryId === window.location.hash.slice(1));
        if (category || ['', '#lecture-list'].includes(window.location.hash)) {
            apply(category?.dataset.category || '전체', true);
        }
    });
    window.addEventListener('resize', updateOffset);
    window.addEventListener('pageshow', updateOffset);
    updateOffset();
    const legacyCategory = buttons.find(button => button.dataset.categoryId === window.location.hash.slice(1));
    apply(legacyCategory?.dataset.category || '전체');
}

// Keep all records in the static HTML; mobile previews four rows, then reveals the full list.
// Books deliberately stay fully visible, both on their own page and in the home stream.
function setupMobileLists(root = document) {
    if (!setupMobileLists.controller) {
        const mobile = window.matchMedia('(max-width: 768px)');
        const entries = new Map();
        const labels = {
            media: '영상', news: '언론 보도', lectures: '강의',
            'courses-online': '온라인 강좌', 'courses-offline': '오프라인 교육과정',
            papers: '논문', patents: '특허', websites: '프로젝트',
            social: '활동', membership: '회원 활동', collections: '소장품'
        };
        let sequence = 0;
        let scheduled = false;
        const eligible = entry => Array.from(entry.list.children).filter(item =>
            item.matches(entry.table ? 'tr' : '.singleLectureContainer, .singleProjectContainer') && !item.hidden);
        const columns = entry => entry.table ? 1 : Math.max(1,
            getComputedStyle(entry.list).gridTemplateColumns.split(/\s+/).length);
        const notify = () => document.dispatchEvent(new CustomEvent('site:content-resized'));
        const render = entry => {
            const items = eligible(entry);
            const limit = entry.expanded ? items.length : 4 * columns(entry);
            Array.from(entry.list.children).forEach(item => item.classList.remove('mobile-list-folded'));
            if (mobile.matches) items.slice(limit).forEach(item => item.classList.add('mobile-list-folded'));
            entry.visible = mobile.matches ? Math.min(items.length, limit) : items.length;
            const remaining = items.length - entry.visible;
            entry.controls.hidden = !mobile.matches || remaining === 0;
            entry.status.textContent = `${items.length}건 중 ${entry.visible}건 표시`;
            entry.button.textContent = `${entry.label} 더 보기 (${remaining}건 남음)`;
        };
        const refresh = () => {
            scheduled = false;
            entries.forEach(render);
            notify();
        };
        const schedule = () => {
            if (scheduled) return;
            scheduled = true;
            window.requestAnimationFrame(refresh);
        };
        document.addEventListener('site:list-filtered', event => {
            const entry = entries.get(event.detail.list);
            if (!entry) return;
            entry.expanded = false;
            render(entry);
            notify();
        });
        window.addEventListener('resize', schedule, { passive: true });
        window.addEventListener('pageshow', schedule);
        setupMobileLists.controller = {
            enhance(scope) {
                scope.querySelectorAll('.websitesContainer, .lecturesContainer, .codesContainer, .projectContainer, .donation-table tbody').forEach(list => {
                    if (entries.has(list)) return;
                    const table = list.matches('tbody');
                    if (!list.querySelector(table ? ':scope > tr' : ':scope > .singleLectureContainer, :scope > .singleProjectContainer')) return;
                    const section = list.closest('.tab-content-item');
                    if (section?.id === 'tab-books') return;
                    if (!list.id) list.id = `mobile-list-${++sequence}`;
                    const controls = document.createElement('div');
                    controls.className = 'mobile-list-controls';
                    const status = document.createElement('p');
                    status.className = 'mobile-list-status';
                    status.setAttribute('role', 'status');
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'mobile-list-more';
                    button.setAttribute('aria-controls', list.id);
                    controls.append(status, button);
                    const entry = { list, table, controls, status, button, expanded: false,
                        label: table ? '기부 내역' : labels[section?.id.replace(/^tab-/, '')] || '목록' };
                    entries.set(list, entry);
                    render(entry);
                    (table ? list.closest('.donation-table-wrap') : list).after(controls);
                    button.addEventListener('click', () => {
                        const firstNew = eligible(entry)[entry.visible];
                        entry.expanded = true;
                        render(entry);
                        if (firstNew) {
                            const focusTarget = firstNew.querySelector('h3, h4, h5') || firstNew;
                            focusTarget.setAttribute('tabindex', '-1');
                            focusTarget.focus({ preventScroll: true });
                            firstNew.scrollIntoView({ block: 'start', behavior: 'instant' });
                        }
                        notify();
                    });
                });
                notify();
            }
        };
    }
    setupMobileLists.controller.enhance(root);
}

function setupCitationButtons(root = document) {
    root.querySelectorAll('.citation[data-citation]').forEach(item => {
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', '인용 정보 복사');
        if (!item.hasAttribute('onclick')) item.addEventListener('click', () => copyCitation(item));
        item.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                copyCitation(item);
            }
        });
    });
}

async function copyCitation(item) {
    const citation = item.dataset.citation;
    if (!citation) return;
    try {
        await navigator.clipboard.writeText(citation);
        showToast('인용 정보를 복사했습니다.');
    } catch {
        showToast('인용 정보를 복사하지 못했습니다. 브라우저의 클립보드 설정을 확인해 주세요.', 'error');
    }
}

// Constants & Config
const EMAILJS_PUBLIC_KEY = "61GtFyVFJ4xDftkIG";
const EMAILJS_SERVICE_ID = 'service_nicpl0u';
const EMAILJS_TEMPLATE_ID = 'template_h4ve5sp';

let preloadedCodesData = null;
let languageChartInstance = null;

// Shared fallback for missing or unavailable images, including rendered templates.
const IMAGE_FALLBACK_SRC = new URL('/src/images/fallback.webp', document.baseURI).href;
const sameSiteImageAttempts = new WeakSet();
let nearbyImageObserver;

function setupNearbyImages(root = document) {
    if (!window.IntersectionObserver) return;
    nearbyImageObserver ||= new IntersectionObserver(entries => {
        entries.forEach(({ target: image, isIntersecting }) => {
            if (!isIntersecting || !image.getClientRects().length) return;
            // Start before a card enters view, including after category filtering.
            image.loading = 'eager';
            nearbyImageObserver.unobserve(image);
        });
    }, { rootMargin: '1200px 0px' });
    root.querySelectorAll('img[loading="lazy"]').forEach(image => nearbyImageObserver.observe(image));
}

function sameSiteImageSource(image) {
    try {
        const source = new URL(image.currentSrc || image.src, document.baseURI);
        if (source.origin !== 'https://cdn.jsdelivr.net') return null;
        const match = source.pathname.match(/^\/gh\/needleworm\/needleworm\.github\.io@[^/]+(\/src\/images\/.+)$/);
        return match ? new URL(match[1], document.baseURI).href : null;
    } catch {
        return null;
    }
}

function useImageFallback(image) {
    if (!(image instanceof HTMLImageElement) || image.src === IMAGE_FALLBACK_SRC) return;
    const sameSiteSource = !sameSiteImageAttempts.has(image) && sameSiteImageSource(image);
    image.removeAttribute('srcset');
    image.removeAttribute('sizes');
    // A CDN failure should not hide a copy already available on this website.
    if (sameSiteSource) sameSiteImageAttempts.add(image);
    image.src = sameSiteSource || IMAGE_FALLBACK_SRC;
}

document.addEventListener('error', event => useImageFallback(event.target), true);

// Initialize EmailJS
(function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();


async function preloadCodesData() {
    if (preloadedCodesData) return;
    try {
        const [userRepos, orgRepos] = await Promise.all([
            fetch('https://api.github.com/users/needleworm/repos?per_page=200').then(r => r.json()),
            fetch('https://api.github.com/users/NaNaCompany/repos?per_page=200').then(r => r.json())
        ]);
        const safeUserRepos = Array.isArray(userRepos) ? userRepos : [];
        const safeOrgRepos = Array.isArray(orgRepos) ? orgRepos : [];
        const allRepos = [...safeUserRepos, ...safeOrgRepos];

        let totalStars = 0;
        let totalForks = 0;
        const languages = {};

        allRepos.forEach(repo => {
            totalStars += repo.stargazers_count;
            totalForks += repo.forks_count;
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });

        preloadedCodesData = { totalStars, totalForks, languages, allRepos };
        loadCodes();
        // updateHeroStats(); // Called in main init

    } catch (e) {
        console.error("Failed to preload GitHub data", e);
        preloadedCodesData = {
            totalStars: 1716, totalForks: 1826,
            languages: { 'Python': 43, 'JavaScript': 31, 'CSS': 16, 'HTML': 11, 'TypeScript': 1, 'ETC': 3 }
        };
        loadCodes();
    }
}


function loadCodes() {
    const starsEl = document.getElementById('total-stars');
    const forksEl = document.getElementById('total-forks');

    // Check if element exists (might be hidden or not rendered yet)
    if (!starsEl) return;

    const data = preloadedCodesData || {
        totalStars: '-', totalForks: '-',
        languages: { 'Python': 43, 'JavaScript': 31, 'CSS': 16, 'HTML': 11, 'TypeScript': 1, 'ETC': 3 }
    };

    if (starsEl) starsEl.innerText = data.totalStars;
    if (forksEl) forksEl.innerText = data.totalForks;

    renderLanguageChart(data.languages);
}


function renderLanguageChart(languages) {
    const canvas = document.getElementById('languageChart');
    if (!canvas || typeof Chart === 'undefined') return;
    // Check visibility
    // if (canvas.offsetParent === null) return; // Removed to force render even if hidden initially

    const ctx = canvas.getContext('2d');

    if (languageChartInstance) languageChartInstance.destroy();

    const sorted = Object.entries(languages).sort((a, b) => b[1] - a[1]);
    const labels = [];
    const data = [];
    let etcCount = 0;

    sorted.forEach((item, index) => {
        if (index < 5) {
            labels.push(item[0]);
            data.push(item[1]);
        } else {
            etcCount += item[1];
        }
    });
    if (etcCount > 0) {
        labels.push('ETC');
        data.push(etcCount);
    }

    languageChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6', '#95a5a6'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}


function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// --- Contact Form Setup ---

function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Get form elements
    const nameInput = document.getElementById('mail_name');
    const institutionDiv = document.getElementById('div-institution');
    const institutionInput = document.getElementById('mail_institution');
    const phoneDiv = document.getElementById('div-phone');
    const phoneInput = document.getElementById('mail_phone');
    const emailDiv = document.getElementById('div-email');

    // Progressive Reveal Logic
    if (nameInput && institutionDiv) {
        nameInput.addEventListener('input', function () {
            if (this.value.trim().length > 0 && !institutionDiv.classList.contains('visible')) {
                institutionDiv.classList.add('visible');
            }
        });
    }

    if (institutionInput && phoneDiv) {
        institutionInput.addEventListener('input', function () {
            if (this.value.trim().length > 0 && !phoneDiv.classList.contains('visible')) {
                phoneDiv.classList.add('visible');
            }
        });
    }

    if (phoneInput && emailDiv) {
        phoneInput.addEventListener('input', function () {
            // Format phone number
            let number = this.value.replace(/[^0-9]/g, '');
            let formatted = '';
            if (number.length < 4) {
                formatted = number;
            } else if (number.length < 8) {
                formatted = number.slice(0, -4) + '-' + number.slice(-4);
            } else {
                formatted = number.slice(0, -8) + '-' + number.slice(-8, -4) + '-' + number.slice(-4);
            }
            if (this.value !== formatted) {
                this.value = formatted;
            }

            // Reveal email field
            if (number.length > 0 && !emailDiv.classList.contains('visible')) {
                emailDiv.classList.add('visible');
            }
        });
    }

    // Form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (typeof emailjs === 'undefined') {
            showToast('문의 전송 기능을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.', 'error');
            return;
        }

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;

        btn.textContent = 'Sending...';
        btn.disabled = true;

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
            .then(() => {
                showToast('문의가 접수되었습니다.', 'success');
                btn.textContent = originalText;
                btn.disabled = false;
                form.reset();

                // Reset hidden fields
                if (institutionDiv) institutionDiv.classList.remove('visible');
                if (phoneDiv) phoneDiv.classList.remove('visible');
                if (emailDiv) emailDiv.classList.remove('visible');

            }, (error) => {
                showToast('오류가 발생했습니다. 다시 시도해주세요.', 'error');
                console.error('EmailJS Error:', error);
                btn.textContent = originalText;
                btn.disabled = false;
            });
    });
}


function setupCustomSelect() {
    const x = document.getElementsByClassName("custom-select");
    if (x.length === 0) return;

    for (let i = 0; i < x.length; i++) {
        const selElmnt = x[i].getElementsByClassName("select-selected")[0];
        const a = x[i].getElementsByClassName("select-items")[0];
        const hiddenInput = x[i].parentElement.querySelector('#country_code');

        if (selElmnt) {
            selElmnt.addEventListener("click", function (e) {
                e.stopPropagation();
                closeAllSelect(this);
                a.classList.toggle("select-hide");
                this.classList.toggle("select-arrow-active");
            });
        }

        if (a) {
            const opts = a.getElementsByTagName("div");
            for (let j = 0; j < opts.length; j++) {
                opts[j].addEventListener("click", function (e) {
                    e.stopPropagation();
                    const val = this.getAttribute('data-value');
                    const txt = this.innerText;

                    selElmnt.innerText = txt;
                    if (hiddenInput) hiddenInput.value = val;

                    a.classList.add("select-hide");
                    selElmnt.classList.remove("select-arrow-active");
                });
            }
        }
    }

    document.addEventListener("click", closeAllSelect);
}


function closeAllSelect(elmnt) {
    const x = document.getElementsByClassName("select-items");
    const y = document.getElementsByClassName("select-selected");
    const xl = x.length;
    const yl = y.length;
    const arrNo = [];
    for (let i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (let i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

// --- Text Truncation ---

function setupSubmenuHover() {
    if (window.innerWidth <= 768) return; // Mobile handled by CSS default visibility

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown-menu');
        if (!dropdown) return;

        let leaveTimeout;

        item.addEventListener('mouseenter', () => {
            clearTimeout(leaveTimeout); // If re-entering quickly, cancel hide
            dropdown.classList.add('show-dropdown');
        });

        item.addEventListener('mouseleave', () => {
            leaveTimeout = setTimeout(() => {
                dropdown.classList.remove('show-dropdown');
            }, 300); // Short delay before hiding to prevent flicker
        });
    });
}
