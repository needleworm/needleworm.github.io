import React from 'react';
import './websites.css';


function Collections() {

  const sectionTitle = () => {
    return(
      <div className="row">
        <div className="col-lg-12 text-center">
            <h2 className="section-heading subpageHeading">Collections</h2>
        </div>
      </div>
    )
  }

  const drawWebsites = () => {
    let collection1 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/collection/1.jpeg" alt="projectimage"/>
        <div className="projectText">
          <div className="text-center textMarginBottom">
            <strong>
              The Inner Sky - Orange in you
            </strong>
          </div>
          <div className="codeBody">
            <p className="bookDescription">
              Oil on Canvas, 40.9 x 53 cm, 2022<br/>
              <a href="https://nonez.creatorlink.net/" target="_blank" rel="noreferrer">
                <strong>넌지</strong>
              </a><br/>
            </p>
            <div className="collectedFrom">
              Collected from <a className="collectedFrom" href="https://mansion9.co.kr/" target="_blank" rel="noreferrer">
                Manshion 9
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    let collection2 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/collection/2.jpeg" alt="projectimage"/>
        <div className="projectText">
          <div className="text-center textMarginBottom">
            <strong>
              The Inner Sky - Lens-scape
            </strong>
          </div>
          <div className="codeBody">
            <p className="bookDescription">
              Oil on Canvas, 40.9 x 53 cm, 2022<br/>
              <a href="https://nonez.creatorlink.net/" target="_blank" rel="noreferrer">
                <strong>넌지</strong>
              </a><br/>
            </p>
            <div className="collectedFrom">
              Collected from <a className="collectedFrom" href="https://www.art9gallery.net/" target="_blank" rel="noreferrer">
                아트나인갤러리
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    let collection3 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/collection/3.jpeg" alt="projectimage"/>
        <div className="projectText">
          <div className="text-center textMarginBottom">
            <strong>
              The Inner Sky - Enjoy
            </strong>
          </div>
          <div className="codeBody">
            <p className="bookDescription">
              Oil on Canvas, 40.9 x 53 cm, 2021<br/>
              <a href="https://nonez.creatorlink.net/" target="_blank" rel="noreferrer">
                <strong>넌지</strong>
              </a><br/>
            </p>
            <div className="collectedFrom">
              Collected from <a className="collectedFrom" href="https://www.k-auction.com/" target="_blank" rel="noreferrer">
                K Auction
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    let collection4 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/collection/4.jpg" alt="projectimage"/>
        <div className="projectText">
          <div className="text-center textMarginBottom">
            <strong>
              Window of Time No.2
            </strong>
          </div>
          <div className="codeBody">
            <p className="bookDescription">
              Oil on Canvas, 116.8 x 91 cm, 2020<br/>
              <a href="https://nonez.creatorlink.net/" target="_blank" rel="noreferrer">
                <strong>넌지</strong>
              </a><br/>
            </p>
            <div className="collectedFrom">
              Collected from <a className="collectedFrom" href="http://www.kwanhoongallery.com" target="_blank" rel="noreferrer">
                관훈갤러리
              </a>
            </div>
            <br/><br/>

            <div className="collectedFrom">
              전시 중<br/>
              In-Joy of ART (2022.06.08. ~ 2022.06.29.) <br/>
            </div>
          </div>
        </div>
      </div>
    </div>

    let collection5 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/collection/5.jpg" alt="projectimage"/>
        <div className="projectText">
          <div className="text-center textMarginBottom">
            <strong>
              The Inner Sky - Relax
            </strong>
          </div>
          <div className="codeBody">
            <p className="bookDescription">
              Oil on Canvas, 40.9 x 53 cm, 2021<br/>
              <a href="https://nonez.creatorlink.net/" target="_blank" rel="noreferrer">
                <strong>넌지</strong>
              </a><br/>
            </p>
            <div className="collectedFrom">
              Collected from <a className="collectedFrom" href="https://www.k-auction.com/" target="_blank" rel="noreferrer">
                K Auction
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    let collection6 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/collection/6.png" alt="projectimage"/>
        <div className="projectText">
          <div className="text-center textMarginBottom">
            <strong>
              Window of Time No.5
            </strong>
          </div>
          <div className="codeBody">
            <p className="bookDescription">
              Oil on Canvas, 53 x 40.9 cm, 2022<br/>
              <a href="https://nonez.creatorlink.net/" target="_blank" rel="noreferrer">
                <strong>넌지</strong>
              </a><br/>
            </p>
            <div className="collectedFrom">
              Collected from <a className="collectedFrom" href="https://www.k-auction.com/" target="_blank" rel="noreferrer">
                K Auction
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    let collection7 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
        <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/collection/7.jpg" alt="projectimage"/>
        <div className="projectText">
          <div className="text-center textMarginBottom">
            <strong>
              관계 관찰 (Relationship Observation)
            </strong>
          </div>
          <div className="codeBody">
            <p className="bookDescription">
              Mixsed media on wood panel, 45.5 x 60.6 cm, 2023<br/>
              <a href="https://nonez.creatorlink.net/" target="_blank" rel="noreferrer">
                <strong>넌지</strong>
              </a><br/>
            </p>
            <div className="collectedFrom">
              Collected from <a className="collectedFrom" href="https://www.art9gallery.net/" target="_blank" rel="noreferrer">
                아트나인갤러리
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>



    return (
      <div className="websitesContainer">
        <div className="text-center textMarginBottom" style={{marginBottom:"200px"}}>
          {collection7}
          {collection6}
          {collection5}
          {collection4}
          {collection3}
          {collection2}
          {collection1}
        </div>
      </div>
    )
  }

  return (
      <section id="collections" className="animated bounceInDown">
        {sectionTitle()}
        {drawWebsites()}
    </section>
  );
}
  
export default Collections;