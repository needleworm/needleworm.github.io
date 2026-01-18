
// Constants & Config
const EMAILJS_PUBLIC_KEY = "61GtFyVFJ4xDftkIG";
const EMAILJS_SERVICE_ID = 'service_nicpl0u';
const EMAILJS_TEMPLATE_ID = 'template_h4ve5sp';

let preloadedCodesData = null;
let languageChartInstance = null;

// Initialize EmailJS
(function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Preload Data
    preloadImages();
    preloadCodesData();

    // 2. Render Single Page Content
    const main = document.getElementById('main-content');
    if (main) {
        renderAllSections(main);
        initTextTruncation(); // Initialize text truncation for all sections
    }

    // 3. Setup Navigation & UI
    setupMobileMenu();
    setupScrollSpy();
    setupFloatingButton();
    setupContactForm();
    setupCustomSelect(); // Initialize custom select
    setupResponsiveLimiter(); // Dynamic resize handling

    // 4. Run specific initializers
    loadCodes();
    updateHeroStats();

    // 5. Setup Submenu Hover
    setupSubmenuHover();

    // Safety check for mobile menu button
    const menuBtn = document.getElementById('mobile-menu-btn');
    if (menuBtn) {
        menuBtn.style.zIndex = '1100'; // Ensure it's above everything
    }
});

function setupResponsiveLimiter() {
    window.addEventListener('resize', () => {
        // Debounce if needed, but simple is fine for now
        const containers = document.querySelectorAll('.bookContainer, .websitesContainer, .lecturesContainer, .codesContainer, .projectContainer');
        containers.forEach(container => manageItemVisibility(container));
    });
}

function manageItemVisibility(container) {
    if (container.dataset.expanded === 'true') return;

    const isMobile = window.innerWidth <= 768;
    let limit = isMobile ? 4 : 6;

    if (window.innerWidth < 450) {
        limit = 2;
    } else if (isMobile && container.closest('#tab-websites') && container.classList.contains('websitesContainer')) {
        limit = 2;
    }
    const items = container.children;
    const total = items.length;

    // Toggle Visibility
    for (let i = 0; i < total; i++) {
        if (i < limit) {
            items[i].classList.remove('hidden-item');
        } else {
            items[i].classList.add('hidden-item');
        }
    }

    // Handle Load More Button
    // Button should be in the parent of the container
    const parent = container.parentNode;
    let btn = parent.querySelector('.btn-load-more');

    if (total > limit) {
        if (!btn) {
            btn = document.createElement('button');
            btn.className = 'btn-load-more';
            btn.innerText = '더 보기 (Show More)';
            btn.onclick = function () {
                const hidden = container.querySelectorAll('.hidden-item');
                hidden.forEach(el => el.classList.remove('hidden-item'));
                this.style.display = 'none';
                container.dataset.expanded = 'true';

                // Re-initialize truncation for newly revealed items
                setTimeout(() => initTextTruncation(), 50);
            };
            parent.appendChild(btn);
        }
        btn.style.display = 'block';
    } else {
        if (btn) btn.style.display = 'none';
    }
}

function updateHeroStats() {
    // Books
    const bookCount = document.querySelectorAll('#books .singleBookContainer').length;
    const bookEl = document.getElementById('stat-books');
    if (bookEl && bookCount > 10) bookEl.innerText = `Books ${bookCount}+`;

    // R&D (Papers + Patents + Websites)
    const papers = document.querySelectorAll('#rnd-section .singleLectureContainer, #rnd-section .singleProjectContainer').length;
    const websites = document.querySelectorAll('#dev-section .singleWebsiteCard').length;
    const totalRnD = papers + websites;

    const paperEl = document.getElementById('stat-papers');
    if (paperEl && totalRnD > 5) paperEl.innerText = `R&D ${totalRnD}+`;

    // Lectures (Courses + Lectures)
    const courses = document.querySelectorAll('#tab-courses .singleLectureContainer').length;
    const lectures = document.querySelectorAll('#tab-lectures .singleLectureContainer').length;
    const totalLectures = courses + lectures;

    const lectureEl = document.getElementById('stat-lectures');
    if (lectureEl && totalLectures > 10) lectureEl.innerText = `Lectures ${totalLectures}+`;
}

