import React, { Component } from "react";
import FirstComponent from "./TrainingProgramProfileFirst";
import SecondComponent from "./TrainingProgramProfileSecond";
import { Container, Col } from "react-bootstrap";
import axios from "axios";
import { BrowserRouter as Router, Route,Link } from "react-router-dom";

import './TaskProfile.css'

var store = require("store");
class Card extends Component {
    state = {
        trainingProgram:null,
        
        educationalOrganizationId:null
        
    };
    
        
    componentDidMount() {
        const id=this.props.match.params.id
            axios
          .get(`http://localhost:3333/trainingPrograms/${id}`)
          .then(res => {
            console.log(res.data.data)
            this.setState({
                trainingProgram:res.data.data
                
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
          <Link to={`/updateTrainingProgram/${this.props.match.params.id}`} style={{ color: "black" }}>
           update
          </Link>
        </Container>
      );
    } else {
      return <p>loading ..</p>;
    }
  }
}

export default Card;
