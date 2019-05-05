import React, { Component } from "react";
import './Taskp.css'
export class Taskp extends Component {
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
    } = this.props.task;

    const ButotnStyle = {
      backgroundColor:'#242424',
      color :'white',
      testAlign:'center',
      pading:'15px 32px',
      borderRadius:'12px',
      float :'right',
      fontSize:'12px',
      hight:'30px',
      width:'70px'
  
  }
    return (
      <div>
        <p>
        
           {name}
          {" "}
          <button style = {ButotnStyle} >visit</button>
        </p>
      </div>
    );
          
  }
}


export default Taskp;
