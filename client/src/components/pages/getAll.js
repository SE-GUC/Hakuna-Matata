import React, { Component } from "react";
import axios from "axios";
import CoWorkingSpaces from '../CoWorkingSpaces';
// import { BrowserRouter as Router, Route } from "react-router-dom";

export class GetAll extends Component {
  state = {
    coWorkingSpaces: []
  };
  componentDidMount() {
    axios
      .get('http://localhost:3333/coworkingSpaces')
      .then(res => this.setState({ coWorkingSpaces: res.data }))
  }
  render() {
    return (
      <div className="GetAll">
         <h1>MY CoWorkingSpaces Names</h1>
     
        <CoWorkingSpaces
          coWorkingSpaces={this.state.coWorkingSpaces} 
        />
      </div>
    );
  }
}
export default GetAll;
