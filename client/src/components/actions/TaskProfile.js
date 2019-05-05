import React, { Component } from "react";
import FirstComponent from "./TaskProfileFirst";
import SecondComponent from "./TaskProfileSecond";
import Member from './TaskMembers'
import Consultancy from './Consultancy'
import Skill from "./Skill";
import { Container, Col } from "react-bootstrap";
import axios from "axios";
import { Button } from "@material-ui/core";
import './TaskProfile.css'
var store = require("store");
class Card extends Component {
  state = {
    task: null,
    skills: [],
    appliedConsultancies: [],
    appliedMembers: [],
    taskPartner: null
  };
  getSkills() {
    return this.state.task.requiredSkills.map(skill => <Skill skill={skill} />);
  }
  getMembers(){
    return this.state.appliedMembers.map((member)=>(
      <Member bool={false} member= {member} taskPartner={this.state.taskPartner} task={this.state.task}/>
    ))}
    getConsultancies(){
      return this.state.appliedConsultancies.map((consultancy)=>(
    
        <Consultancy bool= {false} consultancy= {consultancy} task={this.state.task}/>
      ))}
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    axios.get(`http://localhost:3333/tasks/${id}`).then(res => {
      this.setState({
        task: res.data.data,
        skills: res.data.data.requiredSkills,
        appliedConsultancies: res.data.data.appliedConsultancies,
        appliedMembers: res.data.data.appliedMembers,
        taskPartner: res.data.data.taskPartner
      });
      console.log(res.data.data);
    });
  }
  handleClick(){
     if(store.get('payload').tags.includes("Member")){
    const data={
      taskId:this.state.task._id,
    }
    console.log(data.taskId + ' '+store.get("payload").id)
     axios.put(`http://localhost:3333/members/applyForTask/${store.get("payload").id}`,data).catch(e => {
      alert(e)
    }).then(alert('Done: '))
  }
  else   if (store.get('payload').tags.includes("ConsultancyAgency")){
    const data={
      taskId:this.state.task._id,
    }
    console.log(data.taskId + ' '+store.get("payload").id)
     axios.put(`http://localhost:3333/consultancyAgencies/applyForTask/${store.get("payload").id}`,data).catch(e => {
      alert(e)
    }).then(alert('Done: '))

  }

}
  render() {
    if (this.state.task) {
      return (
        <Container>
          <Col style={{minHeight:'100vh',background:'white'}} md={{ span: 8, offset: 2 }}>
              <FirstComponent
                name='Badr'
                id={this.state.task.taskPartner.id}
                task={this.state.task}
              />
              <hr></hr>
              <h5>General Informations</h5>
                <SecondComponent
                  data={this.props.description}
                  task={this.state.task}
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
