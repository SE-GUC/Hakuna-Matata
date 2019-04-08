import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Certificate extends Component {
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
      name
    } = this.props.certificate;
    return (
      <div style={this.getStyle()}>
        <p>
          name: {name} 
          {" "}
          <Link
            to={{
              pathname: `/certificate/${_id}`,
              state: {
                fromNotifications: true
              }
            }}
          >
            show certificate
          </Link>
        </p>
      </div>
    );
  }
}


export default Certificate;
