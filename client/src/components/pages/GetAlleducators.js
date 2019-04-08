import React, { Component } from "react";
import axios from "axios";
import Educators from '../Educators';
// import { BrowserRouter as Router, Route } from "react-router-dom";

export class GetAlleducators extends Component {
  state = {
    educators: []
  };
  componentDidMount() {
    axios
      .get('http://localhost:3333/educationalOrganizations/educator/5ca7c90dc9bb884720938e8b/')
      .then(res => this.setState({ educators: res.data }))
  }
  render() {
    return (
      <div className="GetAlleducators">
        <Educators
          educators={this.state.educators} 
        />
      </div>
    );
  }
}
export default GetAlleducators;

