import React, {Component} from 'react';
import './App.css';
import profilePic from "./images/profile_pic.jpg"
import backgroundImage from "./images/background.jpg"
import Books from "./components/books"
import Websites from "./components/websites"
import Codes from "./components/codes"
import Papers from "./components/papers"
import Patents from "./components/patents"
import Lectures from "./components/lectures"
import Designs from "./components/designs"
import News from "./components/news"
import Contact from "./components/contact"
import Membership from "./components/membership"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      latestButton:"none",
      /* 
        content
          none
          books
          websites
          codes
          research
          lectures
          designs
          news
          contact
      */
      content:"none",
      sns:{
        email: "bhban@kakao.com",
        github:  "https://github.com/needleworm",
        linkedin:  "https://www.linkedin.com/in/bhban",
        youtube:  "https://www.youtube.com/channel/UCpV0ZdloVwvSjxHfnYYQPQg?sub_confirmation=1",
        researchgate: "https://www.researchgate.net/profile/Byunghyun_Ban"
      }
    }
    this.closeSideMenu = this._closeSideMenu.bind(this)
    this.openSideMenu = this._openSideMenu.bind(this)
  }

  
  _closeSideMenu(){
    var contentWrapper = document.querySelector('.content-wrapper')
    var panelCover = document.querySelector('.panel-cover')
    if (contentWrapper.classList.contains('showing')){
      var currentWidth = panelCover.clientWidth
      if (currentWidth < 960){
        contentWrapper.classList.remove('panel-cover--collapsed')
        panelCover.classList.remove('panel-cover--collapsed')
        panelCover.style.maxWidth = '100%'
      } else {
        contentWrapper.classList.remove('panel-cover--collapsed')
        panelCover.classList.remove('panel-cover--collapsed')
        panelCover.style.maxWidth = '100%'
        panelCover.animate(
          [ // Keyframes
            {'max-width': '530px', 'width': '40%'}, // from
            {'width': '100%'}, // to
          ], { // options
            duration: 400,
            easing: 'ease-in-out'
          } 
        )
      }
      contentWrapper.classList.remove('showing')
    }
  }

  _openSideMenu(){
    var contentWrapper = document.querySelector('.content-wrapper')
    if (contentWrapper.classList.contains('showing')){
      return
    }

    var panelCover = document.querySelector('.panel-cover')
    var currentWidth = panelCover.clientWidth
    if (currentWidth < 960){
      panelCover.classList.add('panel-cover--collapsed')
    } else {
      panelCover.style.maxWidth = currentWidth
      panelCover.animate(
        [ // Keyframes
          {'width': '100%'}, // from
          {'max-width': '530px', 'width': '40%'}, // to
        ], { // options
          duration: 400,
          easing: 'ease-in-out'
        } 
      )
      panelCover.classList.add('panel-cover--collapsed')
    }
    contentWrapper.classList.add('showing')
  }

  drawHeader(){
    var github = <span className="navigation__item_sns">
                  <a href={this.state.sns.github} title="Meet My Works on GitHub" target="_blank"  rel="noreferrer">
                    <i className="fab fa-github-square fa-lg"></i>
                    <span className="label">GitHub</span>
                  </a>
                  </span>

    var linkedin = <span className="navigation__item_sns">
                    <a href={this.state.sns.linkedin}  title="My LinkedIn Profile" target="_blank"  rel="noreferrer">
                      <i className="fab fa-linkedin fa-lg"></i>
                      <span className="label">LinkedIn</span>
                    </a>
                    </span>

    var youtube = <span className="navigation__item_sns">
      <a href={this.state.sns.youtube}  title="My Youtube Channel" target="_blank"  rel="noreferrer">
                <i className="fab fa-youtube-square fa-lg"></i>
                <span className="label">Youtube</span>
              </a>
              </span>

    var researchgate = <span className="navigation__item_sns">
      <a href={this.state.sns.researchgate}  title="Meet Me on Researchgate" target="_blank"  rel="noreferrer">
                <i className="fab fa-researchgate fa-lg"></i>
                <span className="label">Researchgate</span>
              </a>
            </span>

    var blog = <span className="navigation__item_sns">
    <a href="https://brunch.co.kr/@needleworm"  title="My Blog" target="_blank"  rel="noreferrer">
              <i className="fas fa-pen-square fa-lg"></i>
              <span className="label">Blog</span>
            </a>
          </span>

    var profilePicButton = <a href="#home" title="Home">
      <img src={profilePic} className="user-image" alt="My Profile"
        onClick={
          function(e){
            this.setState({
              latestButton: "none",
              content:"none"
            })
            this.closeSideMenu()
          }.bind(this)
        }
      />
    </a>

    var books = <li className="navigation__item">
      <a href="#books" title="Books" className="panel-button projects-button"
        onClick={
          function(e){
            if (this.state.latestButton === "books"){
              this.setState({
                content: "none",
                latestButton: "none"
              })
              this.closeSideMenu()
            } else{
              this.setState({
                content: "books",
                latestButton: "books"
              })
              this.openSideMenu()
              var navigationWrapper = document.querySelector('.navigation-wrapper')
              var btnMobileMenuIcon = document.querySelector('.btn-mobile-menu__icon')
              navigationWrapper.classList.toggle('visible')
              btnMobileMenuIcon.classList.toggle('fa-caret-square-down')
              btnMobileMenuIcon.classList.toggle('fa-caret-square-up')
              btnMobileMenuIcon.classList.toggle('animated')
              btnMobileMenuIcon.classList.toggle('fadeIn')
            }
          }.bind(this)
        }
      >
        <i className="fas fa-book"></i>&nbsp;Books
      </a>
    </li>

    var websites = <li className="navigation__item">
      <a href="#websites" title="Websites" className="panel-button projects-button"
        onClick={
          function(e){
            if (this.state.latestButton === "websites"){
              this.setState({
                content: "none",
                latestButton: "none"
              })
              this.closeSideMenu()
            } else{
              this.setState({
                content: "websites",
                latestButton: "websites"
              })
              this.openSideMenu()
              var navigationWrapper = document.querySelector('.navigation-wrapper')
              var btnMobileMenuIcon = document.querySelector('.btn-mobile-menu__icon')
              navigationWrapper.classList.toggle('visible')
              btnMobileMenuIcon.classList.toggle('fa-caret-square-down')
              btnMobileMenuIcon.classList.toggle('fa-caret-square-up')
              btnMobileMenuIcon.classList.toggle('animated')
              btnMobileMenuIcon.classList.toggle('fadeIn')
            }
          }.bind(this)
        }
      >
        <i className="fas fa-laptop-code"></i>&nbsp;Websites
      </a>
    </li>

    var codes = <li className="navigation__item">
      <a href="#codes" title="Codes" className="panel-button projects-button"
        onClick={
          function(e){
            if (this.state.latestButton === "codes"){
              this.setState({
                content: "none",
                latestButton: "none"
              })
              this.closeSideMenu()
            } else{
              this.setState({
                content: "codes",
                latestButton: "codes",
              })
              this.openSideMenu()
              var navigationWrapper = document.querySelector('.navigation-wrapper')
              var btnMobileMenuIcon = document.querySelector('.btn-mobile-menu__icon')
              navigationWrapper.classList.toggle('visible')
              btnMobileMenuIcon.classList.toggle('fa-caret-square-down')
              btnMobileMenuIcon.classList.toggle('fa-caret-square-up')
              btnMobileMenuIcon.classList.toggle('animated')
              btnMobileMenuIcon.classList.toggle('fadeIn')
            }
          }.bind(this)
        }
      >
        <i className="fas fa-code-branch"></i>&nbsp;Codes
      </a>
    </li>

    var patents = <li className="navigation__item">
      <a href="#patents" title="Patents" className="panel-button projects-button"
        onClick={
          function(e){
            if (this.state.latestButton === "patents"){
              this.setState({
                content: "none",
                latestButton: "none"
              })
              this.closeSideMenu()
            } else{
              this.setState({
                content: "patents",
                latestButton: "patents"
              })
              this.openSideMenu()
              var navigationWrapper = document.querySelector('.navigation-wrapper')
              var btnMobileMenuIcon = document.querySelector('.btn-mobile-menu__icon')
              navigationWrapper.classList.toggle('visible')
              btnMobileMenuIcon.classList.toggle('fa-caret-square-down')
              btnMobileMenuIcon.classList.toggle('fa-caret-square-up')
              btnMobileMenuIcon.classList.toggle('animated')
              btnMobileMenuIcon.classList.toggle('fadeIn')
            }
          }.bind(this)
        }>
        <i className="far fa-registered"></i>&nbsp;Patents
      </a>
    </li>

    var papers = <li className="navigation__item">
      <a href="#papers" title="Papers" className="panel-button projects-button"
        onClick={
          function(e){
            if (this.state.latestButton === "papers"){
              this.setState({
                content: "none",
                latestButton: "none"
              })
              this.closeSideMenu()
            } else{
              this.setState({
                content: "papers",
                latestButton: "papers"
              })
              this.openSideMenu()
              var navigationWrapper = document.querySelector('.navigation-wrapper')
              var btnMobileMenuIcon = document.querySelector('.btn-mobile-menu__icon')
              navigationWrapper.classList.toggle('visible')
              btnMobileMenuIcon.classList.toggle('fa-caret-square-down')
              btnMobileMenuIcon.classList.toggle('fa-caret-square-up')
              btnMobileMenuIcon.classList.toggle('animated')
              btnMobileMenuIcon.classList.toggle('fadeIn')
            }
          }.bind(this)
        }>
        <i className="fas fa-graduation-cap"></i>&nbsp;Papers
      </a>
    </li>

    var lectures = <li className="navigation__item">
      <a href="#lectures" title="Lectures" className="panel-button projects-button"
        onClick={
          function(e){
            if (this.state.latestButton === "lectures"){
              this.setState({
                content: "none",
                latestButton: "none"
              })
              this.closeSideMenu()
            } else{
              this.setState({
                content: "lectures",
                latestButton: "lectures"
              })
              this.openSideMenu()
              var navigationWrapper = document.querySelector('.navigation-wrapper')
              var btnMobileMenuIcon = document.querySelector('.btn-mobile-menu__icon')
              navigationWrapper.classList.toggle('visible')
              btnMobileMenuIcon.classList.toggle('fa-caret-square-down')
              btnMobileMenuIcon.classList.toggle('fa-caret-square-up')
              btnMobileMenuIcon.classList.toggle('animated')
              btnMobileMenuIcon.classList.toggle('fadeIn')
            }
          }.bind(this)
        }>
        <i className="fas fa-chalkboard-teacher"></i>&nbsp;Lectures
      </a>
    </li>

    var designs = <li className="navigation__item">
      <a href="#designs" title="Designs" className="panel-button projects-button"
        onClick={
          function(e){
            if (this.state.latestButton === "designs"){
              this.setState({
                content: "none",
                latestButton: "none"
              })
              this.closeSideMenu()
            } else{
              this.setState({
                content: "designs",
                latestButton: "designs"
              })
              this.openSideMenu()
              var navigationWrapper = document.querySelector('.navigation-wrapper')
              var btnMobileMenuIcon = document.querySelector('.btn-mobile-menu__icon')
              navigationWrapper.classList.toggle('visible')
              btnMobileMenuIcon.classList.toggle('fa-caret-square-down')
              btnMobileMenuIcon.classList.toggle('fa-caret-square-up')
              btnMobileMenuIcon.classList.toggle('animated')
              btnMobileMenuIcon.classList.toggle('fadeIn')
            }
          }.bind(this)
        }>
        <i className="fas fa-palette"></i>&nbsp;Designs
      </a>
    </li>

    var news = <li className="navigation__item">
      <a href="#news" title="Me on Newses"
        onClick={
          function(e){
            if (this.state.latestButton === "news"){
              this.setState({
                content: "none",
                latestButton: "none"
              })
              this.closeSideMenu()
            } else{
              this.setState({
                content: "news",
                latestButton: "news"
              })
              this.openSideMenu()
              var navigationWrapper = document.querySelector('.navigation-wrapper')
              var btnMobileMenuIcon = document.querySelector('.btn-mobile-menu__icon')
              navigationWrapper.classList.toggle('visible')
              btnMobileMenuIcon.classList.toggle('fa-caret-square-down')
              btnMobileMenuIcon.classList.toggle('fa-caret-square-up')
              btnMobileMenuIcon.classList.toggle('animated')
              btnMobileMenuIcon.classList.toggle('fadeIn')
            }
          }.bind(this)
        }>
        <i className="far fa-newspaper"></i>&nbsp;News
      </a>
    </li>

    var contact = <li className="navigation__item">
      <a href="#contact" title="Contact Me"
        onClick={
          function(e){
            if (this.state.latestButton === "contact"){
              this.setState({
                content: "none",
                latestButton: "none"
              })
              this.closeSideMenu()
            } else{
              this.setState({
                content: "contact",
                latestButton: "contact"
              })
              this.openSideMenu()
              var navigationWrapper = document.querySelector('.navigation-wrapper')
              var btnMobileMenuIcon = document.querySelector('.btn-mobile-menu__icon')
              navigationWrapper.classList.toggle('visible')
              btnMobileMenuIcon.classList.toggle('fa-caret-square-down')
              btnMobileMenuIcon.classList.toggle('fa-caret-square-up')
              btnMobileMenuIcon.classList.toggle('animated')
              btnMobileMenuIcon.classList.toggle('fadeIn')
            }
          }.bind(this)
        }>
        <i className="far fa-envelope"></i>&nbsp;Contact
      </a>
    </li>

  var membership = <li className="navigation__item">
    <a href="#membership" title="My Memberships"
      onClick={
        function(e){
          if (this.state.latestButton === "membership"){
            this.setState({
              content: "none",
              latestButton: "none"
            })
            this.closeSideMenu()
          } else{
            this.setState({
              content: "membership",
              latestButton: "membership"
            })
            this.openSideMenu()
            var navigationWrapper = document.querySelector('.navigation-wrapper')
            var btnMobileMenuIcon = document.querySelector('.btn-mobile-menu__icon')
            navigationWrapper.classList.toggle('visible')
            btnMobileMenuIcon.classList.toggle('fa-caret-square-down')
            btnMobileMenuIcon.classList.toggle('fa-caret-square-up')
            btnMobileMenuIcon.classList.toggle('animated')
            btnMobileMenuIcon.classList.toggle('fadeIn')
          }
        }.bind(this)
      }>
      <i className="far fa-id-badge"></i>&nbsp;Membership
    </a>
  </li>
    
    var mobileButtenMenu =  <span className="mobile btn-mobile-menu"
      onClick={
        function(e){
          var navigationWrapper = document.querySelector('.navigation-wrapper')
          var btnMobileMenuIcon = document.querySelector('.btn-mobile-menu__icon')
          navigationWrapper.classList.toggle('visible')
          navigationWrapper.classList.toggle('animated')
          navigationWrapper.classList.toggle('bounceInDown')
          btnMobileMenuIcon.classList.toggle('fa-caret-square-down')
          btnMobileMenuIcon.classList.toggle('fa-caret-square-up')
          btnMobileMenuIcon.classList.toggle('animated')
          btnMobileMenuIcon.classList.toggle('fadeIn')
        }
      }
    >
      <i className="far fa-caret-square-down btn-mobile-menu__icon"></i>
      <i className="far fa-caret-square-up btn-mobile-close__icon hidden"></i>
    </span>

    return(
      <div>
        {mobileButtenMenu}
        <header className="panel-cover" style={{background_image: backgroundImage, maxWidth:'100%'}}>
          <div className="panel-main">
            <div className="panel-main__inner panel-inverted">
              <div className="panel-main__content">
                {profilePicButton}
                <h1 className="panel-cover__title panel-title">Byunghyun Ban</h1>
                <nav className="cover-navigation navigation--social">
                    {github}
                    {linkedin}
                    {youtube}
                    {researchgate}
                      {blog}
                </nav>
                <hr className="panel-cover__divider"/>
                <p className="panel-cover__description">Author, Entrepreneur, Researcher and Developer</p>
                <p className="panel-cover__description">Working at <a href="https://sangsang.farm">Imagination Garden Inc.</a> as CTO.</p>
                <hr className="panel-cover__divider panel-cover__divider--secondary"/>
                <div className="navigation-wrapper">
                  <br/>
                  <nav className="cover-navigation navigation--social">
                    <ul className="navigation">
                      {books}
                      {websites}
                      {codes}
                      {papers}
                      {patents}
                      {lectures}
                      {/*
                      {designs}
                      */}
                      {news}
                      {membership}
                      {contact}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="panel-cover--overlay"></div>
        </header>
      </div>
    )
  }

  drawBody(){
    var footer = <div><footer className="footer">
        <span className="footer__copyright">&copy; 2021. Byunghyun Ban All rights reserved.</span>
      </footer>
      </div>
    

    return (
      <div className="content-wrapper">
        <div className="content-wrapper__inner">
          {this.drawContents()}
          {footer}
        </div>
    </div>
    )
  }

  drawContents(){
    if (this.state.content === "none"){
      return (
        <div></div>
      )
    } else if (this.state.content === "books"){
        return (
          <Books/>
        )
    } else if (this.state.content === "websites"){
      return (
        <Websites/>
      )
    } else if (this.state.content === "codes"){
      return (
        <Codes/>
      )
    } else if (this.state.content === "patents"){
      return (
        <Patents/>
      )
    } else if (this.state.content === "papers"){
      return (
        <Papers/>
      )
    } else if (this.state.content === "lectures"){
      return (
        <Lectures/>
      )
    } else if (this.state.content === "designs"){
      return (
        <Designs/>
      )
    } else if (this.state.content === "news"){
      return (
        <News/>
      )
    } else if (this.state.content === "contact"){
      return (
        <Contact/>
      )
    }else if (this.state.content === "membership"){
      return (
        <Membership/>
      )
    }
  }

  render() {
    return (
      <div className="App">
        {this.drawHeader()}
        {this.drawBody()}
      </div>
    );
  }
}

export default App;