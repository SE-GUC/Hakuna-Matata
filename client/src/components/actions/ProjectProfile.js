import React, { Component } from "react";
import FirstComponent from "./ProjectProfileFirst";
import SecondComponent from "./ProjectProfileSecond";
import Member from './TaskMembers'
import Consultancy from './Consultancy'
import Skill from "./Skill";
import { Container, Col } from "react-bootstrap";
import axios from "axios";
import { Button } from "@material-ui/core";
import './TaskProfile.css'
import Task from'./Task.js'
var store = require("store");
class Card extends Component {
  state = {
    project: null,
    skills: [],
    appliedConsultancies: [],
    appliedMembers: [],
    projectPartner: null
  };
  getSkills() {

    return this.state.project.requiredSkills.map(skill => <Skill skill={skill} />);
  }
  getMembers(){
    return this.state.appliedMembers.map((member)=>(
      <Member bool={true} member= {member} projectPartner={this.state.projectPartner} task={this.state.project}/>
    ))}
    getConsultancies(){
      return this.state.appliedConsultancies.map((consultancy)=>(
    
        <Consultancy  bool= {true} consultancy= {consultancy} task={this.state.project}/>
      ))}
      getTasks(){
        return this.state.project.tasks.map((task)=>(
      
          <Task  task= {task} project={this.state.project}/>
        ))}
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    axios.get(`http://localhost:3333/projects/${id}`).then(res => {
      this.setState({
        project: res.data.data,
        skills: res.data.data.requiredSkills,
        appliedConsultancies: res.data.data.appliedConsultancies,
        appliedMembers: res.data.data.appliedMembers,
        projectPartner: res.data.data.projectPartner
      });
      console.log(res.data.data.requiredSkills);
    });
    
  }
  handleClick(){
    if(store.get('payload').tags.includes("Member")){
    const data={
        projectId:this.state.project._id,
    }
    console.log(data.projectId + ' '+store.get("payload").id)
     axios.put(`http://localhost:3333/members/applyForProject/${store.get("payload").id}`,data).catch(e => {
      alert(e)
    }).then(alert('Done: '))
  }else
   if (store.get('payload').tags.includes("ConsultancyAgency")){
const data={
      projectId:this.state.project._id,
  }
  console.log(data.projectId + ' '+store.get("payload").id)
   axios.put(`http://localhost:3333/consultancyAgencies/applyForProject/${store.get("payload").id}`,data).catch(e => {
    alert(e)
  }).then(alert('Done: '))
}
  // }


}

  render() {
    if (this.state.project) {
      return (
        <Container>
          <Col style={{minHeight:'145vh',background:'white'}}md={{ span: 8, offset: 2 }}>
              <FirstComponent
                name={this.state.project.projectPartner.name}
                id={this.state.project.projectPartner.id}
                project={this.state.project}
              />
              <hr></hr>
              <h5>General Informations</h5>
                <SecondComponent
                  project={this.state.project}
                  style={{border: '1px solid black'}}
                />
                <hr></hr>
                <h5>Skills Needed</h5>
                {this.getSkills()}
                <hr></hr>
                <h5>Members Applied</h5>
                {this.getMembers()}
                <hr></hr>
                <h5>Consultancy Agencies Applied</h5>
              {this.getConsultancies()} 
              <hr></hr>
              <h5>Tasks</h5>
              {this.getTasks()}
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
