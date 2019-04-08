import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Course extends Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted"
    };
  };

  render() {
    const {
      _id,
      name,
      educatorName,
      description,
      places,
      availablePlaces,
      payment,
      courseDuration,
      startDate,
      endDate,
      categories,
      available,
      listOfApplies,
      acceptedMembers
     
    } = this.props.course;
    return (
      <div style={this.getStyle()}>
        <p>
          name: {name} , educatorName: {educatorName} , description: {description} , places:
          {places} ,  availablePlaces: {availablePlaces} , payment: {payment} , courseDuration: {courseDuration} , 
          startDate: {startDate} , endDate: {endDate} , categories: {categories}
           ,available: {available} , listOfApplies: {listOfApplies} , acceptedMembers: {acceptedMembers} 
          <Link
            to={{
              pathname: `/educourse/${_id}`,//what
              state: {
                fromNotifications: true
              }
            }}
          >
            show Course////////////
          </Link>
        </p>
      </div>
    );
  }
}

const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  cursor: "pointer",
  float: "right"
};

export default Course;
