import React, { Component } from "react";
import FirstComponent from "./CourseProfileFirst";
import SecondComponent from "./CourseProfileSecond";
import Member from './TaskMembers'
import Consultancy from './Consultancy'
import Skill from "./Skill";
import { Container, Col } from "react-bootstrap";
import axios from "axios";
import { Button } from "@material-ui/core";
import './TaskProfile.css'
import AppliedUser from './AppliedCourse.js'
import AcceptedUser from './AcceptedCourse.js'

var store = require("store");
class Card extends Component {
    state = {
        course:null,
        Applied:[],
        Accepted:[],
        educationalOrganizationId:null
    };
    
        async handleClick() {
        
        const {id,courseId}=this.props.match.params
       
        const handle = store.get('payload').id
        const data = {
          courseId: courseId,
        };
        await axios.put(`http://localhost:3333/members/applyForCourse/${handle}`, data).catch(e => {
            alert(e)
          }).then(alert('Done: '));
        window.location.reload(); 
    }
   
        componentDidMount() {
        const {id,courseId}=this.props.match.params
        this.setState({educationalOrganizationId:id})

            axios
          .get(`http://localhost:3333/educationalOrganizations/course/${id}/${courseId}`)
          .then(res => {
            this.setState({ course: res.data,
                Applied:res.data.listOfApplied,
                Accepted:res.data.listOfAccepted,
                name:res.data.name,
                
            })
           console.log(res.data)
          }
          
            )
           
    };
    GetAppliedUser(){
        console.log(this.state.Applied)
        return this.state.Applied.map((apply)=>(
    
            <AppliedUser  apply= {apply}
            course={this.state.course}
            id={this.state.educationalOrganizationId} />))
    }
    GetAcceptedUser(){
        return this.state.Accepted.map((accepted)=>(
          
            <AcceptedUser  accepted= {accepted}
            course={this.state.course}
            id={this.state.id}
            />))
    
    }
 
  render() {
    if (this.state.course) {
      return (
        <Container>
          <Col style={{minHeight:'100vh',background:'white'}}md={{ span: 8, offset: 2 }}>
              <FirstComponent
                course={this.state.course}
                id={this.state.educationalOrganizationId}
              />
              <hr></hr>
              <h5>General Informations</h5>
                <SecondComponent
                  course={this.state.course}
                />
                <hr></hr>
                <h5>Applied Members</h5>
                {this.GetAppliedUser()}
                <hr></hr>
                <h5>Accepted Members</h5>
                {this.GetAcceptedUser()}
                <hr></hr>
                
              <hr></hr>
              <Button style={{width:'100%',textTransform:'lowercase'}} onClick={this.handleClick.bind(this)} class='Btn'>Apply</Button>
              
          </Col>
        </Container>
      );
    } else {
      return <p>loading ..</p>;
    }
  }
}

export default Card;
