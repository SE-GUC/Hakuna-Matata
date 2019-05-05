import React, { Component } from "react";
import { Link } from "react-router-dom";

export class consultancyAgency extends Component {
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
      rate,
      information
    } = this.props.consultancyAgency;
    return (
      <div style={this.getStyle()}>
        <p>
          name: {name} , rate: {rate} , information: {information} 
          <Link
            to={{
              pathname: `/consultancyAgencies/${_id}`,
              state: {
                fromNotifications: true
              }
            }}
          >
            show agency
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

export default consultancyAgency;
