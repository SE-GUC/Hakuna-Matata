import React, { Component } from "react";
import { Row, Button} from "react-bootstrap";
import './ThirdComponent.css'
import { BrowserRouter as Route,Redirect } from 'react-router-dom';
import axios from "axios";
var store = require("store");
class ThirdComponent extends Component {
  state={
    redirectEvent:false,
    redirectReport:false,
    redirectProject:false,
    redirectTask:false,
  }
  firstHandleClick(){
    if (this.props.type==='Task') {
      const data={
        taskId:this.props.id,
      }
      console.log(data.taskId)
       axios.put(`http://localhost:3333/members/applyForTask/${store.get("payload").id}`,data)
    }
    else if(this.props.type==='Project'){
      const data={
        projectId:this.props.id,
      }
       axios.put(`http://localhost:3333/members/applyForProject/${this.props.memberId}`,data)
    }
  }
  secondHandleClick(){
    if(this.props.type==='Project'){
      this.setState({redirectProject:true})
    }
    if(this.props.type==='Task'){
      this.setState({redirectTask:true})
    }
  }
  get() {
    if (this.props.type==='Task'||this.props.type==='Project') {
      return {first:'Apply',second:'View'};
    } 
    else if(this.props.type==='Post'|| this.props.type==='CourseRequest'){
      return {first:'Like',second:'Comment'};
    }
  }
    render() {
      const x=this.get()
      if(this.state.redirectProject){
        return  <Redirect  to={`projects/${this.props.id}`} />
      }
      if(this.state.redirectTask){
        return <div> <Route path="tasks" />
        <Redirect  to={`tasks/${this.props.id}`} /></div>
      }
      return (
        <Row style={{border: '1px solid grey',background:'white'}}>
        <Button bsPrefix='Button' onClick={this.firstHandleClick.bind(this)} >
          {x.first}
        </Button>
        <Button bsPrefix='Button' onClick={this.secondHandleClick.bind(this)}>
          {x.second}
        </Button>
        </Row>
      )
    }
}

export default ThirdComponent;