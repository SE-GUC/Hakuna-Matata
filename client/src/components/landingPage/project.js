import React, { Component } from "react";
import './project.css'
import { Link } from "react-router-dom";

export class project extends Component {
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
      name
    } = this.props.project;
    
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
        <t class="textcolor" > {name}</t>
        <p> </p>
        <button style = {ButtonStyle} >visit</button>
        </p>
      </div>
    );
  }
}

export default project;
