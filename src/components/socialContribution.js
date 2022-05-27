import React, {Component} from 'react';
import './websites.css';


class SocialContribution extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  sectionTitle(){
    return(
      <div className="row">
        <div className="col-lg-12 text-center">
            <h2 className="section-heading subpageHeading">Social Contribution</h2>
        </div>
      </div>
    )
  }

  drawWebsites(){
    var socialContribution2 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
        <a className="tempa" href="https://needleworm.github.io" target="_blank"  rel="noreferrer">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/socialContributions/dream2022.png" alt="projectimage"/>
        </a>
        <div className="projectText">
          <h5 className="text-center textMarginBottom">버스킹팀 교회오빠들 - 소아암 환우 후원공연</h5><br/>
          <div className="codeBody">
            <p className="bookDescription">
              2019년 11월부터 이어진 정기 버스킹 공연입니다. 매주 화요일과 목요일 공연이 진행되었고, 안타깝게도 코로나 판데믹이 심화되는 바람에 2020년 봄이 오기 전 중단된 프로젝트입니다.
              프로젝트 기간 동안 90만 원 가량의 후원금을 모금하였으며, 후원금 전액을 한국소아암재단에 기부하였습니다.
            </p>
          </div>
          <div className="projectIcons">
          </div>
        </div>
      </div>
    </div>

    var socialContribution1 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
        <a className="tempa" href="https://needleworm.github.io" target="_blank"  rel="noreferrer">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/socialContributions/busking.gif" alt="projectimage"/>
        </a>
        <div className="projectText">
          <h5 className="text-center textMarginBottom">버스킹팀 교회오빠들 - 소아암 환우 후원공연</h5><br/>
          <div className="codeBody">
            <p className="bookDescription">
              2019년 11월부터 이어진 정기 버스킹 공연입니다. 매주 화요일과 목요일 공연이 진행되었고, 안타깝게도 코로나 판데믹이 심화되는 바람에 2020년 봄이 오기 전 중단된 프로젝트입니다.
              프로젝트 기간 동안 90만 원 가량의 후원금을 모금하였으며, 후원금 전액을 한국소아암재단에 기부하였습니다.
            </p>
          </div>
          <div className="projectIcons">
          </div>
        </div>
      </div>
    </div>

    return (
      <div className="websitesContainer">
        {socialContribution2}
        {socialContribution1}
      </div>
    )
  }

  render() {
    return (
      <section id="socialContribution" className="animated bounceInDown">
          {this.sectionTitle()}
          {this.drawWebsites()}
      </section>
    );
  }
}
  
export default SocialContribution;