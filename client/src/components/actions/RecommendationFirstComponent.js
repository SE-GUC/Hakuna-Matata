import React, { Component } from "react";
import { Image} from "react-bootstrap";
 import "./FirstComponent.css";
class PostFirstComponent extends Component {
  render() {
    return (
      
        <div className="image" style={{background:'#e5e8e8',textAlign:'left'}} >
          <Image src={require("../../assessments/man.jpg")} width="100px" height="100px"  roundedCircle />
        </div>
    );
  }
}

export default PostFirstComponent;
