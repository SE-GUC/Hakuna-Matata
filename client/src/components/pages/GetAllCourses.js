import React, { Component } from "react";
import axios from "axios";
import CoursesToShow from '../CoursesToShow';
// import { BrowserRouter as Router, Route } from "react-router-dom";

export class GetAllCourses extends Component {
  state = {
    coursesToShow: []
  };
  componentDidMount() {
    axios
      .get(`http://localhost:3333/courses/`)
      .then(res => this.setState({ coursesToShow: res.data.data }))
  }
  render() {
    return (
      <div className="GetAllCourses">
        <CoursesToShow
          coursesToShow={this.state.coursesToShow} 
        />
      </div>
    );
  }
}
export default GetAllCourses;