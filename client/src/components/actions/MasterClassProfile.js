import React, { Component } from "react";
import FirstComponent from "./MasterClassProfileFirst";
import SecondComponent from "./MasterClassProfileSecond";
import Member from './TaskMembers'
import Consultancy from './Consultancy'
import Skill from "./Skill";
import { Container, Col } from "react-bootstrap";
import axios from "axios";
import { Button } from "@material-ui/core";
import './TaskProfile.css'
import AppliedUser from './AppliedMasterClass'
import AcceptedUser from './AcceptedMasterClass.js'

var store = require("store");
class Card extends Component {
    state = {
        masterClass:null,
        Applied:[],
        Accepted:[],
        eduId:null,
        courses:[],
        educationalOrganizationId:null
    };
    
    async handleClick() {
      
        const {id,masterClassId}=this.props.match.params
       
        const handle = store.get('payload').id
        const data = {
          masterClassId: masterClassId,
          
        };
        await axios.put(`http://localhost:3333/members/applyForMasterClass/${handle}`, data);
        window.location.reload(); 
      }

     
    componentDidMount() {
        const {id,masterClassId}=this.props.match.params
  this.setState({eduId:id})
            axios
          .get(`http://localhost:3333/educationalOrganizations/masterClass/${id}/${masterClassId}`)
          .then(res => {
            this.setState({ masterClass: res.data,
                Applied:res.data.listOfApplied,
                Accepted:res.data.listOfAccepted,
                courses:res.data.courses,
                educationalOrganizationId:id
            })
           console.log(res.data)
          }
            )
        
          
    };
 GetAppliedUser(){
        console.log(this.state.Applied)
        return this.state.Applied.map((apply)=>(
    
            <AppliedUser  apply= {apply}
            masterClass={this.state.masterClass}
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
    if (this.state.masterClass) {
      return (
        <Container>
          <Col style={{minHeight:'100vh',background:'white'}}md={{ span: 8, offset: 2 }}>
              <FirstComponent
                masterClass={this.state.masterClass}
                id={this.state.educationalOrganizationId}
              />
              <hr></hr>
              <h5>General Informations</h5>
                <SecondComponent
                  masterClass={this.state.masterClass}
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
