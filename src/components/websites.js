import React, {Component} from 'react';
import './websites.css';
import blogGif from "../images/websites/blog.gif";
import sangsangfarmGif from "../images/websites/sangsangfarm.gif";
import priceGif from "../images/websites/price.gif";

class Codes extends Component {
  constructor(props){
    super(props);
    this.state = {
      repository: {}
    }
  }

  sectionTitle(){
    return(
      <div className="row">
        <div className="col-lg-12 text-center">
            <h2 className="section-heading subpageHeading">Websites</h2>
        </div>
      </div>
    )
  }

  drawWebsites(){
    var reactIconL = <i className="fab fa-react"></i>
    var rubyIcon = <i className="far fa-gem"></i>
    var gitLogo = <i className="fab fa-github"></i>
    var ms = <i className="fab fa-microsoft"></i>
    var blog = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
        <a className="tempa" href="https://needleworm.github.io" target="_blank"  rel="noreferrer">
         <img className="websiteImage" src={blogGif} alt="projectimage"/>
        </a>
        <div className="projectText">
          <a className="text-center textMarginBottom" href="https://needleworm.github.io" target="_blank"  rel="noreferrer">
            <p><h5>https://needleworm.github.io</h5></p>
          </a>
          <div className="codeBody">
            <p className="bookDescription">
              My won webpage built with pure React. This static website is hosted on &nbsp;{gitLogo} Github Pages.
              I was inspired by &nbsp; 
              <a href='https://github.com/tzuehlke/jekyll-uno-timeline/' target="_blank"  rel="noreferrer">
                Thomas Zühlke's jekyll theme
              </a>. The original theme runs with jQuery for github API calling, and SCSS for styling. 
              And its jQuery function supported only one content wrapper element.<br/>
              I built a pure &nbsp;{reactIconL} React app looks similar to Thomas' work. 
              As you can see, this page supports multiple content wrapper elements. 
              If you are interested in using this site theme to build your own page, please visit my repository to get the source code.
            </p>
          </div>
          <div className="projectIcons">
            <h5>{reactIconL}&nbsp;React</h5>
            <div className="gitIcons">
              <a href="https://github.com/needleworm/needleworm.github.io" target="_blank"  rel="noreferrer">
                <i className="fas fa-code"></i> Source Code
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://needleworm.github.io" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i> Visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    var sangsangfarm = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
        <a className="tempa" href="https://www.sangsang.farm" target="_blank"  rel="noreferrer">
         <img className="websiteImage" src={sangsangfarmGif} alt="projectimage"/>
        </a>
        <div className="projectText">
          <a className="text-center textMarginBottom" href="https://www.sangsang.farm" target="_blank"  rel="noreferrer">
            <p><h5>https://www.sangsang.farm</h5></p>
          </a>
          <div className="codeBody">
            <p className="bookDescription">
              This static website is built with pure &nbsp;{reactIconL} React and hosted on &nbsp;{ms} Microsoft Azure.
            </p>
          </div>
          <div className="projectIcons">
            <h5>{rubyIcon}&nbsp;Jekyll</h5>
            <div className="gitIcons">
              <a href="https://www.sangsang.farm" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i> visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    var price = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
      <a className="tempa" href="https://www.sangsang.farm/price" target="_blank"  rel="noreferrer">
      <img className="websiteImage" src={priceGif} alt="projectimage"/>
      </a>
      <div className="projectText">
        <a className="text-center textMarginBottom" href="https://www.sangsang.farm/price" target="_blank"  rel="noreferrer">
          <p><h5>https://www.sangsang.farm/price</h5></p>
        </a>
        <div className="codeBody">
          <p className="bookDescription">aaaa</p>
        </div>
        <div className="projectIcons">
          <h5>{reactIconL}&nbsp;React</h5>
          <div className="gitIcons">
            <a href="https://www.sangsang.farm/price" target="_blank"  rel="noreferrer">
              <i className="fas fa-external-link-alt"></i> visit
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>

    return (
      <div className="websitesContainer">
        {blog}
        {price}
        {sangsangfarm}
      </div>
    )
  }

  render() {
    return (
      <section id="websites">
          {this.sectionTitle()}
          {this.drawWebsites()}
      </section>
    );
  }
}
  
export default Codes;