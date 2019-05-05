import React, { Component } from "react";
import axios from "axios";
import ConsultancyAgencies from '../ConsultancyAgencies';
// import { BrowserRouter as Router, Route } from "react-router-dom";

export class GetAllAgencies extends Component {
  state = {
    consultancyAgencies: []
  };
  componentDidMount() {
    axios
      .get('http://localhost:3333/consultancyAgencies')
      .then(res => this.setState({ consultancyAgencies: res.data.data }))
  }
  render() {
    return (
      <div className="GetAllAgencies">
        <ConsultancyAgencies
          consultancyAgencies={this.state.consultancyAgencies}
        />
      </div>
    );
  }
}
export default GetAllAgencies;
