import React, { Component } from "react";
import axios from "axios";
import task from '../profileComponents/taskIcon.png'
import {Link} from 'react-router-dom';
import Skill from '../profileComponents/Skill'
import Member from '../profileComponents/ConsultancyAgencyMembers'
import Consultancy from '../profileComponents/Consultancy'

export class GetSpecTask extends Component {
    state = {
      
      task:null,
      skills:[],
      appliedConsultancies:[],
      appliedMembers:[]
    };
    componentDidMount() {
        const {id}=this.props.match.params
        
            axios
          .get(`http://localhost:3333/tasks/${id}`)
          .then(res => {
            this.setState({ 
                task:res.data.data,
              skills:res.data.data.requiredSkills,
              appliedConsultancies:res.data.data.appliedConsultancies,
              appliedMembers:res.data.data.appliedMembers
          }
            )
        
          
    })};
 
    getSkills(){
      return this.state.skills.map((skill)=>(
    
        <Skill  skill= {skill} />
      ))
     
        
      }
    getMembers(){
      return this.state.appliedMembers.map((member)=>(
    
        <Member  member= {member} />
      ))}
      getConsultancies(){
        return this.state.appliedConsultancies.map((consultancy)=>(
      
          <Consultancy  consultancy= {consultancy} />
        ))}
  
    getData(){
      if(this.state.task != null){
      const {
        name,
        taskPartner,
        project,
        description,
        consultyNeeded,
        deadline,
        commitLevel,
        experienceLevel,
        monetaryCompensation,
     

      } = this.state.task;
      var consulted = 'No';
      if(consultyNeeded)
        consulted = 'Yes'
      
      return <div> <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> info </p> 
      <hr style={lineStyle}></hr>  <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> name:<font  color = "white"> {name} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> taskPartner:<font  color = "white"> {taskPartner.name} </font><Link style = {ButotnStyle}  to={"/partner/"+taskPartner.id}><button className="btn btn-danger btn-sm m-2" style = {ButotnStyle1}  >Show Partner</button></Link></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> project:<font  color = "white"> {project.name} </font><Link style = {ButotnStyle}  to={"/projects/"+project.id}><button className="btn btn-danger btn-sm m-2" style = {ButotnStyle1}  >Show project</button></Link></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> description:<font  color = "white"> {description} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> consultyNeeded:<font  color = "white"> {consulted} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> deadline:<font  color = "white"> {deadline} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> commitLevel:<font  color = "white"> {commitLevel} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> experienceLevel:<font  color = "white"> {experienceLevel} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> monetaryCompensation:<font  color = "white"> {monetaryCompensation} </font></p>
     
     </div>
    }else{
      return 'ya mo8fl eh ele d5lk hena'
    }
    }
   
   
    render() {
      return (
        <div style={{ width: '100%' , background : "#242424",margin:'0',textAlign:"center"}} >
        
        <img className="App-img" src={task}   borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>

        <div className="getSpecRoom" style={{marginLeft:'250px',marginRight:'250px',paddingLeft:'20px',paddingRight:'20px',  border: '1px solid', borderRadius:(20,20,20,20)}} >
           {this.getData()}  

           <br></br>
           <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> Skills </p> 
      <hr style={lineStyle}></hr>
      {this.getSkills()}
     <br></br>
      <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> Member Applied </p> 
      <hr style={lineStyle}></hr>
      {this.getMembers()}
      <br></br>
      <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> Consultancies Applied </p> 
      <hr style={lineStyle}></hr>
      {this.getConsultancies()}
      
        
</div>
</div>

      );
    }
  }
  const lineStyle ={
    backgroundColor:'black',
      borderTop: '1px solid #F9BB32'
    }
    const ButotnStyle = {
      backgroundColor:'#F9BB32',
        color :'#242424',
        testAlign:'center',
        pading:'15px 32px',
        borderRadius:'12px',
        float :'center',
        fontSize:'18px'
    }  

    const ButotnStyle1 = {
      backgroundColor:'#242424',
        color :'white',
        testAlign:'center',
        pading:'15px 32px',
        borderRadius:'12px',
        float :'right',
        fontSize:'18px'
    
    }
  export default GetSpecTask;