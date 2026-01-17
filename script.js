
// Constants & Config
const EMAILJS_PUBLIC_KEY = "user_DCLrQLd813G6O6Gf3647V";
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
        initPaperTruncation(); // Initialize paper text truncation
    }

    // 3. Setup Navigation & UI
    setupMobileMenu();
    setupScrollSpy();
    setupFloatingButton();
    setupContactForm();

    // 4. Run specific initializers
    loadCodes();
    updateHeroStats();
});

function updateHeroStats() {
    // Books
    const bookCount = document.querySelectorAll('#books .singleBookContainer').length;
    const bookEl = document.getElementById('stat-books');
    if (bookEl && bookCount > 10) bookEl.innerText = `Books ${bookCount}+`;

    // Papers & Patents
    const papers = document.querySelectorAll('#rnd-section .singleLectureContainer, #rnd-section .singleProjectContainer').length;
    const totalResearch = papers;

    const paperEl = document.getElementById('stat-papers');
    if (paperEl && totalResearch > 5) paperEl.innerText = `Papers & Patents ${totalResearch}+`;

    // Lectures
    const courses = document.querySelectorAll('#education-section .singleLectureContainer').length;
    const totalLectures = courses;

    const lectureEl = document.getElementById('stat-lectures');
    if (lectureEl && totalLectures > 10) lectureEl.innerText = `Lectures ${totalLectures}+`;
}

function renderAllSections(container) {
    // Re-defined Groups Matching User Request
    const groups = [
        {
            id: 'books',
            title: 'Books',
            desc: '저서',
            templates: ['books'] // Single item, no tabs needed
        },
        {
            id: 'media-section',
            title: 'Media',
            desc: '언론 보도 및 뉴스',
            templates: ['media', 'news'] // Tabs
        },
        {
            id: 'education-section',
            title: 'Education',
            desc: '강의 및 교육',
            templates: ['courses', 'lectures'] // Tabs
        },
        {
            id: 'rnd-section',
            title: 'R&D',
            desc: '논문 및 특허',
            templates: ['papers', 'patents'] // Tabs
        },
        {
            id: 'dev-section',
            title: 'Dev',
            desc: '개발 프로젝트',
            templates: ['codes', 'websites'] // Tabs
        },
        {
            id: 'etc-section',
            title: 'ETC',
            desc: '기타 활동',
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

                // Cleanup clone (remove internal section tags to avoid nesting issues or duplicate IDs)
                // Actually, the template contains a <section>. We should probably strip that <section> tag 
                // and just take its innerHTML, OR just simple append.
                // If we append the <section>, it might have ID conflict if we are not careful.
                // The templates have IDs like id="books", id="media". 
                // We should probably remove those IDs or allow them but ensure uniqueness.
                // Best to strip the outer <section> tag from the template if possible.

                const internalSection = clone.querySelector('section');
                if (internalSection) {
                    internalSection.removeAttribute('id'); // Remove duplicate ID
                    internalSection.classList.remove('animated', 'bounceInDown');
                    internalSection.style.padding = '0'; // Reset padding as wrapper has it
                }

                // Add Load More Logic (per tab)
                const innerContainer = clone.querySelector('.bookContainer, .websitesContainer, .lecturesContainer, .codesContainer, .projectContainer, .contact-container');
                if (innerContainer && tempId !== 'contact') {
                    const items = innerContainer.children;
                    const isMobile = window.innerWidth <= 768;
                    const limit = isMobile ? 3 : 6;

                    if (items.length > limit) {
                        for (let i = limit; i < items.length; i++) {
                            items[i].classList.add('hidden-item');
                        }

                        const loadMoreBtn = document.createElement('button');
                        loadMoreBtn.className = 'btn-load-more';
                        loadMoreBtn.innerText = '더 보기 (Show More)';
                        loadMoreBtn.onclick = function () {
                            const hidden = innerContainer.querySelectorAll('.hidden-item');
                            hidden.forEach(el => el.classList.remove('hidden-item'));
                            this.style.display = 'none';

                            // Re-initialize truncation for newly revealed items (specifically for Papers)
                            if (tempId === 'papers') {
                                // Small timeout to ensure rendering is complete
                                setTimeout(() => initPaperTruncation(), 50);
                            }
                        };

                        // Append to the internal section or tabContentDiv
                        if (internalSection) internalSection.appendChild(loadMoreBtn);
                        else tabContentDiv.appendChild(loadMoreBtn);
                    }
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
    }
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function setupMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
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
            fetch('https://api.github.com/users/needleworm/repos?per_page=100').then(r => r.json()),
            fetch('https://api.github.com/users/NaNaCompany/repos?per_page=100').then(r => r.json())
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
    if (canvas.offsetParent === null) return; // Hidden, don't render yet? Or render anyway.

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

// --- Contact Form ---
function setupContactForm() {
    document.addEventListener('submit', function (event) {
        if (event.target && event.target.id === 'contact-form') {
            event.preventDefault();
            const form = event.target;
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
                .then(() => {
                    alert('Message sent successfully!');
                    btn.textContent = originalText;
                    btn.disabled = false;
                    form.reset();
                }, (error) => {
                    alert('Failed to send message.');
                    console.error(error);
                    btn.textContent = originalText;
                    btn.disabled = false;
                });
        }
    });

    document.addEventListener('input', function (e) {
        if (['mail_name', 'mail_institution', 'mail_phone'].includes(e.target.id)) {
            const target = e.target;
            if (target.id === 'mail_phone') {
                let number = target.value.replace(/[^0-9]/g, '');
                let formatted = '';
                if (number.length < 4) formatted = number;
                else if (number.length < 8) formatted = number.slice(0, -4) + '-' + number.slice(-4);
                else formatted = number.slice(0, -8) + '-' + number.slice(-8, -4) + '-' + number.slice(-4);
                if (target.value !== formatted) target.value = formatted;
            }
        }
    });
}

// --- YouTube Facade ---
document.addEventListener('click', function (e) {
    const facade = e.target.closest('.youtube-facade');
    if (facade) {
        const src = facade.getAttribute('data-src');
        const title = facade.getAttribute('data-title');
        const iframe = document.createElement('iframe');
        iframe.className = 'YoutubePreview';
        iframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1';
        iframe.title = title;
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        facade.parentNode.replaceChild(iframe, facade);
    }
});

function initPaperTruncation() {
    const descriptions = document.querySelectorAll('#tab-papers .codeBody .bookDescription');
    descriptions.forEach(desc => {
        desc.classList.add('paper-description-truncated');

        // Check if truncation is actually needed
        // Also check if button already exists to avoid duplication
        if (desc.scrollHeight > desc.clientHeight && !desc.parentElement.querySelector('.paper-show-more-btn')) {
            const btn = document.createElement('button');
            btn.className = 'paper-show-more-btn';
            btn.innerText = 'Show More';
            btn.onclick = function () {
                const isTruncated = desc.classList.toggle('paper-description-truncated');
                this.innerText = isTruncated ? 'Show More' : 'Show Less';
            };
            // Append button after the paragraph
            desc.parentElement.appendChild(btn);
        }
    });
}