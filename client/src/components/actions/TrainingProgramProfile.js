import React, { Component } from "react";
import FirstComponent from "./TrainingProgramProfileFirst";
import SecondComponent from "./TrainingProgramProfileSecond";
import { Container, Col } from "react-bootstrap";
import axios from "axios";

import './TaskProfile.css'

var store = require("store");
class Card extends Component {
    state = {
        trainingProgram:null,
        
        educationalOrganizationId:null
    };
    
        
    componentDidMount() {
        const {id,trainingProgramId}=this.props.match.params
  
            axios
          .get(`http://localhost:3333/educationalOrganizations/trainingProgram/${id}/${trainingProgramId}`)
          .then(res => {
            this.setState({
                trainingProgram:res.data
                
            })
           
          }
            )
           
        
          
    };
 
  render() {
    if (this.state.trainingProgram) {
      return (
        <Container>
          <Col style={{minHeight:'100vh',background:'white'}}md={{ span: 8, offset: 2 }}>
              <FirstComponent
                trainingProgram={this.state.trainingProgram}
                id={this.state.educationalOrganizationId}
              />
              <hr></hr>
              <h5>General Informations</h5>
                <SecondComponent
                  trainingProgram={this.state.trainingProgram}
                />
              
          </Col>
        </Container>
      );
    } else {
      return <p>loading ..</p>;
    }
  }
}

export default Card;
