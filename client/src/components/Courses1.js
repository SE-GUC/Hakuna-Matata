import React, { Component } from 'react';
import Course from './Course1';

class Courses extends Component {
  render() {
    return (this.props.courses.map((course) => (
      <Course key={course._id} course={course} />
    ))
    )
  }
}


export default Courses;