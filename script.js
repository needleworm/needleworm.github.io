
const sns = {
    email: "bhban@kakao.com",
    github: "https://github.com/needleworm",
    linkedin: "https://www.linkedin.com/in/bhban",
    youtube: "https://www.youtube.com/channel/UCpV0ZdloVwvSjxHfnYYQPQg?sub_confirmation=1",
    researchgate: "https://www.researchgate.net/profile/Byunghyun_Ban"
};

const storeIcons = {
    aladin: '<img src="./images/books/stores/aladdin.png" class="bookStoreIcon" alt="aladin"/>',
    kyobo: '<img src="./images/books/stores/kyobo.png" class="bookStoreIcon" alt="kyobo"/>',
    naver: '<img src="./images/books/stores/naver.png" class="bookStoreIcon" alt="naver"/>',
    yes24: '<img src="./images/books/stores/yes24.png" class="bookStoreIcon" alt="yes24"/>',
    ridi: '<img src="./images/books/stores/ridi.jpg" class="bookStoreIcon" alt="ridibooks"/>'
};

const booksData = [
    {
        cover: "./images/books/covers/29.jpg",
        title: "코파일럿",
        desc: "2024.03. 생능북스",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K562939114", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000212725343", icon: storeIcons.kyobo },
            { url: "https://www.yes24.com/Product/Goods/125480842", icon: storeIcons.yes24 },
            { url: "https://search.shopping.naver.com/book/catalog/46408580621", icon: storeIcons.naver }
        ]
    },
    {
        cover: "./images/books/covers/28.jpg",
        title: "챗GPT 수능독해",
        desc: "2024.02. 생능북스",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K762938384", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000212169752", icon: storeIcons.kyobo },
            { url: "https://www.yes24.com/Product/Goods/124769179", icon: storeIcons.yes24 },
            { url: "https://search.shopping.naver.com/book/catalog/45475313619", icon: storeIcons.naver }
        ]
    },
    {
        cover: "./images/books/covers/26.png",
        title: "나보다 똑똑한 AI와 사는 법",
        desc: "2023.12. 북트리거",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K302937684", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000211656067", icon: storeIcons.kyobo },
            { url: "https://www.yes24.com/Product/Goods/124129560", icon: storeIcons.yes24 },
            { url: "https://search.shopping.naver.com/book/catalog/44639212631", icon: storeIcons.naver }
        ]
    },
    {
        cover: "./images/books/covers/25.png",
        title: '<a href="https://aieng.kr" target="_blank" rel="noreferrer">프롬프트 엔지니어링 <i class="fas fa-external-link-alt"></i></a>',
        desc: "2023.10. 생능북스",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K872935139", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000209512470", icon: storeIcons.kyobo },
            { url: "https://www.yes24.com/Product/Goods/122661870", icon: storeIcons.yes24 },
            { url: "https://search.shopping.naver.com/book/catalog/42879138623", icon: storeIcons.naver }
        ]
    },
    {
        cover: "./images/books/covers/24.jpg",
        title: '<a href="https://aieng.kr" target="_blank" rel="noreferrer">챗GPT 영어회화 <i class="fas fa-external-link-alt"></i></a>',
        desc: "2023.08. 생능북스",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=321904017", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000208357873", icon: storeIcons.kyobo },
            { url: "https://www.yes24.com/Product/Goods/121173595", icon: storeIcons.yes24 },
            { url: "https://search.shopping.naver.com/book/catalog/41736386620", icon: storeIcons.naver }
        ]
    },
    {
        cover: "./images/books/covers/23.jpg",
        title: '<a href="https://aieng.kr" target="_blank" rel="noreferrer">마음을 움직이는 보고서 작성법 <i class="fas fa-external-link-alt"></i></a>',
        desc: "2023.07. 생능북스",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K782834570", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000202988695", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/41011824619", icon: storeIcons.naver },
            { url: "https://www.yes24.com/Product/Goods/119982982", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/22.jpg",
        title: '<a href="https://aieng.kr" target="_blank" rel="noreferrer">챗GPT영어교실 <i class="fas fa-external-link-alt"></i></a>',
        desc: "2023.06. 생능북스",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K382833859", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000202728693", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/40724311622", icon: storeIcons.naver },
            { url: "https://www.yes24.com/Product/Goods/119732698", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/21.jpg",
        title: '<a href="https://needleworm.github.io/gpt2" target="_blank" rel="noreferrer">GPT 노마드의 탄생 <i class="fas fa-external-link-alt"></i></a>',
        desc: "2023.03. 생능북스",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=313625658", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000201335898", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/38808261620", icon: storeIcons.naver },
            { url: "http://www.yes24.com/Product/Goods/118059497", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/20.jpg",
        title: '<a href="https://needleworm.github.io/chatgpt" target="_blank" rel="noreferrer">챗GPT <i class="fas fa-external-link-alt"></i></a>',
        desc: "2023.02. 생능북스",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K882831410", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000200861077", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/37646281618", icon: storeIcons.naver },
            { url: "http://www.yes24.com/Product/Goods/117246674", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/19.jpg",
        title: '<a href="https://needleworm.github.io/ai_voca" target="_blank" rel="noreferrer">AI족집게 수능영단어 <i class="fas fa-external-link-alt"></i></a>',
        desc: "2023.01. 생능북스",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=8970506667", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000200661730", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/37153902621", icon: storeIcons.naver },
            { url: "http://www.yes24.com/Product/Goods/116904678", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/18.jpg",
        title: '<a href="https://www.bookk.co.kr/book/view/160649" target="_blank" rel="noreferrer">ChatGPT <i class="fas fa-external-link-alt"></i></a>',
        desc: "2023.01. BOOKK(부크크)",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K372831688", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000200738583", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/37266116619", icon: storeIcons.naver },
            { url: "http://www.yes24.com/Product/Goods/116974514", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/17.jpg",
        title: '<a href="https://needleworm.github.io/psd" target="_blank" rel="noreferrer">포토샵 마스터 클래스 <i class="fas fa-external-link-alt"></i></a>',
        desc: "2023.01. 생능북스",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=8970506764", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000200616982", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/36979590620", icon: storeIcons.naver },
            { url: "http://www.yes24.com/Product/Goods/116758227", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/16.jpg",
        title: '<a href="https://needleworm.github.io/dev" target="_blank" rel="noreferrer">비전공이지만 개발자로 먹고삽니다 <i class="fas fa-external-link-alt"></i></a>',
        desc: "2022.12. 생능북스",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=897050558X", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000200326244", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/36085390618", icon: storeIcons.naver },
            { url: "http://www.yes24.com/product/goods/115621142", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/15.jpg",
        title: '<a href="https://www.bookk.co.kr/book/view/146587" target="_blank" rel="noreferrer">별처럼 찬란히 빛나는 꿈으로 <i class="fas fa-external-link-alt"></i></a>',
        desc: "2022.08. BOOKK(부크크)",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K202839180", icon: storeIcons.aladin },
            { url: "https://www.bookk.co.kr/book/view/146587", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/34370748635", icon: storeIcons.naver },
            { url: "http://www.yes24.com/Product/Goods/112344499", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/14.jpg",
        title: '<a href="https://needleworm.github.io/tech3" target="_blank" rel="noreferrer">가상자산 수업 <i class="fas fa-external-link-alt"></i></a>',
        desc: "2022.06. 생능북스",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=8970505504", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000061351299", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/32551450619", icon: storeIcons.naver },
            { url: "http://www.yes24.com/Product/Goods/109708603", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/13.jpg",
        title: '<a href="https://needleworm.github.io/dataset" target="_blank" rel="noreferrer">142가지 데이터셋 <i class="fas fa-external-link-alt"></i></a>',
        desc: "2022.02. 생능북스",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=8970505350", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000001076024", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/32466669805", icon: storeIcons.naver },
            { url: "http://www.yes24.com/Product/Goods/107036705", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/12.jpg",
        title: '<a href="https://needleworm.github.io/frontend" target="_blank" rel="noreferrer">HTML, CSS, 자바스크립트 <i class="fas fa-external-link-alt"></i></a>',
        desc: "2022.02. 생능북스",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=8970505369", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000001076025", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/32473630306", icon: storeIcons.naver },
            { url: "http://www.yes24.com/Product/Goods/107010853", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/11.jpg",
        title: "Cheesecake Vol.1",
        desc: "2021.10. BOOKK (부크크)",
        links: [
            { url: "http://aladin.kr/p/l4o7A", icon: storeIcons.aladin },
            { url: "https://search.shopping.naver.com/book/catalog/32492547835", icon: storeIcons.naver },
            { url: "http://www.yes24.com/Product/Goods/105138391", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/10.jpg",
        title: '<a href="https://needleworm.github.io/101" target="_blank" rel="noreferrer">101가지 컴퓨터 활용팁 <i class="fas fa-external-link-alt"></i></a>',
        desc: "2021.07. 생능출판사",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=897050494X", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000001075989", icon: storeIcons.kyobo },
            { url: "https://book.naver.com/bookdb/book_detail.nhn?bid=20739091", icon: storeIcons.naver },
            { url: "https://search.shopping.naver.com/book/catalog/32441660148", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/9.jpg",
        title: '<a href="https://needleworm.github.io/financebook" target="_blank" rel="noreferrer">내 자산 자동으로 관리하기 <i class="fas fa-external-link-alt"></i></a>',
        desc: "2021.07. 생능출판사",
        links: [
            { url: "https://ebook-product.kyobobook.co.kr/dig/epd/ebook/480D210717470", icon: storeIcons.kyobo },
            { url: "https://book.naver.com/bookdb/book_detail.nhn?bid=20764734", icon: storeIcons.naver },
            { url: "https://ridibooks.com/books/4638000001", icon: storeIcons.ridi }
        ]
    },
    {
        cover: "./images/books/covers/8.jpg",
        title: '<a href="https://needleworm.github.io/bhban_ai" target="_blank" rel="noreferrer">쉬운 딥러닝 <i class="fas fa-external-link-alt"></i></a>',
        desc: "2021.04. 생능출판사",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=269891239", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000001075983", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/32466710658", icon: storeIcons.naver },
            { url: "http://www.yes24.com/Product/Goods/99552196", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/7.jpg",
        title: '<a href="https://needleworm.github.io/bhban_rpa" target="_blank" rel="noreferrer">6개월 치 업무를 하루 만에 끝내는 업무자동화 <i class="fas fa-external-link-alt"></i></a>',
        desc: "2020.12. 생능출판사",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=8970504745", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000001075971", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/32445091399", icon: storeIcons.naver },
            { url: "http://www.yes24.com/Product/Goods/96360166", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/6.jpg",
        title: "공학자의 오경묵상",
        desc: "2020.11. BOOKK(부크크)",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K112735243", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000060613527", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/32490302839", icon: storeIcons.naver },
            { url: "http://www.yes24.com/Product/Goods/95590656", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/5.jpg",
        title: "나는 아직 잊힐 준비가 되지 않았어요",
        desc: "2020.08. BOOKK(부크크)",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K622632023", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000060612313", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/32506471953", icon: storeIcons.naver },
            { url: "http://www.yes24.com/Product/Goods/92154589", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/4.jpg",
        title: "공학자의 지혜묵상",
        desc: "2020.05. BOOKK(부크크)",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K452639642", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000060611595", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/32485690654", icon: storeIcons.naver },
            { url: "http://www.yes24.com/Product/Goods/90392271", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/3.jpg",
        title: "코딩하는 공익",
        desc: "2020.04. 세창출판사",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=8955866119", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000000810146", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/32482707099", icon: storeIcons.naver },
            { url: "http://www.yes24.com/Product/Goods/90081924", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/2.jpg",
        title: "실전 민사소송법",
        desc: "2017.05. 해피로라",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=K572639625", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000060611461", icon: storeIcons.kyobo },
            { url: "https://search.shopping.naver.com/book/catalog/32497168624", icon: storeIcons.naver },
            { url: "http://www.yes24.com/Product/Goods/90250538", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/1.jpg",
        title: "법대로 합시다",
        desc: "2016.02. 지식과감성#",
        links: [
            { url: "https://search.shopping.naver.com/book/catalog/32490276655", icon: storeIcons.naver },
            { url: "http://www.yes24.com/Product/Goods/30660689", icon: storeIcons.yes24 }
        ]
    },
    {
        cover: "./images/books/covers/27.png",
        title: "카이스트 공부벌레들",
        desc: "2012.12. 살림Friends",
        links: [
            { url: "https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=8952222210", icon: storeIcons.aladin },
            { url: "https://product.kyobobook.co.kr/detail/S000000721696", icon: storeIcons.kyobo },
            { url: "https://www.yes24.com/Product/Goods/8127931", icon: storeIcons.yes24 },
            { url: "https://search.shopping.naver.com/book/catalog/32503858072", icon: storeIcons.naver }
        ]
    },
    {
        cover: "./images/books/covers/0.jpg",
        title: "환세취호전",
        desc: "2004.방학숙제",
        links: []
    }
];

function renderBooks() {
    const container = document.getElementById('book-list');
    if (!container) return;

    container.innerHTML = '';

    booksData.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'singleBookContainer';

        let linkHtml = '';
        if (book.links && book.links.length > 0) {
            linkHtml = `<ul class="list-inline">`;
            book.links.forEach(link => {
                linkHtml += `<li><a href="${link.url}" target="_blank" rel="noreferrer">${link.icon}</a></li>`;
            });
            linkHtml += `</ul>`;
        }

        bookDiv.innerHTML = `
            <img src="${book.cover}" alt="${book.title.replace(/<[^>]*>?/gm, '')}" class="bookCoverImage"/>
            <h5>${book.title}</h5>
            <p class="bookDescription">${book.desc}</p>
            ${linkHtml}
        `;
        container.appendChild(bookDiv);
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
            if (contentId === 'books') {
                renderBooks();
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
