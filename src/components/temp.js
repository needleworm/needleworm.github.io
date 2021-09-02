import React, {Component} from 'react';
import './news.css';


class Media extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  sectionTitle(){
    return(
      <div className="row">
        <div className="col-lg-12 text-center">
            <h2 className="section-heading subpageHeading">News</h2>
        </div>
      </div>
    )
  }

  drawNews(){
    var media1 = <div className="singleProjectContainer">
      <div className="singleNewsCard">
        <a className="hideOnDesktop" href="https://news.sbs.co.kr/news/endPage.do?news_id=N1006004052" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/1.jpg"  alt="projectimage"/>
            <h5>SBS 스브스뉴스</h5>
          </div>
          </a>
        <div className="projectText">
          <a href="https://news.sbs.co.kr/news/endPage.do?news_id=N1006004052" target="_blank"  rel="noreferrer">
            <h5>안동에서는 대마가 합법? 대마 농장 운영 중인 사람 직접 만나고 옴</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              2020.10.03.
            </p>
            <p className="bookDescription">
            대마를 심거나 키우는 건 마약류 관리법에 의해 우리나라 전 국토에서 불법입니다. 하지만 딱 한 군데 예외가 있습니다. 바로 경상북도 안동시입니다. 
            </p>
          </div>
        </div>
        <a className="hideOnMobile"  href="https://news.sbs.co.kr/news/endPage.do?news_id=N1006004052" target="_blank"  rel="noreferrer">
          <div className="newsThumnail">
            <img className="newsImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/news/1.jpg"  alt="projectimage"/>
            <h5>SBS 스브스뉴스</h5>
          </div>
          </a>
      </div>
    </div>

    return <div>
      {media1}

    </div>
  }


  render() {
    return (
      <section id="codes" className="animated bounceInDown">
          {this.sectionTitle()}
          {this.drawNews()}
      </section>
    );
  }
}
  
export default Media;