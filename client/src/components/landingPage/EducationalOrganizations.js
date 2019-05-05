import React, { Component } from 'react';
import EducationalOrganization from './EducationalOrganization'
class EducationalOrganizations extends Component{
    get() {
        return ( this.props.EducationalOrganizations.map((educationalorganization) =>(
          <EducationalOrganization key ={educationalorganization._id} educationalorganization={educationalorganization} />
         )));
       }
       render(){
        return(
          <div className="grid-container">
          { this.get()}
          </div>
          )
      }
     
}
export default EducationalOrganizations