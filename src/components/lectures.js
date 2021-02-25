import React, {Component} from 'react';


class Legtures extends Component {
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
        Legtures
      </div>
    );
  }
}
  
export default Legtures;