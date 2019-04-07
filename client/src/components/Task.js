import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Task extends Component {
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
      description,
      requiredSkills,
      monetaryCompensation
    } = this.props.task;
    return (
      <div style={this.getStyle()}>
        <p>
          description: {description} , required skills: {requiredSkills} ,
          monetary compensation: {monetaryCompensation} 
          {" "}
          <Link
            to={{
              pathname: `/tasks/${_id}`,
              state: {
                fromNotifications: true
              }
            }}
          >
            show task
          </Link>
        </p>
      </div>
    );
  }
}

export default Task;
