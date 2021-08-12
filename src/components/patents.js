import React, {Component} from 'react';
import './patents.css';

class Patents extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  sectionTitle(){
    return(
      <div className="row">
        <div className="col-lg-12 text-center">
            <h2 className="section-heading subpageHeading">Patents</h2>
        </div>
      </div>
    )
  }

  drawWebsites(){
    var gitLogo = <i className="fab fa-github"></i>
    var capLogo = <i className="fas fa-graduation-cap"></i>

    var patent1 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/patents/1.jpg" alt="projectimage"/>
        <div className="projectText">
          <p><h5>센서의 자동 캘리브레이션이 가능한 양액 제어 장치 및 방법</h5></p>
            <p className="bookDescription">
            <strong>등록번호</strong> &nbsp;&nbsp;&nbsp;10-2162817
            <div className="patentInfo">
              <div><strong>출원일</strong> &nbsp;&nbsp;&nbsp;2020.06.15.</div>
              <div><strong>등록일</strong> &nbsp;&nbsp;&nbsp;2020.10.07.</div>
            </div>
            <strong>발명자</strong> &nbsp;&nbsp;&nbsp;반병현, 이장훈, 류동훈, 이민우, 권영범, 엄태동<br/>
            <strong>출원인</strong> &nbsp;&nbsp;&nbsp;농업회사법인 상상텃밭 (주)<br/>
            </p>
          <div className="projectIcons">
            <h5>
              <span className="citation"  onClick={
                function(e){
                  e.preventDefault()
                  var dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = 'Byunghyun Ban et al. Nutrient control device and method capable of automatic calibration of sensor. KR Patent 10-2162817 (2020)'
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!")
                }
              }>
                <i className="far fa-clipboard"></i>&nbsp;Cite This
              </span>
            </h5>
            <div className="gitIcons">
              <a href="https://ieeexplore.ieee.org/abstract/document/9289192/" target="_blank"  rel="noreferrer">
                {capLogo}
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/patentPdf/1.pdf" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://doi.org/10.8080/1020200072009" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    var patent2 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/patents/2.jpg" alt="projectimage"/>
        <div className="projectText">
          <p><h5>데이터 처리 서버 및 방법</h5></p>
            <p className="bookDescription">
            <strong>등록번호</strong> &nbsp;&nbsp;&nbsp;10-2139928
            <div className="patentInfo">
              <div><strong>출원일</strong> &nbsp;&nbsp;&nbsp;2020.05.26.</div>
              <div><strong>등록일</strong> &nbsp;&nbsp;&nbsp;2020.07.27.</div>
            </div>
            <strong>발명자</strong> &nbsp;&nbsp;&nbsp;이장훈, 반병현<br/>
            <strong>출원인</strong> &nbsp;&nbsp;&nbsp;농업회사법인 상상텃밭 (주)<br/>
            </p>
          <div className="projectIcons">
            <h5>
              <span className="citation"  onClick={
                function(e){
                  e.preventDefault()
                  var dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = 'Janghun Lee and Byunghyun Ban. Data processing server and method. KR Patent 10-2139928 (2020)'
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!")
                }
              }>
                <i className="far fa-clipboard"></i>&nbsp;Cite This
              </span>
            </h5>
            <div className="gitIcons">
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/patentPdf/2.pdf" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://doi.org/10.8080/1020200063129" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    var patent3 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/patents/3.jpg" alt="projectimage"/>
        <div className="projectText">
          <p><h5>용존산소량 및 양액 농도 조절이 가능한 양액 재배 장치 및 방법</h5></p>
            <p className="bookDescription">
            <strong>등록번호</strong> &nbsp;&nbsp;&nbsp;10-2134655
            <div className="patentInfo">
              <div><strong>출원일</strong> &nbsp;&nbsp;&nbsp;2020.04.23.</div>
              <div><strong>등록일</strong> &nbsp;&nbsp;&nbsp;2020.07.10.</div>
            </div>
            <strong>발명자</strong> &nbsp;&nbsp;&nbsp;반병현<br/>
            <strong>출원인</strong> &nbsp;&nbsp;&nbsp;농업회사법인 상상텃밭 (주)<br/>
            </p>
          <div className="projectIcons">
            <h5>
              <span className="citation"  onClick={
                function(e){
                  e.preventDefault()
                  var dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = 'Byunghyun Ban. Apparatus and method for cultivating nutrient solution capable of adjusting dissolved oxygen and nutrient solution concentration. KR Patent 10-2134655 (2020)'
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!")
                }
              }>
                <i className="far fa-clipboard"></i>&nbsp;Cite This
              </span>
            </h5>
            <div className="gitIcons">
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/patentPdf/3.pdf" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://doi.org/10.8080/1020200049113" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    var patent4 = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
       <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/patents/4.jpg" alt="projectimage"/>
      <div className="projectText">
        <p><h5>식물 뿌리의 이온 흡수율 분석 장치 및 방법</h5></p>
          <p className="bookDescription">
          <strong>등록번호</strong> &nbsp;&nbsp;&nbsp;10-2118957
          <div className="patentInfo">
            <div><strong>출원일</strong> &nbsp;&nbsp;&nbsp;2020.02.06.</div>
            <div><strong>등록일</strong> &nbsp;&nbsp;&nbsp;2020.05.29.</div>
          </div>
          <strong>발명자</strong> &nbsp;&nbsp;&nbsp;반병현<br/>
          <strong>출원인</strong> &nbsp;&nbsp;&nbsp;농업회사법인 상상텃밭 (주)<br/>
          </p>
        <div className="projectIcons">
          <h5>
            <span className="citation"  onClick={
              function(e){
                e.preventDefault()
                var dummy = document.createElement("textarea");
                document.body.appendChild(dummy);
                dummy.value = 'Byunghyun Ban. Apparatus and method for analyzing the ion absorption rate of plant roots. KR Patent 10-2118957 (2020)'
                dummy.select();
                document.execCommand("copy");
                document.body.removeChild(dummy);
                alert("Citation is copied to Clipboard!")
              }
            }>
              <i className="far fa-clipboard"></i>&nbsp;Cite This
            </span>
          </h5>
          <div className="gitIcons">
             <a href="https://github.com/needleworm/nutrient_solution" target="_blank"  rel="noreferrer">
                {gitLogo}
              </a>
            &nbsp;&nbsp;&nbsp;
             <a href="https://ieeexplore.ieee.org/document/9289083/" target="_blank"  rel="noreferrer">
                {capLogo}
              </a>
            &nbsp;&nbsp;&nbsp;
            <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/patentPdf/4.pdf" target="_blank"  rel="noreferrer" download>
              <i className="fas fa-file-pdf"></i>
            </a>
            &nbsp;&nbsp;&nbsp;
            <a href="https://doi.org/10.8080/1020200014379" target="_blank"  rel="noreferrer">
              <i className="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

    var patent5 = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
       <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/patents/5.jpg" alt="projectimage"/>
      <div className="projectText">
        <p><h5>식물 뿌리의 이온 흡수율 분석 장치 및 방법</h5></p>
          <p className="bookDescription">
          <strong>등록번호</strong> &nbsp;&nbsp;&nbsp;10-2069202
          <div className="patentInfo">
            <div><strong>출원일</strong> &nbsp;&nbsp;&nbsp;2019.09.24.</div>
            <div><strong>등록일</strong> &nbsp;&nbsp;&nbsp;2020.01.16.</div>
          </div>
          <strong>발명자</strong> &nbsp;&nbsp;&nbsp;반병현, 이민우, 류동훈<br/>
          <strong>출원인</strong> &nbsp;&nbsp;&nbsp;농업회사법인 상상텃밭 (주)<br/>
          </p>
        <div className="projectIcons">
          <h5>
            <span className="citation"  onClick={
              function(e){
                e.preventDefault()
                var dummy = document.createElement("textarea");
                document.body.appendChild(dummy);
                dummy.value = 'Byunghyun Ban et al. Device and method for removing ion interference effect from nutrient solution using machine learning. KR Patent 10-2069202 (2020)'
                dummy.select();
                document.execCommand("copy");
                document.body.removeChild(dummy);
                alert("Citation is copied to Clipboard!")
              }
            }>
              <i className="far fa-clipboard"></i>&nbsp;Cite This
            </span>
          </h5>
          <div className="gitIcons">
             <a href="https://github.com/needleworm/ion_interference" target="_blank"  rel="noreferrer">
                {gitLogo}
              </a>
            &nbsp;&nbsp;&nbsp;
             <a href="https://ieeexplore.ieee.org/document/8939812/" target="_blank"  rel="noreferrer">
                {capLogo}
              </a>
            &nbsp;&nbsp;&nbsp;
            <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/patentPdf/5.pdf" target="_blank"  rel="noreferrer" download>
              <i className="fas fa-file-pdf"></i>
            </a>
            &nbsp;&nbsp;&nbsp;
            <a href="https://doi.org/10.8080/1020190117156" target="_blank"  rel="noreferrer">
              <i className="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
      
    var patent6 = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
       <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/patents/6.jpg" alt="projectimage"/>
      <div className="projectText">
        <p><h5>상미분방적식으로 모델링된 네트워크 모델을 이용한 수경재배 양액 분석 장치 및 방법</h5></p>
          <p className="bookDescription">
          <strong>등록번호</strong> &nbsp;&nbsp;&nbsp;10-2053738
          <div className="patentInfo">
            <div><strong>출원일</strong> &nbsp;&nbsp;&nbsp;2019.09.20.</div>
            <div><strong>등록일</strong> &nbsp;&nbsp;&nbsp;2019.12.03.</div>
          </div>
          <strong>발명자</strong> &nbsp;&nbsp;&nbsp;반병현, 이민우, 류동훈<br/>
          <strong>출원인</strong> &nbsp;&nbsp;&nbsp;농업회사법인 상상텃밭 (주)<br/>
          </p>
        <div className="projectIcons">
          <h5>
            <span className="citation"  onClick={
              function(e){
                e.preventDefault()
                var dummy = document.createElement("textarea");
                document.body.appendChild(dummy);
                dummy.value = 'Byunghyun Ban et al. Device and method for agricultural nutrient solution analysis using network model modeled by ordinary differential equation KR Patent 10-2053738 (2019)'
                dummy.select();
                document.execCommand("copy");
                document.body.removeChild(dummy);
                alert("Citation is copied to Clipboard!")
              }
            }>
              <i className="far fa-clipboard"></i>&nbsp;Cite This
            </span>
          </h5>
          <div className="gitIcons">
             <a href="https://github.com/needleworm/nutrient_solution" target="_blank"  rel="noreferrer">
                {gitLogo}
              </a>
            &nbsp;&nbsp;&nbsp;
             <a href="https://ieeexplore.ieee.org/document/8939946/" target="_blank"  rel="noreferrer">
                {capLogo}
              </a>
            &nbsp;&nbsp;&nbsp;
            <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/patentPdf/6.pdf" target="_blank"  rel="noreferrer" download>
              <i className="fas fa-file-pdf"></i>
            </a>
            &nbsp;&nbsp;&nbsp;
            <a href="https://doi.org/10.8080/1020190115737" target="_blank"  rel="noreferrer">
              <i className="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

    var patent7 = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
       <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/patents/7.jpg" alt="projectimage"/>
      <div className="projectText">
        <p><h5>온실 시스템의 제어 모델 생성 방법</h5></p>
          <p className="bookDescription">
          <strong>등록번호</strong> &nbsp;&nbsp;&nbsp;10-2100350
          <div className="patentInfo">
            <div><strong>출원일</strong> &nbsp;&nbsp;&nbsp;2019.04.24.</div>
            <div><strong>등록일</strong> &nbsp;&nbsp;&nbsp;2020.04.07.</div>
          </div>
          <strong>발명자</strong> &nbsp;&nbsp;&nbsp;반병현, 김수빈<br/>
          <strong>출원인</strong> &nbsp;&nbsp;&nbsp;농업회사법인 상상텃밭 (주)<br/>
          </p>
        <div className="projectIcons">
          <h5>
            <span className="citation"  onClick={
              function(e){
                e.preventDefault()
                var dummy = document.createElement("textarea");
                document.body.appendChild(dummy);
                dummy.value = 'Byunghyun Ban et al. METHOD FOR GENERATING CONTROL MODEL OF GREENHOUSE SYSTEM. KR Patent 10-2100350 (2020)'
                dummy.select();
                document.execCommand("copy");
                document.body.removeChild(dummy);
                alert("Citation is copied to Clipboard!")
              }
            }>
              <i className="far fa-clipboard"></i>&nbsp;Cite This
            </span>
          </h5>
          <div className="gitIcons">
             <a href="https://github.com/needleworm/greenhouse_ai" target="_blank"  rel="noreferrer">
                {gitLogo}
              </a>
            &nbsp;&nbsp;&nbsp;
             <a href="https://ieeexplore.ieee.org/document/8190813/" target="_blank"  rel="noreferrer">
                {capLogo}
              </a>
            &nbsp;&nbsp;&nbsp;
            <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/patentPdf/7.pdf" target="_blank"  rel="noreferrer" download>
              <i className="fas fa-file-pdf"></i>
            </a>
            &nbsp;&nbsp;&nbsp;
            <a href="https://doi.org/10.8080/1020180011904" target="_blank"  rel="noreferrer">
              <i className="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

    var patent8 = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/patents/8.jpg" alt="projectimage"/>
      <div className="projectText">
        <p><h5>수경재배용 양액 관리 자동화 시스템 및 그 방법</h5></p>
          <p className="bookDescription">
          <div className="patentInfo">
            <div><strong>출원일</strong> &nbsp;&nbsp;&nbsp;2019.04.24.</div>
            <div><strong>출원번호</strong> &nbsp;&nbsp;&nbsp;10-2018-0094076</div>
          </div>
          <strong>발명자</strong> &nbsp;&nbsp;&nbsp;남윤성, 김민근, 김수림, 김현준, 이하영, 황의경, 반병현, 이민우<br/>
          <strong>출원인</strong> &nbsp;&nbsp;&nbsp;한국과학기술원<br/>
          </p>
        <div className="projectIcons">
          <span></span>
          <div className="gitIcons">
            <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/patentPdf/8.pdf" target="_blank"  rel="noreferrer" download>
              <i className="fas fa-file-pdf"></i>
            </a>
            &nbsp;&nbsp;&nbsp;
            <a href="https://doi.org/10.8080/1020180094076" target="_blank"  rel="noreferrer">
              <i className="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>

    var patent9 = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
      <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/patents/9.jpg" alt="projectimage"/>
      <div className="projectText">
        <p><h5>프리 오더 마르코프 체인과 베이즈 추론을 이용한 음악 작곡 방법</h5></p>
          <p className="bookDescription">
          <div className="patentInfo">
            <div><strong>출원일</strong> &nbsp;&nbsp;&nbsp;2017.02.23.</div>
            <div><strong>출원번호</strong> &nbsp;&nbsp;&nbsp;10-2017-0024220</div>
          </div>
          <strong>발명자</strong> &nbsp;&nbsp;&nbsp;반병현, 정윤의, 장민수<br/>
          <strong>출원인</strong> &nbsp;&nbsp;&nbsp;반병현, 정윤의, 장민수<br/>
          </p>
        <div className="projectIcons">
          <span></span>
          <div className="gitIcons">
            <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/patentPdf/9.pdf" target="_blank"  rel="noreferrer" download>
              <i className="fas fa-file-pdf"></i>
            </a>
            &nbsp;&nbsp;&nbsp;
            <a href="https://doi.org/10.8080/1020170024220" target="_blank"  rel="noreferrer">
              <i className="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>

    var patent10 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/patents/10.jpg" alt="projectimage"/>
        <div className="projectText">
          <p><h5>용존산소 농도 및 용존이산화탄소 농도 분석을 통한 수경재배 양액 내 조류 농도 추론 장치 및 방법</h5></p>
            <p className="bookDescription">
            <strong>등록번호</strong> &nbsp;&nbsp;&nbsp;10-2289069
            <div className="patentInfo">
              <div><strong>출원일</strong> &nbsp;&nbsp;&nbsp;2021.04.27</div>
              <div><strong>등록일</strong> &nbsp;&nbsp;&nbsp;2021.08.06.</div>
            </div>
            <strong>발명자</strong> &nbsp;&nbsp;&nbsp;반병현, 이민우<br/>
            <strong>출원인</strong> &nbsp;&nbsp;&nbsp;농업회사법인 상상텃밭 (주)<br/>
            </p>
          <div className="projectIcons">
            <h5>
              <span className="citation"  onClick={
                function(e){
                  e.preventDefault()
                  var dummy = document.createElement("textarea");
                  document.body.appendChild(dummy);
                  dummy.value = 'Byunghyun Ban et al. Apparatus and method for inferring algae concentration in hydroponic nutrient solution through dissolved oxygen concentration and dissolved carbon dioxide concentration analysis. KR Patent 10-2289069 (2021)'
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                  alert("Citation is copied to Clipboard!")
                }
              }>
                <i className="far fa-clipboard"></i>&nbsp;Cite This
              </span>
            </h5>
            <div className="gitIcons">
              <a href="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/patentPdf/10.pdf" target="_blank"  rel="noreferrer" download>
                <i className="fas fa-file-pdf"></i>
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://doi.org/10.8080/1020210054324" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    return (
      <div className="websitesContainer">
        {patent10}
        {patent1}
        {patent2}
        {patent3}
        {patent4}
        {patent5}
        {patent6}
        {patent7}
        {patent8}
        {patent9}
      </div>
    )
  }

  render() {
    return (
      <section id="patents" className="animated bounceInDown">
          {this.sectionTitle()}
          {this.drawWebsites()}
      </section>
    );
  }
}
  
export default Patents;