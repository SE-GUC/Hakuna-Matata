import React, { Component } from "react";
import {Link} from 'react-router-dom'
class SecondComponent extends Component {
  state = {
    task: this.props.task,
  };
  checkConsultancy(){
    console.log(this.state.task)
    if(this.state.task.taskConsultancyAgency){
      return <div>
      <p>Consultancy Agency: <Link to={`/users/${this.state.task.taskConsultancyAgency.id}`} style={{ color: "black" }}>{this.state.task.taskConsultancyAgency.name}</Link> </p> 
      </div>
    }
    else{
      return 
    }
  }
  checkDeadlineForApply(){

    if(this.state.task.deadlineForApply){
      return <div>
      <p>Upload Date: {this.state.task.deadlineForApply} </p> 
      </div>
    }
    else{
      return 
    }
  }
  checkUploadDate(){
    if(this.state.task.uploadDate){
      return <div>
      <p>Upload Date: {this.state.task.uploadDate} </p> 
      </div>
    }
    else{
      return 
    }
  }
  checkSubmissionDate(){
    if(this.state.task.submissionDate){
      return <div>
      <p>Upload Date: {this.state.task.submissionDate} </p> 
      </div>
    }
    else{
      return 
    }
  }
  checkExperienceLevel(){
    if(this.state.task.experienceLevel){
      return <div>
      <p>Upload Date: {this.state.task.experienceLevel} </p> 
      </div>
    }
    else{
      return 
    }
  }
  checkMember(){

    if(this.state.task.taskMember){
      return <div>
      <p>Task Member: <Link to={`/users/${this.state.task.taskMember.id}`} style={{ color: "black" }}>{this.state.task.taskMember.name}</Link> </p> 
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
        <p>name: {this.state.task.name}</p>
        {this.checkConsultancy()}
        {this.checkDeadlineForApply()}
        {this.checkUploadDate()}
        {this.checkSubmissionDate()}
        {this.checkExperienceLevel()}
        {this.checkMember()}
        <p>Description: {this.state.task.description}</p>
        <p>Consulty needed: {this.state.task.consultyNeeded==true?'Yes':'No'}</p>
        <p>Deadline: {this.state.task.deadline}</p>
        <p>Commitment Level: {this.state.task.commitLevel}</p>
        <p>Experience Level: {this.state.task.experienceLevel}</p>
        <p>Monetary Compensation: {this.state.task.monetaryCompensation}</p>
      </div>
    );
  }
}

export default SecondComponent;
