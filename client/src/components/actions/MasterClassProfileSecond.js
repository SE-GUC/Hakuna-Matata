import React, { Component } from "react";
import {Link} from 'react-router-dom'
class SecondComponent extends Component {
  state = {
     masterClass: this.props. masterClass,
  };
  
  render() {
    return (
      <div  style={{ display: '-ms-flexbox',
      msFlexWrap: 'wrap',
      flexWrap: 'wrap',
      background: "white",
      }}>
        <p>name: {this.state. masterClass.name}</p>
        <p> description: {this.state. masterClass.description}</p>
      <p> places: {this.state. masterClass.places} </p>
      <p > availablePlaces:{this.state. masterClass.availablePlaces} </p>
      <p>payment: {this.state. masterClass.payment}</p>
      <p>  masterClassDuration: {this.state. masterClass.MasterClassDuration} </p>
      <p> startDate: {this.state. masterClass.startDate}</p>
      <p > endDate: {this.state. masterClass.endDate} </p>
      <p > levelOfStudents: {this.state. masterClass.levelOfStudents} </p>
      <p > effort: {this.state. masterClass.effort} </p>
     
      </div>
    );
  }
}

export default SecondComponent;
