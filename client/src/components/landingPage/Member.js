import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Member extends Component {
  getStyle = () => {
    return {
      background:  "#15161a",
      padding: "5px" ,
      borderBottom: "1px #ccc dotted" ,
      border : "thin solid #FFFFFF" ,
      borderRadius : 25 ,
  
    };
  };

  render() {
    const {
      _id,
      memberFullName,
      skills
    } = this.props.member;
    const ButtonStyle = {
      backgroundColor:"#f9bb32",
      color :'black',
      testAlign:'right',
      pading:'15px 32px',
      borderRadius:'12px',
      float :'right',
      fontSize:'12px',
      hight:'30px',
      width:'70px'
  
  }
  let rskills ="";
    if(skills != null){
for(let i=0 ; i<skills.length ; i++ ){
      rskills += skills[i].name
    if((i+1)<skills.length){
      rskills += " | "
    }
    }}
    return (
      <div style={this.getStyle()}>
        <p>
        <t class="textcolor" > {memberFullName}</t>
        <p>
          </p>
        <t class="textcolor1" > {rskills}</t>

        </p>
        <p> </p>
        <Link style = {ButtonStyle} to={"/member/"+_id}><button className="btn btn-danger btn-sm m-2" style = {ButtonStyle}  >visit</button></Link>
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

export default Member;
