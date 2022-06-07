import React, {Component} from 'react';
import './websites.css';


class Collections extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  sectionTitle(){
    return(
      <div className="row">
        <div className="col-lg-12 text-center">
            <h2 className="section-heading subpageHeading">Collections</h2>
        </div>
      </div>
    )
  }

  drawWebsites(){
    var collection1 = <div className="singleProjectContainer">
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
              Oil on Canvas, 40.9 x 53 cm<br/>
              <a href="https://nonez.creatorlink.net/" target="_blank" rel="noreferrer">
                <strong>넌지</strong> (2022)
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

    var collection2 = <div className="singleProjectContainer">
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
              Oil on Canvas, 40.9 x 53 cm<br/>
              <a href="https://nonez.creatorlink.net/" target="_blank" rel="noreferrer">
                <strong>넌지</strong> (2022)
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

    var collection3 = <div className="singleProjectContainer">
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
              Oil on Canvas, 40.9 x 53 cm<br/>
              <a href="https://nonez.creatorlink.net/" target="_blank" rel="noreferrer">
                <strong>넌지</strong> (2021)
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



    return (
      <div className="websitesContainer">
        <div className="text-center textMarginBottom" style={{marginBottom:"200px"}}>
          {collection3}
          {collection2}
          {collection1}
        </div>
      </div>
    )
  }

  render() {
    return (
      <section id="websites" className="animated bounceInDown">
          {this.sectionTitle()}
          {this.drawWebsites()}
      </section>
    );
  }
}
  
export default Collections;