import React, { Component } from "react";
import {Link} from 'react-router-dom'
class SecondComponent extends Component {
  state = {
    project: this.props.project,
  };
  checkConsultancy(){
    if(this.state.project.consultancyAgency){
      return <div>
      <p>Consultancy Agency: <Link to={`/users/${this.state.project.consultancyAgency.id}`} style={{ color: "black" }}>{this.state.project.consultancyAgency.name}</Link> </p> 
      </div>
    }
    else{
      return 
    }
  }
  checkDeadlineForApply(){
    if(this.state.project.deadlineForApply){
      return <div>
      <p>Upload Date: {this.state.project.deadlineForApply} </p> 
      </div>
    }
    else{
      return 
    }
  }
  checkUploadDate(){
    if(this.state.project.uploadDate){
      return <div>
      <p>Upload Date: {this.state.project.uploadDate} </p> 
      </div>
    }
    else{
      return 
    }
  }
  checkSubmissionDate(){
    if(this.state.project.submissionDate){
      return <div>
      <p>Upload Date: {this.state.project.submissionDate} </p> 
      </div>
    }
    else{
      return 
    }
  }
  checkExperienceLevel(){
    if(this.state.project.experienceLevel){
      return <div>
      <p>Upload Date: {this.state.project.experienceLevel} </p> 
      </div>
    }
    else{
      return 
    }
  }
  checkMember(){

    if(this.state.project.projectMember){
      return <div>
      <p>Project Member: <Link to={`/users/${this.state.project.projectMember.id}`} style={{ color: "black" }}>{this.state.project.projectMember.name}</Link> </p> 
      </div>
    }
    else{
      return  
  }
  }
  render() {
    return (
      <div  style={{ display: '-ms-flexbox',
      msFlexWrap: 'wrap',
      flexWrap: 'wrap',
      background: "white",
      }}>
        <p>name: {this.state.project.name}</p>
        {this.checkConsultancy()}
        {this.checkDeadlineForApply()}
        {this.checkUploadDate()}
        {this.checkSubmissionDate()}
        {this.checkExperienceLevel()}
        {this.checkMember()}
        
        <p>Description: {this.state.project.description}</p>
        <p>Consulty needed: {this.state.project.consultyNeeded==true?'Yes':'No'}</p>
        <p>Deadline: {this.state.project.deadline}</p>
        <p>Commitment Level: {this.state.project.commitLevel}</p>
        <p>Experience Level: {this.state.project.experienceLevel}</p>
        <p>Monetary Compensation: {this.state.project.monetaryCompensation}</p>
      </div>
    );
  }
}

export default SecondComponent;
