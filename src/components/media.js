import React, {Component} from 'react';
import './lectures.css';


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
    
    var media1 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/media/1.png" alt="projectimage"/>
        <div className="projectText">
          <p><h5>고무통으로 벼 자동 재배 농장(스마트팜) 만들기... IQ 만점 공대생이 도와주러옴</h5></p>
            <p className="bookDescription">
              스파트팜의 대가 상상텃밭 CTO의 자동화 농사법 A to Z 강의! 왜 보는지 모르겠는데 빠져들게 됨...
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=fuwZmgKenqs&t=195s" target="_blank"  rel="noreferrer">
                {youtube} 긱블
              </a>
          </div>
        </div>
      </div>
    </div>

    var media2 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/media/2.png" alt="projectimage"/>
        <div className="projectText">
          <p><h5>안동에서는 대마가 합법? 대마 농장 운영 중인 사람 직접 만나고 옴</h5></p>
            <p className="bookDescription">
            대마를 심거나 키우는 건 마약류 관리법에 의해 우리나라 전 국토에서 불법입니다. 하지만 딱 한 군데 예외가 있습니다. 바로 경상북도 안동시입니다.
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=VJpjk8j6zTM&t=115s" target="_blank"  rel="noreferrer">
                {youtube} 스브스뉴스
              </a>
          </div>
        </div>
      </div>
    </div>

    var media3 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/media/3.png" alt="projectimage"/>
        <div className="projectText">
          <p><h5>★파워 으쓱★ 여러모로 능력 넘치는 카이스트 출신의 대마 농부 [무엇이든 물어보살]</h5></p>
            <p className="bookDescription">
            미모의 교사 여자친구가 푹~ 빠진 카이스트 출신 농부! 합법 대마 농장주와 알아보는 대마의 모든 것
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=s0skJO5TfAk&t=2s" target="_blank"  rel="noreferrer">
                {youtube} KBS N
              </a>
          </div>
        </div>
      </div>
    </div>

    var media4 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/media/4.png" alt="projectimage"/>
        <div className="projectText">
          <p><h5>카이스트 출신 대학원생이 공익이 되면 일어나는 일?! (feat. 코딩) / 스브스뉴스</h5></p>
            <p className="bookDescription">
            6개월을 해야 겨우 끝낼 수 있는 엄청난 양의 단순 반복 업무를 받는다면 어떨까요? 상상도 하기 싫은 그런 상황. 고용노동부 안동지청에서 사회복무요원(aka.공익)으로 복무하는 반병현 씨에게 얼마 전 닥쳤던 일입니다. 하지만 그는 카이스트에서 인공지능으로 석사 학위를 받은 능력자였습니다. 그 일을 30분 만에 끝내버렸죠. 이런 이야기를 그는 블로그에 올렸습니다. 그런데 그 글 때문에 병현 씨에게 상상도 못 했던 일이 일어나는데요. 무슨 일이 있었던 걸까요?

            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=_-ugbwhhApI&t=2s" target="_blank"  rel="noreferrer">
                {youtube} 스브스뉴스
              </a>
          </div>
        </div>
      </div>
    </div>
    

    return (
      <div className="websitesContainer">
        {media1}
        {media2}
        {media3}
        {media4}
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