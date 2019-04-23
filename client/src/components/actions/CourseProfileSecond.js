import React, { Component } from "react";
import {Link} from 'react-router-dom'
class SecondComponent extends Component {
  state = {
    course: this.props.course,
  };
  
  render() {
    return (
      <div  style={{ display: '-ms-flexbox',
      msFlexWrap: 'wrap',
      flexWrap: 'wrap',
      background: "white",
      }}>
        <p>name: {this.state.course.name}</p>
        <p> description: {this.state.course.description}</p>
      <p> places: {this.state.course.places} </p>
      <p > availablePlaces:{this.state.course.availablePlaces} </p>
      <p>payment: {this.state.course.payment}</p>
      <p> courseDuration: {this.state.course.courseDuration} </p>
      <p> startDate: {this.state.course.startDate}</p>
      <p > endDate: {this.state.course.endDate} </p>
      <p > category: {this.state.course.category} </p>
      <p > educator: {this.state.course.educator.name} </p>
     
      </div>
    );
  }
}

export default SecondComponent;
