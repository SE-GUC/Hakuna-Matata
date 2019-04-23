import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TaskMembers.css";
var store = require("store");
export class AcceptedCourse extends Component {
  
  render() {
   console.log(this.props.accepted)
   return <div style={{ background: "white" }}><div>
    <Link
      to={`/users/${this.props.accepted.id}`}
      style={{ color: "black" }}
    >
      {this.props.accepted.name}
    </Link>
  </div>
</div>
  }
}

export default AcceptedCourse;
