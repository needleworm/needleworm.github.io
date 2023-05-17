import React from 'react';
import './lectures.css';


function Lectures() {

  const sectionTitle = () => {
    return(
      <div className="row">
        <div className="col-lg-12 text-center">
            <h2 className="section-heading subpageHeading">Lectures</h2>
        </div>
      </div>
    )
  }

  const drawLectures = () => {
    let youtube = <i className="fab fa-youtube"></i>
    let lectureLogo = <i className="fas fa-chalkboard-teacher"></i>
    let newsIcon = <i className="far fa-newspaper"></i>
    let book = <i className="fas fa-book"></i>
    let edulogo = <i className="fas fa-chalkboard-teacher"></i>
    

    let lecture25 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/1.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>6개월치 업무를 하루만에 끝내는 업무자동화 (2020, 2022)</h5><br/>
            <p className="bookDescription">
              패스트캠퍼스 온라인강좌<br/>
              파이썬 기초부터 엑셀파일 활용 자동화, 디자인 자동화, 매크로 제작 및 크롤링 과정.<br/>
              6개 대주제, 약 20시간 분량, 총 77여개 강의 영상
            </p>
          <div className="lectureIcons">
            <div className="gitIcons">
              <a href="https://www.youtube.com/watch?v=_5JAXsYKef0&t=86s" target="_blank"  rel="noreferrer">
                {youtube} Intro
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://youtu.be/5IfJ3JdNwB0" target="_blank"  rel="noreferrer">
                {youtube} Vlog
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://fastcampus.co.kr/dev_online_bbh" target="_blank"  rel="noreferrer">
                {lectureLogo} Lecture
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    let lecture24 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/2.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>스마트팜 교육 프로그램 (2020)</h5><br/>
            <p className="bookDescription">
              대구 서구 도시재생지원센터 인동촌 백년마을 도시재생뉴딜사업, 마을관리 사회적협동조합 교육과정<br/>
              4주 교육과정
            </p>
          <div className="lectureIcons">
            <div className="gitIcons">
              <a href="https://youtu.be/hX54rCG6y8A" target="_blank"  rel="noreferrer">
                {youtube}
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://youtu.be/tNCUIX0viY0" target="_blank"  rel="noreferrer">
                {youtube}
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://youtu.be/fKMSZN8Nn1M" target="_blank"  rel="noreferrer">
                {lectureLogo} 
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://youtu.be/ic6mrUtuPLE" target="_blank"  rel="noreferrer">
                {lectureLogo} 
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://youtu.be/6LwcQzAXa6I" target="_blank"  rel="noreferrer">
                {lectureLogo} 
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://youtu.be/lgIYRQZAFJE" target="_blank"  rel="noreferrer">
                {lectureLogo} 
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    let lecture23 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/3.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>IoT 연수 (2020)</h5><br/>
            <p className="bookDescription">
              한국생명과학고등학교 교사 연수<br/>
              이론강좌 및 실습지도방안
            </p>
          <div className="lectureIcons">
            <div className="gitIcons">
              <a href="https://www.youtube.com/watch?v=6inTfyrhueE" target="_blank"  rel="noreferrer">
                {lectureLogo} 
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    let lecture22 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/4.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>농업경영체, 경작이 아닌 경영을 기획하라 (2020)</h5><br/>
            <p className="bookDescription">
              한국생명과학고등학교 고교학점제 교수<br/>
            </p>
        </div>
      </div>
    </div>

    let lecture21 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/5.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>선도농가 멘토링 - 스마트팜 (2020)</h5><br/>
          <p className="bookDescription">
            한국생명과학고등학교 선도농가 멘토링 현장교수<br/>
            4주 교육과정
          </p>
      </div>
    </div>
    </div>

    let lecture5 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/6.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>리더십3: 리스크 없는 학생창업 (2017)</h5><br/>
            <p className="bookDescription">
              KAIST 가을학기 학부 교양필수 강사
            </p>
          <div className="lectureIcons">
            <div className="gitIcons">
              <a href="https://brunch.co.kr/@needleworm/13" target="_blank"  rel="noreferrer">
              <i className="fas fa-external-link-alt"></i> 수강생 후기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    let lecture20 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/7.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>스마트팜과 파생 직업, 잡을 수 있는 기회들 (2020)</h5><br/>
          <p className="bookDescription">
            KB 희망진로콘서트 "꿈꾸는 대로"
          </p>
        <div className="lectureIcons">
          <div className="gitIcons">
            <a href="https://www.youtube.com/watch?v=wKvUT208qao&t=10s" target="_blank"  rel="noreferrer">
              {lectureLogo} Lecture
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>

    let lecture19 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/8.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>스마트팜과 수경재배 (2020)</h5><br/>
          <p className="bookDescription">
            안동대학교 농업마이스터과정
          </p>
      </div>
    </div>
    </div>

    let lecture18 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/9.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>AI개발을 위한 프레임워크 (2020)</h5><br/>
          <p className="bookDescription">
            동서울대학교 LINK+ AI입문 특강
          </p>
        <div className="lectureIcons">
          <div className="gitIcons">
            <a href="http://www.kdpress.co.kr/news/articleView.html?idxno=99797" target="_blank"  rel="noreferrer">
              {newsIcon} News
            </a>
            &nbsp;&nbsp;&nbsp;
            <a href="https://www.slideshare.net/ssuserd66df4/ai-ai-251373482" target="_blank"  rel="noreferrer">
              {lectureLogo} Slides
            </a>
            &nbsp;&nbsp;&nbsp;
            <a href="https://youtu.be/4uSN6mEBdNo" target="_blank"  rel="noreferrer">
              {youtube} Vlog
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>

    let lecture17 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/10.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>가장 오래된 산업에 첨단기술 끼얹기 (2020)</h5><br/>
          <p className="bookDescription">
            넥슨 NYPC 토크콘서트
          </p>
        <div className="lectureIcons">
          <div className="gitIcons">
            <a href="http://gamefocus.co.kr/detail.php?number=108335" target="_blank"  rel="noreferrer">
              {newsIcon} News
            </a>
            &nbsp;&nbsp;&nbsp;
            <a href="https://youtu.be/lu4UOpEnHyY" target="_blank"  rel="noreferrer">
              {lectureLogo} YouTube
            </a>
            &nbsp;&nbsp;&nbsp;
            <a href="https://www.slideshare.net/ssuserd66df4/nexon-nypc-2020" target="_blank"  rel="noreferrer">
              {lectureLogo} Slides
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>

    let lecture16 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/11.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>농촌체험상품 개발 브랜딩, 상표출원 교육 특강 (2020)</h5><br/>
          <p className="bookDescription">
            한국생명과학고등학교 고교학점제 초청강연
          </p>
      </div>
    </div>
    </div>

    let lecture15 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/12.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>호프스테더 권력거리 이론 관점에서 본 고용노동부 행정혁신 성공사례 (2020)</h5><br/>
            <p className="bookDescription">
              농촌진흥청 혁신역량향상 교육<br/>
            </p>
          <div className="lectureIcons">
            <div className="gitIcons">
              <a href="https://brunch.co.kr/@needleworm/209" target="_blank"  rel="noreferrer">
                {book} 
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://brunch.co.kr/@needleworm/210" target="_blank"  rel="noreferrer">
                {book} 
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://brunch.co.kr/@needleworm/211" target="_blank"  rel="noreferrer">
                {book} Notes
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    let lecture13 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/13.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>잔머리로 시스템을 가지고 노는 방법 (2019)</h5><br/>
          <p className="bookDescription">
            경안고등학교 초청강연
          </p>
      </div>
    </div>
    </div>

    let lecture14 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/14.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>혁신의 장벽을 개발자스럽게 부수기 (2019)</h5><br/>
          <p className="bookDescription">
            마소콘 2019 기조연설
          </p>
        <div className="lectureIcons">
          <div className="gitIcons">
            <a href="http://it.chosun.com/site/data/html_dir/2019/11/23/2019112301220.html" target="_blank"  rel="noreferrer">
              {newsIcon} News
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>

    let lecture12 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/15.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>수필 두 편으로 50일만에 대한민국 움직이기 (2019)</h5><br/>
          <p className="bookDescription">
            계명대학교 초청강연
          </p>
      </div>
    </div>
    </div>

    let lecture11 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/16.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>실패하는 스타트업 (2019)</h5><br/>
          <p className="bookDescription">
            POSTECH 영재기업인 교육원 온라인 마이 멘토 초청강연
          </p>
      </div>
    </div>
    </div>

    let lecture10 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/17.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>파이썬과 함께라는 마음가짐만 있으면 못 할 것은 없다는 마음가짐만 있으면 정말로 못 할 것은 없다 (2019)</h5><br/>
            <p className="bookDescription">
              2019 PyconKR 기조연설
            </p>
          <div className="lectureIcons">
            <div className="gitIcons">
              <a href="https://bhban.tistory.com/9" target="_blank"  rel="noreferrer">
                {lectureLogo} Lecture
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    let lecture9 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/18.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>그로스해킹을 통한 행정혁신 사례 (2019)</h5><br/>
          <p className="bookDescription">
            2019 제16회 워크 스마트 포럼 - 로보틱 프로세스 자동화 (RPA), 행정안전부 초청
          </p>
        <div className="lectureIcons">
          <div className="gitIcons">
            <a href="https://www.youtube.com/watch?v=c0w4oTZ41zY" target="_blank"  rel="noreferrer">
            <i className="fas fa-external-link-alt"></i> Blog
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
    
    let lecture8 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/19.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>행정혁신 성공사례 강연 (2019)</h5><br/>
          <p className="bookDescription">
            2019, 정부혁신 담당관 워크숍, 행정안전부 초청
          </p>
        <div className="lectureIcons">
          <div className="gitIcons">
            <a href="https://blog.naver.com/mopaspr/221516836663" target="_blank"  rel="noreferrer">
            <i className="fas fa-external-link-alt"></i> Blog
            </a>
              &nbsp;&nbsp;&nbsp;
            <a href="https://www.news1.kr/articles/?3585452" target="_blank"  rel="noreferrer">
            {newsIcon} News
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
    
    let lecture7 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/20.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>코딩하는 공익 - 아직 세상을 바꾸고 싶은 개발자에게 (2019)</h5><br/>
          <p className="bookDescription">
            KCD2019, [코딩이랑무관합니다만] 세션
          </p>
        <div className="lectureIcons">
          <div className="gitIcons">
            <a href="https://brunch.co.kr/@needleworm/59" target="_blank"  rel="noreferrer">
            <i className="fas fa-external-link-alt"></i>
            </a>
              &nbsp;&nbsp;&nbsp;
            <a href="https://brunch.co.kr/@needleworm/61" target="_blank"  rel="noreferrer">
            <i className="fas fa-external-link-alt"></i> Blog
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
    
    let lecture6 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/21.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>학생창업과 KAIST (2018)</h5><br/>
          <p className="bookDescription">
            2018 상반기, E5-KAIST 시니어 멘토 초청강연
          </p>
      </div>
    </div>
    </div>
    
    let lecture4 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/22.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>학생신분으로 스타트업 세우기 (2016)</h5><br/>
          <p className="bookDescription">
            2016 KLC 벤처포럼 at KAIST
          </p>
      </div>
    </div>
    </div>
    
    let lecture3 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/23.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>아이디어에서 사업화까지 (2012)</h5><br/>
            <p className="bookDescription">
              제 2회 KAIST 전국 발명대회 시상식 워크숍 초청강연
            </p>
        </div>
      </div>
    </div>
    
    let lecture2 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/24.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>뇌과학에 발을 들이면서 (2012)</h5><br/>
            <p className="bookDescription">
              경안고등학교 과학동아리 초청강연
            </p>
        </div>
      </div>
    </div>

    let lecture1 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/25.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>학습법 멘토링 강연 (2012)</h5><br/>
          <p className="bookDescription">
            대전만년고등학교 
          </p>
      </div>
    </div>
    </div>   

    let lecture26 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/26.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>스마트팜 교육 프로그램 (2021)</h5><br/>
            <p className="bookDescription">
              대구 서구 도시재생지원센터 원고개마을 조성사업, 4차산업혁명과 스마트팜 경영방법<br/>
              5주 교육과정
            </p>
          <div className="lectureIcons">
            <a href="http://seoguurc.or.kr/open_content/biz/biz_02.php" target="_blank"  rel="noreferrer">
                {edulogo} Lecture
              </a>
          </div>
        </div>
      </div>
    </div>
    
    let lecture27 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/27.png" alt="projectimage"/>
        <div className="projectText">
          <h5>스마트팜 교육 (2021)</h5><br/>
            <p className="bookDescription">
              대구한의대학교 교수진 및 시설팀 관계자들 대상 스마트팜 강의
            </p>
          <div className="lectureIcons">
            <a href="http://www.dhu.ac.kr/pages/index.htm" target="_blank"  rel="noreferrer">
                {edulogo} Lecture
              </a>
          </div>
        </div>
      </div>
    </div>

    let lecture28 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/28.jpg" alt="lectureimage"/>
      <div className="projectText">
        <h5>코스콤 임직원 대상 교육 (2021)</h5><br/>
          <p className="bookDescription">
            비개발자를 위한 파이썬과 엑셀/한글 RPA 실습 (24차시)<br></br>
            비전공자 사무직 수강생 전원이 자신만의 업무 자동화 소프트웨어를 개발하고, 윈도우용 응용 프로그램으로 빌드하여 배포까지 달성
          </p>
        <div className="lectureIcons">
          <a href="https://www.koscom.co.kr/portal/main.do" target="_blank"  rel="noreferrer">
              {edulogo} Lecture
            </a>
        </div>
      </div>
    </div>
    </div>

    let lecture29 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/29.jpg" alt="projectimage"/>
      <div className="projectText">
        <h5>전북 청년창업사관학교 교육 (2021)</h5><br/>
          <p className="bookDescription">
            PMF와 그로스해킹, PDI와 스타트업의 조직구성, 공동창업계약과 자금조달 (3차시)
          </p>
        <div className="lectureIcons">
          <a href="https://www.koscom.co.kr/portal/main.do" target="_blank"  rel="noreferrer">
              {edulogo} Lecture
          </a>
        </div>
      </div>
    </div>
    </div>

    let lecture30 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/30.png" alt="projectimage"/>
        <div className="projectText">
          <h5>쉬운 딥러닝 (2021)</h5><br/>
            <p className="bookDescription">
              <a href="https://search.shopping.naver.com/book/catalog/32466710658" target="_blank" rel="noreferrer">수학 통계를 몰라도 이해할 수 있는 쉬운 딥러닝</a> 도서 저자직강<br/>
              비전공자도 딥러닝을 배울 수 있다! <br/>
              총 17차시, 8시간 53분 분량의 강의영상 <br/>
              천재교육 내부 임직원교육 등 활용중
            </p>
        </div>
      </div>
    </div>

    let lecture31 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/31.png" alt="projectimage"/>
        <div className="projectText">
          <h5>코꼬마를 위한 코딩유치원 (2021)</h5><br/>
            <p className="bookDescription">
              패스트캠퍼스 온라인강좌<br/>
              개발자가 될 건 아니지만 코딩은 배우고 싶은 코꼬마를 위한 코딩유치원
            </p>
          <div className="lectureIcons">
            <div className="gitIcons">
              <a href="https://fastcampus.co.kr/dev_online_codingschool" target="_blank"  rel="noreferrer">
                {lectureLogo} Lecture
              </a>
            </div>
          </div>
        </div>
      </div>  
    </div>

    let lecture32 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/32.png" alt="projectimage"/>
        <div className="projectText">
          <h5>미래 사법의 과제 - AI 임팩트 (2022)</h5><br/>
            <p className="bookDescription">
              대법원 사법정책연구원<br/>
              미래 사법 Round Table<br/>
              AI기술과 관련하여, 미래의 사법부가 추구해야 할 바람직한 모습을 연구하고 설계하기 위한 방향에 대하여 논의.
            </p>
          <div className="lectureIcons">
            <div className="gitIcons">

              <a href="https://www.slideshare.net/ssuserd66df4/2022-ai" target="_blank"  rel="noreferrer">
                {lectureLogo} Slides
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://jpri.scourt.go.kr/main.do" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i> 사법정책연구원
              </a>
            </div>
          </div>
        </div>
      </div>  
    </div>
    
    let lecture33 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/33.jpeg" alt="projectimage"/>
        <div className="projectText">
          <h5>뇌과학에 발을 들이면서 (2022)</h5><br/>
            <p className="bookDescription">
              경안고등학교 인공지능 프로젝트 자문위원
            </p>
        </div>
      </div>
    </div>
    
    let lecture34 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/34.jpeg" alt="projectimage"/>
        <div className="projectText">
          <h5>진로특강 (2022)</h5><br/>
            <p className="bookDescription">
              영양여자고등학교 진로특강 특강강사 초청
            </p>
        </div>
      </div>
    </div>

    let lecture35 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/35.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>비전공자를 위한 쉬운 딥러닝 (2022)</h5><br/>
            <p className="bookDescription">
              WiseHRD<br/>
              파이썬 기초부터 딥러닝 기초, CNN과 LSTM까지
              21종의 인공지능을 만들면서 배우는 쉬운 딥러닝 강의
            </p>
          <div className="lectureIcons">
            <div className="gitIcons">
              <a href="http://wisehrd.com" target="_blank"  rel="noreferrer">
                {lectureLogo} Lecture
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    let lecture36 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/36.png" alt="projectimage"/>
        <div className="projectText">
          <h5>한국인이 좋아하는 속도로 때려넣는 파이썬 (2022)</h5><br/>
            <p className="bookDescription">
              인프런 온라인강좌<br/>
              모두가 배워야 한다고 호들갑인 파이썬! 한국인이 좋아하는 속도로! 3시간 안에! 때려넣어 드립니다!
            </p>
          <div className="lectureIcons">
            <div className="gitIcons">
              <a href="https://inf.run/yyKd" target="_blank"  rel="noreferrer">
                {lectureLogo} Lecture
              </a>
            </div>
          </div>
        </div>
      </div>  
    </div>

    let lecture37 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/37.png" alt="projectimage"/>
        <div className="projectText">
          <h5>6개월 치 업무를 하루 만에 끝내는 업무자동화 Renual (2022)</h5><br/>
            <p className="bookDescription">
              패스트캠퍼스 온라인강좌<br/>
              업무자동화 분야 국내 1위 강의의 리뉴얼 버젼!
            </p>
          <div className="lectureIcons">
            <div className="gitIcons">
              <a href="https://fastcampus.co.kr/dev_online_bbh" target="_blank"  rel="noreferrer">
                {lectureLogo} Lecture
              </a>
            </div>
          </div>
        </div>
      </div>  
    </div>    

    let lecture38 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/38.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>인공지능 시대를 준비하는 전문가의 마음가짐 (2022)</h5><br/>
            <p className="bookDescription">
              안동경안고등학교, 인공지능(AI) 교육선도학교 인공지능 전문가 특강
            </p>
        </div>
      </div>
    </div>


    let lecture39 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/39.png" alt="projectimage"/>
        <div className="projectText">
          <h5>돈이 복사되는 가상자산 수업 (2022)</h5><br/>
            <p className="bookDescription">
              아트엑스캠퍼스 온라인강좌<br/>
              <a href="https://needleworm.github.io/tech3/" target="_blank" rel="noreferrer">
                돈이 복사되는 가상자산 수업
              </a>
              도서를 바탕으로 제작된 온라인 강의입니다. 
            </p>
          <div className="lectureIcons">
            <div className="gitIcons">
              <a href="https://www.artxcampus.co.kr/lecture.php?action=package&uid=66" target="_blank"  rel="noreferrer">
                {lectureLogo} Lecture
              </a>
            </div>
          </div>
        </div>
      </div>  
    </div>

    let lecture40 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/40.png" alt="projectimage"/>
        <div className="projectText">
          <h5>한국인이 좋아하는 속도로 때려넣는 워드프레스 (2022)</h5><br/>
            <p className="bookDescription">
              인프런 온라인강좌<br/>
              영상을 따라하기만 해도 나만의 웹 페이지가 뚝딱! 성능과 마케팅 최적화까지 알려드려요!
            </p>
          <div className="lectureIcons">
            <div className="gitIcons">
              <a href="https://inf.run/Jqkj" target="_blank"  rel="noreferrer">
                {lectureLogo} Lecture
              </a>
            </div>
          </div>
        </div>
      </div>  
    </div>

    let lecture41 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/41.png" alt="projectimage"/>
        <div className="projectText">
          <h5>기술이 하는 일, 사람이 하는 일 (2022)</h5><br/>
            <p className="bookDescription">
              한림대학교 초청강연<br/>
              디지털인문예술전공 교수, 학생대상 초청강연. 
            </p>
          <div className="lectureIcons">
          </div>
        </div>
      </div>  
    </div>

    let lecture42 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/42.png" alt="projectimage"/>
        <div className="projectText">
          <h5>딥러닝 레벨원 : 왕초보도 만들 수 있는 16가지 인공지능 (2022)</h5><br/>
            <p className="bookDescription">
              패스트캠퍼스 온라인강좌 (무료강의)<br/>
              딥러닝, 도대체 뭐지? 나도 배워볼 수 있을까?<br/>
              시작부터 수학/이론 정석대로 배우다 좌절하면 안되니까! 비전공자도 재미있는 16가지 인공지능을 만들며 '딥러닝'을 배울 수 있도록 구성했습니다.
            </p>
          <div className="lectureIcons">
            <div className="gitIcons">
              <a href="https://fastcampus.co.kr/courses/213914" target="_blank"  rel="noreferrer">
                {lectureLogo} Lecture
              </a>
            </div>
          </div>
        </div>
      </div>  
    </div>    

    let lecture43 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/43.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>업무 자동화와 챗GPT (2023)</h5><br/>
            <p className="bookDescription">
              한국생명공학연구원<br/>
              업무 자동화와 챗GPT에 대한 깊은 강의
            </p>
        </div>
      </div>  
    </div>    

    let lecture44 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/44.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>베스트셀러 작가 반병현에게 배우는 ChatGPT 활용법 (2023)</h5><br/>
            <p className="bookDescription">
              패스트캠퍼스 온라인강좌<br/>
              ChatGPT 똑똑하게 쓰는 활용법부터 업무 활용 노하우까지!<br/>
              ChatGPT로 업무 효율을 높이고 수익까지 낼 수 있는 노하우, 이 강의에서 모두 알려드릴게요!
            </p>
          <div className="lectureIcons">
            <div className="gitIcons">
              <a href="https://fastcampus.co.kr/data_online_autogpt" target="_blank"  rel="noreferrer">
                {lectureLogo} Lecture
              </a>
            </div>
          </div>
        </div>
      </div>  
    </div>  

    let lecture45 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/45.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT의 태생적 한계가 만들어낸 새로운 산업 (2023)</h5><br/>
            <p className="bookDescription">
              KISTI 초청강연<br/>
              한국 AI산업을 이끌어가는 KISTI 박사님들 앞에서 챗GPT 이야기를 해야 하다니, 막대한 부담감 속에서 진행된 강연입니다.
            </p>
          <div className="lectureIcons">
            <div className="gitIcons">
              <a href="https://www.youtube.com/watch?v=eqoCyYRESjk" target="_blank"  rel="noreferrer">
                {lectureLogo} Lecture
              </a>
            </div>
          </div>
        </div>
      </div>  
    </div>  

    let lecture46 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/46.png" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT의 원리와 활용 방안, 미래의 파급 효과 (2023)</h5><br/>
            <p className="bookDescription">
              국무조정실 한국행정연구원<br/>
              대한민국의 행정정책을 선도하는 국무조정실 한국행정연구원의 초청으로 챗GPT에 대한 강연을 제공하였습니다. 뉴스나 유튜브에서는 볼 수 없는 깊은 내용들을, 인문학 및 사회과학 박사님들께 쉽게 전달해 드리려 최선을 다했습니다.
            </p>
        </div>
      </div>  
    </div>  

    let lecture47 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/47.png" alt="projectimage"/>
        <div className="projectText">
          <h5>지금을 바라보는 새로운 지평, Chat GPT (2023)</h5><br/>
            <p className="bookDescription">
              선유도서관<br/>
              선유도서관 초청 온라인 북콘서트! 111명의 주민들과 함께하는 2주간의 토요 문화 충전
            </p>
        </div>
      </div>  
    </div> 

    let lecture48 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/48.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>"왜 챗GPT에 열광하는가?"" 챗GPT의 이해와 활용 교육 (2023)</h5><br/>
            <p className="bookDescription">
              서대문구청<br/>
              서대문구청 초청강연. 현장에서 110여명, 이원 생중계로 200여명 가량 참석해주셨습니다. 지금껏 모든 지자체의 챗GPT 강연 요청을 거절해왔으나 유일하게 수락한 한 곳이 서대문구청입니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture49 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/49.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5> 챗GPT의 원리와 파급효과, 그리고 산업계의 전망 (2023)</h5><br/>
            <p className="bookDescription">
              한은금요강좌<br/>
              한국은행 초청강연. 챗GPT의 원리부터 활용 방안, 직업계의 영향까지를 소개하였습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture50 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/50.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT 서비스를 완성하는 프롬프트 엔지니어링 (2023)</h5><br/>
            <p className="bookDescription">
              미래엔 지식발전소 명사초청특강<br/>
              챗GPT의 원리부터 프롬프트 엔지니어링, 그리고 챗GPT 기반 챗봇 서비스 설계 기획 방법을 알려드립니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture51 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/51.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>ChatGPT의 영향을 피해갈 수 있을까? (2023)</h5><br/>
            <p className="bookDescription">
              제5차 데이터기술경제포럼<br/>
              KISTI의 초청으로 데이터기술경제포럼에 패널로 참여하였습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture52 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/52.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT 시대, 살아남는 1%만 알고있는 정확한 정보 (2023)</h5><br/>
            <p className="bookDescription">
              도로교통공단 TBN 생방송<br/>
              한국교통방송국 양재 스튜디오 완공 기념 첫 생방송을 제가 하게 되었습니다. 초대해주셔서 감사합니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture53 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/53.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT와 공존하는 삶 (2023)</h5><br/>
            <p className="bookDescription">
              해운대인문학도서관 북콘서트<br/>
              부산까지 다녀온 보람이 있었습니다. 한 시간 가량 강연 후 끝없는 Q&A를 거쳐 사인회까지 무사히 마치고 돌아왔습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture54 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/54.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>살아남는 1%를 위한, 챗GPT에 대한 진짜 정보 (2023)</h5><br/>
            <p className="bookDescription">
              농협중앙회<br/>
              농협중앙회 본부에 방문할 일은 로또 당첨 전에는 없을 줄 알았습니다. 강연도 제공하고 당첨자 기운도 받아왔습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture55 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/55.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT 바로 알기, 그리고 스마트하게 활용하기 (2023)</h5><br/>
            <p className="bookDescription">
              대전교육정보원<br/>
              초중등교원 대상 강연 진행했습니다. 역시 초등교사분들이 손도 잘 들고 질문도 잘 하세요.
            </p>
        </div>
      </div>  
    </div>

    let lecture56 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/56.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT와 활용 방안 (2023)</h5><br/>
            <p className="bookDescription">
              한국남동발전<br/>
              전 직원 대상 온라인 강의였습니다. 라이브로 200명 가량 수강해주셨고 녹화 영상이 한달 간 사내 교육자료로 사용될 예정이라고 하네요.
            </p>
        </div>
      </div>  
    </div>

    let lecture57 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/57.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT와 함께 하는 AI 이야기 (2023)</h5><br/>
          <p className="bookDescription">
            서초구청<br/>
            서초구청에서 전 직원 대상 강연 진행했습니다. 제공해 주신 음료수가 참 맛있어서 즐거웠습니다. 복도에 "기부의 벽" 이라는, 기부금 키오스크가 있길래 가장 높은 금액 버튼 누르고 기부도 하고 왔습니다.
          </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=kXUHFJVJBw4" target="_blank"  rel="noreferrer">
              {youtube} 생중계 녹화
            </a>
          </div>
        </div>
      </div>  
    </div>

    let lecture58 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/58.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT와 함께 하는 AI 이야기 (2023)</h5><br/>
            <p className="bookDescription">
              하얀도서관<br/>
              광명시 하얀도서관에서 강연을 진행했습니다. 자리가 모자라 뒤쪽에 간이 의자를 깔고 앉아 수강해 주신 분들도 계셨습니다. 초청해 주셔서 무척이나 감사드립니다. 강연 후 광명 명물인 이케아에서 즐거운 시간을 보냈습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture59 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/59.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>How to Question, 챗GPT 잠재력 200% 끌어내기 (2023)</h5><br/>
            <p className="bookDescription">
              현대 경제연구원<br/>
              챗GPT의 잠재력을 200% 끌어내는 방법에 대한 강의를 촬영했습니다. 10분 분량으로 부담없이 시청할 수 있는 숏폼 영상 강의를 여러 건 촬영했습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture60 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/60.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT로 정복하는 영어 (2023)</h5><br/>
            <p className="bookDescription">
              패스트캠퍼스<br/>
              역사상 가장 똑똑한 인공지능, 챗GPT! 챗GPT와 함께 한국인의 오랜 숙원인 영어를 정복해봐요! 균형감각의 이제종 강사님과 함께했습니다.
            </p>
        </div>
      </div>  
    </div>


    return (
      <div className="websitesContainer">
        {lecture60}
        {lecture59}
        {lecture58}
        {lecture57}
        {lecture56}
        {lecture55}
        {lecture54}
        {lecture53}
        {lecture52}
        {lecture51}
        {lecture50}
        {lecture49}
        {lecture48}
        {lecture47}
        {lecture46}
        {lecture45}
        {lecture44}
        {lecture43}
        {lecture42}
        {lecture41}
        {lecture40}
        {lecture39}
        {lecture38}
        {lecture37}
        {lecture36}
        {lecture35}
        {lecture34}
        {lecture33}
        {lecture32}
        {lecture31}
        {lecture30}
        {lecture29}
        {lecture28}
        {lecture27}
        {lecture26}
        {lecture25}
        {lecture24}
        {lecture23}
        {lecture22}
        {lecture21}
        {lecture20}
        {lecture19}
        {lecture18}
        {lecture17}
        {lecture16}
        {lecture15}
        {lecture14}
        {lecture13}
        {lecture12}
        {lecture11}
        {lecture10}
        {lecture9}
        {lecture8}
        {lecture7}
        {lecture6}
        {lecture5}
        {lecture4}
        {lecture3}
        {lecture2}
        {lecture1}
      </div>
    )
  }

  return (
      <section id="lectures" className="animated bounceInDown">{sectionTitle()}{drawLectures()}
    </section>
  );
}
  
export default Lectures;
