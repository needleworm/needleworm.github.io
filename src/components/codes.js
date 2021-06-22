import React, {Component} from 'react';
import './codes.css';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';


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
      maxWidth:'800px',
      marginLeft:'auto',
      marginRight:'auto',
    }

    return (
      <div style={chartStyle}>
        <Doughnut data={data} options={options}/>
        <p className="text-center">
          <h4>Click &nbsp;<i className="fab fa-python"></i>&nbsp;Python label to see other languages</h4>
        </p><br/><br/><br/>
      </div>
    )
  }

  sectionTitle(){
    return(
      <div className="row">
        <div className="col-lg-12 text-center">
            <h2 className="section-heading subpageHeading">Codes</h2>
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
        
    <div className="col-lg-12 text-center">
        <h3 className="qwerqwer">
          Realtime Summary of &nbsp; 
          <a className="tempa" href="https://github.com/needleworm" target="_blank"  rel="noreferrer">
            My <i className="fab fa-github"></i> Github Account
            </a>
          </h3>
    </div>
      {this.drawSingleProject("bhban_rpa", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/edu.jpg", pythonIcon)}
      {this.drawSingleProject("bhban_ai", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/edu.jpg", pythonIcon)}
      {this.drawSingleProject("automation_edu", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/edu.jpg", pythonIcon)}
      {this.drawSingleProject("post_crawler", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/python.jpg", pythonIcon)}
      {this.drawSingleProject("pywinmacro", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/exe.jpg", windowsIcon)}
      {this.drawSingleProject("fvs", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/science.jpg", pythonIcon)}
      {this.drawSingleProject("CoinAutoTrader", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/moneyauto.jpg", pythonIcon)}
      {this.drawSingleProject("brunch_thaad", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/python.jpg", pythonIcon)}
      {this.drawSingleProject("fmm_crawl", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/science.jpg", pythonIcon)}
      {this.drawSingleProject("pixabay_crawling", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/python.jpg", pythonIcon)}
      {this.drawSingleProject("img_crop_from_PDF", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/python.jpg", pythonIcon)}
      {this.drawSingleProject("pubmed_crawler", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/science.jpg", pythonIcon)}
      {this.drawSingleProject("chulsukbu", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/python.jpg", pythonIcon)}
      {this.drawSingleProject("CoinAutoTrader_Bithumb", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/moneyauto.jpg", pythonIcon)}
      {this.drawSingleProject("needleworm.github.io", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/react.jpg", reactIconL)}
      {this.drawSingleProject("nc2", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/science.jpg", pythonIcon)}
      {this.drawSingleProject("greenhouse_ai", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/science.jpg", pythonIcon)}
      {this.drawSingleProject("xlsx_sorter", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/python.jpg", pythonIcon)}
      {this.drawSingleProject("wordpuzzle", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/python.jpg", pythonIcon)}
      {this.drawSingleProject("xlsx_destroyer", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/python.jpg", pythonIcon)}
      {this.drawSingleProject("twitter_news_macro", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/python.jpg", pythonIcon)}
      {this.drawSingleProject("insta_like_by_graphic_recognition", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/python.jpg", pythonIcon)}
      {this.drawSingleProject("mlproject", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/tf.jpg", pythonIcon)}
      {this.drawSingleProject("breakout", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/tf.jpg", pythonIcon)}
      {this.drawSingleProject("yolotest", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/tfjs.jpg", jsIcon)}
      {this.drawSingleProject("base_sequence_analysis", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/science.jpg", pythonIcon)}
      {this.drawSingleProject("google_scholar_crawler", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/science.jpg", pythonIcon)}
      {this.drawSingleProject("pubmed_abstract_crawl", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/science.jpg", pythonIcon)}
      {this.drawSingleProject("PubMed_Crawl_exe", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/exe.jpg", windowsIcon)}
      {this.drawSingleProject("bh_coefficient", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/science.jpg", pythonIcon)}
      {this.drawSingleProject("nutrient_solution", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/science.jpg", pythonIcon)}
      {this.drawSingleProject("ion_interference", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/science.jpg", pythonIcon)}
      {this.drawSingleProject("moneyauto", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/moneyauto.jpg", jekyllIcon)}
      {this.drawSingleProject("CoinAutoTrader_exe", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/moneyauto.jpg", windowsIcon)}
      {this.drawSingleProject("eliza", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/scala.jpg", javaIcon)}
      {this.drawSingleProject("mozza", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/cheese.jpg", pythonIcon)}
      {this.drawSingleProject("pizza", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/cheese.jpg", pythonIcon)}
      {this.drawSingleProject("cottoncandy", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/cheese.jpg", pythonIcon)}
      {this.drawSingleProject("coinone_Api_for_google_apps", "https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io/src/images/codes/js.jpg", jsIcon)}
    </div>
  }

  drawSingleProject(name, icon, languageIcon){
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
      <section id="codes" className="animated bounceInDown">
          {this.sectionTitle()}
          {this.drawCodes()}
      </section>
    );
  }
}
  
export default Codes;