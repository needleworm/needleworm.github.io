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
    var reactIconL = <i className="fab fa-react"></i>
    var gitLogo = <i className="fab fa-github"></i>

    var collection1 = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
        <a className="tempa" href="https://needleworm.github.io" target="_blank"  rel="noreferrer">
         <img className="websiteImage" src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/websites/blog.gif" alt="projectimage"/>
        </a>
        <div className="projectText">
          <a className="text-center textMarginBottom" href="https://needleworm.github.io" target="_blank"  rel="noreferrer">
            <h5>https://needleworm.github.io</h5><br/>
          </a>
          <div className="codeBody">
            <p className="bookDescription">
              My own webpage built with &nbsp;{reactIconL} React. This static website is hosted on &nbsp;{gitLogo} Github Pages.
              It was inspired by &nbsp; 
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
            <h5>{reactIconL}&nbsp;React&nbsp;&nbsp;{gitLogo}&nbsp;Pages</h5>
            <div className="gitIcons">
              <a href="https://github.com/needleworm/needleworm.github.io" target="_blank"  rel="noreferrer">
                <i className="fas fa-code"></i>
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://needleworm.github.io" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>


    return (
      <div className="websitesContainer">
        <div className="text-center textMarginBottom" style={{marginBottom:"200px"}}>
          June. 2022.<br/>
          Coming Soon<br/>
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