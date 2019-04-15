import React, { Component } from "react";
import './Task.css'
import { Link } from "react-router-dom";

export class Task extends Component {
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
      name,
      requiredSkills
    } = this.props.task;
    
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
    
for(let i=0 ; i<requiredSkills.length ; i++ ){
      rskills += requiredSkills[i].name 
    if((i+1)<requiredSkills.length){
      rskills += " | "
    }
    }

    return (
      
      
      <div style={this.getStyle()}>
      
        <p> 
        <t class="textcolor" > {name}</t>
        <p> </p>
        <t class="textcolor1" > {rskills}</t>
        <p> </p>
        
        <Link style = {ButtonStyle} to={"/task/"+_id}><button className="btn btn-danger btn-sm m-2" style = {ButtonStyle}  >visit</button></Link>
        <button style = {ButtonStyle} >apply</button>
        </p>
      </div>
      
    );
  }
}

export default Task;
