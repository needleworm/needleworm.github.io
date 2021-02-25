import React, {Component} from 'react';


class News extends Component {
  constructor(props){
    super(props)
    this.state={
      id: "",
      ps: "",
    }
  }

  render() {
    return (
      <div className="animated slideInRight">
        News
      </div>
    );
  }
}
  
export default News;