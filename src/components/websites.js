import React, {Component} from 'react';
import './websites.css';
import blog from "../images/websites/blog.gif";

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
    var project = <div className="singleProjectContainer">
      <div className="singleWebsiteCard">
        <a className="tempa" href="#" target="_blank"  rel="noreferrer">
         <img className="websiteImage" src={blog} alt="projectimage"/>
        </a>
        <div className="projectText">
          <a href="#" target="_blank"  rel="noreferrer">
            <h5>temp</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              test
            </p>
            <p className="bookDescription">aaaa</p>
            
          </div>
          <div className="projectIcons">
            <h5 >language</h5>
            <div className="gitIcons">
              <a href="#" target="_blank"  rel="noreferrer">
                <i className="fas fa-code"></i> view source
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="#" target="_blank"  rel="noreferrer">
                <i className="fas fa-external-link-alt"></i> visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    return project
  }

  drawCodes(){
    return(
      <div className="codeContainer">
        {this.drawWebsites()}
      </div>
    )
  }

  render() {
    return (
      <section id="codes">
          {this.sectionTitle()}
          {this.drawCodes()}
      </section>
    );
  }
}
  
export default Codes;