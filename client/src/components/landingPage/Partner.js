import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Partner extends Component {
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
      partnerName,
      skills
    } = this.props.partner;
    console.log(partnerName)
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
        <t class="textcolor" > {partnerName}</t>
        </p>
        <p> </p>
        <t class="textcolor1" > {rskills}</t>
        <button style = {ButtonStyle} >visit</button>
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

export default Partner;