function renderAllSections(container) {
    // Re-defined Groups Matching User Request
    const groups = [
        {
            id: 'about',
            title: 'About',
            desc: '',
            templates: ['about']
        },
        {
            id: 'books',
            title: 'Books',
            desc: 'Recent Publications',
            templates: ['books'] // Single item, no tabs needed
        },
        {
            id: 'media-section',
            title: 'Media',
            desc: 'Me on Media',
            templates: ['media', 'news'] // Tabs
        },
        {
            id: 'education-section',
            title: 'Education',
            desc: 'Courses and Lectures',
            templates: ['courses', 'lectures'] // Tabs
        },
        {
            id: 'rnd-section',
            title: 'R&D',
            desc: 'Papers and Patents',
            templates: ['papers', 'patents', 'codes', 'websites']
        },

        {
            id: 'etc-section',
            title: 'ETC',
            desc: '',
            templates: ['social', 'membership', 'collections'] // Tabs
        },
        {
            id: 'contact',
            title: 'Contact',
            desc: '',
            templates: ['contact']
        }
    ];

    groups.forEach(group => {
        // Create Wrapper
        const wrapper = document.createElement('section');
        wrapper.id = group.id;
        wrapper.className = 'section-group';

        let headerHtml = `
            <div class="group-header text-center">
                <h2 class="group-title">${group.title}</h2>
                <p class="group-desc">${group.desc}</p>
        `;

        // Add Sub-nav Pills ONLY if more than 1 template
        if (group.templates.length > 1) {
            headerHtml += `<div class="sub-nav-pills">`;
            group.templates.forEach((t, index) => {
                const activeClass = index === 0 ? 'active' : '';
                headerHtml += `<button class="pill-btn ${activeClass}" onclick="switchTab('${group.id}', '${t}')">${capitalize(t)}</button>`;
            });
            headerHtml += `</div>`;
        }

        headerHtml += `</div>`; // Close group-header

        // Don't show header for Contact if not desired, but consistency is good.
        if (group.id === 'contact') {
            // Maybe simplify header for contact or keep it
        }

        wrapper.innerHTML = headerHtml;

        // Content Container
        const contentContainer = document.createElement('div');
        contentContainer.className = 'group-content-body';

        group.templates.forEach((tempId, index) => {
            const template = document.getElementById(tempId + '-template');
            if (template) {
                const clone = template.content.cloneNode(true);

                // We need to wrap each template content in a div that we can toggle
                const tabContentDiv = document.createElement('div');
                tabContentDiv.id = `tab-${tempId}`;
                tabContentDiv.className = 'tab-content-item';
                if (index !== 0) tabContentDiv.style.display = 'none'; // Hide all except first by default
                else tabContentDiv.classList.add('active-tab-content');

                const internalSection = clone.querySelector('section');
                if (internalSection) {
                    internalSection.removeAttribute('id'); // Remove duplicate ID
                    internalSection.classList.remove('animated', 'bounceInDown');
                    internalSection.style.padding = '0'; // Reset padding as wrapper has it
                }

                // Add Load More Logic (per tab)
                const innerContainer = clone.querySelector('.bookContainer, .websitesContainer, .lecturesContainer, .codesContainer, .projectContainer, .contact-container');
                if (innerContainer && tempId !== 'contact') {
                    // Initial Setup
                    manageItemVisibility(innerContainer);
                }

                tabContentDiv.appendChild(clone);
                contentContainer.appendChild(tabContentDiv);
            }
        });

        wrapper.appendChild(contentContainer);
        container.appendChild(wrapper);
    });
}

