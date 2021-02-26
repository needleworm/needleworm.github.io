import React, {Component} from 'react';
import './lectures.css';
import Lecture1 from "../images/lectures/1.png";
import Lecture2 from "../images/lectures/2.jpg";
import Lecture3 from "../images/lectures/3.png";
import Lecture4 from "../images/lectures/4.jpg";
import Lecture5 from "../images/lectures/5.jpg";
import Lecture6 from "../images/lectures/6.jpg";
import Lecture7 from "../images/lectures/7.jpg";
import Lecture8 from "../images/lectures/8.jpg";
import Lecture9 from "../images/lectures/9.jpg";
import Lecture10 from "../images/lectures/10.jpg";
import Lecture11 from "../images/lectures/11.jpg";
import Lecture12 from "../images/lectures/12.jpg";
import Lecture13 from "../images/lectures/13.jpg";
import Lecture14 from "../images/lectures/14.jpg";
import Lecture15 from "../images/lectures/15.png";
import Lecture16 from "../images/lectures/16.png";
import Lecture17 from "../images/lectures/17.jpg";
import Lecture18 from "../images/lectures/18.png";
import Lecture19 from "../images/lectures/19.jpg";
import Lecture20 from "../images/lectures/20.jpg";
import Lecture21 from "../images/lectures/21.jpg";
import Lecture22 from "../images/lectures/22.jpg";
import Lecture23 from "../images/lectures/23.jpg";
import Lecture24 from "../images/lectures/24.jpg";
import Lecture25 from "../images/lectures/25.jpg";



