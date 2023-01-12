import React, { useState } from 'react';
import './App.css';

import Books from "./components/books"
import Websites from "./components/websites"
import Codes from "./components/codes"
import Papers from "./components/papers"
import Patents from "./components/patents"
import Lectures from "./components/lectures"
import News from "./components/news"
import Media from "./components/media"
import Contact from "./components/contact"
import Membership from "./components/membership"
import SocialContribution from "./components/socialContribution"
import Collections from "./components/collections"


const sns = {
    email: "bhban@kakao.com",
    github:  "https://github.com/needleworm",
    linkedin:  "https://www.linkedin.com/in/bhban",
    youtube:  "https://www.youtube.com/channel/UCpV0ZdloVwvSjxHfnYYQPQg?sub_confirmation=1",
    researchgate: "https://www.researchgate.net/profile/Byunghyun_Ban"
  }


function App () {
  const [latestButton, setLatestButton] = useState("none")  /*  none
                                                                books
                                                                websites
                                                                codes
                                                                research
                                                                lectures
                                                                designs
                                                                news
                                                                contact
                                                                media
                                                                socialContribution
                                                                collections
                                                            */
  const [content, setContent] = useState("none")


  const closeSideMenu = () => {
    const contentWrapper = document.querySelector('.content-wrapper')
    if (!contentWrapper?.classList.contains('showing')){
      return
    }

    const panelCover = document.querySelector('.panel-cover') as HTMLElement
    panelCover.classList.remove('panel-cover--collapsed')
    panelCover.style.maxWidth = '100%'

    const window = document.querySelector('html') as HTMLElement

    const currentWidth : number = window.clientWidth
    if (currentWidth > 800){
      panelCover.animate(
        [ // Keyframes
          {'max-width': '530px', 'width': '40%'}, // from
          {'width': '100%'}, // to
        ], 
        { // options
          duration: 300,
          easing: 'ease-in-out'
        } 
      )
    } else {
      panelCover.animate(
        [ // Keyframes
          {'height': '40%'}, // from
          {'height': '100%'}, // to
        ], { // options
          duration: 300,
          easing: 'ease-in-out'
        } 
      )
    }
    contentWrapper?.classList.remove('showing')
    setLatestButton("none")
    setContent("none")
  }

  const openSideMenu = () => {
    const contentWrapper = document.querySelector('.content-wrapper')
    if (contentWrapper?.classList.contains('showing')){
      return
    }

    const panelCover = document.querySelector('.panel-cover')
    panelCover?.classList.add('panel-cover--collapsed')

    const window: HTMLElement = document.querySelector('html') as HTMLElement

    let currentWidth: Number = window.clientWidth
    if (currentWidth > 800){
      panelCover?.animate(
        [ // Keyframes
          {'width': '100%'}, // from
          {'max-width': '530px', 'width': '40%'}, // to
        ], { // options
          duration: 300,
          easing: 'ease-in-out'
        } 
      )
    } else {
      panelCover?.animate(
        [ // Keyframes
          {'height': '100%'}, // to
          {'height': '40%'}, // from
        ], { // options
          duration: 300,
          easing: 'ease-in-out'
        } 
      )
      
    }
    contentWrapper?.classList.add('showing')
  }

  const bouncing = () => {
    const navigationWrapper = document.querySelector('.navigation-wrapper')
    const btnMobileMenuIcon = document.querySelector('.btn-mobile-menu__icon')
    navigationWrapper?.classList.toggle('visible')
    btnMobileMenuIcon?.classList.toggle('fa-caret-square-down')
    btnMobileMenuIcon?.classList.toggle('fa-caret-square-up')
    btnMobileMenuIcon?.classList.toggle('animated')
    btnMobileMenuIcon?.classList.toggle('fadeIn')
  }

  const bouncing_mobile = () => {
    const navigationWrapper = document.querySelector('.navigation-wrapper')
    const btnMobileMenuIcon = document.querySelector('.btn-mobile-menu__icon')
    navigationWrapper?.classList.toggle('visible')
    navigationWrapper?.classList.toggle('bounceInDown')
    navigationWrapper?.classList.toggle('animated')
    btnMobileMenuIcon?.classList.toggle('fa-caret-square-down')
    btnMobileMenuIcon?.classList.toggle('fa-caret-square-up')
    btnMobileMenuIcon?.classList.toggle('animated')
    btnMobileMenuIcon?.classList.toggle('fadeIn')
  }

  const drawHeader = () => {
    const github = <span className="navigation__item_sns">
                  <a href={sns.github} title="Meet My Works on GitHub" target="_blank"  rel="noreferrer">
                    <i className="fab fa-github-square fa-lg"></i>
                    <span className="label">GitHub</span>
                  </a>
                  </span>

    const linkedin = <span className="navigation__item_sns">
                    <a href={sns.linkedin}  title="My LinkedIn Profile" target="_blank"  rel="noreferrer">
                      <i className="fab fa-linkedin fa-lg"></i>
                      <span className="label">LinkedIn</span>
                    </a>
                    </span>

    const youtube = <span className="navigation__item_sns">
      <a href={sns.youtube}  title="My Youtube Channel" target="_blank"  rel="noreferrer">
                <i className="fab fa-youtube-square fa-lg"></i>
                <span className="label">Youtube</span>
              </a>
              </span>

    const researchgate = <span className="navigation__item_sns">
      <a href={sns.researchgate}  title="Meet Me on Researchgate" target="_blank"  rel="noreferrer">
                <i className="fab fa-researchgate fa-lg"></i>
                <span className="label">Researchgate</span>
              </a>
            </span>

    const blog = <span className="navigation__item_sns">
      <a href="https://brunch.co.kr/@needleworm"  title="My Blog" target="_blank"  rel="noreferrer">
              <i className="fas fa-pen-square fa-lg"></i>
              <span className="label">Blog</span>
            </a>
          </span>

    const profilePicButton = <a href="#home" title="Home">
      <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/profile_pic.jpg" className="user-image" alt="My Profile"
        onClick={
          function(e){
            setLatestButton("none")
            setContent("none")
            closeSideMenu()
          }
        }
      />
    </a>


    let books = <li className="navigation__item">
      <a href="#books" title="Books" className="panel-button projects-button"
        onClick={
          function(e){
            if (latestButton === "books"){
              closeSideMenu()
            } else{
              setContent("books")
              setLatestButton("books")
              openSideMenu()
              bouncing()
            }
          }
        }
      >
        <i className="fas fa-book"></i>&nbsp;Books
      </a>
    </li>

    let websites = <li className="navigation__item">
      <a href="#websites" title="Websites" className="panel-button projects-button"
        onClick={
          function(e){
            if (latestButton === "websites"){
              closeSideMenu()
            } else{
              setContent("websites")
              setLatestButton("websites")
              openSideMenu()
              bouncing()
            }
          }
        }
      >
        <i className="fas fa-laptop-code"></i>&nbsp;Web
      </a>
    </li>

    let codes = <li className="navigation__item">
      <a href="#codes" title="Codes" className="panel-button projects-button"
        onClick={
          function(e){
            if (latestButton === "codes"){
              closeSideMenu()
            } else{
              setContent("codes")
              setLatestButton("codes")
              openSideMenu()
              bouncing()
            }
          }
        }
      >
        <i className="fas fa-code-branch"></i>&nbsp;Codes
      </a>
    </li>

    let patents = <li className="navigation__item">
      <a href="#patents" title="Patents" className="panel-button projects-button"
        onClick={
          function(e){
            if (latestButton === "patents"){
              closeSideMenu()
            } else{
              setContent("patents")
              setLatestButton("patents")
              openSideMenu()
              bouncing()
            }
          }
        }>
        <i className="far fa-registered"></i>&nbsp;Patents
      </a>
    </li>

    let papers = <li className="navigation__item">
      <a href="#papers" title="Papers" className="panel-button projects-button"
        onClick={
          function(e){
            if (latestButton === "papers"){
              closeSideMenu()
            } else{
              setContent("papers")
              setLatestButton("papers")
              openSideMenu()
              bouncing()
            }
          }
        }>
        <i className="fas fa-graduation-cap"></i>&nbsp;Papers
      </a>
    </li>

    let lectures = <li className="navigation__item">
      <a href="#lectures" title="Lectures" className="panel-button projects-button"
        onClick={
          function(e){
            if (latestButton === "lectures"){
              closeSideMenu()
            } else{
              setContent("lectures")
              setLatestButton("lectures")
              openSideMenu()
              bouncing()
            }
          }
        }>
        <i className="fas fa-chalkboard-teacher"></i>&nbsp;Lectures
      </a>
    </li>
    let news = <li className="navigation__item">
      <a href="#news" title="Me on Newses"
        onClick={
          function(e){
            if (latestButton === "news"){
              closeSideMenu()
            } else{
              setContent("news")
              setLatestButton("news")
              openSideMenu()
              bouncing()
            }
          }
        }>
        <i className="far fa-newspaper"></i>&nbsp;News
      </a>
    </li>

    let media = <li className="navigation__item">
      <a href="#media" title="Me on Media"
        onClick={
          function(e){
            if (latestButton === "media"){
              closeSideMenu()
            } else{
              setContent("media")
              setLatestButton("media")
              openSideMenu()
              bouncing()
            }
          }
        }>
        <i className="fas fa-video"></i>&nbsp;Media
      </a>
    </li>

    let contact = <li className="navigation__item">
      <a href="#contact" title="Contact Me"
        onClick={
          function(e){
            if (latestButton === "contact"){
              closeSideMenu()
            } else{
              setContent("contact")
              setLatestButton("contact")
              openSideMenu()
              bouncing()
            }
          }
        }>
        <i className="far fa-envelope"></i>&nbsp;Contact
      </a>
    </li>

    let membership = <li className="navigation__item">
      <a href="#membership" title="My Memberships"
        onClick={
          function(e){
            if (latestButton === "membership"){
              closeSideMenu()
            } else{
              setContent("membership")
              setLatestButton("membership")
              openSideMenu()
              bouncing()
            }
          }
        }>
        <i className="far fa-id-badge"></i>&nbsp;Membership
      </a>
    </li>

    let socialContribution = <li className="navigation__item">
      <a href="#socialContribution" title="socialContribution" className="panel-button projects-button"
        onClick={
          function(e){
            if (latestButton === "socialContribution"){
              closeSideMenu()
            } else{
              setContent("socialContribution")
              setLatestButton("socialContribution")
              openSideMenu()
              bouncing()
            }
          }
        }
      >
        <i className="fa-solid fa-hand-holding-heart"></i>&nbsp;사회공헌
      </a>
    </li>

    let collections = <li className="navigation__item">
      <a href="#collections" title="collections" className="panel-button projects-button"
        onClick={
          function(e){
            if (latestButton === "collections"){
              closeSideMenu()
            } else{
              setContent("collections")
              setLatestButton("collections")
              openSideMenu()
              bouncing()
            }
          }
        }
      >
        <i className="fa-solid fa-palette"></i>&nbsp;Collections
      </a>
    </li>

    let mobileButtenMenu =  <span className="mobile btn-mobile-menu"
      onClick={bouncing_mobile}
    >
      <i className="far fa-caret-square-down btn-mobile-menu__icon"></i>
      <i className="far fa-caret-square-up btn-mobile-close__icon hidden"></i>
    </span>

    return(
      <header className="panel-cover">
        {mobileButtenMenu}
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
                    {lectures}
                    {media}
                    {codes}
                    {papers}
                    {patents}
                    {news}
                    {collections}
                    {websites}
                    {membership}
                    {socialContribution}
                    {contact}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="panel-cover--overlay"></div>
      </header>
    )
  }

  const drawBody = () => {
    let footer = <div>
      <footer className="footer">
        <span className="footer__copyright">&copy; 2021. Byunghyun Ban All rights reserved.</span>
      </footer>
    </div>
    

    return (
      <div className="content-wrapper">
        <div className="content-wrapper__inner">{drawContents()}{footer}
        </div>
    </div>
    )
  }

  const drawContents = () => {
    if (content === "none"){
      return (
        <div></div>
      )
    } else if (content === "books"){
        return (
          <Books/>
        )
    } else if (content === "websites"){
      return (
        <Websites/>
      )
    } else if (content === "codes"){
      return (
        <Codes/>
      )
    } else if (content === "patents"){
      return (
        <Patents/>
      )
    } else if (content === "papers"){
      return (
        <Papers/>
      )
    } else if (content === "lectures"){
      return (
        <Lectures/>
      )
    } else if (content === "news"){
      return (
        <News/>
      )
    } else if (content === "media"){
      return (
        <Media/>
      )
    } else if (content === "contact"){
      return (
        <Contact/>
      )
    }else if (content === "membership"){
      return (
        <Membership/>
      )
    }else if (content === "socialContribution"){
      return (
        <SocialContribution/>
      )
    }else if (content === "collections"){
      return (
        <Collections/>
      )
    }
  }

  return (
    <div className="App">
      {drawHeader()}
      {drawBody()}
    </div>
  );
}

export default App;