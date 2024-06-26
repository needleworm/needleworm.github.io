import React from 'react';
import './news.css';


function News() {

  const sectionTitle = () => {
    return(
      <div className="row">
        <div className="col-lg-12 text-center">
            <h2 className="section-heading subpageHeading">News</h2>
        </div>
      </div>
    )
  }

  const drawNews = () => {
    let news2 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop" href="http://gamefocus.co.kr/detail.php?number=108335" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/2.jpg"  alt="projectimage"/>
            <h5>게임포커스</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="http://gamefocus.co.kr/detail.php?number=108335" target="_blank"  rel="noreferrer">
            <h5>코딩은 어떻게 세상을 바꾸나, 넥슨 'NYPC 2020 토크콘서트 ON' 1일차 강연 진행</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2020.08.15.
            </p>
            <p className="bookDescription">
            상상텃밭의 반병현 CTO는 코딩과 인공지능을 활용해 농업 과정에서의 판단 및 예측의 자동화를 시도하고 있다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile" href="http://gamefocus.co.kr/detail.php?number=108335" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/2.jpg"  alt="projectimage"/>
            <h5>게임포커스</h5>
          </div>
          </a>
      </div>
    </div>
    
    let news3 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="http://it.chosun.com/site/data/html_dir/2019/11/23/2019112301220.html" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/3.jpg"  alt="projectimage"/>
            <h5>IT조선</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="http://it.chosun.com/site/data/html_dir/2019/11/23/2019112301220.html" target="_blank"  rel="noreferrer">
            <h5>[마소콘 2019] '코딩하는 공익'이 '세상을 바꾸는 공익'으로</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2019.11.23.
            </p>
            <p className="bookDescription">
            반 씨는 마이크로소프트웨어와 IT조선이 23일 서울 마포구 상암동 누리꿈스퀘어에서 개최한 '마소콘(MASOCON) 2019'에 참가해 ‘혁신의 장벽을 개발자스럽게 부수기’를 주제로 강연했다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="http://it.chosun.com/site/data/html_dir/2019/11/23/2019112301220.html" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/3.jpg"  alt="projectimage"/>
            <h5>IT조선</h5>
          </div>
          </a>
      </div>
    </div>
        
    let news4 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="http://www.seoul.co.kr/news/newsView.php?id=20130406025027" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/4.jpg"  alt="projectimage"/>
            <h5>서울신문</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="http://www.seoul.co.kr/news/newsView.php?id=20130406025027" target="_blank"  rel="noreferrer">
            <h5>총장의 말춤 “카이스트를 소통 스타일로”</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2013.04.06.
            </p>
            <p className="bookDescription">
            4일 새벽 1시 40분. 강성모(오른쪽) 한국과학기술원(KAIST) 총장에게 도착한 메일 내용이다. 메일을 보낸 반씨도 “별로 기대하지 않았다”고 말할 정도로 황당한 부탁이었다. 두 시간 뒤 반씨에게 답장이 도착했다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="http://www.seoul.co.kr/news/newsView.php?id=20130406025027" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/4.jpg"  alt="projectimage"/>
            <h5>서울신문</h5>
          </div>
          </a>
      </div>
    </div>

    let news5 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://www.kyongbuk.co.kr/news/articleView.html?idxno=518743" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/5.jpg"  alt="projectimage"/>
            <h5>경북일보</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://www.kyongbuk.co.kr/news/articleView.html?idxno=518743" target="_blank"  rel="noreferrer">
            <h5>고교 2학년 문과지망생, 카이스트 합격 화제</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2010.12.12.
            </p>
            <p className="bookDescription">
            사실 반 군은 문과 지망생이었다. 어렸을 때 동화와 만화에서 시작된 독서 편력은 중학교를 거치며 무협소설로 이어졌다. 웬만한 무협지는 섭렵하다 보니 학교 성적이 곤두박질 쳤고
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://www.kyongbuk.co.kr/news/articleView.html?idxno=518743" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/5.jpg"  alt="projectimage"/>
            <h5>경북일보</h5>
          </div>
          </a>
      </div>
    </div>

    let news6 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://www.edaily.co.kr/news/read?newsId=01315286622583384&mediaCodeNo=257&OutLnkChk=Y" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/6.jpg"  alt="projectimage"/>
            <h5>이데일리</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://www.edaily.co.kr/news/read?newsId=01315286622583384&mediaCodeNo=257&OutLnkChk=Y" target="_blank"  rel="noreferrer">
            <h5>[90년대생 리포트]⑤유튜브·코딩도 척척…공직사회에도 새 바람</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2019.08.02.
            </p>
            <p className="bookDescription">
            이 이야기는 조직 내부는 물론 세간에도 알려지면서 유명세를 탔고 반 씨는 고용노동부 고용서비스과를 비롯해 행안부 등 많은 부처에 업무 협조 요청을 받았다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://www.edaily.co.kr/news/read?newsId=01315286622583384&mediaCodeNo=257&OutLnkChk=Y" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/6.jpg"  alt="projectimage"/>
            <h5>이데일리</h5>
          </div>
          </a>
      </div>
    </div>
    
    let news7 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="http://weekly.khan.co.kr/khnm.html?mode=view&code=114&artid=201812101537021&pt=nv" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/6.jpg"  alt="projectimage"/>
            <h5>경향신문</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="http://weekly.khan.co.kr/khnm.html?mode=view&code=114&artid=201812101537021&pt=nv" target="_blank"  rel="noreferrer">
            <h5>[언더그라운드 넷]심심해서 프로그램 개발한 ‘카이스트 공익’</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2018.12.17.
            </p>
            <p className="bookDescription">
            반씨는 ‘국정원’ 관계자와 통화를 한 끝에 겨우 차단을 해제받았다. 이후에도 반씨의 프로그래밍 본능은 멈추지 않았다. 한 번은 3900건의 우편물 수신자·발신자 목록 등을 한 번에 정리하는 프로그램을 만들었다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="http://weekly.khan.co.kr/khnm.html?mode=view&code=114&artid=201812101537021&pt=nv" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/6.jpg"  alt="projectimage"/>
            <h5>경향신문</h5>
          </div>
          </a>
      </div>
    </div>

    let news8 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="http://www.dt.co.kr/contents.html?article_no=2016061502101176788001" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/8.jpg"  alt="projectimage"/>
            <h5>디지털타임스</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="http://www.dt.co.kr/contents.html?article_no=2016061502101176788001" target="_blank"  rel="noreferrer">
            <h5>잠자던 공공기술, 청년 만나 `혁신벤처`로</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2016.06.14.
            </p>
            <p className="bookDescription">
            반병현 KAIST 학사과정생의 '치즈케익스튜디오팀'은 사진이나 문장을 입력하면 AI가 자동으로 어울리는 분위기의 곡을 작곡해주는 기술을 창업 아이템으로 제시했다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="http://www.dt.co.kr/contents.html?article_no=2016061502101176788001" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/8.jpg"  alt="projectimage"/>
            <h5>디지털타임스</h5>
          </div>
          </a>
      </div>
    </div>
    
    let news9 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop" href="https://newsis.com/view/?id=NISX20190401_0000605040&cID=10301&pID=10300" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/9.jpg"  alt="projectimage"/>
            <h5>뉴시스</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://newsis.com/view/?id=NISX20190401_0000605040&cID=10301&pID=10300" target="_blank"  rel="noreferrer">
            <h5>"정부혁신 현 주소 짚는다"…2~3일 담당자 워크숍</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2019.04.01.
            </p>
            <p className="bookDescription">
            회복무요원 반병현씨가 '코딩하는 공익과 업무혁신', 보령시가 '적극행정 보령특별시 선포', 세종시가 '똑똑세종 실험실', 국립공원공단이 '순찰용 드론 공공구매조달'에 대해 각각 발표하게 된다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile" href="https://newsis.com/view/?id=NISX20190401_0000605040&cID=10301&pID=10300" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/9.jpg"  alt="projectimage"/>
            <h5>뉴시스</h5>
          </div>
          </a>
      </div>
    </div>

    let news11 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://www.news2day.co.kr/149400" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/11.jpg"  alt="projectimage"/>
            <h5>뉴스투데이</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://www.news2day.co.kr/149400" target="_blank"  rel="noreferrer">
            <h5>[이태희의 JOB채](44)파이썬의 교훈을 실행한 LG생활건강 차석용 대표, 주가는 오르겠지만</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2020.03.10.
            </p>
            <p className="bookDescription">
            반 씨의 사례는 4차 산업혁명시대에 의미심장한 메시지를 던진다. 단순 반복 노동으로 자신의 가치를 지켜내려는 인간은 이제 설 자리가 없다는 사실이다. 단순 노동 작업자가 6개월 간 걸릴 작업 분량을 반 씨와 같은 혁신가가 반 나절만에 뚝딱 처리해버린다. 
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://www.news2day.co.kr/149400" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/11.jpg"  alt="projectimage"/>
            <h5>뉴스투데이</h5>
          </div>
          </a>
      </div>
    </div>

    let news12 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://www.donga.com/news/article/all/20181218/93346855/1" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/12.jpg"  alt="projectimage"/>
            <h5>동아일보</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://www.donga.com/news/article/all/20181218/93346855/1" target="_blank"  rel="noreferrer">
            <h5>‘6개월치 잡무’ 하루 만에 끝… 사회복무요원의 행정혁명</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2018.12.18.
            </p>
            <p className="bookDescription">
            반 씨는 17일 본보와의 통화에서 “스스로 ‘가성비(가격 대비 성능)’가 떨어지는 걸 못 견디는 편이라 단순 반복 업무가 싫어 자동화 프로그램을 개발했다”며 “일개 사회복무요원이 정부 행정 시스템을 바꾸는 데 기여할 수 있다는 게 놀라웠다”고 말했다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://www.donga.com/news/article/all/20181218/93346855/1" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/12.jpg"  alt="projectimage"/>
            <h5>동아일보</h5>
          </div>
          </a>
      </div>
    </div>

    let news13 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://news.joins.com/article/23414498" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/13.jpg"  alt="projectimage"/>
            <h5>중앙일보</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://news.joins.com/article/23414498" target="_blank"  rel="noreferrer">
            <h5>[안혜리 논설위원이 간다] 수상한 공익과 더 수상한 공무원의 특별한 접선</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2019.03.19.
            </p>
            <p className="bookDescription">
            파장이 컸다. 지난 연말 청와대에 불려갔다. 이름만 대면 알만한 기업 회장님으로부터는 만나러 와달라는 연락을 받았다. 냉큼 달려가 덥석 시키는 일을 할 법도 한데 웬만한 제안은 다 거절 중이다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://news.joins.com/article/23414498" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/13.jpg"  alt="projectimage"/>
            <h5>중앙일보</h5>
          </div>
          </a>
      </div>
    </div>
    
    
    let news15 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://in-sightjournal.com/2020/07/15/ban/" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/15.jpg"  alt="projectimage"/>
            <h5>In-Sight Publishing</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://in-sightjournal.com/2020/07/15/ban/" target="_blank"  rel="noreferrer">
            <h5>An Interview with Byunghyun Ban (반병현) on Background, and Intelligence Testing & High-IQ Societies</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2020.07.15.
            </p>
            <p className="bookDescription">
            I hope High-IQ communities provide some intellectual contributions to the world. For example, I hope the societies to publish an open-access scientific journal which is indexed as SCIE or SCOPUS, and discount the publication fee for community members. This is the most simple way to collect geniuses and contribute intellectual works.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://in-sightjournal.com/2020/07/15/ban/" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/15.jpg"  alt="projectimage"/>
            <h5>In-Sight Publishing</h5>
          </div>
          </a>
      </div>
    </div>

    let news16 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://startup.kaist.ac.kr/archives/29109" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/16.jpg"  alt="projectimage"/>
            <h5>Startup Kaist</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://startup.kaist.ac.kr/archives/29109" target="_blank"  rel="noreferrer">
            <h5>[Startup人터뷰] 양액제어시스템 등 기술을 개발하여 스마트팜을 이끄는 ‘상상텃밭’의 반병현 CTO</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2020.11.13.
            </p>
            <p className="bookDescription">
            당시 다이어트를 하고 있었어요. W8건물 1층 카페에서 샐러드를 사 먹고 있었습니다. 며칠간 밀가루와 고기를 못 먹었더니 성질이 사나워져서 괜히 샐러드에게 짜증이 나는 것 있죠. ‘이렇게 맛없고 비싼 걸 사먹는걸 보면 채식주의자들은 돈이 많은가?’ 하는 생각이 스쳐지나갔습니다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://startup.kaist.ac.kr/archives/29109" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/16.jpg"  alt="projectimage"/>
            <h5>Startup Kaist</h5>
          </div>
          </a>
      </div>
    </div>

    let news17 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://www.imaso.co.kr/archives/4296" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/17.jpg"  alt="projectimage"/>
            <h5>마이크로소프트웨어</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://www.imaso.co.kr/archives/4296" target="_blank"  rel="noreferrer">
            <h5>코딩하는 공익 반병현 CTO “AI 활용한 보급형 스마트팜, ‘상상텃밭’이 만든다”</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2018.11.15.
            </p>
            <p className="bookDescription">
            근무지에 발령받고 엑셀 파일 2개를 합쳐서 하나로 만들어 오라는 지시를 받았다. 그런데 이 파일은 주기적으로 업데이트가 필요한 내용인 것으로 보였고, 앞으로도 꾸준히 본인이 처리해야 할 것 같았다. 그래서 자동으로 처리하는 스크립트를 만들어 담당공무원에게 전달했다. 이게 국가정보자원관리원의 모니터링에 걸렸다. 비인가 소프트웨어 전송을 통한 공격행위로 오인돼 IP를 차단당했고, 우여곡절 끝에 이를 해제했다는 이야기다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://www.imaso.co.kr/archives/4296" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/17.jpg"  alt="projectimage"/>
            <h5>마이크로소프트웨어</h5>
          </div>
          </a>
      </div>
    </div>

    let news18 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://post.naver.com/viewer/postView.nhn?volumeNo=17719119&memberNo=2420267&vType=VERTICAL" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/18.jpg"  alt="projectimage"/>
            <h5>시사원정대</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://post.naver.com/viewer/postView.nhn?volumeNo=17719119&memberNo=2420267&vType=VERTICAL" target="_blank"  rel="noreferrer">
            <h5>세상의 모~든 문제 코딩으로 해결 할래요!</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2019.02.16.
            </p>
            <p className="bookDescription">
            기존 방식으로는 처리하는 데 반년이나 걸릴 일을 최근 한 사회복무요원이 단 하루 만에 '뚝딱!' 해치워 사람들을 놀라게 했어요.'
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://post.naver.com/viewer/postView.nhn?volumeNo=17719119&memberNo=2420267&vType=VERTICAL" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/18.jpg"  alt="projectimage"/>
            <h5>시사원정대</h5>
          </div>
          </a>
      </div>
    </div>



    let news19 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://www.ekn.kr/web/view.php?key=20210814010002271" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/19.jpg"  alt="projectimage"/>
            <h5>에너지경제신문</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://www.ekn.kr/web/view.php?key=20210814010002271" target="_blank"  rel="noreferrer">
            <h5>[신간도서] 비전공자가 업무에서 자주 물어보는 101가지 컴퓨터 활용팁</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2021.08.14.
            </p>
            <p className="bookDescription">
              [에너지경제신문 여헌우 기자] 빠르고 효율적으로 일하려는 모든 직장인을 위한 컴퓨터 활용 스킬을 다룬 신간이 나왔다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://www.ekn.kr/web/view.php?key=20210814010002271" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/19.jpg"  alt="projectimage"/>
            <h5>에너지경제신문</h5>
          </div>
          </a>
      </div>
    </div>

    let news20 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://press.chungbuk.ac.kr/ktimes/articles/112/20211206/20211206201200.html" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/20.jpg"  alt="projectimage"/>
            <h5>충북대신문</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://press.chungbuk.ac.kr/ktimes/articles/112/20211206/20211206201200.html" target="_blank"  rel="noreferrer">
            <h5>대한민국을 바꾼 공익에서 스타트업 CTO가 된 반병현을 만나다</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2021.12.06.
            </p>
            <p className="bookDescription">
              그런데, 그 반복적이고 지루한 업무에 매달리지 않고, 개선 방법을 고민해 직접 자동화 프로그램을 만들어 6개월 걸리던 일을 단 30분 만에 끝낸 사람이 있다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://press.chungbuk.ac.kr/ktimes/articles/112/20211206/20211206201200.html" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/20.jpg"  alt="projectimage"/>
            <h5>충북대신문</h5>
          </div>
          </a>
      </div>
    </div>

    let news21 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://www.donga.com/news/article/all/20220502/113189882/1" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/21.jpg"  alt="projectimage"/>
            <h5>동아일보</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://www.donga.com/news/article/all/20220502/113189882/1" target="_blank"  rel="noreferrer">
            <h5>청년 스마트팜 기업 상상텃밭 “가장 진보한 기술로 가장 오래된 산업에 혁신을”</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2022.04.29.
            </p>
            <p className="bookDescription">
            “가장 진보한 기술로 가장 오래된 산업에 혁신을 이루겠습니다”<br/>
            청년들이 모여 만든 스마트팜 기업 ‘상상텃밭’의 반병현 최고기술경영자(CTO)가 밝힌 당찬 포부다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://www.donga.com/news/article/all/20220502/113189882/1" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/21.jpg"  alt="projectimage"/>
            <h5>동아일보</h5>
          </div>
          </a>
      </div>
    </div>

    let news22 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://www.artinsight.co.kr/news/view.php?no=60369" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/22.jpg"  alt="projectimage"/>
            <h5>아트인사이트</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://www.artinsight.co.kr/news/view.php?no=60369" target="_blank"  rel="noreferrer">
            <h5>믿음에 값을 매긴다면 - 돈이 복사되는 가상자산 수업</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2022.06.22.
            </p>
            <p className="bookDescription">
            NFT는 아무래도 '신세대' 기술이니까, 이왕이면 신간 도서를 골라잡고 싶었다. 그러던 중 NFT뿐 아니라 암호화폐와 메타버스까지 다루는 반병현 작가의 돈이 복사되는 가상자산 수업을 발견했다. 내가 본래 궁금했던 것은 NFT였으나, 다른 기술까지 함께 알아도 나쁠 건 없지 싶었다. 
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://www.artinsight.co.kr/news/view.php?no=60369" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/22.jpg"  alt="projectimage"/>
            <h5>아트인사이트</h5>
          </div>
          </a>
      </div>
    </div>

    let news23 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://www.lecturernews.com/news/articleView.html?idxno=114390" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/23.png"  alt="projectimage"/>
            <h5>한국강사신문</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://www.lecturernews.com/news/articleView.html?idxno=114390" target="_blank"  rel="noreferrer">
            <h5>“비전공 개발자 취업/이직 완벽 가이드” 반병현·이효석의 신간도서 『비전공이지만 개발자로 먹고삽니다』 출간</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2022.12.15.
            </p>
            <p className="bookDescription">
              취업시장에 개발자 열풍이 불고 있습니다. 구직자들도 몰리고 기업도 개발자들을 다수 채용하고 있습니다. 개발자의 평균연봉이 5,700만 원이라는 기사도 있습니다. 개발자가 되고 싶은 사람들은 많지만 인터넷을 검색하거나 주위에 물어보아도 단편적인 정보만 얻을 수 있고, 스스로 방향 설정을 할 수 있도록 도움을 주는 양질의 정보는 많지 않습니다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://www.lecturernews.com/news/articleView.html?idxno=114390" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/23.png"  alt="projectimage"/>
            <h5>한국강사신문</h5>
          </div>
          </a>
      </div>
    </div>

    let news24 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="http://www.kdpress.co.kr/news/articleView.html?idxno=118030" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/24.png"  alt="projectimage"/>
            <h5>데일리경제</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="http://www.kdpress.co.kr/news/articleView.html?idxno=118030" target="_blank"  rel="noreferrer">
            <h5>ChatGPT 시대 미래 트렌드 전망 ‘챗GPT’ 출간..생능북스</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2023.2.10.
            </p>
            <p className="bookDescription">
            ‘ChatGPT’란 차세대 인공지능으로 오픈AI에서 공개한 인공지능 챗봇이다. 오픈AI는 테슬라의 일론 머스크, 와이 콤비네이터 창업자인 샘 알트만, 링크드인 공동창업자인 리드 호프먼 등 IT업계의 거물들이 힘을 합쳐 만든 기업이다. 세계에서 가장 큰 규모의 AI 개발을 진행 중에 있다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="http://www.kdpress.co.kr/news/articleView.html?idxno=118030" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/24.png"  alt="projectimage"/>
            <h5>데일리경제</h5>
          </div>
          </a>
      </div>
    </div>

    let news25 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://news.sbs.co.kr/news/endPage.do?news_id=N1007084660" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/25.png"  alt="projectimage"/>
            <h5>SBS 뉴스</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://news.sbs.co.kr/news/endPage.do?news_id=N1007084660" target="_blank"  rel="noreferrer">
            <h5>마약이면서 치료제?…'50조 시장' 코앞인 대마 활용법</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2023.2.17.
            </p>
            <p className="bookDescription">
            대마라고 하면 흔히 마약을 떠올리게 되는데, 대마에 들어있는 특정 물질은 환자를 치료하는 데 쓰이기도 합니다. 그래서 일부 나라에서는 대마를 약으로 쓰기 위한 연구가 활발히 이뤄지고 있습니다. 우리는 어느 수준까지 와 있는지, 심우섭 기자가 취재했습니다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://news.sbs.co.kr/news/endPage.do?news_id=N1007084660" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/25.png"  alt="projectimage"/>
            <h5>SBS뉴스</h5>
          </div>
          </a>
      </div>
    </div>

    let news26 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="http://www.hitnews.co.kr/news/articleView.html?idxno=43803" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/26.png"  alt="projectimage"/>
            <h5>히트뉴스</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="http://www.hitnews.co.kr/news/articleView.html?idxno=43803" target="_blank"  rel="noreferrer">
            <h5>내 증상을 챗GPT에게 물었다... 오류 많지만 잠재력엔 '현기증'</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2023.2.21.
            </p>
            <p className="bookDescription">
            전문가의 의견을 듣기 위해 알아보던 중 휴베이스 모연화 부사장이 좋은 소스를 보내왔다. 카이스트에서 바이오 및 뇌공학을 전공한 반병현 저자가 집필한 '챗GPT-마침내 찾아온 특이점'이란 서적이었다. 이 저자는 챗봇의 의약품 관련 질문에 대해서도 다루었는데, 기자와 약사들이 느낀 것과 비슷한 의견을 내놓았다. 
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="http://www.hitnews.co.kr/news/articleView.html?idxno=43803" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/26.png"  alt="projectimage"/>
            <h5>히트뉴스</h5>
          </div>
          </a>
      </div>
    </div>

    let news27 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://www.yna.co.kr/view/AKR20230306050200053" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/27.png"  alt="projectimage"/>
            <h5>연합뉴스</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://www.yna.co.kr/view/AKR20230306050200053" target="_blank"  rel="noreferrer">
            <h5>한은 대구경북본부, 4년 만에 금요강좌 다시 연다</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2023.3.6.
            </p>
            <p className="bookDescription">
            '챗GPT의 원리와 파급효과, 산업계의 전망'을 주제로 하는 반병현 작가의 강연을 시작으로 5월까지 매달 1회 한국은행 대구경북본부 대강당에서 진행한다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://www.yna.co.kr/view/AKR20230306050200053" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/27.png"  alt="projectimage"/>
            <h5>연합뉴스</h5>
          </div>
          </a>
      </div>
    </div>

    let news28 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://news.kbs.co.kr/news/view.do?ncd=7621552" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/28.png"  alt="projectimage"/>
            <h5>KBS</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://news.kbs.co.kr/news/view.do?ncd=7621552" target="_blank"  rel="noreferrer">
            <h5>출판계도 챗GPT 돌풍…신간 17종 출간, 판매량도 급증</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2023.3.8.
            </p>
            <p className="bookDescription">
            예스24 2월 베스트셀러 순위에는 {'<'}챗GPT{'>'}, {'<'}챗GPT에게 묻는 인류의 미래\{'>'}, {'<'}삶의 목적을 찾는 45가지 방법{'>'}이 나란히 1~3위에 이름을 올렸습니다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://news.kbs.co.kr/news/view.do?ncd=7621552" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/28.png"  alt="projectimage"/>
            <h5>KBS</h5>
          </div>
          </a>
      </div>
    </div>

    let news29 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="http://www.shinailbo.co.kr/news/articleView.html?idxno=1676875" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/29.jpg"  alt="projectimage"/>
            <h5>신아일보</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="http://www.shinailbo.co.kr/news/articleView.html?idxno=1676875" target="_blank"  rel="noreferrer">
            <h5>서대문구, 직원 챗GPT 활용 교육으로 업무 혁신 선도</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2023.3.21.
            </p>
            <p className="bookDescription">
            ‘왜 챗GPT에 열광하는가? 챗GPT의 이해와 활용’이란 주제로 열린 이번 강의에는 신청자가 정원을 크게 초과하는 등 직원들의 관심이 높아 온라인 생중계(기관 내 인트라넷)도 병행해 진행했다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="http://www.shinailbo.co.kr/news/articleView.html?idxno=1676875" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/29.jpg"  alt="projectimage"/>
            <h5>신아일보</h5>
          </div>
          </a>
      </div>
    </div>

    let news30 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://news.sbs.co.kr/news/endPage.do?news_id=N1007128184" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/30.jpg"  alt="projectimage"/>
            <h5>SBS 뉴스</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://news.sbs.co.kr/news/endPage.do?news_id=N1007128184" target="_blank"  rel="noreferrer">
            <h5>"IQ, 최소 139 수준"…챗GPT로 뜨고 지는 직업은 뭘까?</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2023.3.24.
            </p>
            <p className="bookDescription">
              반병현/챗GPT 마침내 찾아온 특이점 저자 : 미국 변호사시험 응시자들의 평균 수준을 일반인들의 10%다 이렇게 제한을 뒀을 때 GPT-4의 아이큐는 최소 139정도가 됩니다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://news.sbs.co.kr/news/endPage.do?news_id=N1007128184" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/30.jpg"  alt="projectimage"/>
            <h5>SBS뉴스</h5>
          </div>
          </a>
      </div>
    </div>

    let news31 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="http://www.lec.co.kr/news/articleView.html?idxno=742560" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/31.jpg"  alt="projectimage"/>
            <h5>법률저널</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="http://www.lec.co.kr/news/articleView.html?idxno=742560" target="_blank"  rel="noreferrer">
            <h5>손호영 판사의 판례 공부 112-ChatGPT 세상(2)</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2023.3.24.
            </p>
            <p className="bookDescription">
            그래도 코딩을 잘하는 사람에 대한 깊은 선망은 항상 마음 속에 자리하고 있었습니다. ‘코딩하는 공익(반병현)’이라는 분의 일화를 들었을 때는 찬탄을 금치 못했습니다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="http://www.lec.co.kr/news/articleView.html?idxno=742560" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/31.jpg"  alt="projectimage"/>
            <h5>법률저널</h5>
          </div>
          </a>
      </div>
    </div>

    let news32 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://www.yeongnam.com/web/view.php?key=20230324010003261" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/32.jpg"  alt="projectimage"/>
            <h5>영남일보</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://www.yeongnam.com/web/view.php?key=20230324010003261" target="_blank"  rel="noreferrer">
            <h5>"챗GPT가 사실 모자라다? 당신이 모자란 건 아닐까요?"</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2023.3.26.
            </p>
            <p className="bookDescription">
              "대화형 인공지능(AI)인 챗GPT 기능은 사실 사용자의 지능을 반영하는 거울입니다." 지난 24일 대구 동인동 한국은행 대구경북본부 2층 강당에서 열린 '한은금요강좌'에서 강사로 나선 반병현(30·챗GPT 저자) 작가가 화면에 띄운 문장이다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://www.yeongnam.com/web/view.php?key=20230324010003261" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/32.jpg"  alt="projectimage"/>
            <h5>영남일보</h5>
          </div>
          </a>
      </div>
    </div>

    let news33 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://www.lecturernews.com/news/articleView.html?idxno=122935" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/33.jpg"  alt="projectimage"/>
            <h5>한국강사신문</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://www.lecturernews.com/news/articleView.html?idxno=122935" target="_blank"  rel="noreferrer">
            <h5>“2023 준비된 자에게 찾아온 빅찬스” 반병현의 신간도서 『챗 GPT: GPT 노마드의 탄생』 출간</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2023.4.4.
            </p>
            <p className="bookDescription">
            이제 IT 비전문가도 인공지능 기술을 활용하여 새로운 수익을 창출해나갈 기회가 열리고 있다. 이 책은 그런 분들에게 GPT를 활용하는 다양한 방법과 사례를 안내함으로써, 선도적인 역할을 해나갈 수 있는 지름길을 제시한다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://www.lecturernews.com/news/articleView.html?idxno=122935" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/33.jpg"  alt="projectimage"/>
            <h5>한국강사신문</h5>
          </div>
          </a>
      </div>
    </div>

    let news34 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="https://www.busan.com/view/busan/view.php?code=2023040416084230595" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/34.jpg"  alt="projectimage"/>
            <h5>부산일보</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://www.busan.com/view/busan/view.php?code=2023040416084230595" target="_blank"  rel="noreferrer">
            <h5>해운대 인문학도서관, 반병현 작가 초청 북콘서트 ‘챗GPT와 공존하는 삶’</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2023.4.4.
            </p>
            <p className="bookDescription">
            반병현 작가는 베스트셀러로 유명한 『챗GPT 마침내 찾아온 특이점』의 저자이다. 저서로는 『챗GPT:GPT노마드의 탄생』,『비전공이지만 개발자로 먹고삽니다, 『쉬운 딥러닝』등 다수의 저작물이 있다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://www.busan.com/view/busan/view.php?code=2023040416084230595" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/34.jpg"  alt="projectimage"/>
            <h5>부산일보</h5>
          </div>
          </a>
      </div>
    </div>

    let news35 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="http://www.m-economynews.com/news/article.html?no=37774" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/35.jpg"  alt="projectimage"/>
            <h5>M이코노미</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="http://www.m-economynews.com/news/article.html?no=37774" target="_blank"  rel="noreferrer">
            <h5>"챗GPT 도입은 거스를 수 없는 물결···받아들이고 대처해야"</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2023.4.13.
            </p>
            <p className="bookDescription">
              반병현 상상텃밭㈜ CTO(최고기술경영자)는 13일 오후 2시 30분 서울 강남구 소재 한국과학기술정보연구원에서 열린 ‘제5차 데이터기술경제포럼’ 강연 첫 발제자로 나서 챗GPT가 이미 현실사회에 없어서는 안 될 존재로 자리매김했다며 우리나라도 챗GPT를 연구하고 활용할 수 있는 인프라를 조성해야 한다고 주장했다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="http://www.m-economynews.com/news/article.html?no=37774" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/35.jpg"  alt="projectimage"/>
            <h5>M이코노미</h5>
          </div>
          </a>
      </div>
    </div>

    let news36 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="http://www.mediatoday.asia/780826" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/36.jpg"  alt="projectimage"/>
            <h5>미디어투데이</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="http://www.mediatoday.asia/780826" target="_blank"  rel="noreferrer">
            <h5>서초구, 챗GPT 교육으로 직원과 구민의 AI 친밀도 높인다</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2023.5.10.
            </p>
            <p className="bookDescription">
            직원대상 특강은 오는 12일 KAIST 바이오 및 뇌공학과 석사 반병현 작가가 진행한다. 그는 과거 사회복무요원 시절 공공업무 자동화 프로그램을 개발한 후 청와대와 고용노동부를 비롯한 여러 공공기관을 방문해 업무자동화 기술 자문한 이력이 있으며, 현재 AI를 활용해 스마트팜 기술을 개발하는 스타트업에서 재직중이다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="http://www.mediatoday.asia/780826" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/36.jpg"  alt="projectimage"/>
            <h5>미디어투데이</h5>
          </div>
          </a>
      </div>
    </div>

    let news37 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="http://www.incheonilbo.com/news/articleView.html?idxno=1193713" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/37.jpg"  alt="projectimage"/>
            <h5>인천일보</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="http://www.incheonilbo.com/news/articleView.html?idxno=1193713" target="_blank"  rel="noreferrer">
            <h5>광명시 하안도서관, 챗GPT 반병현 소장 초청 강연회 성료</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2023.5.14.
            </p>
            <p className="bookDescription">
            광명시 하안도서관은 지난 13일 챗GPT 관련 베스트셀러 작가인 반병현 연구소장을 초청해 ‘챗GPT, 인공지능의 미래’를 주제로 강연회를 성황리에 개최했다. 이번 강연회에는 청소년부터 성인까지 100여명이 넘는 시민이 참석해 챗GPT와 앞으로 인공지능 기술이 산업사회에 끼치는 영향과 미래사회를 알아보는 시간을 가졌다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="http://www.incheonilbo.com/news/articleView.html?idxno=1193713" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/37.jpg"  alt="projectimage"/>
            <h5>인천일보</h5>
          </div>
          </a>
      </div>
    </div>

    let news38 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="http://www.ntoday.co.kr/news/articleView.html?idxno=97539" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/38.jpg"  alt="projectimage"/>
            <h5>투데이신문</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="http://www.ntoday.co.kr/news/articleView.html?idxno=97539" target="_blank"  rel="noreferrer">
            <h5>상상텃밭 반병현 CTO “특이점의 시대, 자기 성장 위해 챗GPT 써보라”</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2023.5.17.
            </p>
            <p className="bookDescription">
            이에 투데이신문은 반병현 CTO를 만나 그가 바라보는 AI 산업의 현 주소는 어디쯤인지, 우리는 어떻게 대비해야 하는지를 직접 들어보기로 했다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="http://www.ntoday.co.kr/news/articleView.html?idxno=97539" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/38.jpg"  alt="projectimage"/>
            <h5>투데이신문</h5>
          </div>
          </a>
      </div>
    </div>

    let news39 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop"  href="http://www.casenews.co.kr/news/articleView.html?idxno=13653" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/39.jpg"  alt="projectimage"/>
            <h5>사례뉴스</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="http://www.casenews.co.kr/news/articleView.html?idxno=13653" target="_blank"  rel="noreferrer">
            <h5>카이스트 출신 반병현 CTO, 챗GPT가 가져온 비즈니스 변화? “구조조정을 통한 수익성 개선이 용이해졌다”</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2023.06.26.
            </p>
            <p className="bookDescription">
              변병현 CTO와의 인터뷰를 통해 그가 살아온 인생과 챗GPT에 대한 인사이트들을 나눌 수 있었다.
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="http://www.casenews.co.kr/news/articleView.html?idxno=13653" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/39.jpg"  alt="projectimage"/>
            <h5>사례뉴스</h5>
          </div>
          </a>
      </div>
    </div>

    return <div>
      {news39}
      {news38}
      {news37}
      {news36}
      {news35}
      {news34}
      {news33}
      {news32}
      {news31}
      {news30}
      {news29}
      {news28}
      {news27}
      {news26}
      {news25}
      {news24}
      {news23}
      {news22}
      {news21}
      {news20}
      {news19}
      {news2}
      {news12}
      {news3}
      {news4}
      {news5}
      {news6}
      {news7}
      {news8}
      {news9}
      {news11}
      {news13}
      {news15}
      {news16}
      {news17}
      {news18}
    </div>
  }


  return (
    <section id="news" className="animated bounceInDown">
        {sectionTitle()}
        {drawNews()}
    </section>
  );
}
  
export default News;