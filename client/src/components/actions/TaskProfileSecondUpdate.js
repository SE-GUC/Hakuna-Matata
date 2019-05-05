import React, { Component } from "react";
import { Row } from "react-bootstrap";
import {Form , Button,Image} from 'react-bootstrap'
import { BrowserRouter as Router, Route,Redirect } from 'react-router-dom';
import '../../bootstrap.css'

class SecondComponent extends Component {
    constructor(props){
        super(props)
    this.state = {
    task: this.props.task,
  };

}
  render() {
    return (
      <div  style={{ display: '-ms-flexbox',
      msFlexWrap: 'wrap',
      flexWrap: 'wrap',
      background: "white",
      }}>
        <p>name: <Form.Control type='text' placeholder={this.state.task.name} name="name"style={{
       backgroundColor:'transparent'}}  onChange={this.props.onChange} value={this.props.name}  /></p>
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
