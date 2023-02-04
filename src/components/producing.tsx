import React from 'react';
import './lectures.css';


function Producing() {

  const sectionTitle = () => {
    return(
      <div className="row">
        <div className="col-lg-12 text-center">
            <h2 className="section-heading subpageHeading">Producing</h2>
        </div>
      </div>
    )
  }

  const drawLectures = () => {
    let youtube = <i className="fab fa-youtube"></i>
    
    let producing1 = <div className="singleLectureContainer">
      <div className="singleWebsiteCard">
        <iframe className="websiteImage" src="https://www.youtube.com/embed/Bc7MjNjt0FY" title="아이돌 덕질하다가 CG 디자이너 된 사람 ㅋㅋㅋ 정규민 아티스트의 포토샵 라이브 아트워크 쇼" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div className="projectText">
          <h5>아이돌 덕질하다가 CG 디자이너 된 사람 ㅋㅋㅋ 정규민 아티스트의 포토샵 라이브 아트워크 쇼</h5><br/>
            <p className="bookDescription">
            학창시절 소녀시대 팬클럽 덕질을 하다가 엄마손에 이끌려 미술학원에 등록했다고?? D'strict 정규민 미디어 아티스트의 비범한 입문기를 소개합니다. 그리고 즉석에서 포토샵으로 아트워크를 만드는 과정을 살펴보세요!
            </p>
          <div className="lectureIcons">
            <a href="https://www.youtube.com/watch?v=Bc7MjNjt0FY" target="_blank"  rel="noreferrer">
              {youtube}
            </a>
          </div>
        </div>
      </div>
    </div>

    return (
      <div className="websitesContainer">
        {producing1}
      </div>
    )
  }

  return (
      <section id="producing" className="animated bounceInDown">{sectionTitle()}{drawLectures()}
    </section>
  );
}
  
export default Producing;