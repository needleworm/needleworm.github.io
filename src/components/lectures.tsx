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
      <iframe className="YoutubePreview" src="https://www.youtube.com/embed/SXQrcE7LYrg" title="12" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
      <iframe className="YoutubePreview" src="https://www.youtube.com/embed/qbxmD616erM" title="12" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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

    let lecture61 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/61.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT, 마침내 찾아온 특이점 (2023)</h5><br/>
            <p className="bookDescription">
              경안고등학교<br/>
              모교 다녀왔습니다. 졸업한 지 12년이 지났네요. 시설이 어찌나 이렇게 좋아졌는지.
            </p>
        </div>
      </div>  
    </div>

    let lecture62 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/62.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT와 프롬프트 엔지니어링 (2023)</h5><br/>
            <p className="bookDescription">
              세종청사 아카데미<br/>
              세종시 공무원 100여명을 대상으로 한 4차시 교육입니다. 국내 최초 프롬프트 엔지니어링 강의가 여기서 진행되었습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture63 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/63.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT가 불러올 미래 (2023)</h5><br/>
            <p className="bookDescription">
              문경점촌도서관<br/>
              토요 인문학 특강 다녀왔습니다. 백발 어르신이 무서운 속도로 필기도 하시고 관련 애플리케이션 개발 동향 질문도 하셔서 무척 강렬한 기억으로 남았습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture64 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/64.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT 마침내 찾아온 특이점 (2023)</h5><br/>
            <p className="bookDescription">
              하남 미사도서관<br/>
              하남은 무척 살기 좋아 보이는 도시 같아 보였습니다. 돈 많이 벌면 꼭 하남에 집 사야지.
            </p>
        </div>
      </div>  
    </div>

    let lecture65 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/65.png" alt="projectimage"/>
        <div className="projectText">
          <h5>4차 산업혁명 시대, 우리 아이가 살아남으려면 부모가 바뀌어야 할까? (2023)</h5><br/>
            <p className="bookDescription">
              경남학부모아카데미<br/>
              학부모분들 대상으로 4차산업혁명 분야에 대한 강의를 진행했습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture66 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/66.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT시대 우리의 진로 (2023)</h5><br/>
            <p className="bookDescription">
              영양여자고등학교<br/>
              진로특강 겸 상담 진행하고 왔습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture67 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/67.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>쉬운 딥러닝 (2023)</h5><br/>
            <p className="bookDescription">
              경안고등학교<br/>
              올해도 모교 방문하여 딥러닝 시작부터 끝까지 한 번 훑어주고 왔습니다. 대학에 간 졸업생들이 앞다투어 효능을 간증하는 바로 그 강의가 올해도 돌아왔습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture68 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/68.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT에 대한 가장 재미있는 설명 (2023)</h5><br/>
            <p className="bookDescription">
              경상북도교육청과학원<br/>
              포항 과학원에서 교사들 대상으로 스탠딩 코미디를 하고 왔습니다. 13년 전, 여기서 영재교육을 받던 학생이었는데 이제는 강단에 서서 마이크를 잡으니 기분이 묘했습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture69 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/69.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>이젠 챗GPT 시대 (2023)</h5><br/>
            <p className="bookDescription">
              경북교육청 영덕도서관<br/>
              영덕군에서 주민 대상 강연을 진행했습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture70 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/70.png" alt="projectimage"/>
        <div className="projectText">
          <h5>부산교육청 (2023)</h5><br/>
            <p className="bookDescription">
              부산교육청 영재교육진흥원<br/>
              이번에도 교사 대상 연수를 하고 왔습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture73 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/73.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>전문가의식과 책임감이 충돌할 때 (2023)</h5><br/>
            <p className="bookDescription">
              한국원자력연구원<br/>
              간만에 챗GPT 이외 토픽으로 강연요청이 들어와 무척 신났습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture74 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/74.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT와 인공지능의 미래 (2023)</h5><br/>
            <p className="bookDescription">
              안성 공도도서관<br/>
              안성 공도도서관에서 강연을 했습니다. 제 도서를 다양하게 소장하고 있는 것으로 보아 아주 훌륭한 곳입니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture75 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/75.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT와 업무혁신 (2023)</h5><br/>
            <p className="bookDescription">
              벤처기업 신입사원 온보딩<br/>
              벤처기업 신입사원들이 모여서 교육을 듣는 프로그램이 있나봅니다. 여기에 다녀왔습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture77 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/77.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT에 대한 가장 재미있는 설명 (2023)</h5><br/>
            <p className="bookDescription">
              안동여고<br/>
              중학교 시절 담임선생님께서 초대해 주셨습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture78 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/78.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT와 업무혁신 (2023)</h5><br/>
            <p className="bookDescription">
              벤처기업 신입사원 온보딩<br/>
              감사하게도 다시 불러주셨습니다. 총 4회 진행하였습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture79 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/79.png" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT에 대한 가장 재미있는 설명 (2023)</h5><br/>
            <p className="bookDescription">
              미추홀구립도서관 문화가 있는 날 특강<br/>
              성인을 위한 강의 진행했습니다. 어르신들에게 GPT를 이해시키는 대단한 강사가 바로 접니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture80 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/80.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT 출시 1주년, 세상은 어떻게 바뀌었나? (2023)</h5><br/>
            <p className="bookDescription">
              용인수지도서관 베스트셀러 작가 초정강연<br/>
              연말까지도 챗GPT의 열기가 뜨거우니 참 신기하네요. 재미있는 시간 보내고 왔습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture81 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/81.png" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT와 프롬프트 엔지니어링 (2023)</h5><br/>
            <p className="bookDescription">
              세종청사 디지털 아카데미<br/>
              챗GPT를 업무에 활용하여 효율적으로 업무역량을 향상시키는 방법에 대한 강의를 진행했습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture82 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/82.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>스마트팜 교육 (2024)</h5><br/>
            <p className="bookDescription">
              인천 금융고등학교<br/>
              아두이노를 활용한 코딩교육부터 스마트팜 키트 제작 등의 교육을 진행했습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture83 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/83.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>생성형 AI와 프롬프트 엔지니어링 (2024)</h5><br/>
            <p className="bookDescription">
              농협중앙회 신규직원 DT교육<br/>
              농협그룹 전 계열 신입사원을 대상으로 챗GPT와 디지털 트렌드 관련 특강을 제공하였습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture84 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/84.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>마케터를 위한 프롬프트 엔지니어링 (2024)</h5><br/>
            <p className="bookDescription">
              한국암웨이<br/>
              한국암웨이 본사에서 마케팅 임직원 대상 특강을 진행하였습니다. 마케팅 담당자들이라 그런지 외향적인 분들이 많이 참여해주셔서 즐거웠습니다.
            </p>
        </div>
      </div>  
    </div>

    let lecture85 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/lectures/85.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>GPT가 생산성에 끼치는 영향력 (2024)</h5><br/>
            <p className="bookDescription">
              애경그룹 신임임원과정<br/>
              애경그룹의 각 계열사 신규 임원 승진자 대상 특강을 진행하였습니다. 챗GPT의 영향력과 프롬프트 엔지니어링, 조직 내 성과창출을 위한 쾌속한 도입 방향 등에 대하여 강의했습니다.
            </p>
        </div>
      </div>  
    </div>


    return (
      <div className="websitesContainer">
        {lecture85}
        {lecture84}
        {lecture83}
        {lecture82}
        {lecture81}
        {lecture80}
        {lecture79}
        {lecture78}
        {lecture77}
        {lecture75}
        {lecture74}
        {lecture73}
        {lecture70}
        {lecture69}
        {lecture68}
        {lecture67}
        {lecture66}
        {lecture65}
        {lecture64}
        {lecture63}
        {lecture62}
        {lecture61}
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
        {lecture43}
        {lecture41}
        {lecture38}
        {lecture34}
        {lecture33}
        {lecture32}
        {lecture29}
        {lecture27}
        {lecture24}
        {lecture23}
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
