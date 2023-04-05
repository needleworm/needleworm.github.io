import React, { useState, useEffect } from 'react';
import './codes.css';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';


function Codes() {
  type SingleObjectType = {
    name: string
    url: string
    language: string
    stars: number | string
    forks: number | string
    watch: number | string
    createdAt: string | string
    description: string
  }

  type ObjectType = {
    [key: string]: SingleObjectType
  }
  const [repository, setRepository] = useState<ObjectType>({})


  useEffect(() => {
    const response = axios.get('https://api.github.com/users/needleworm/repos?per_page=100')
    response.then((res) =>{
      const data = res.data
      let repo: ObjectType = {}
      for (let i in data){
        const el = data[i]
        repo[el.name] = {
          name: el.name,
          url: el.html_url,
          language: el.language,
          stars: el.stargazers_count,
          forks: el.forks_count,
          watch: el.watchers,
          createdAt: el.created_at,
          description: el.description        
        }
      }
      setRepository(repo)
    })
  })

  const drawGraph = () => {
    const options = {
      legend:{
        display: true,
        position: "bottom"
      },
      elements:{
        arc:{
          borderWidth: 2
        }
      }
      
    }

    const data = {
      labels: [
        'Python', 
        'C & C++', 
        'JS & HTML & CSS', 
        'ETC'],
      datasets: [
        {
          label: 'Code Bytes on Github',
          data: [164577814, 1454905, 902627, 70423],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ],
          borderWidth: 1,
        },
      ],
    }

    const chartStyle = {
      maxWidth:'500px',
      marginLeft:'auto',
      marginRight:'auto',
    }

    return (
      <div style={chartStyle}>
        <Doughnut data={data} options={options}/>
        <p className="text-center">
          Click &nbsp;<i className="fab fa-python"></i>&nbsp;Python label to see other languages
        </p><br/><br/><br/>
      </div>
    )
  }

  const sectionTitle = () => {
    return(
      <div className="row">
        <div className="col-lg-12 text-center">
            <h2 className="section-heading subpageHeading">Codes</h2>
        </div>
      </div>
    )
  }

  const drawProjects = () => {
    let pythonIcon = <i className="fab fa-python"></i>
    let reactIconL = <i className="fab fa-react"></i>
    let windowsIcon = <i className="fab fa-windows"></i>
    let jekyllIcon = <i className="fas fa-vial"></i>
    let jsIcon = <i className="fab fa-js-square"></i>
    let javaIcon = <i className="fab fa-java"></i>
    let eduThumbnail = "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/edu.jpg"
    let pythonThumbnail = "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/python.jpg"
    let exeThumbnail = "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/exe.jpg"
    let scienceThumbnail = "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/science.jpg"
    let moneyautoThumbnail = "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/moneyauto.jpg"
    let reactThumbnail = "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/react.jpg"
    let tfThumbnail = "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/tf.jpg"
    let scalaThumbnail = "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/scala.jpg"
    let cheeseThumbnail = "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/cheese.jpg"
    let jsThumbnail = "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/js.jpg"
    let nftThumbnail = "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/nft.jpg"


    return <div className="projects">
      {/* 교육관련 */}
      {drawSingleProject("bhban_rpa", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/covers/7.jpg", pythonIcon)}
      {drawSingleProject("automation_edu", eduThumbnail, pythonIcon)}
      {drawSingleProject("pymacro", eduThumbnail, pythonIcon)}
      {drawSingleProject("python101", eduThumbnail, pythonIcon)}
      {drawSingleProject("bhban_ai", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/covers/8.jpg", pythonIcon)}
      {drawSingleProject("pywinmacro", exeThumbnail, pythonIcon)}



      {/* 재미관련 */}
      {drawSingleProject("newsToday", pythonThumbnail, pythonIcon)}
      {drawSingleProject("post_crawler", pythonThumbnail, pythonIcon)}
      {drawSingleProject("brunch_thaad", pythonThumbnail, pythonIcon)}


      {/* Git Pages */}
      {drawSingleProject("needleworm.github.io", reactThumbnail, reactIconL)}
      {drawSingleProject("financebook", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/covers/9.jpg", jekyllIcon)}
      {drawSingleProject("instagram", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/covers/12.jpg", jsIcon)}
      {drawSingleProject("gunbam", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/covers/12.jpg", jekyllIcon)}
      {drawSingleProject("101", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/covers/10.jpg", jekyllIcon)}
      {drawSingleProject("frontend", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/covers/12.jpg", jekyllIcon)}
      {drawSingleProject("dataset", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/books/covers/13.jpg", jekyllIcon)}


      {/* 연구관련 */}
      {drawSingleProject("fvs", scienceThumbnail, pythonIcon)}
      {drawSingleProject("base_sequence_analysis", scienceThumbnail, pythonIcon)}
      {drawSingleProject("fmm_crawl", scienceThumbnail, pythonIcon)}
      {drawSingleProject("pubmed_crawler", scienceThumbnail, pythonIcon)}
      {drawSingleProject("pubmed_abstract_crawl", scienceThumbnail, pythonIcon)}
      {drawSingleProject("PubMed_Crawl_exe", exeThumbnail, windowsIcon)}
      {drawSingleProject("google_scholar_crawler", scienceThumbnail, pythonIcon)}
      {drawSingleProject("ion_interference", scienceThumbnail, pythonIcon)}
      {drawSingleProject("nutrient_solution", scienceThumbnail, pythonIcon)}
      {drawSingleProject("nc2", scienceThumbnail, pythonIcon)}
      {drawSingleProject("greenhouse_ai", scienceThumbnail, pythonIcon)}
      {drawSingleProject("bh_coefficient", scienceThumbnail, pythonIcon)}
      {drawSingleProject("mlproject", tfThumbnail, pythonIcon)}


      {/* 자동화 */}
      {drawSingleProject("pixabay_crawling", pythonThumbnail, pythonIcon)}
      {drawSingleProject("chulsukbu", pythonThumbnail, pythonIcon)}
      {drawSingleProject("get_vaccine", pythonThumbnail, pythonIcon)}
      {drawSingleProject("img_crop_from_PDF", pythonThumbnail, pythonIcon)}
      {drawSingleProject("insta_like_by_graphic_recognition", pythonThumbnail, pythonIcon)}
      {drawSingleProject("twitter_news_macro", pythonThumbnail, pythonIcon)}
      {drawSingleProject("xlsx_destroyer", pythonThumbnail, pythonIcon)}
      {drawSingleProject("wordpuzzle", pythonThumbnail, pythonIcon)}
      {drawSingleProject("xlsx_sorter", pythonThumbnail, pythonIcon)}
      {drawSingleProject("bluestack_macro", pythonThumbnail, pythonIcon)}


      {/* 머니오토 */}
      {drawSingleProject("CoinAutoTrader", moneyautoThumbnail, pythonIcon)}
      {drawSingleProject("nftauto", nftThumbnail, pythonIcon)}
      {drawSingleProject("pixelRandomizer", nftThumbnail, pythonIcon)}
      {drawSingleProject("CoinAutoTrader_Bithumb", moneyautoThumbnail, pythonIcon)}
      {drawSingleProject("coinone_Api_for_google_apps", jsThumbnail, jsIcon)}
      {drawSingleProject("CoinAutoTrader_exe", moneyautoThumbnail, windowsIcon)}

      {/* 그 외 */}
      {drawSingleProject("eliza", scalaThumbnail, javaIcon)}
      {drawSingleProject("mozza", cheeseThumbnail, pythonIcon)}
      {drawSingleProject("pizza", cheeseThumbnail, pythonIcon)}
      {drawSingleProject("cottoncandy", cheeseThumbnail, pythonIcon)}
      {drawSingleProject("breakout", tfThumbnail, pythonIcon)}
      {drawSingleProject("moneyauto", moneyautoThumbnail, jekyllIcon)}
      


    </div>
  }

  const drawSingleProject = (name: string, icon: any, languageIcon: any) => {
    if (!repository[name]){
      return 
    }
    let project = <div className="singleProjectContainer">
      <div className="singleProjectCard">
        <a className="tempa" href={repository[name].url} target="_blank"  rel="noreferrer">
         <img className="projectImage" src={icon}  alt="projectimage"/>
        </a>
        <div className="projectText">
          <a href={repository[name].url} target="_blank"  rel="noreferrer">
            <h5>{name}</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              First Commit on {repository[name].createdAt.substring(0,10)}
            </p>
            <p className="bookDescription">{repository[name].description}</p>
          </div>
          <div className="projectIcons">
            <h5>{languageIcon}&nbsp; {repository[name].language}</h5>
            <div className="gitIcons">
              <a href={repository[name].url + '/watchers'} target="_blank"  rel="noreferrer">
                <i className="far fa-eye"></i> {repository[name].watch}
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href={repository[name].url + '/stargazers'} target="_blank"  rel="noreferrer">
                <i className="far fa-star"></i> {repository[name].stars}
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href={repository[name].url + '/network/members'} target="_blank"  rel="noreferrer">
                <i className="fas fa-code-branch"></i> {repository[name].forks}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    return project
  }

  const drawCodes = () => {
    return(
      <div className="codeContainer">
        {drawGraph()}
        <div className="col-lg-12 text-center">
          <h3 className="qwerqwer">
            Realtime Summary of &nbsp; 
            <a className="tempa" href="https://github.com/needleworm" target="_blank"  rel="noreferrer">
              My <i className="fab fa-github"></i> Github Account
            </a>
          </h3>
        </div>
        {drawProjects()}
      </div>
    )
  }

  return (
    <section id="codes" className="animated bounceInDown">
        {sectionTitle()}
        {drawCodes()}
    </section>
  );
}
  
export default Codes;