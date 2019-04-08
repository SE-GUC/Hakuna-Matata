import React, { Component } from "react";
import axios from "axios";
import Certificates from '../Certificates';

// import { BrowserRouter as Router, Route } from "react-router-dom";

export class GetAllcertificates extends Component {
  state = {
    certificates: []
  };
  componentDidMount() {
    axios
      .get('http://localhost:3333/educationalOrganizations/certificate/5ca8020ecb0949439c94d03a/')
      .then(res => this.setState({ certificates: res.data }))
  }
  render() {
    return (
      <div className="GetAllcertificates">
        <Certificates
          certificates={this.state.certificates} 
        />
      </div>
    );
  }
}
export default GetAllcertificates;

