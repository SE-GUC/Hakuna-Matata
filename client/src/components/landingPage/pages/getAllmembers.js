import React, { Component } from "react";
import axios from "axios";
import Members from '../Members';
// import { BrowserRouter as Router, Route } from "react-router-dom";

export class getAllmembers extends Component {
  state = {
    members: []
  };
  componentDidMount() {
    
    axios
      .get('http://localhost:3333/members')
      .then(res => {this.setState({ members: res.data.data })
      console.log(res.data.data)      
  }
      )

  }
  render() {
    return (
      <div className="getAllmembers">
        <Members
          members={this.state.members}
        />
        kllak
      </div>
    );
  }
}
export default getAllmembers;
