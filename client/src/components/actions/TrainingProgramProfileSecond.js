import React, { Component } from "react";
import {Link} from 'react-router-dom'
class SecondComponent extends Component {
  state = {
      trainingProgram: this.props.  trainingProgram,
  };
  
  render() {
    return (
      <div  style={{ display: '-ms-flexbox',
      msFlexWrap: 'wrap',
      flexWrap: 'wrap',
      background: "white",
      }}>
        <p>name: {this.state.  trainingProgram.name}</p>
        <p> description: {this.state.  trainingProgram.description}</p>
      <p> type: {this.state.  trainingProgram.type} </p>
      <p > duration:{this.state.  trainingProgram.duration} </p>
      <p>applyDueDate: {this.state.  trainingProgram.applyDueDate}</p>
      <p>   startDate: {this.state.  trainingProgram.startDate} </p>
      </div>
    );
  }
}

export default SecondComponent;
