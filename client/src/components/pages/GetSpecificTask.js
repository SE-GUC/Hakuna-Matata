import React, { Component } from "react";
import axios from "axios";

export class GetSpecificTask extends Component {
    state = {
      task: null
    };
    componentDidMount() {
        const {id}=this.props.match.params
        axios
          .get(`http://localhost:3333/tasks/${id}`)
          .then(res => {
            this.setState({ task: res.data.data})
          }
            )
    }
    getData(){
      if(this.state.task != null){
        const {
            _id,
          description,
          requiredSkills,
          monetaryCompensation,
          deadline,
          deadlineForApply,
          uploadDate,
          submissionDate,
          experienceLevel,
          commitLevel,
          workCycle,
          linkOfTask,
          userRate,
          accepted,
          rate,
          consultyNeeded
        } = this.state.task;
      return <p> description: {description} , required skills: {requiredSkills} ,
      monetary compensation: {monetaryCompensation} , deadline:
      {deadline} , deadline for apply: {deadlineForApply} , upload date:
      {uploadDate}
      ,submission date: {submissionDate} , experience level:
      {experienceLevel}
      commitLevel: {commitLevel} , work cycle: {workCycle} , link of task:
      {linkOfTask}, user rate: {userRate} , accepted: {accepted} , rate:
      {rate}, consulty needed: {consultyNeeded}  </p>
    }else{
      return 'hello'
    }
    }
    render() {
      return (
        <div className="GetAllAgencies">
           {this.getData()} 
        </div>
      );
    }
  }
  export default GetSpecificTask;