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



 
 / /   C o d e s   S e c t i o n   L o g i c  
  
 c o n s t   m a n u a l P r o j e c t s   =   [  
         " b h b a n _ r p a " ,   " a u t o m a t i o n _ e d u " ,   " p y m a c r o " ,   " p y t h o n 1 0 1 " ,   " b h b a n _ a i " ,   " p y w i n m a c r o " ,  
         " n e w s T o d a y " ,   " p o s t _ c r a w l e r " ,   " b r u n c h _ t h a a d " ,  
         " n e e d l e w o r m . g i t h u b . i o " ,   " f i n a n c e b o o k " ,   " i n s t a g r a m " ,   " g u n b a m " ,   " 1 0 1 " ,   " f r o n t e n d " ,   " d a t a s e t " ,  
         " f v s " ,   " b a s e _ s e q u e n c e _ a n a l y s i s " ,   " f m m _ c r a w l " ,   " p u b m e d _ c r a w l e r " ,   " p u b m e d _ a b s t r a c t _ c r a w l " ,   " P u b M e d _ C r a w l _ e x e " ,   " g o o g l e _ s c h o l a r _ c r a w l e r " ,   " i o n _ i n t e r f e r e n c e " ,   " n u t r i e n t _ s o l u t i o n " ,   " n c 2 " ,   " g r e e n h o u s e _ a i " ,   " b h _ c o e f f i c i e n t " ,   " m l p r o j e c t " ,  
         " p i x a b a y _ c r a w l i n g " ,   " c h u l s u k b u " ,   " g e t _ v a c c i n e " ,   " i m g _ c r o p _ f r o m _ P D F " ,   " i n s t a _ l i k e _ b y _ g r a p h i c _ r e c o g n i t i o n " ,   " t w i t t e r _ n e w s _ m a c r o " ,   " x l s x _ d e s t r o y e r " ,   " w o r d p u z z l e " ,   " x l s x _ s o r t e r " ,   " b l u e s t a c k _ m a c r o " ,  
         " C o i n A u t o T r a d e r " ,   " n f t a u t o " ,   " p i x e l R a n d o m i z e r " ,   " C o i n A u t o T r a d e r _ B i t h u m b " ,   " c o i n o n e _ A p i _ f o r _ g o o g l e _ a p p s " ,   " C o i n A u t o T r a d e r _ e x e " ,  
         " e l i z a " ,   " m o z z a " ,   " p i z z a " ,   " c o t t o n c a n d y " ,   " b r e a k o u t " ,   " m o n e y a u t o "  
 ] ;  
  
 c o n s t   t h u m b n a i l M a p   =   {  
         / /   e d u  
         " b h b a n _ r p a " :   " e d u . j p g " ,   " a u t o m a t i o n _ e d u " :   " e d u . j p g " ,   " p y m a c r o " :   " e d u . j p g " ,   " p y t h o n 1 0 1 " :   " e d u . j p g " ,  
         / /   p y t h o n  
         " b h b a n _ a i " :   " b o o k s / c o v e r s / 8 . j p g " ,  
         " n e w s T o d a y " :   " p y t h o n . j p g " ,   " p o s t _ c r a w l e r " :   " p y t h o n . j p g " ,   " b r u n c h _ t h a a d " :   " p y t h o n . j p g " ,  
         " f v s " :   " s c i e n c e . j p g " ,   " b a s e _ s e q u e n c e _ a n a l y s i s " :   " s c i e n c e . j p g " ,   " f m m _ c r a w l " :   " s c i e n c e . j p g " ,  
         " p u b m e d _ c r a w l e r " :   " s c i e n c e . j p g " ,   " p u b m e d _ a b s t r a c t _ c r a w l " :   " s c i e n c e . j p g " ,   " g o o g l e _ s c h o l a r _ c r a w l e r " :   " s c i e n c e . j p g " ,  
         " i o n _ i n t e r f e r e n c e " :   " s c i e n c e . j p g " ,   " n u t r i e n t _ s o l u t i o n " :   " s c i e n c e . j p g " ,   " n c 2 " :   " s c i e n c e . j p g " ,  
         " g r e e n h o u s e _ a i " :   " s c i e n c e . j p g " ,   " b h _ c o e f f i c i e n t " :   " s c i e n c e . j p g " ,  
         " p i x a b a y _ c r a w l i n g " :   " p y t h o n . j p g " ,   " c h u l s u k b u " :   " p y t h o n . j p g " ,   " g e t _ v a c c i n e " :   " p y t h o n . j p g " ,  
         " i m g _ c r o p _ f r o m _ P D F " :   " p y t h o n . j p g " ,   " i n s t a _ l i k e _ b y _ g r a p h i c _ r e c o g n i t i o n " :   " p y t h o n . j p g " ,  
         " t w i t t e r _ n e w s _ m a c r o " :   " p y t h o n . j p g " ,   " x l s x _ d e s t r o y e r " :   " p y t h o n . j p g " ,   " w o r d p u z z l e " :   " p y t h o n . j p g " ,  
         " x l s x _ s o r t e r " :   " p y t h o n . j p g " ,   " b l u e s t a c k _ m a c r o " :   " p y t h o n . j p g " ,  
         " m o z z a " :   " c h e e s e . j p g " ,   " p i z z a " :   " c h e e s e . j p g " ,   " c o t t o n c a n d y " :   " c h e e s e . j p g " ,  
         / /   e x e  
         " p y w i n m a c r o " :   " e x e . j p g " ,   " P u b M e d _ C r a w l _ e x e " :   " e x e . j p g " ,   " C o i n A u t o T r a d e r _ e x e " :   " e x e . j p g " ,  
         / /   m o n e y a u t o  
         " C o i n A u t o T r a d e r " :   " m o n e y a u t o . j p g " ,   " C o i n A u t o T r a d e r _ B i t h u m b " :   " m o n e y a u t o . j p g " ,   " m o n e y a u t o " :   " m o n e y a u t o . j p g " ,  
         / /   n f t  
         " n f t a u t o " :   " n f t . j p g " ,   " p i x e l R a n d o m i z e r " :   " n f t . j p g " ,  
         / /   r e a c t  
         " n e e d l e w o r m . g i t h u b . i o " :   " r e a c t . j p g " ,  
         / /   j e k y l l   /   w e b  
         " f i n a n c e b o o k " :   " b o o k s / c o v e r s / 9 . j p g " ,  
         " i n s t a g r a m " :   " b o o k s / c o v e r s / 1 2 . j p g " ,  
         " g u n b a m " :   " b o o k s / c o v e r s / 1 2 . j p g " ,  
         " 1 0 1 " :   " b o o k s / c o v e r s / 1 0 . j p g " ,  
         " f r o n t e n d " :   " b o o k s / c o v e r s / 1 2 . j p g " ,  
         " d a t a s e t " :   " b o o k s / c o v e r s / 1 3 . j p g " ,  
         / /   j s  
         " c o i n o n e _ A p i _ f o r _ g o o g l e _ a p p s " :   " j s . j p g " ,  
         / /   t f  
         " m l p r o j e c t " :   " t f . j p g " ,   " b r e a k o u t " :   " t f . j p g " ,  
         / /   s c a l a  
         " e l i z a " :   " s c a l a . j p g "  
 } ;  
  
 c o n s t   d e f a u l t T h u m b n a i l   =   " p y t h o n . j p g " ;  
  
 f u n c t i o n   g e t I c o n F o r L a n g u a g e ( l a n g )   {  
         i f   ( ! l a n g )   r e t u r n   ' < i   c l a s s = " f a s   f a - c o d e " > < / i > ' ;  
         c o n s t   l   =   l a n g . t o L o w e r C a s e ( ) ;  
         i f   ( l . i n c l u d e s ( ' p y t h o n ' ) )   r e t u r n   ' < i   c l a s s = " f a b   f a - p y t h o n " > < / i > ' ;  
         i f   ( l . i n c l u d e s ( ' r e a c t ' ) )   r e t u r n   ' < i   c l a s s = " f a b   f a - r e a c t " > < / i > ' ;  
         i f   ( l . i n c l u d e s ( ' j a v a ' ) )   r e t u r n   ' < i   c l a s s = " f a b   f a - j a v a " > < / i > ' ;  
         i f   ( l . i n c l u d e s ( ' s c r i p t ' )   | |   l . i n c l u d e s ( ' j s ' ) )   r e t u r n   ' < i   c l a s s = " f a b   f a - j s - s q u a r e " > < / i > ' ;  
         i f   ( l . i n c l u d e s ( ' h t m l ' ) )   r e t u r n   ' < i   c l a s s = " f a b   f a - h t m l 5 " > < / i > ' ;  
         i f   ( l . i n c l u d e s ( ' c s s ' ) )   r e t u r n   ' < i   c l a s s = " f a b   f a - c s s 3 - a l t " > < / i > ' ;  
         r e t u r n   ' < i   c l a s s = " f a s   f a - c o d e " > < / i > ' ;  
 }  
  
 f u n c t i o n   r e s o l v e T h u m b n a i l ( n a m e )   {  
         c o n s t   m a p p e d   =   t h u m b n a i l M a p [ n a m e ] ;  
         i f   ( m a p p e d )   {  
                 i f   ( m a p p e d . s t a r t s W i t h ( " b o o k s / " ) )   r e t u r n   " h t t p s : / / c d n . j s d e l i v r . n e t / g h / n e e d l e w o r m / n e e d l e w o r m . g i t h u b . i o / s r c / i m a g e s / "   +   m a p p e d ;  
                 r e t u r n   " . / i m a g e s / c o d e s / "   +   m a p p e d ;  
         }  
         r e t u r n   " . / i m a g e s / c o d e s / "   +   d e f a u l t T h u m b n a i l ;  
 }  
  
 l e t   c o d e s L o a d e d   =   f a l s e ;  
 l e t   l a n g u a g e C h a r t I n s t a n c e   =   n u l l ;  
  
 a s y n c   f u n c t i o n   l o a d C o d e s ( )   {  
         i f   ( c o d e s L o a d e d )   r e t u r n ;  
  
         c o n s t   c o n t a i n e r   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' c o d e s - l i s t ' ) ;  
         c o n s t   s t a r s E l   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' t o t a l - s t a r s ' ) ;  
         c o n s t   f o r k s E l   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' t o t a l - f o r k s ' ) ;  
         c o n s t   c o m m i t s E l   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' t o t a l - c o m m i t s ' ) ;  
         c o n s t   c a n v a s   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' l a n g u a g e C h a r t ' ) ;  
  
         i f   ( ! c o n t a i n e r   | |   ! c a n v a s )   r e t u r n ;  
  
         c o n t a i n e r . i n n e r H T M L   =   ' < d i v   c l a s s = " t e x t - c e n t e r " > L o a d i n g   D a t a . . . < / d i v > ' ;  
  
         t r y   {  
                 c o n s t   [ u s e r R e p o s ,   o r g R e p o s ]   =   a w a i t   P r o m i s e . a l l ( [  
                         f e t c h ( ' h t t p s : / / a p i . g i t h u b . c o m / u s e r s / n e e d l e w o r m / r e p o s ? p e r _ p a g e = 1 0 0 ' ) . t h e n ( r   = >   r . j s o n ( ) ) ,  
                         f e t c h ( ' h t t p s : / / a p i . g i t h u b . c o m / u s e r s / N a N a C o m p a n y / r e p o s ? p e r _ p a g e = 1 0 0 ' ) . t h e n ( r   = >   r . j s o n ( ) )  
                 ] ) ;  
  
                 c o n s t   a l l R e p o s   =   [ . . . u s e r R e p o s ,   . . . o r g R e p o s ] ;  
  
                 l e t   t o t a l S t a r s   =   0 ;  
                 l e t   t o t a l F o r k s   =   0 ;  
                 c o n s t   l a n g u a g e s   =   { } ;  
  
                 c o n s t   r e p o M a p   =   { } ;  
  
                 a l l R e p o s . f o r E a c h ( r e p o   = >   {  
                         t o t a l S t a r s   + =   r e p o . s t a r g a z e r s _ c o u n t ;  
                         t o t a l F o r k s   + =   r e p o . f o r k s _ c o u n t ;  
                         r e p o M a p [ r e p o . n a m e ]   =   r e p o ;  
  
                         i f   ( r e p o . l a n g u a g e )   {  
                                 l a n g u a g e s [ r e p o . l a n g u a g e ]   =   ( l a n g u a g e s [ r e p o . l a n g u a g e ]   | |   0 )   +   1 ;  
                         }  
                 } ) ;  
  
                 i f   ( s t a r s E l )   s t a r s E l . i n n e r T e x t   =   t o t a l S t a r s ;  
                 i f   ( f o r k s E l )   f o r k s E l . i n n e r T e x t   =   t o t a l F o r k s ;  
                 i f   ( c o m m i t s E l )   c o m m i t s E l . i n n e r T e x t   =   a l l R e p o s . l e n g t h ;  
  
                 r e n d e r L a n g u a g e C h a r t ( l a n g u a g e s ) ;  
  
                 c o n t a i n e r . i n n e r H T M L   =   ' ' ;  
  
                 m a n u a l P r o j e c t s . f o r E a c h ( n a m e   = >   {  
                         c o n s t   r e p o   =   r e p o M a p [ n a m e ] ;  
                         i f   ( ! r e p o )   r e t u r n ;  
  
                         c o n s t   d i v   =   d o c u m e n t . c r e a t e E l e m e n t ( ' d i v ' ) ;  
                         d i v . c l a s s N a m e   =   ' s i n g l e P r o j e c t C o n t a i n e r ' ;  
  
                         c o n s t   d a t e   =   n e w   D a t e ( r e p o . c r e a t e d _ a t ) . t o I S O S t r i n g ( ) . s p l i t ( ' T ' ) [ 0 ] . r e p l a c e ( / - / g ,   ' . ' ) ;  
  
                         d i v . i n n e r H T M L   =   `  
                         < d i v   c l a s s = " s i n g l e P r o j e c t C a r d " >  
                                 < a   c l a s s = " t e m p a "   h r e f = " $ { r e p o . h t m l _ u r l } "   t a r g e t = " _ b l a n k "   r e l = " n o r e f e r r e r " >  
                                   < i m g   c l a s s = " p r o j e c t I m a g e "   s r c = " $ { r e s o l v e T h u m b n a i l ( n a m e ) } "   a l t = " p r o j e c t i m a g e " / >  
                                 < / a >  
                                 < d i v   c l a s s = " p r o j e c t T e x t " >  
                                     < a   h r e f = " $ { r e p o . h t m l _ u r l } "   t a r g e t = " _ b l a n k "   r e l = " n o r e f e r r e r " >  
                                         < h 5 > $ { n a m e } < / h 5 >  
                                     < / a >  
                                     < d i v   c l a s s = " c o d e B o d y " >  
                                         < p   c l a s s = " b o o k D e s c r i p t i o n   f i r s t C o m m i t D a t e " >  
                                             F i r s t   C o m m i t   o n   $ { d a t e }  
                                         < / p >  
                                         < p   c l a s s = " b o o k D e s c r i p t i o n " > $ { r e p o . d e s c r i p t i o n   | |   " N o   d e s c r i p t i o n   a v a i l a b l e . " } < / p >  
                                     < / d i v >  
                                     < d i v   c l a s s = " p r o j e c t I c o n s " >  
                                         < h 5 > $ { g e t I c o n F o r L a n g u a g e ( r e p o . l a n g u a g e ) } & n b s p ;   $ { r e p o . l a n g u a g e   | |   ' C o d e ' } < / h 5 >  
                                         < d i v   c l a s s = " g i t I c o n s " >  
                                             < a   h r e f = " $ { r e p o . h t m l _ u r l } / w a t c h e r s "   t a r g e t = " _ b l a n k "   r e l = " n o r e f e r r e r " >  
                                                 < i   c l a s s = " f a r   f a - e y e " > < / i >   $ { r e p o . w a t c h e r s _ c o u n t }  
                                             < / a >  
                                             & n b s p ; & n b s p ; & n b s p ; & n b s p ;  
                                             < a   h r e f = " $ { r e p o . h t m l _ u r l } / s t a r g a z e r s "   t a r g e t = " _ b l a n k "   r e l = " n o r e f e r r e r " >  
                                                 < i   c l a s s = " f a r   f a - s t a r " > < / i >   $ { r e p o . s t a r g a z e r s _ c o u n t }  
                                             < / a >  
                                             & n b s p ; & n b s p ; & n b s p ; & n b s p ;  
                                             < a   h r e f = " $ { r e p o . h t m l _ u r l } / n e t w o r k / m e m b e r s "   t a r g e t = " _ b l a n k "   r e l = " n o r e f e r r e r " >  
                                                 < i   c l a s s = " f a s   f a - c o d e - b r a n c h " > < / i >   $ { r e p o . f o r k s _ c o u n t }  
                                             < / a >  
                                         < / d i v >  
                                     < / d i v >  
                                 < / d i v >  
                             < / d i v >  
                         ` ;  
                         c o n t a i n e r . a p p e n d C h i l d ( d i v ) ;  
                 } ) ;  
  
                 c o d e s L o a d e d   =   t r u e ;  
  
         }   c a t c h   ( e )   {  
                 c o n s o l e . e r r o r ( " F a i l e d   t o   l o a d   c o d e s " ,   e ) ;  
                 c o n t a i n e r . i n n e r H T M L   =   ' < d i v   c l a s s = " t e x t - c e n t e r " > F a i l e d   t o   l o a d   G i t H u b   d a t a . < / d i v > ' ;  
         }  
 }  
  
 f u n c t i o n   r e n d e r L a n g u a g e C h a r t ( l a n g u a g e s )   {  
         c o n s t   c t x   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' l a n g u a g e C h a r t ' ) . g e t C o n t e x t ( ' 2 d ' ) ;  
  
         c o n s t   s o r t e d   =   O b j e c t . e n t r i e s ( l a n g u a g e s ) . s o r t ( ( a ,   b )   = >   b [ 1 ]   -   a [ 1 ] ) ;  
         c o n s t   l a b e l s   =   [ ] ;  
         c o n s t   d a t a   =   [ ] ;  
         c o n s t   b a c k g r o u n d C o l o r s   =   [  
                 ' r g b a ( 2 5 5 ,   9 9 ,   1 3 2 ,   0 . 5 ) ' ,  
                 ' r g b a ( 5 4 ,   1 6 2 ,   2 3 5 ,   0 . 5 ) ' ,  
                 ' r g b a ( 2 5 5 ,   2 0 6 ,   8 6 ,   0 . 5 ) ' ,  
                 ' r g b a ( 7 5 ,   1 9 2 ,   1 9 2 ,   0 . 5 ) ' ,  
                 ' r g b a ( 1 5 3 ,   1 0 2 ,   2 5 5 ,   0 . 5 ) ' ,  
                 ' r g b a ( 2 5 5 ,   1 5 9 ,   6 4 ,   0 . 5 ) '  
         ] ;  
  
         l e t   e t c C o u n t   =   0 ;  
         s o r t e d . f o r E a c h ( ( i t e m ,   i n d e x )   = >   {  
                 i f   ( i n d e x   <   5 )   {  
                         l a b e l s . p u s h ( i t e m [ 0 ] ) ;  
                         d a t a . p u s h ( i t e m [ 1 ] ) ;  
                 }   e l s e   {  
                         e t c C o u n t   + =   i t e m [ 1 ] ;  
                 }  
         } ) ;  
  
         i f   ( e t c C o u n t   >   0 )   {  
                 l a b e l s . p u s h ( ' E T C ' ) ;  
                 d a t a . p u s h ( e t c C o u n t ) ;  
         }  
  
         i f   ( l a n g u a g e C h a r t I n s t a n c e )   {  
                 l a n g u a g e C h a r t I n s t a n c e . d e s t r o y ( ) ;  
         }  
  
         l a n g u a g e C h a r t I n s t a n c e   =   n e w   C h a r t ( c t x ,   {  
                 t y p e :   ' d o u g h n u t ' ,  
                 d a t a :   {  
                         l a b e l s :   l a b e l s ,  
                         d a t a s e t s :   [ {  
                                 l a b e l :   ' R e p o s i t o r i e s ' ,  
                                 d a t a :   d a t a ,  
                                 b a c k g r o u n d C o l o r :   b a c k g r o u n d C o l o r s . s l i c e ( 0 ,   d a t a . l e n g t h ) ,  
                                 b o r d e r W i d t h :   1  
                         } ]  
                 } ,  
                 o p t i o n s :   {  
                         r e s p o n s i v e :   t r u e ,  
                         p l u g i n s :   {  
                                 l e g e n d :   {  
                                         p o s i t i o n :   ' b o t t o m ' ,  
                                 }  
                         }  
                 }  
         } ) ;  
 }  
 