function switchTab(groupId, templateId) {
    const group = document.getElementById(groupId);
    if (!group) return;

    // 1. Update Pills
    const pills = group.querySelectorAll('.pill-btn');
    pills.forEach(btn => {
        if (btn.innerText.toLowerCase() === templateId.toLowerCase() ||
            (templateId === 'news' && btn.innerText === 'News') ||
            (templateId === 'social' && btn.innerText === 'Social')) { // Simple matching
            btn.classList.add('active');
        } else {
            // Check capitalisation text match
            if (btn.innerText.toLowerCase() === templateId.toLowerCase()) btn.classList.add('active');
            else btn.classList.remove('active');
        }
    });

    // 2. toggle Content
    const contents = group.querySelectorAll('.tab-content-item');
    contents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active-tab-content');
    });

    const target = group.querySelector(`#tab-${templateId}`);
    if (target) {
        target.style.display = 'block';
        target.classList.add('active-tab-content');

        // Restore fade in animation
        target.style.animation = 'fadeIn 0.5s ease-out';
        setTimeout(initTextTruncation, 100);

        // Specific re-render for Charts if hidden initially
        if (templateId === 'codes') {
            loadCodes();
        }
    }
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function setupMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        // Clone and replace to remove old listeners if any
        const newBtn = menuBtn.cloneNode(true);
        menuBtn.parentNode.replaceChild(newBtn, menuBtn);

        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a:not([onclick])').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

function setupScrollSpy() {
    const sectionGroups = document.querySelectorAll('.section-group');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sectionGroups.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

function setupFloatingButton() {
    const btnToTop = document.getElementById('btn-to-top');
    if (btnToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnToTop.style.display = 'flex';
            } else {
                btnToTop.style.display = 'none';
            }
        });
    }
}

/**
 * Preload GitHub repository data
 */
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
    if (!canvas) return;
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

function preloadImages() {
    const templates = document.querySelectorAll('template');
    templates.forEach(template => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = template.innerHTML;
        const images = tempDiv.querySelectorAll('img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src) new Image().src = src;
        });
    });
}

// --- Toast Notification ---
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
function initTextTruncation() {
    // Books
    const descriptions = document.querySelectorAll('.bookDescription');
    descriptions.forEach(desc => {
        // Toggle truncation logic
        const parent = desc.parentNode;
        if (!parent.querySelector('.show-more-btn') && desc.scrollHeight > desc.clientHeight) {
            const btn = document.createElement('button');
            btn.className = 'show-more-btn';
            btn.innerText = 'Show More';
            btn.onclick = function () {
                if (desc.classList.contains('description-truncated')) {
                    desc.classList.remove('description-truncated');
                    this.innerText = 'Show Less';
                } else {
                    desc.classList.add('description-truncated');
                    this.innerText = 'Show More';
                }
            };
            parent.appendChild(btn);
        }
    });
}


/* Submenu Navigation Handler */
function clickSubmenu(groupId, templateId) {
    // 1. Switch Tab
    switchTab(groupId, templateId);

    // 2. Scroll to Section
    const section = document.getElementById(groupId);
    if (section) {
        const yOffset = -80; // Offset for fixed navbar
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }

    // 3. Close Mobile Menu if open
    const navLinks = document.getElementById('nav-links');
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
}

// Submenu Hover Logic (3 seconds delay)
function setupSubmenuHover() {
    if (window.innerWidth <= 768) return; // Mobile handled by CSS default visibility

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown-menu');
        if (!dropdown) return;

        let enterTimeout;
        let leaveTimeout;

        item.addEventListener('mouseenter', () => {
            clearTimeout(leaveTimeout); // If re-entering quickly, cancel hide
            enterTimeout = setTimeout(() => {
                dropdown.classList.add('show-dropdown');
            }, 3000); // 3 seconds delay
        });

        item.addEventListener('mouseleave', () => {
            clearTimeout(enterTimeout); // Cancel show if leaving before 3s
            leaveTimeout = setTimeout(() => {
                dropdown.classList.remove('show-dropdown');
            }, 300); // Short delay before hiding to prevent flicker
        });
    });
}
