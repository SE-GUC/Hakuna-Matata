import React, { Component } from 'react';
import EducationalOrganization from './EducationalOrganization'
class EducationalOrganizations extends Component{
    render() {
        return this.props.educationalOrganizations.map((educationalorganization) =>(
          //<h3>{ todo.title }</h3>
          <EducationalOrganization key ={educationalorganization._id} educationalorganization={educationalorganization} />
         ));
       }
     
}
export default EducationalOrganizations