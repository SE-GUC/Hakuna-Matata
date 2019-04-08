import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Educator extends Component {
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
    
    } = this.props.educator;
    return (
      <div style={this.getStyle()}>
        <p>
          name: {name} 
          {" "}
          <Link
            to={{
              pathname: `/educator/${_id}`,
              state: {
                fromNotifications: true
              }
            }}
          >
            show educators
          </Link>
        </p>
      </div>
    );
  }
}


export default Educator;
