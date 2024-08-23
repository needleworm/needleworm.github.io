import React from 'react';
import './lectures.css';


function Courses() {

  const sectionTitle = () => {
    return(
      <div className="row">
        <div className="col-lg-12 text-center">
            <h2 className="section-heading subpageHeading">Courses</h2>
        </div>
      </div>
    )
  }

  const drawLectures = () => {
    let youtube = <i className="fab fa-youtube"></i>
    let courseLogo = <i className="fas fa-chalkboard-teacher"></i>

    let course1 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/1.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>6개월치 업무를 하루만에 끝내는 업무자동화 (2020, 2022)</h5><br/>
            <p className="bookDescription">
              패스트캠퍼스 온라인강좌<br/>
              파이썬 기초부터 엑셀파일 활용 자동화, 디자인 자동화, 매크로 제작 및 크롤링 과정.<br/>
              6개 대주제, 약 20시간 분량, 총 77여개 강의 영상
            </p>
          <div className="lectureIcons gitIcons">
              <a href="https://www.youtube.com/watch?v=_5JAXsYKef0&t=86s" target="_blank"  rel="noreferrer">
                {youtube} Intro
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://youtu.be/5IfJ3JdNwB0" target="_blank"  rel="noreferrer">
                {youtube} Vlog
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://fastcampus.co.kr/dev_online_bbh" target="_blank"  rel="noreferrer">
                {courseLogo} Lecture
              </a>
          </div>
        </div>
      </div>
    </div>

    let course2 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/2.png" alt="projectimage"/>
        <div className="projectText">
          <h5>쉬운 딥러닝 (2021)</h5><br/>
            <p className="bookDescription">
              <a href="https://search.shopping.naver.com/book/catalog/32466710658" target="_blank" rel="noreferrer">수학 통계를 몰라도 이해할 수 있는 쉬운 딥러닝</a> 도서 저자직강<br/>
              비전공자도 딥러닝을 배울 수 있다! <br/>
              총 17차시, 8시간 53분 분량의 강의영상 <br/>
              천재교육 내부 임직원교육 등 활용
            </p>
        </div>
      </div>
    </div>

    let course3 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/3.png" alt="projectimage"/>
        <div className="projectText">
          <h5>코꼬마를 위한 코딩유치원 (2021)</h5><br/>
            <p className="bookDescription">
              패스트캠퍼스 온라인강좌<br/>
              개발자가 될 건 아니지만 코딩은 배우고 싶은 코꼬마를 위한 코딩유치원
            </p>
          <div className="lectureIcons gitIcons">
              <a href="https://fastcampus.co.kr/dev_online_codingschool" target="_blank"  rel="noreferrer">
                {courseLogo} Lecture
              </a>
          </div>
        </div>
      </div>  
    </div>

    let course4 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/4.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>비전공자를 위한 쉬운 딥러닝 (2022)</h5><br/>
            <p className="bookDescription">
              WiseHRD<br/>
              파이썬 기초부터 딥러닝 기초, 수십 종의 인공지능을 만들면서 배우는 쉬운 딥러닝 강의
            </p>
          <div className="lectureIcons gitIcons">
              <a href="http://wisehrd.com" target="_blank"  rel="noreferrer">
                {courseLogo} Lecture
              </a>
          </div>
        </div>
      </div>
    </div>

    let course5 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/5.png" alt="projectimage"/>
        <div className="projectText">
          <h5>한국인이 좋아하는 속도로 때려넣는 파이썬 (2022)</h5><br/>
            <p className="bookDescription">
              인프런 온라인강좌<br/>
              모두가 배워야 한다고 호들갑인 파이썬! 한국인이 좋아하는 속도로! 3시간 안에! 때려넣어 드립니다!
            </p>
          <div className="lectureIcons gitIcons">
              <a href="https://inf.run/yyKd" target="_blank"  rel="noreferrer">
                {courseLogo} Lecture
              </a>
          </div>
        </div>
      </div>  
    </div>

    let course6 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/6.png" alt="projectimage"/>
        <div className="projectText">
          <h5>6개월 치 업무를 하루 만에 끝내는 업무자동화 Renual (2022)</h5><br/>
            <p className="bookDescription">
              패스트캠퍼스 온라인강좌<br/>
              업무자동화 분야 국내 1위 강의의 리뉴얼 버젼!
            </p>
          <div className="lectureIcons gitIcons">
              <a href="https://fastcampus.co.kr/dev_online_bbh" target="_blank"  rel="noreferrer">
                {courseLogo} Lecture
              </a>
          </div>
        </div>
      </div>  
    </div>    

    let course7 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/7.png" alt="projectimage"/>
        <div className="projectText">
          <h5>돈이 복사되는 가상자산 수업 (2022)</h5><br/>
            <p className="bookDescription">
              아트엑스캠퍼스 온라인강좌<br/>
              <a href="https://needleworm.github.io/tech3/" target="_blank" rel="noreferrer">
                돈이 복사되는 가상자산 수업
              </a>
              도서를 바탕으로 제작된 온라인 강의입니다. 
            </p>
          <div className="lectureIcons gitIcons">
              <a href="https://www.artxcampus.co.kr/lecture.php?action=package&uid=66" target="_blank"  rel="noreferrer">
                {courseLogo} Lecture
              </a>
          </div>
        </div>
      </div>  
    </div>

    let course8 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/8.png" alt="projectimage"/>
        <div className="projectText">
          <h5>한국인이 좋아하는 속도로 때려넣는 워드프레스 (2022)</h5><br/>
            <p className="bookDescription">
              인프런 온라인강좌<br/>
              영상을 따라하기만 해도 나만의 웹 페이지가 뚝딱! 성능과 마케팅 최적화까지 알려드려요!
            </p>
          <div className="lectureIcons gitIcons">
              <a href="https://inf.run/Jqkj" target="_blank"  rel="noreferrer">
                {courseLogo} Lecture
              </a>
          </div>
        </div>
      </div>  
    </div>

    let course9 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/9.png" alt="projectimage"/>
        <div className="projectText">
          <h5>딥러닝 레벨원 : 왕초보도 만들 수 있는 16가지 인공지능 (2022)</h5><br/>
            <p className="bookDescription">
              패스트캠퍼스 온라인강좌 (무료강의)<br/>
              딥러닝, 도대체 뭐지? 나도 배워볼 수 있을까?<br/>
              시작부터 수학/이론 정석대로 배우다 좌절하면 안되니까! 비전공자도 재미있는 16가지 인공지능을 만들며 '딥러닝'을 배울 수 있도록 구성했습니다.
            </p>
          <div className="lectureIcons gitIcons">
              <a href="https://fastcampus.co.kr/courses/213914" target="_blank"  rel="noreferrer">
                {courseLogo} Lecture
              </a>
            </div>
        </div>
      </div>  
    </div>    

    let course10 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/10.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>베스트셀러 작가 반병현에게 배우는 ChatGPT 활용법 (2023)</h5><br/>
            <p className="bookDescription">
              패스트캠퍼스 온라인강좌<br/>
              ChatGPT 똑똑하게 쓰는 활용법부터 업무 활용 노하우까지!<br/>
              ChatGPT로 업무 효율을 높이고 수익까지 낼 수 있는 노하우, 이 강의에서 모두 알려드릴게요!
            </p>
          <div className="lectureIcons gitIcons">
              <a href="https://fastcampus.co.kr/data_online_autogpt" target="_blank"  rel="noreferrer">
                {courseLogo} Lecture
              </a>
          </div>
        </div>
      </div>  
    </div>  

    let course11 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/11.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>How to Question, 챗GPT 잠재력 200% 끌어내기 (2023)</h5><br/>
            <p className="bookDescription">
              현대 경제연구원<br/>
              챗GPT의 잠재력을 200% 끌어내는 방법에 대한 강의를 촬영했습니다. 10분 분량으로 부담없이 시청할 수 있는 숏폼 영상 강의를 여러 건 촬영했습니다. 현대 임직원 및 협력사 활용 예정.
            </p>
        </div>
      </div>  
    </div>

    let course12 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/12.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>평생 무료로 써먹는 나만의 ChatGPT 영어 선생님 (2023)</h5><br/>
            <p className="bookDescription">
              패스트캠퍼스<br/>
              역사상 가장 똑똑한 인공지능, 챗GPT! 챗GPT와 함께 한국인의 오랜 숙원인 영어를 정복해봐요! 균형감각의 이제종 강사님과 함께했습니다.
            </p>
            <div className="lectureIcons gitIcons">
              <a href="https://fastcampus.co.kr/data_online_chatgpte" target="_blank"  rel="noreferrer">
                {courseLogo} 강의 링크
              </a>
            </div>
        </div>
      </div>  
    </div>

    let course13 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/13.png" alt="projectimage"/>
        <div className="projectText">
          <h5>내 시간을 효율적으로 만들어주는 업무 자동화 (2023)</h5><br/>
            <p className="bookDescription">
              LG 인화원<br/>
              LG 전 계열사 직원들 중, 1:7의 경쟁률을 뚫고 선발된 30명의 정예들과 8주간의 그룹스터디를 진행했습니다. 저를 만나셨기에 LG는 실적이 수직상승할 것입니다.
            </p>
        </div>
      </div>  
    </div>

    let course14 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/14.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>AI시대 일잘러를 위한 비현실적인 400가지 ChatGPT 활용 바이블 (2023)</h5><br/>
            <p className="bookDescription">
              패스트캠퍼스 초격차 패키지<br/>
              현존 최고의 챗GPT 활용 강의에 한 손 거들게 되었습니다.
            </p>
            <div className="lectureIcons gitIcons">
              <a href="https://fastcampus.co.kr/biz_online_chatgpt400" target="_blank"  rel="noreferrer">
                {courseLogo} 강의 링크
              </a>
            </div>
        </div>
      </div>  
    </div>

    let course15 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/15.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>프롬프트 엔지니어링 (2023)</h5><br/>
            <p className="bookDescription">
              인프런 강의<br/>
              프롬프트 엔지니어링 온라인 강의입니다. 
            </p>
            <div className="lectureIcons gitIcons">
              <a href="https://inf.run/oSjE6" target="_blank"  rel="noreferrer">
                {courseLogo} 강의 링크
              </a>
            </div>
        </div>
      </div>  
    </div>
    
    let course16 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/16.jpg" alt="projectimage"/>
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
    
    let course17 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/17.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>농업경영체, 경작이 아닌 경영을 기획하라 (2020)</h5><br/>
            <p className="bookDescription">
              한국생명과학고등학교 고교학점제 교수 (4주)<br/>
            </p>
        </div>
      </div>
    </div>

    let course18 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/18.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>선도농가 멘토링 - 스마트팜 (2020)</h5><br/>
            <p className="bookDescription">
              한국생명과학고등학교 선도농가 멘토링 현장교수<br/>
              4주 교육과정
            </p>
        </div>
      </div>
    </div>

    let course19 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/19.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>스마트팜 교육 프로그램 (2021)</h5><br/>
            <p className="bookDescription">
              대구 서구 도시재생지원센터 원고개마을 조성사업, 4차산업혁명과 스마트팜 경영방법<br/>
              5주 교육과정
            </p>
        </div>
      </div>
    </div>

    let course20 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/20.jpg" alt="lectureimage"/>
        <div className="projectText">
          <h5>코스콤 임직원 대상 교육 (2021)</h5><br/>
            <p className="bookDescription">
              비개발자를 위한 파이썬과 엑셀/한글 RPA 실습 (24차시)<br></br>
              비전공자 사무직 수강생 전원이 자신만의 업무 자동화 소프트웨어를 개발하고, 윈도우용 응용 프로그램으로 빌드하여 배포까지 달성
            </p>
        </div>
      </div>
    </div>

    let course21 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/21.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>생성형 AI와 함께 업무 효율 대폭발을 준비하세요! (2024)</h5><br/>
            <p className="bookDescription">
              LG 인화원<br/>
              2024 상반기에도 LG 인화원을 통해 LG 전 계열사 임직원들과의 스터디를 진행했습니다. 생성형 AI에 대한 관심도가 매우 뜨거운 시기다 보니 수강생분들의 열정이 뜨거워 무척이나 즐거운 시간이었습니다. 압도적으로 좋은 평가를 받아 하반기에도 동일한 코스가 개설됩니다.
            </p>
        </div>
      </div>  
    </div>

    let course22 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/22.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>AI시대 일잘러가 되기 위한 실무 마스터 클래스 (2024)</h5><br/>
            <p className="bookDescription">
              패스트캠퍼스 초격차 패키지<br/>
              현존 최고의 실무 역량 교육 강의에 참가했습니다. 저는 주로 AI를 활용한 사무업무 부분과 Copilot을 다룹니다.
            </p>
            <div className="lectureIcons gitIcons">
              <a href="https://fastcampus.co.kr/biz_online_workai" target="_blank"  rel="noreferrer">
                {courseLogo} 강의 링크
              </a>
            </div>
        </div>
      </div>  
    </div>

    let course23 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/courses/23.jpg" alt="projectimage"/>
        <div className="projectText">
          <h5>챗GPT를 활용한 지역문화진흥 업무역량 강화 (2024)</h5><br/>
            <p className="bookDescription">
              문체부 지역문화진흥원 교육컨텐츠<br/>
              공직자 교육을 위한 온라인 강의입니다.
            </p>
        </div>
      </div>  
    </div>

    return (
      <div className="websitesContainer">
        {course23}
        {course22}
        {course21}
        {course15}
        {course14}
        {course13}
        {course12}
        {course11}
        {course10}
        {course9}
        {course8}
        {course7}
        {course6}
        {course5}
        {course4}
        {course3}
        {course2}
        {course1}
        {course20}
        {course19}
        {course18}
        {course17}
        {course16}
      </div>
    )
  }

  return (
      <section id="courses" className="animated bounceInDown">
        {sectionTitle()}
        {drawLectures()}
    </section>
  );
}
  
export default Courses;
