
// Static pages already contain all content. JavaScript only enhances interactions.
document.addEventListener('DOMContentLoaded', () => {
    restoreLegacyNavigation();
    setupPageMenu();
    setupMobilePageNavigation();
    setupLectureFilters();
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
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && menu.classList.contains('active')) { close(); button.focus(); }
    });
    window.addEventListener('resize', () => { if (window.innerWidth > 768) close(); });
}

function setupMobilePageNavigation() {
    const link = document.getElementById('mobile-next-link');
    if (!link) return;
    const panel = link.closest('.mobile-next-page');
    const hint = panel.querySelector('.mobile-next-hint');
    const mobile = window.matchMedia('(max-width: 768px)');
    const interactive = 'a, button, input, textarea, select, iframe, [contenteditable]:not([contenteditable="false"])';
    let gesture = null;
    let navigating = false;
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
    const updateHint = () => {
        reset();
        hint.textContent = mobile.matches ? '끝까지 내려온 뒤 한 번 더 위로 밀면 이동합니다.' : '위 버튼을 누르면 이동합니다.';
    };
    document.addEventListener('touchstart', event => {
        reset();
        const control = event.target.closest(interactive);
        if (!mobile.matches || navigating || event.touches.length !== 1 || !atBottom() || blocked()
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
        navigating = true;
        window.location.assign(link.href);
    }, { passive: true });
    document.addEventListener('touchcancel', reset, { passive: true });
    document.addEventListener('visibilitychange', reset);
    window.addEventListener('pageshow', () => { navigating = false; reset(); });
    window.addEventListener('resize', reset);
    mobile.addEventListener('change', updateHint);
    updateHint();
}

function setupLectureFilters() {
    const list = document.getElementById('lecture-list');
    if (!list) return;
    const categories = ['전체', '기업', '공공기관', '교육기관', '연구기관', '컨퍼런스'];
    const cards = Array.from(list.children).filter(card => card.classList.contains('singleLectureContainer'));
    const filters = document.createElement('div');
    filters.className = 'lecture-filters';
    filters.setAttribute('role', 'group');
    filters.setAttribute('aria-label', '강의 기관 분류');
    const result = document.createElement('p');
    result.className = 'lecture-results';
    result.setAttribute('role', 'status');
    result.textContent = `전체 ${cards.length}건`;
    categories.forEach(category => {
        const count = cards.filter(card => category === '전체' || card.dataset.category === category).length;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'lecture-filter';
        button.dataset.category = category;
        button.setAttribute('aria-pressed', String(category === '전체'));
        button.setAttribute('aria-controls', 'lecture-list');
        button.append(document.createTextNode(category));
        const badge = document.createElement('span');
        badge.className = 'lecture-filter-count';
        badge.textContent = count;
        button.append(badge);
        button.addEventListener('click', () => {
            filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
            cards.forEach(card => {
                const hide = category !== '전체' && card.dataset.category !== category;
                card.classList.toggle('filtered-out', hide);
                card.hidden = hide;
            });
            result.textContent = `${category} ${count}건`;
        });
        filters.append(button);
    });
    list.before(filters, result);
}

function setupCitationButtons() {
    document.querySelectorAll('.citation[data-citation]').forEach(item => {
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

function useImageFallback(image) {
    if (!(image instanceof HTMLImageElement) || image.src === IMAGE_FALLBACK_SRC) return;
    image.removeAttribute('srcset');
    image.removeAttribute('sizes');
    image.src = IMAGE_FALLBACK_SRC;
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