class Lectures extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  sectionTitle(){
    return(
      <div className="row">
        <div className="col-lg-12 text-center">
            <h2 className="section-heading subpageHeading">Lectures</h2>
        </div>
      </div>
    )
  }

  drawLectures(){
    var youtube = <i className="fab fa-youtube"></i>
    var lectureLogo = <i className="fas fa-chalkboard-teacher"></i>
    var newsIcon = <i className="far fa-newspaper"></i>
    var book = <i className="fas fa-book"></i>

    var lecture1 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src={Lecture1} alt="projectimage"/>
        <div className="projectText">
          <p><h5>6개월치 업무를 하루만에 끝내는 업무자동화 (2020)</h5></p>
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
                {youtube} VLOG
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
    
    var lecture2 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src={Lecture2} alt="projectimage"/>
        <div className="projectText">
          <p><h5>스마트팜 교육 프로그램 (2020)</h5></p>
            <p className="bookDescription">
              대구 서구 인동촌 백년마을 도시재생뉴딜사업, 마을관리 사회적협동조합 교육과정<br/>
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
    
    var lecture3 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src={Lecture3} alt="projectimage"/>
        <div className="projectText">
          <p><h5>IoT 연수 (2020)</h5></p>
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
    
    var lecture4 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src={Lecture4} alt="projectimage"/>
        <div className="projectText">
          <p><h5>농업경영체, 경작이 아닌 경영을 기획하라 (2020)</h5></p>
            <p className="bookDescription">
              한국생명과학고등학교 영농정착 후계인력 양성과정<br/>
            </p>
        </div>
      </div>
    </div>

    var lecture5 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src={Lecture5} alt="projectimage"/>
      <div className="projectText">
        <p><h5>선도농가 멘토링 - 스마트팜 (2020)</h5></p>
          <p className="bookDescription">
            한국생명과학고등학교 선도농가 멘토링 현장교수<br/>
            4주 교육과정
          </p>
      </div>
    </div>
    </div>

    var lecture6 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src={Lecture6} alt="projectimage"/>
        <div className="projectText">
          <p><h5>리더십3: 리스크 없는 학생창업 (2017)</h5></p>
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

    var lecture7 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src={Lecture7} alt="projectimage"/>
      <div className="projectText">
        <p><h5>스마트팜과 파생 직업, 잡을 수 있는 기회들 (2020)</h5></p>
          <p className="bookDescription">
            KB 희망진로콘서트 "꿈꾸는 대로"
          </p>
        <div className="lectureIcons">
          <div className="gitIcons">
            <a href="https://www.youtube.com/watch?v=wKvUT208qao&t=10s" target="_blank"  rel="noreferrer">
              {lectureLogo} LECTURE
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>

    var lecture8 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src={Lecture8} alt="projectimage"/>
      <div className="projectText">
        <p><h5>스마트팜과 수경재배 (2020)</h5></p>
          <p className="bookDescription">
            안동대학교 농업마이스터과정
          </p>
      </div>
    </div>
    </div>

    var lecture9 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src={Lecture9} alt="projectimage"/>
      <div className="projectText">
        <p><h5>AI개발을 위한 프레임워크 (2020)</h5></p>
          <p className="bookDescription">
            동서울대학교 LINK+ AI입문 특강
          </p>
        <div className="lectureIcons">
          <div className="gitIcons">
            <a href="http://www.kdpress.co.kr/news/articleView.html?idxno=99797" target="_blank"  rel="noreferrer">
              {newsIcon} NEWS
            </a>
            &nbsp;&nbsp;&nbsp;
            <a href="https://youtu.be/4uSN6mEBdNo" target="_blank"  rel="noreferrer">
              {youtube} VLOG
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>

    var lecture10 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src={Lecture10} alt="projectimage"/>
      <div className="projectText">
        <p><h5>가장 오래된 산업에 첨단기술 끼얹기 (2020)</h5></p>
          <p className="bookDescription">
            넥슨 NYPC 토크콘서트
          </p>
        <div className="lectureIcons">
          <div className="gitIcons">
            <a href="http://gamefocus.co.kr/detail.php?number=108335" target="_blank"  rel="noreferrer">
              {newsIcon} NEWS
            </a>
            &nbsp;&nbsp;&nbsp;
            <a href="https://youtu.be/lu4UOpEnHyY" target="_blank"  rel="noreferrer">
              {lectureLogo} LECTURE
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>

    var lecture11 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src={Lecture11} alt="projectimage"/>
      <div className="projectText">
        <p><h5>농촌체험상품 개발 브랜딩, 상표출원 교육 특강 (2020)</h5></p>
          <p className="bookDescription">
            한국생명과학고등학교 고교학점제 초청강연
          </p>
      </div>
    </div>
    </div>

    var lecture12 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src={Lecture12} alt="projectimage"/>
        <div className="projectText">
          <p><h5>호프스테더 권력거리 이론 관점에서 본 고용노동부 행정혁신 성공사례 (2020)</h5></p>
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
                {book} NOTES
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    var lecture13 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src={Lecture13} alt="projectimage"/>
      <div className="projectText">
        <p><h5>잔머리로 시스템을 가지고 노는 방법 (2019)</h5></p>
          <p className="bookDescription">
            경안고등학교 초청강연
          </p>
      </div>
    </div>
    </div>

    var lecture14 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src={Lecture14} alt="projectimage"/>
      <div className="projectText">
        <p><h5>혁신의 장벽을 개발자스럽게 부수기 (2019)</h5></p>
          <p className="bookDescription">
            마소콘 2019 기조연설
          </p>
        <div className="lectureIcons">
          <div className="gitIcons">
            <a href="http://it.chosun.com/site/data/html_dir/2019/11/23/2019112301220.html" target="_blank"  rel="noreferrer">
              {newsIcon} NEWS
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>

    var lecture15 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src={Lecture15} alt="projectimage"/>
      <div className="projectText">
        <p><h5>수필 두 편으로 50일만에 대한민국 움직이기 (2019)</h5></p>
          <p className="bookDescription">
            계명대학교 초청강연
          </p>
      </div>
    </div>
    </div>

    var lecture16 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src={Lecture16} alt="projectimage"/>
      <div className="projectText">
        <p><h5>실패하는 스타트업 (2019)</h5></p>
          <p className="bookDescription">
            POSTECH 영재기업인 교육원 온라인 마이 멘토 초청강연
          </p>
      </div>
    </div>
    </div>

    var lecture17 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src={Lecture17} alt="projectimage"/>
        <div className="projectText">
          <p><h5>파이썬과 함께라는 마음가짐만 있으면 못 할 것은 없다는 마음가짐만 있으면 정말로 못 할 것은 없다 (2019)</h5></p>
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
    
    var lecture18 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src={Lecture18} alt="projectimage"/>
      <div className="projectText">
        <p><h5>그로스해킹을 통한 행정혁신 사례 (2019)</h5></p>
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
    
    var lecture19 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src={Lecture19} alt="projectimage"/>
      <div className="projectText">
        <p><h5>행정혁신 성공사례 강연 (2019)</h5></p>
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
    
    var lecture20 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src={Lecture20} alt="projectimage"/>
      <div className="projectText">
        <p><h5>코딩하는 공익 - 아직 세상을 바꾸고 싶은 개발자에게 (2019)</h5></p>
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
    
    var lecture21 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src={Lecture21} alt="projectimage"/>
      <div className="projectText">
        <p><h5>학생창업과 KAIST (2018)</h5></p>
          <p className="bookDescription">
            2018 상반기, E5-KAIST 시니어 멘토 초청강연
          </p>
      </div>
    </div>
    </div>
    
    var lecture22 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src={Lecture22} alt="projectimage"/>
      <div className="projectText">
        <p><h5>학생신분으로 스타트업 세우기 (2016)</h5></p>
          <p className="bookDescription">
            2016 KLC 벤처포럼 at KAIST
          </p>
      </div>
    </div>
    </div>
    
    var lecture23 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src={Lecture23} alt="projectimage"/>
      <div className="projectText">
        <p><h5>아이디어에서 사업화까지 (2012)</h5></p>
          <p className="bookDescription">
            제 2회 KAIST 전국 발명대회 시상식 워크숍 초청강연
          </p>
      </div>
    </div>
    </div>
    
    var lecture24 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src={Lecture24} alt="projectimage"/>
      <div className="projectText">
        <p><h5>뇌과학에 발을 들이면서 (2012)</h5></p>
          <p className="bookDescription">
            경안고등학교 과학동아리 초청강연
          </p>
      </div>
    </div>
    </div>

    
    var lecture25 = <div className="singleLectureContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src={Lecture25} alt="projectimage"/>
      <div className="projectText">
        <p><h5>학습법 멘토링 강연 (2012)</h5></p>
          <p className="bookDescription">
            대전만년고등학교 
          </p>
      </div>
    </div>
    </div>

    return (
      <div className="websitesContainer">
        {lecture1}
        {lecture2}
        {lecture3}
        {lecture4}
        {lecture5}
        {lecture6}
        {lecture7}
        {lecture8}
        {lecture9}
        {lecture10}
        {lecture11}
        {lecture12}
        {lecture13}
        {lecture14}
        {lecture15}
        {lecture16}
        {lecture17}
        {lecture18}
        {lecture19}
        {lecture20}
        {lecture21}
        {lecture22}
        {lecture23}
        {lecture24}
        {lecture25}
      </div>
    )
  }

  render() {
    return (
      <section id="lectures" className="animated bounceInDown">
          {this.sectionTitle()}
          {this.drawLectures()}
      </section>
    );
  }
}
  
export default Lectures;