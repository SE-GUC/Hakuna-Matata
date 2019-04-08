import React, { Component } from "react";
import axios from "axios";
import Courses from '../Courses1';
// import { BrowserRouter as Router, Route } from "react-router-dom";

export class GetAllCourses1 extends Component {
  state = {
    courses: []
  };
  componentDidMount() {
    axios
      .get('http://localhost:3333/educationalOrganizations/course/5ca89160d7a22338e473abbf/')
      .then(res => this.setState({ courses: res.data}))
  }
  render() {
    return (
      <div className="GetAllCourses1">
        <Courses
          courses={this.state.courses} 
        />
      </div>
    );
  }
}
export default GetAllCourses1;