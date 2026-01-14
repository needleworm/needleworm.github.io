


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
        panelCover.animate([
            { height: '40%' },
            { height: '100%' }
        ], {
            duration: 300,
            easing: 'ease-in-out',
            fill: 'forwards'
        });
    }

    contentWrapper.classList.remove('showing');
    currentContent = "none";
    currentLatestButton = "none";

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
        panelCover.animate([
            { height: '100%' },
            { height: '40%' }
        ], {
            duration: 300,
            easing: 'ease-in-out',
            fill: 'forwards'
        });
    }

    contentWrapper.classList.add('showing');
}

function toggleMobileMenu() {
    const navigationWrapper = document.querySelector('.navigation-wrapper');
    const btnMobileMenuIcon = document.querySelector('.btn-mobile-menu__icon');
    const btnMobileCloseIcon = document.querySelector('.btn-mobile-close__icon');

    if (navigationWrapper.classList.contains('visible')) {
        navigationWrapper.classList.remove('visible', 'bounceInDown', 'animated');
        btnMobileMenuIcon.classList.remove('hidden'); // Show open icon
        btnMobileCloseIcon.classList.add('hidden'); // Hide close icon
    } else {
        navigationWrapper.classList.add('visible', 'bounceInDown', 'animated');
        btnMobileMenuIcon.classList.add('hidden'); // Hide open icon
        btnMobileCloseIcon.classList.remove('hidden'); // Show close icon
    }
}

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
                alert('문의가 성공적으로 전송되었습니다! (Email sent successfully!)');
                form.reset();
                btn.textContent = originalText;
                btn.disabled = false;

                // Reset reveals
                document.querySelectorAll('.form-reveal').forEach(el => {
                    el.classList.remove('active', 'overflow-visible');
                });
            }, function (error) {
                console.error('EmailJS Error:', error);
                alert('메일 전송에 실패했습니다: ' + JSON.stringify(error));
                btn.textContent = originalText;
                btn.disabled = false;
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



