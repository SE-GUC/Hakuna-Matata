import React from 'react';
import Course from './Course';
class Courses extends React.Component {
  render() {
    return this.props.courses.map((course)=>(
    
      <Course key = {course._id} course= {course} educationalOrganization={this.props.educationalOrganization}/>

    ));
  }
}

export default Courses;