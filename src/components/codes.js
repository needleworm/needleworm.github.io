import React, {Component} from 'react';
import './codes.css';
import { Doughnut } from 'react-chartjs-2'
import axios from 'axios'

class Codes extends Component {
  constructor(props){
    super(props);
    this.state = {
      repository: {}
    }
  }

  componentDidMount(){
    const response = axios.get('https://api.github.com/users/needleworm/repos')
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
        <p className="text-center">Click Python label to see other languages</p>
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

  drawSingleProject(name){
    var project = <div className="singleProjectContainer">
      <hr className="separator"/>
      
      test
    </div>

    return project
  }

  drawCodes(){
    return(
      <div className="codeContainer">
        {this.drawGraph()}
      </div>
    )
  }

  render() {
    return (
      <section id="codes">
          {this.sectionTitle()}
          {this.drawCodes()}
          {this.drawSingleProject("bhban_RPA")}
      </section>
    );
  }
}
  
export default Codes;