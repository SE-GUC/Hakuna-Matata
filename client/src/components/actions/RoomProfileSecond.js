import React, { Component } from "react";
import {Link} from 'react-router-dom'
class SecondComponent extends Component {
  state = {
     room: this.props. room,
  };
  
  render() {
    return (
      <div  style={{ display: '-ms-flexbox',
      msFlexWrap: 'wrap',
      flexWrap: 'wrap',
      background: "white",
      }}>
        <p>capacity: {this.state. room.capacity}</p>
     
      </div>
    );
  }
}

export default SecondComponent;
