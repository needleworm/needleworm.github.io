import React, {Component} from 'react';
import './codes.css';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import edu from "../images/codes/edu.PNG";
import exe from "../images/codes/exe.png";
import js from "../images/codes/js.png";
import moneyauto from "../images/codes/moneyauto.png";
import python from "../images/codes/python.jpeg";
import reactIcon from "../images/codes/react.png";
import scala from "../images/codes/scala.png";
import tf from "../images/codes/tf.png";
import tfjs from "../images/codes/tfjs.png";
import science from "../images/codes/science.jpg";
import cheese from "../images/codes/cheese.jpg";

class Codes extends Component {
  constructor(props){
    super(props);
    this.state = {
      repository: {}
    }
  }

  componentDidMount(){
    const response = axios.get('https://api.github.com/users/needleworm/repos?per_page=100')
    response.then((res) =>{
      const data = res.data
      var repo = {}
      for (var i in data){
        var el = data[i]
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
      this.setState({
        repository: repo
      })
    })
  }

  drawGraph(){
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
      labels: ['Python', 'C & C++', 'JS & HTML & CSS', 'ETC'],
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
      width:'70%',
      marginLeft:'auto',
      marginRight:'auto',
      minWidth: '400px'
    }

    return (
      <div style={chartStyle}>
        <Doughnut data={data} options={options}/>
        <p className="text-center">
          <h4>Click Python label to see other languages</h4>
        </p><br/><br/><br/>
      </div>
    )
  }

  sectionTitle(){
    return(
      <div className="row">
        <div className="col-lg-12 text-center">
            <h2 className="section-heading subpageHeading">Codes</h2>
            <h3 className="qwerqwer">
              Realtime Summary of &nbsp; 
              <a className="tempa" href="https://github.com/needleworm" target="_blank"  rel="noreferrer">
                My <i className="fab fa-github"></i> Github Account
                </a>
              </h3>
        </div>
      </div>
    )
  }

  drawProjects(){
    var pythonIcon = <i className="fab fa-python"></i>
    var reactIconL = <i className="fab fa-react"></i>
    var windowsIcon = <i className="fab fa-windows"></i>
    var jekyllIcon = <i className="fas fa-vial"></i>
    var jsIcon = <i className="fab fa-js-square"></i>
    var javaIcon = <i className="fab fa-java"></i>
    return <div className="projects">
      {this.drawSingleProject("bhban_RPA", edu, pythonIcon)}
      {this.drawSingleProject("automation_edu", edu, pythonIcon)}
      {this.drawSingleProject("post_crawler", python, pythonIcon)}
      {this.drawSingleProject("pywinmacro", exe, windowsIcon)}
      {this.drawSingleProject("fvs", science, pythonIcon)}
      {this.drawSingleProject("CoinAutoTrader", moneyauto, pythonIcon)}
      {this.drawSingleProject("brunch_thaad", python, pythonIcon)}
      {this.drawSingleProject("fmm_crawl", science, pythonIcon)}
      {this.drawSingleProject("pixabay_crawling", python, pythonIcon)}
      {this.drawSingleProject("img_crop_from_PDF", python, pythonIcon)}
      {this.drawSingleProject("pubmed_crawler", science, pythonIcon)}
      {this.drawSingleProject("chulsukbu", python, pythonIcon)}
      {this.drawSingleProject("CoinAutoTrader_Bithumb", moneyauto, pythonIcon)}
      {this.drawSingleProject("needleworm.github.io", reactIcon, reactIconL)}
      {this.drawSingleProject("nc2", science, pythonIcon)}
      {this.drawSingleProject("greenhouse_ai", science, pythonIcon)}
      {this.drawSingleProject("xlsx_sorter", python, pythonIcon)}
      {this.drawSingleProject("wordpuzzle", python, pythonIcon)}
      {this.drawSingleProject("xlsx_destroyer", python, pythonIcon)}
      {this.drawSingleProject("twitter_news_macro", python, pythonIcon)}
      {this.drawSingleProject("insta_like_by_graphic_recognition", python, pythonIcon)}
      {this.drawSingleProject("mlproject", tf, pythonIcon)}
      {this.drawSingleProject("breakout", tf, pythonIcon)}
      {this.drawSingleProject("yolotest", tfjs, jsIcon)}
      {this.drawSingleProject("base_sequence_analysis", science, pythonIcon)}
      {this.drawSingleProject("google_scholar_crawler", science, pythonIcon)}
      {this.drawSingleProject("pubmed_abstract_crawl", science, pythonIcon)}
      {this.drawSingleProject("bhban_ai", edu, pythonIcon)}
      {this.drawSingleProject("PubMed_Crawl_exe", exe, windowsIcon)}
      {this.drawSingleProject("bh_coefficient", science, pythonIcon)}
      {this.drawSingleProject("nutrient_solution", science, pythonIcon)}
      {this.drawSingleProject("ion_interference", science, pythonIcon)}
      {this.drawSingleProject("moneyauto", moneyauto, jekyllIcon)}
      {this.drawSingleProject("CoinAutoTrader_exe", moneyauto, windowsIcon)}
      {this.drawSingleProject("eliza", scala, javaIcon)}
      {this.drawSingleProject("mozza", cheese, pythonIcon)}
      {this.drawSingleProject("pizza", cheese, pythonIcon)}
      {this.drawSingleProject("cottoncandy", cheese, pythonIcon)}
      {this.drawSingleProject("coinone_Api_for_google_apps", js, jsIcon)}
    </div>
  }

  drawSingleProject(name, icon, languageIcon){
    console.log(this.state.repository[name])
    if (!this.state.repository[name]){
      return 
    }
    var project = <div className="singleProjectContainer">
      <div className="singleProjectCard">
        <a className="tempa" href={this.state.repository[name].url} target="_blank"  rel="noreferrer">
         <img className="projectImage" src={icon}  alt="projectimage"/>
        </a>
        <div className="projectText">
          <a href={this.state.repository[name].url} target="_blank"  rel="noreferrer">
            <h5>{name}</h5>
          </a>
          <div className="codeBody">
            <p className="bookDescription firstCommitDate">
              First Commit on {this.state.repository[name].createdAt.substring(0,10)}
            </p>
            <p className="bookDescription">{this.state.repository[name].description}</p>
            
          </div>
          <div className="projectIcons">
            <h5>{languageIcon}&nbsp; {this.state.repository[name].language}</h5>
            <div className="gitIcons">
              <a href={this.state.repository[name].url + '/watchers'} target="_blank"  rel="noreferrer">
                <i className="far fa-eye"></i> {this.state.repository[name].watch}
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href={this.state.repository[name].url + '/stargazers'} target="_blank"  rel="noreferrer">
                <i className="far fa-star"></i> {this.state.repository[name].stars}
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href={this.state.repository[name].url + '/network/members'} target="_blank"  rel="noreferrer">
                <i className="fas fa-code-branch"></i> {this.state.repository[name].forks}
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
        {this.drawGraph()}
        {this.drawProjects()}
      </div>
    )
  }

  render() {
    return (
      <section id="codes" className="animated slideInRight">
          {this.sectionTitle()}
          {this.drawCodes()}
      </section>
    );
  }
}
  
export default Codes;