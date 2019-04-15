import React from 'react';
import Course from './Course';
class Courses extends React.Component {
  render() {
    return this.props.courses.map((course)=>(
    
      <Course key = {course._id} course= {course} educationalOrganizationId={this.props.educationalOrganizationId}/>

    ));
  }
}

export default Courses;