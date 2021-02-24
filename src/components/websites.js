import React, {Component} from 'react';
import './websites.css';
import blogGif from "../images/websites/blog.gif";
import sangsangfarmGif from "../images/websites/sangsangfarm.gif";
import priceGif from "../images/websites/price.gif";
import moneyautoGif from "../images/websites/moneyauto.gif";

class Codes extends Component {
  constructor(props){
    super(props);
    this.state = {
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
    var jekyllIcon = <i className="fas fa-vial"></i>
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
              My own webpage built with &nbsp;{reactIconL} React. This static website is hosted on &nbsp;{gitLogo} Github Pages.
              I was inspired by &nbsp; 
              <a href='https://github.com/tzuehlke/jekyll-uno-timeline/' target="_blank"  rel="noreferrer">
                Thomas Zühlke's jekyll theme
              </a>. The original theme runs with jQuery for github API calling, and SCSS for styling. 
              And its jQuery function supported only one content wrapper element.<br/>
              I built a  &nbsp;{reactIconL} React app looks similar to Thomas' work. 
              As you can see, this page supports multiple content wrapper elements. 
              If you are interested in using this site theme to build your own page, please visit my repository to get the source code.
            </p>
          </div>
          <div className="projectIcons">
            <h5>{reactIconL}&nbsp;React&nbsp;&nbsp;{gitLogo}&nbsp;Github Pages</h5>
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
    
    var moneyauto = <div className="singleProjectContainer">
    <div className="singleWebsiteCard">
      <a className="tempa" href="https://needleworm.github.io/moneyauto" target="_blank"  rel="noreferrer">
      <img className="websiteImage" src={moneyautoGif} alt="projectimage"/>
      </a>
      <div className="projectText">
        <a className="text-center textMarginBottom" href="https://needleworm.github.io/moneyauto" target="_blank"  rel="noreferrer">
          <p><h5>https://needleworm.github.io/moneyauto</h5></p>
        </a>
        <div className="codeBody">
          <p className="bookDescription">
            A Landing page for Money AUTO project. Money AUTO is a non-commercial project to provide automated solutionis for individual investors.
            It now provides Coin AUTO, an automated cryptocurrency trading system. Money AUTO will provide automated stock trading system, 
            real-time asset management system, and investment portfolio design services. All services of moneyauto will be provided for free.<br/>
            This static website is built with &nbsp;{jekyllIcon}&nbsp;Jekyll and &nbsp;
            <a href="https://github.com/raviriley/agency-jekyll-theme/" target="_blank"  rel="noreferrer">
              Agency theme by Ravi Riley
            </a>.
          </p>
        </div>
        <div className="projectIcons">
            <h5>{jekyllIcon}&nbsp;Jekyll&nbsp;&nbsp;{gitLogo}&nbsp;Github Pages</h5>
          <div className="gitIcons">
            <a href="https://github.com/needleworm/moneyauto" target="_blank"  rel="noreferrer">
              <i className="fas fa-code"></i> Source Code
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="https://needleworm.github.io/moneyauto" target="_blank"  rel="noreferrer">
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
              Official webpage of Imagination Garden Inc. 
              This static website is built with &nbsp;{jekyllIcon}&nbsp;Jekyll and hosted on &nbsp;{ms} Azure. It also utilized &nbsp;
              <a href="https://github.com/raviriley/agency-jekyll-theme/" target="_blank"  rel="noreferrer">
                Agency theme by Ravi Riley
              </a>.
            </p>
          </div>
          <div className="projectIcons">
            <h5>{jekyllIcon}&nbsp;Jekyll&nbsp;&nbsp;{ms}&nbsp;Azure</h5>
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
          <p className="bookDescription">
              This webpage provides automated counceling on smart farm and plant factory facilities. 
              As there is no standard format of smart farm facilities in Korean market, each consulting requires so much time and effort from both customers and us. 
              So I built this automated and interactive web app to provide information and suggest appropriate options for our customers. 
              This system also provides formed quote documents for administrative works of companies.
              <br/>
              This static website is built with &nbsp;{reactIconL} React and hosted on &nbsp;{ms} Azure.
          </p>
        </div>
        <div className="projectIcons">
          <h5>{reactIconL}&nbsp;React&nbsp;&nbsp;{ms}&nbsp;Azure</h5>
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
        {moneyauto}
        {sangsangfarm}
        {price}
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