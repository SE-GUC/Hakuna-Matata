import React, { Component } from "react";
import axios from "axios";
import EducationalOrganizations from '../EducationalOrganizations';
// import { BrowserRouter as Router, Route } from "react-router-dom";

export class GetAllEducations extends Component {
  state = {
    EducationalOrganizations: []
  };
  componentDidMount() {
    axios
      .get('http://localhost:3333/educationalOrganizations')
      .then(res => this.setState({ EducationalOrganizations: res.data.data }))
  }
  render() {
    return (
      <div className="GetAllEducations">
        <EducationalOrganizations
          EducationalOrganizations={this.state.EducationalOrganizations}
        />
      </div>
    );
  }
}
export default GetAllEducations;
