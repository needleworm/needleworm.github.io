const sns = {
    email: "bhban@kakao.com",
    github: "https://github.com/needleworm",
    linkedin: "https://www.linkedin.com/in/bhban",
    youtube: "https://www.youtube.com/channel/UCpV0ZdloVwvSjxHfnYYQPQg?sub_confirmation=1",
    researchgate: "https://www.researchgate.net/profile/Byunghyun_Ban"
};




const membershipData = [
    {
        title: "ITQ 출제위원",
        image: "./images/membership/itq.jpg",
        desc: "2024년부터 국가공인 정보기술자격 ITQ 출제위원으로 참여하고 있습니다.",
        links: []
    },
    {
        title: "균형감각 (AI.Eng.)",
        image: "./images/membership/ghgg.jpg",
        desc: "AI기술로 영어학습의 혁신을 논의하는 비영리 학술단체입니다.",
        links: [
            { text: "균형감각", url: "https://aieng.kr", icon: '<i class="fas fa-external-link-alt"></i>' }
        ]
    },
    {
        title: "Cheesecake Studio",
        image: "./images/membership/cheesecake.jpg",
        desc: '아트워크 그룹 "치즈케익 스튜디오"',
        links: [
            { text: "Cheesecake Studio", url: "https://cheesecake-studio.github.io/", icon: '<i class="fas fa-external-link-alt"></i>' }
        ]
    },
    {
        title: "League of Perfect Scorers (LPS)",
        image: "./images/membership/1.jpg",
        desc: "<strong>Rarity</strong> &nbsp;&nbsp; 0.000003% ~ 0.003%<br/>IQ 만점자 협회, 전 세계 19번째 멤버",
        links: [
            { text: "Youtube", url: "https://www.youtube.com/watch?v=cEGTZYeTIpg", icon: '<i class="fab fa-youtube"></i>' },
            { text: "LPS", url: "http://www.opalquestgroup.com/societiestests.html", icon: '<i class="fas fa-external-link-alt"></i>' }
        ]
    },
    {
        title: "World Genius Directory",
        image: "./images/membership/2.png",
        desc: "최초이자 유일하게 한글로 이름 등재",
        links: [
            { text: "Youtube", url: "https://www.youtube.com/watch?v=cEGTZYeTIpg", icon: '<i class="fab fa-youtube"></i>' },
            { text: "WGD", url: "http://www.psiq.org/home.html", icon: '<i class="fas fa-external-link-alt"></i>' }
        ]
    },
    {
        title: "ISI Society",
        image: "./images/membership/3.jpg",
        desc: "<strong>Rarity</strong> &nbsp;&nbsp; 0.07%",
        links: [
            { text: "Youtube", url: "https://www.youtube.com/watch?v=cEGTZYeTIpg", icon: '<i class="fab fa-youtube"></i>' },
            { text: "ISI", url: "http://isi-s.iqsociety.org/", icon: '<i class="fas fa-external-link-alt"></i>' }
        ]
    },
    {
        title: "Intertel",
        image: "./images/membership/4.jpg",
        desc: "<strong>Rarity</strong> &nbsp;&nbsp; 1%",
        links: [
            { text: "Youtube", url: "https://www.youtube.com/watch?v=TaiEIC_xJwY", icon: '<i class="fab fa-youtube"></i>' },
            { text: "Intertel", url: "https://www.intertel-iq.org/", icon: '<i class="fas fa-external-link-alt"></i>' }
        ]
    },
    {
        title: "Glia Society",
        image: "./images/membership/5.jpg",
        desc: "<strong>Rarity</strong> &nbsp;&nbsp; 0.1%",
        links: [
            { text: "Glia", url: "https://gliasociety.org/", icon: '<i class="fas fa-external-link-alt"></i>' }
        ]
    },
    {
        title: "CIVIQ Society",
        image: "./images/membership/6.jpg",
        desc: "<strong>Rarity</strong> &nbsp;&nbsp; 0.135%",
        links: [
            { text: "Glia", url: "https://gliasociety.org/", icon: '<i class="fas fa-external-link-alt"></i>' }
        ]
    },
    {
        title: "AI 미래포럼 (AIFF)",
        image: "./images/membership/aiff.jpg",
        desc: "<strong>AI for Social Good</strong>",
        links: [
            { text: "News", url: "https://www.hankyung.com/it/article/2021031413701", icon: '<i class="fas fa-external-link-alt"></i>' }
        ]
    }
];


