import React, { Component } from 'react';
import CourseToShow from './CourseToShow'

class CoursesToShow extends Component {
  render() {
    return (this.props.coursesToShow.map((courseToShow) => (
      <CourseToShow key={courseToShow._id} courseToShow={courseToShow} />
    ))
    )
  }
}


export default CoursesToShow;