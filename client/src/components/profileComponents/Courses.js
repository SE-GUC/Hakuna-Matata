import React from 'react';
import Course from './Course';
class Courses extends React.Component {
  render() {
    return this.props.courses.map((course)=>(
    
<<<<<<< HEAD
      <Course key = {course._id} course= {course} educationalOrganizationId={this.props.educationalOrganizationId}/>
=======
      <Course key = {course._id} course= {course} educationalOrganization={this.props.educationalOrganization}/>
>>>>>>> master

    ));
  }
}

export default Courses;