function renderMembership() {
    const container = document.getElementById('membership-list');
    if (!container) return;
    container.innerHTML = '';

    membershipData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'singleLectureContainer'; // react uses singleLectureContainer for memberships too

        let linksHtml = '';
        if (item.links && item.links.length > 0) {
            linksHtml = `<div class="lectureIcons"><div class="gitIcons">`;
            item.links.forEach((link, index) => {
                linksHtml += `<a href="${link.url}" target="_blank" rel="noreferrer">${link.icon}</a>`;
                if (index < item.links.length - 1) linksHtml += '&nbsp;&nbsp;&nbsp;';
            });
            linksHtml += `</div></div>`;
        }

        div.innerHTML = `
            <div class="singleWebsiteCard">
                <img class="websiteImage" src="${item.image}" alt="projectimage"/>
                <div class="projectText">
                    <h5>${item.title}</h5><br/>
                    <p class="bookDescription">${item.desc}</p>
                    ${linksHtml}
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}




// Navigation Logic
let currentContent = "none";
let currentLatestButton = "none";

function showContent(contentId) {
    const contentContainer = document.getElementById('content-container');
    const contentWrapper = document.querySelector('.content-wrapper');

    // If same content, close it
    if (currentContent === contentId && contentId !== 'none') {
        closeSideMenu();
        return;
    }

    // Load content template
    if (contentId === 'none') {
        closeSideMenu();
    } else {
        const template = document.getElementById(contentId + '-template');
        if (template) {
            contentContainer.innerHTML = '';
            contentContainer.appendChild(template.content.cloneNode(true));

            // Special initialization for specific sections

            if (contentId === 'membership') {
                renderMembership();
            } else if (contentId === 'codes') {
                loadCodes();
            }

            openSideMenu();
            currentContent = contentId;
            currentLatestButton = contentId;
        }
    }
}

function closeSideMenu() {
    const contentWrapper = document.querySelector('.content-wrapper');
    const panelCover = document.querySelector('.panel-cover');
    const windowWidth = window.innerWidth;

    if (!contentWrapper.classList.contains('showing')) {
        return;
    }

    panelCover.classList.remove('panel-cover--collapsed');
    panelCover.style.maxWidth = '100%';

    if (windowWidth > 800) {
        panelCover.animate([
            { width: '40%' },
            { width: '100%' }
        ], {
            duration: 300,
            easing: 'ease-in-out',
            fill: 'forwards'
        });
    } else {
        // Mobile: No animation for height (stays 100vh)
        // Just let sticky/relative positioning take over if needed, 
        // but with min-height: 100vh in CSS, it just stays full screen.
    }

    contentWrapper.classList.remove('showing');
    currentContent = "none";
    currentLatestButton = "none";

    // Scroll to top when closing
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
        const contentContainer = document.getElementById('content-container');
        contentContainer.innerHTML = '';
    }, 300);
}

function openSideMenu() {
    const contentWrapper = document.querySelector('.content-wrapper');
    const panelCover = document.querySelector('.panel-cover');
    const windowWidth = window.innerWidth;

    if (contentWrapper.classList.contains('showing')) {
        // Already showing, just ensure we scroll to content
        setTimeout(() => {
            const contentContainer = document.getElementById('content-container');
            if (contentContainer) contentContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return;
    }

    panelCover.classList.add('panel-cover--collapsed');

    if (windowWidth > 800) {
        panelCover.animate([
            { width: '100%' },
            { width: '40%' }
        ], {
            duration: 300,
            easing: 'ease-in-out',
            fill: 'forwards'
        });
    } else {
        // Mobile: No animation. Panel stays 100vh.
        // We just scroll down to the content.
    }

    contentWrapper.classList.add('showing');

    // Mobile: Scroll to content
    if (windowWidth <= 800) {
        setTimeout(() => {
            const contentContainer = document.getElementById('content-container');
            if (contentContainer) {
                contentContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 300);
    }
}

// Mobile Menu Button Logic (Deprecated/Hidden)
function toggleMobileMenu() {
    // Kept for safety, but button is hidden.
    const navigationWrapper = document.querySelector('.navigation-wrapper');
    const btnMobileMenuIcon = document.querySelector('.btn-mobile-menu__icon');
    const btnMobileCloseIcon = document.querySelector('.btn-mobile-close__icon');

    if (navigationWrapper.classList.contains('visible')) {
        navigationWrapper.classList.remove('visible', 'bounceInDown', 'animated');
        btnMobileMenuIcon.classList.remove('hidden');
        btnMobileCloseIcon.classList.add('hidden');
    } else {
        navigationWrapper.classList.add('visible', 'bounceInDown', 'animated');
        btnMobileMenuIcon.classList.add('hidden');
        btnMobileCloseIcon.classList.remove('hidden');
    }
}

// Floating Button Logic
document.addEventListener('DOMContentLoaded', () => {
    const btnToTop = document.getElementById('btn-to-top');
    if (btnToTop) {
        // Use capture: true to catch scroll events from any element (e.g. overflow:auto containers)
        document.addEventListener('scroll', (e) => {
            let scrollY = window.scrollY;

            // If the event target is an element (and not the document), use its scrollTop
            if (e.target instanceof Element) {
                // Check if this element is actually contributing to the main view scroll
                // or just always allow it if it's substantial
                if (e.target.scrollTop > 0) {
                    scrollY = e.target.scrollTop;
                }
            }

            if (scrollY > 300) {
                btnToTop.style.display = 'block';
            } else {
                btnToTop.style.display = 'none';
            }
        }, { capture: true });

        btnToTop.addEventListener('click', () => {
            // Scroll window
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Also try to scroll potential containers
            document.body.scrollTo({ top: 0, behavior: 'smooth' });
            document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });

            // Try to find the panel cover content which might be scrolling
            const panel = document.querySelector('.panel-cover');
            if (panel) panel.scrollTo({ top: 0, behavior: 'smooth' });

            const content = document.querySelector('.content-wrapper');
            if (content) content.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});


// Initial set up
document.addEventListener('DOMContentLoaded', () => {
    // Check hash to load specific content if needed
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash + '-template')) {
        showContent(hash);
    }
});

/**
 * NaNa Company Contact Form Handler using EmailJS
 */

// Initialize EmailJS
(function () {
    // Replace if you have a different key, using the one from user snippet
    emailjs.init("61GtFyVFJ4xDftkIG");
})();

// Toast Notification Logic
function showToast(message) {
    const toast = document.getElementById("toast-notification");
    if (!toast) return;

    toast.textContent = message;
    toast.className = "show";

    setTimeout(function () {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

// Form Submission Logic
// We attach this via event delegation because the form is dynamically loaded
document.addEventListener('submit', function (event) {
    if (event.target && event.target.id === 'contact-form') {
        event.preventDefault();

        const form = event.target;
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;

        btn.textContent = '전송 중... (Sending...)';
        btn.disabled = true;

        const EMAILJS_SERVICE_ID = 'service_nicpl0u';
        const EMAILJS_TEMPLATE_ID = 'template_h4ve5sp';

        // Send the form using EmailJS
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
            .then(function () {
                btn.textContent = originalText;
                btn.disabled = false;
                showToast('메일이 성공적으로 발송되었습니다.');
                form.reset();
            }, function (error) {
                btn.textContent = originalText;
                btn.disabled = false;
                showToast('메일 발송에 실패했습니다. 다시 시도해주세요.');
                console.error('EmailJS Error:', error);
            });
    }
});

// Form Reveal Logic & Phone Formatting delegated listeners
document.addEventListener('input', function (e) {
    // Name Input Reveal
    if (e.target.id === 'mail_name') {
        const divInst = document.getElementById('div-institution');
        if (divInst) {
            handleReveal(e.target, divInst);
        }
    }
    // Institution Input Reveal
    if (e.target.id === 'mail_institution') {
        const divPhone = document.getElementById('div-phone');
        if (divPhone) {
            handleReveal(e.target, divPhone, divPhone);
        }
    }
    // Phone Handling
    if (e.target.id === 'mail_phone') {
        const divEmail = document.getElementById('div-email');
        if (divEmail) {
            handleReveal(e.target, divEmail);
        }

        // Formatting
        const target = e.target;
        let number = target.value.replace(/[^0-9]/g, '');
        let formatted = '';
        if (number.length < 4) {
            formatted = number;
        } else if (number.length < 8) {
            formatted = number.slice(0, -4) + '-' + number.slice(-4);
            if (number.slice(0, -4) === '') formatted = number.slice(-4);
        } else {
            const last4 = number.slice(-4);
            const mid4 = number.slice(-8, -4);
            const prefix = number.slice(0, -8);
            formatted = (prefix ? prefix + '-' : '') + mid4 + '-' + last4;
        }
        if (target.value !== formatted) target.value = formatted;
    }
});

function handleReveal(input, targetDiv, nextOverflowDiv = null) {
    if (input.value.trim().length > 0) {
        targetDiv.classList.add('active');
        if (nextOverflowDiv) {
            setTimeout(() => {
                nextOverflowDiv.classList.add('overflow-visible');
            }, 500);
        }
    }
}

// Custom Dropdown Logic (Delegated)
document.addEventListener('click', function (e) {
    const selectedDiv = e.target.closest('.select-selected');

    // Close all other selects if clicked outside
    if (!selectedDiv) {
        closeAllSelect(null);
        return;
    }

    // Toggle clicked select
    e.stopPropagation();
    closeAllSelect(selectedDiv);
    selectedDiv.nextElementSibling.classList.toggle("select-hide");
    selectedDiv.classList.toggle("select-arrow-active");
});

document.addEventListener('click', function (e) {
    const item = e.target.closest('.select-items div');
    if (item) {
        e.stopPropagation();
        const selectItems = item.parentElement;
        const selectSelected = selectItems.previousElementSibling;
        const hiddenInput = selectItems.parentElement.querySelector('input[type="hidden"]');

        const value = item.getAttribute("data-value");
        const text = item.innerText;

        selectSelected.innerHTML = text;
        if (hiddenInput) hiddenInput.value = value;
        selectSelected.classList.add("active");

        const siblings = item.parentNode.children;
        for (let k = 0; k < siblings.length; k++) {
            siblings[k].classList.remove("same-as-selected");
        }
        item.classList.add("same-as-selected");
        selectItems.classList.add("select-hide");
        selectSelected.classList.remove("select-arrow-active");
    }
});

function closeAllSelect(elmnt) {
    const x = document.getElementsByClassName("select-items");
    const y = document.getElementsByClassName("select-selected");
    for (let i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
            continue;
        }
        y[i].classList.remove("select-arrow-active");
    }
    for (let i = 0; i < x.length; i++) {
        if (elmnt) { // logic for excluding current clicked element if needed? 
            // The original logic just closed everything not matching elmnt.
            // If elmnt is selectedDiv, we keep it open (handled in toggle).
        }
        x[i].classList.add("select-hide");
    }
}

// Citation Copy Logic
function copyCitation(element) {
    const citationText = element.getAttribute('data-citation');
    if (!citationText) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(citationText)
            .then(() => {
                alert("Citation is copied to Clipboard!");
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                fallbackCopy(citationText);
            });
    } else {
        fallbackCopy(citationText);
    }
}

function fallbackCopy(text) {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    alert("Citation is copied to Clipboard!");
}

// YouTube Facade Pattern to prevent WebGL Context Limits
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
        iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

        facade.parentNode.replaceChild(iframe, facade);
    }
});




// Codes Section Logic

const manualProjects = [
    "bhbhan_rpa", "automation_edu", "pymacro", "python101", "bhbhan_ai", "pywinmacro",
    "newsToday", "post_crawler", "brunch_thaad",
    "needleworm.github.io", "financebook", "instagram", "gunbam", "101", "frontend", "dataset",
    "fvs", "base_sequence_analysis", "fmm_crawl", "pubmed_crawler", "pubmed_abstract_crawl", "PubMed_Crawl_exe", "google_scholar_crawler", "ion_interference", "nutrient_solution", "nc2", "greenhouse_ai", "bh_coefficient", "mlproject",
    "pixabay_crawling", "chulsukbu", "get_vaccine", "img_crop_from_PDF", "insta_like_by_graphic_recognition", "twitter_news_macro", "xlsx_destroyer", "wordpuzzle", "xlsx_sorter", "bluestack_macro",
    "CoinAutoTrader", "nftauto", "pixelRandomizer", "CoinAutoTrader_Bithumb", "coinone_Api_for_google_apps", "CoinAutoTrader_exe",
    "eliza", "mozza", "pizza", "cottoncandy", "breakout", "moneyauto"
];

const thumbnailMap = {
    // edu
    "bhbhan_rpa": "edu.jpg", "automation_edu": "edu.jpg", "pymacro": "edu.jpg", "python101": "edu.jpg",
    // python
    "bhbhan_ai": "books/covers/8.jpg",
    "newsToday": "python.jpg", "post_crawler": "python.jpg", "brunch_thaad": "python.jpg",
    "fvs": "science.jpg", "base_sequence_analysis": "science.jpg", "fmm_crawl": "science.jpg",
    "pubmed_crawler": "science.jpg", "pubmed_abstract_crawl": "science.jpg", "google_scholar_crawler": "science.jpg",
    "ion_interference": "science.jpg", "nutrient_solution": "science.jpg", "nc2": "science.jpg",
    "greenhouse_ai": "science.jpg", "bh_coefficient": "science.jpg",
    "pixabay_crawling": "python.jpg", "chulsukbu": "python.jpg", "get_vaccine": "python.jpg",
    "img_crop_from_PDF": "python.jpg", "insta_like_by_graphic_recognition": "python.jpg",
    "twitter_news_macro": "python.jpg", "xlsx_destroyer": "python.jpg", "wordpuzzle": "python.jpg",
    "xlsx_sorter": "python.jpg", "bluestack_macro": "python.jpg",
    "mozza": "cheese.jpg", "pizza": "cheese.jpg", "cottoncandy": "cheese.jpg",
    // exe
    "pywinmacro": "exe.jpg", "PubMed_Crawl_exe": "exe.jpg", "CoinAutoTrader_exe": "exe.jpg",
    // moneyauto
    "CoinAutoTrader": "moneyauto.jpg", "CoinAutoTrader_Bithumb": "moneyauto.jpg", "moneyauto": "moneyauto.jpg",
    // nft
    "nftauto": "nft.jpg", "pixelRandomizer": "nft.jpg",
    // react
    "needleworm.github.io": "react.jpg",
    // jekyll / web
    "financebook": "books/covers/9.jpg",
    "instagram": "books/covers/12.jpg",
    "gunbam": "books/covers/12.jpg",
    "101": "books/covers/10.jpg",
    "frontend": "books/covers/12.jpg",
    "dataset": "books/covers/13.jpg",
    // js
    "coinone_Api_for_google_apps": "js.jpg",
    // tf
    "mlproject": "tf.jpg", "breakout": "tf.jpg",
    // scala
    "eliza": "scala.jpg"
};

const defaultThumbnail = "python.jpg";

function getIconForLanguage(lang) {
    if (!lang) return '<i class="fas fa-code"></i>';
    const l = lang.toLowerCase();
    if (l.includes('python')) return '<i class="fab fa-python"></i>';
    if (l.includes('react')) return '<i class="fab fa-react"></i>';
    if (l.includes('java')) return '<i class="fab fa-java"></i>';
    if (l.includes('script') || l.includes('js')) return '<i class="fab fa-js-square"></i>';
    if (l.includes('html')) return '<i class="fab fa-html5"></i>';
    if (l.includes('css')) return '<i class="fab fa-css3-alt"></i>';
    return '<i class="fas fa-code"></i>';
}

function resolveThumbnail(name) {
    const mapped = thumbnailMap[name];
    if (mapped) {
        if (mapped.startsWith("books/")) return "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io@main/src/images/" + mapped;
        return "./images/codes/" + mapped;
    }
    return "./images/codes/" + defaultThumbnail;
}

let codesLoaded = false;
let languageChartInstance = null;

async function loadCodes() {
    if (codesLoaded) return;

    const starsEl = document.getElementById('total-stars');
    const forksEl = document.getElementById('total-forks');
    const commitsEl = document.getElementById('total-commits'); // Kept for safety, though unused in HTML now
    const canvas = document.getElementById('languageChart');

    if (!canvas) return;

    // Debug 1: Start
    console.log("Starting loadCodes...");

    try {
        console.log("Fetching repos from GitHub...");
        // Fetch
        const [userRepos, orgRepos] = await Promise.all([
            fetch('https://api.github.com/users/needleworm/repos?per_page=100').then(r => {
                console.log("Needleworm fetch status:", r.status);
                return r.json();
            }),
            fetch('https://api.github.com/users/NaNaCompany/repos?per_page=100').then(r => {
                console.log("NaNaCompany fetch status:", r.status);
                return r.json();
            })
        ]);

        console.log("Raw userRepos:", userRepos);
        console.log("Raw orgRepos:", orgRepos);

        // Safety check for arrays
        const safeUserRepos = Array.isArray(userRepos) ? userRepos : [];
        const safeOrgRepos = Array.isArray(orgRepos) ? orgRepos : [];

        const allRepos = [...safeUserRepos, ...safeOrgRepos];
        console.log("Combined repos count:", allRepos.length);

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

        if (starsEl) starsEl.innerText = totalStars;
        if (forksEl) forksEl.innerText = totalForks;
        // Total Commits logic removed

        renderLanguageChart(languages);

        codesLoaded = true;

    } catch (e) {
        console.error("Failed to load codes", e);
    }
}

function renderLanguageChart(languages) {
    const ctx = document.getElementById('languageChart').getContext('2d');

    const sorted = Object.entries(languages).sort((a, b) => b[1] - a[1]);
    const labels = [];
    const data = [];
    const backgroundColors = [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)'
    ];

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

    if (languageChartInstance) {
        languageChartInstance.destroy();
    }

    const centerIconPlugin = {
        id: 'centerIcon',
        beforeDraw: function (chart) {
            const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;

            ctx.save();
            const fontSize = ((height / 114) * 2).toFixed(2);
            ctx.font = fontSize + "em 'Font Awesome 5 Brands'";
            ctx.textBaseline = "middle";

            // Calculate center based on chartArea (ignoring legend)
            const centerX = (left + right) / 2;
            const centerY = (top + bottom) / 2;

            // Draw Black Circle Background
            // Measure text to get precise background size
            const text = "\uf09b"; // GitHub icon unicode
            const textMetrics = ctx.measureText(text);
            const textWidth = textMetrics.width;

            // We need the background to be slightly smaller than the icon's outer circle 
            // to avoid a visible "rim" or border, but large enough to fill the transparent "cat" hole.
            // textWidth is roughly the diameter. radius = diameter / 2.
            // We use a factor slightly less than 0.5 to be safe.
            const radius = textWidth * 0.45;

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fillStyle = "#888888"; // Darker Gray background
            ctx.fill();

            // Draw Icon (White Mask)
            ctx.fillStyle = "#ffffff";
            const textX = Math.round(centerX - textWidth / 2);
            const textY = Math.round(centerY);

            ctx.fillText(text, textX, textY);
            ctx.restore();
        }
    };


    languageChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Repositories',
                data: data,
                backgroundColor: backgroundColors.slice(0, data.length),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20
                    }
                },
                tooltip: {
                    enabled: true
                }
            },
            onHover: (event, chartElement) => {
                const points = languageChartInstance.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
                if (points.length) {
                    event.native.target.style.cursor = 'default';
                } else {
                    const canvas = event.native.target;

                    // Center check needs to match plugin logic
                    const chartArea = languageChartInstance.chartArea;
                    if (!chartArea) return;

                    const centerX = (chartArea.left + chartArea.right) / 2;
                    const centerY = (chartArea.top + chartArea.bottom) / 2;

                    const x = event.x; // Chart.js event.x is relative to canvas
                    const y = event.y;

                    const dx = x - centerX;
                    const dy = y - centerY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    const meta = languageChartInstance.getDatasetMeta(0);
                    if (meta.data.length > 0) {
                        const innerRadius = meta.data[0].innerRadius;
                        if (distance < innerRadius) {
                            canvas.style.cursor = 'pointer';
                        } else {
                            canvas.style.cursor = 'default';
                        }
                    }
                }
            }
        },
        plugins: [centerIconPlugin]
    });

    // Add click listener for the center icon
    const canvas = document.getElementById('languageChart');
    if (canvas) {
        canvas.onclick = (evt) => {
            const points = languageChartInstance.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

            // If clicking on a segment, do nothing (or default behavior)
            if (points.length) return;

            // Check distance from center
            const rect = canvas.getBoundingClientRect();

            // We need consistent coordinates. 
            // evt.clientX/Y uses client coordinates.
            // rect.left/top converts to element-relative.

            const clickX = evt.clientX - rect.left;
            const clickY = evt.clientY - rect.top;

            // We need to access the chart instance's chartArea to match the visual center
            if (!languageChartInstance || !languageChartInstance.chartArea) return;

            const { left, right, top, bottom } = languageChartInstance.chartArea;
            const centerX = (left + right) / 2;
            const centerY = (top + bottom) / 2;

            const dx = clickX - centerX;
            const dy = clickY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // innerRadius is available in the meta data of the first segment
            if (languageChartInstance.getDatasetMeta(0).data.length > 0) {
                const innerRadius = languageChartInstance.getDatasetMeta(0).data[0].innerRadius;
                if (distance < innerRadius) {
                    window.open('https://github.com/needleworm', '_blank');
                }
            }
        };
    }
}