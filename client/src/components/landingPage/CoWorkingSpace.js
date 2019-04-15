import React, { Component } from "react";
import './edu.css'
import { Link } from "react-router-dom";

export class CoWorkingSpace extends Component {
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
      coworkingSpaceName,
      
    } = this.props.coWorkingSpace;
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
    return (
      <div style={this.getStyle()}>
        <p>
        <t class="textcolor" > {coworkingSpaceName}</t>
        </p>
        <p> </p>
        <Link style = {ButtonStyle} to={"/coWorkingSpaces/"+_id}><button className="btn btn-danger btn-sm m-2" style = {ButtonStyle}  >visit</button></Link>
     
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

export default CoWorkingSpace;