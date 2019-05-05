import React, { Component } from "react";
import { Link } from "react-router-dom";

export class EducationalOrganization extends Component {
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
      
    } = this.props.educationalorganization;
    return (
      <div style={this.getStyle()}>
        <p>
          name: {name} 
          <Link
            to={{
              pathname: `/educationalOrganizations/${_id}`,
              state: {
                fromNotifications: true
              }
            }}
          >
show Educational educationalOrganization
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

export default EducationalOrganization;