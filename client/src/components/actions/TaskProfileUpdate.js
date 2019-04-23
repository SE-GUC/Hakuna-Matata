import React, { Component } from "react";
import FirstComponent from "./TaskProfileFirst";
import SecondComponent from "./TaskProfileSecondUpdate";
import Member from './TaskMembers'
import Consultancy from './Consultancy'
import Skill from "./Skill";
import { Container, Col } from "react-bootstrap";
import axios from "axios";
import { Button } from "@material-ui/core";
import './TaskProfile.css'
class TaskProfileUpdate extends Component {
 constructor(props){
   super(props)
   this.state = {
    task: null,
    skills: [],
    appliedConsultancies: [],
    appliedMembers: [],
    taskPartner: null,
    taskData:null,
    name:'',
    description :'',
    consultyNeeded :'',
    deadline :'',
    commitLevel :0,
    experienceLevel :0,
    monetaryCompensation :null
  };
this.onChange=this.onChange.bind();
}
  // get() {
  //   if (this.props.type === "CourseRequest" || this.props.type === "Post") {
  //     return <FourthComponent />;
  //   } else {
  //     return;
  //   }
  // }
  // getData(){
  //   if(this.props.type==='Event'|| this.props.type==='Report'){
  //     return  ;
  //   }
  //   else{
  //     return  <ThirdComponent type={this.props.type} id={this.props.objectId} memberId={this.props.id}/>;
  //   }
  // }
  getSkills() {
    return this.state.task.requiredSkills.map(skill => <Skill skill={skill} />);
  }
  getMembers(){
      console.log(this.state.appliedMembers)
    return this.state.appliedMembers.map((member)=>(
      <Member  member= {member} taskPartner={this.state.taskPartner} task={this.state.task}/>
    ))}
    getConsultancies(){
      return this.state.appliedConsultancies.map((consultancy)=>(
        <Consultancy  consultancy= {consultancy} task={this.state.task}/>
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
            taskPartner: res.data.data.taskPartner,
          });
    });
  } 

  onChange(e) {

    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state.task.name)
  }
  // handleClickClose(e) {
  //   this.setState({ isClose: true })
  // }
  updateFun(){
 const data={
    "name":this.state.name,
    description: this.state.description,
    consultyNeeded: this.state.consultyNeeded,
    deadline: this.state.deadline,
    commitLevel: this.state.task.commitLevel,
    experienceLevel: this.state.experienceLevel,
    monetaryCompensation: this.task.monetaryCompensation
 }
   
    axios.put('http://localhost:3333/tasks/' + this.props.match.params.id, data)

} 

  render() {
      const check = this.state.task
      console.log(check)
    if (check!==null) {
      return (
         <Container>
           <Col style={{minHeight:'100vh',background:'white'}}md={{ span: 8, offset: 2 }}>
              <FirstComponent
                 name={this.state.task.taskPartner.name}
                id={this.state.task.taskPartner.id}
                taskId={this.state.task._id}
                bool ={true}
              />

              <hr></hr> 
              <h5>General Informations</h5>
                 <SecondComponent style={{border: '1px solid black'}}
                 task={this.state.task} onChange={this.onChange}
                 name={this.state.name}
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
              <Button style={{width:'100%',textTransform:'lowercase'}} class='Btn'>Apply</Button> 
              
           </Col>
        </Container>
    
    );
    } else {
      return <p>loading ..</p>;
    }
  }
}

export default TaskProfileUpdate;
