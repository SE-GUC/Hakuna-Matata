import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TaskMembers.css";
var store = require("store");
export class ConsultancyAgencyMembers extends Component {
  async handleClick() {
    if(this.props.bool){
    const id = this.props.task._id;
    console.log(this.props.member.id);
    console.log(this.props.task.projectPartner.id);
    const data = {
      memberId: this.props.member.id,
      ownerId: this.props.task.projectPartner.id
    };
    console.log(data);
    await axios.put(
      `http://localhost:3333/projects/assignMemberToProject/${id}`,
      data
    );}
    
    else{
      const id = this.props.task._id;
    console.log(this.props.member.id);
    console.log(this.props.task.taskPartner.id);
    const data = {
      memberId: this.props.member.id,
      ownerId: this.props.task.taskPartner.id
    };
    console.log(data);
    await axios.put(
      `http://localhost:3333/tasks/assignMemberToTask/${id}`,
      data
    );
    }
  }
  getMembers() {
    console.log( this.props.task)

    if(this.props.bool){
    if ( store.get("payload").tags.includes("Partner") && store.get("payload").id == this.props.task.projectPartner.id) {
      return (
        <div>
          <Link
            to={`/users/${this.props.member.id}`}
            style={{ color: "black" }}
          >
            {this.props.member.name}
          </Link>
          <button className="Btn" onClick={this.handleClick.bind(this)}>
              Accept
          </button>
        </div>
      );
    } else {
      return (
        <Link to={`/user/${this.props.member.id}`} style={{ color: "black" }}>
          {this.props.member.name}
        </Link>
      );
    }}else{
      if ( store.get("payload").tags.includes("Partner") && store.get("payload").id == this.props.task.taskPartner.id
      ) {
        return (
          <div>
            <Link
              to={`/user/${this.props.member.id}`}
              style={{ color: "black" }}
            >
              {this.props.member.name}
            </Link>
            <button className="Btn" onClick={this.handleClick.bind(this)}>
                Accept
            </button>
          </div>
        );
      } else {
        return (
          <Link to={`/user/${this.props.member.id}`} style={{ color: "black" }}>
            {this.props.member.name}
          </Link>
        );
      }

    }
  }
  render() {
    return <div style={{ background: "white" }}>{this.getMembers()}</div>;
  }
}

export default ConsultancyAgencyMembers;
