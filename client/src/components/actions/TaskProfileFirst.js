import React, { Component } from "react";
import { Image, Row } from "react-bootstrap";
import { BrowserRouter as Route,Redirect,Link } from "react-router-dom";
import "./FirstComponent.css";
var store = require('store')
class FirstComponent extends Component {
  state={
    Redirect:false
  }
  get() {
    if(store.get('payload').tags.includes('Partner')&&store.get('payload').id==this.props.task.taskPartner.id){
      return <div style={{ position: "absolute", left: "90%", width: 250 }}>
      <Row>
      <Link to={`/updateTask/${this.props.task._id}` }><button  style={{backgroundColor:'transparent',border:'none'}}><img src={require("../../assessments/images.jpeg")} width="30px"
            height="30px"/></button>
            <button  style={btnStyle}>x</button></Link>
      </Row>
    </div>
    } else {
      return 
    }
  }
  render() {
    return (
      <div style={{ display: '-ms-flexbox',
        display: 'flex',
        msFlexWrap: 'wrap',
        flexWrap: 'wrap',
        background: "white" ,
        }}>
        <div>
          <Image
            src={require("../../assessments/man.jpg")}
            width="100px"
            height="100px"
            roundedCircle
          />
        </div>
        <div>
          <Link to={`/users/${this.props.id}`} style={{ color: "black" }}>
            {this.props.name}
          </Link>
          <p >{this.props.date}</p>
        </div>
        {this.get()}
      </div>
    );
  }
}
const btnStyle = {
  color: '#ff0000',
  border: 'none',
  fontSize:'1.5em',
  padding: '3px 9px',
  borderRadius: '100%',
  textAlign:'center',
  float: 'right'
}

export default FirstComponent;
