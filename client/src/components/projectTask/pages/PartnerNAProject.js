import React, { Component } from "react";
import axios from "axios";
import '../Taskp.css'
import Tasksp from '../Tasksp';
export class PartnerNAProject extends Component {
  
  getStyle = () => {
    return {
      background: "grey",
     
    };
  };
  
    state = {
      project: null
    };
    componentDidMount() {
        const {id}=this.props.match.params
        axios
          .get(`http://localhost:3333/projects/${id}`)
          .then(res => {
            this.setState({ project: res.data.data})
          }
            )
    }
    
    getData(){
      if(this.state.project != null){
        const {
          _id,
          description,
          requiredSkills,
          appliedConsultancies,   
          name,
          projectPartner,
          deadline,
          deadlineForApply,
          uploadDate,
          submissionDate,
          experienceLevel,
          commitLevel,
          workCycle,
        } = this.state.project;

        const filter ={


        }
        let rskills ="";
        let Agency =" ";
            
        for(let i=0 ; i<requiredSkills.length ; i++ ){
              rskills += requiredSkills[i].name 
            if((i+1)<requiredSkills.length){
              rskills += " | "
            }
            }

        for(let j=0 ; j<appliedConsultancies.length ; j++ ){
          Agency += appliedConsultancies[j].data + " | "        }


 
        const ButotnStyle = {
            backgroundColor:'#242424',
            color :'white',
            testAlign:'center',
            pading:'15px 32px',
            borderRadius:'12px',
            float :'right',
            fontSize:'12px',
            hight:'30px',
            width:'70px'
        
        }
        const p={
          cursor:'pointer',
          Color:'white',
          background: '#F9BB32',
          borderRadius:'100%',
          position:'absolute',
          left:'44%',
          top:'2%',
          height:66,      
          width:66
          
          
        }
       
        
        
      return <p>
       

        <div className="project-header" >
        <div>
        <style>{'body{background-color:#242424}'} </style>
       <svg xmlns="http://www.w3.org/2000/svg" width="85" height="85" viewBox="0 0 130 130"style={{position:"absolute", left:"42.5%",top:"0%"}}>
  <g id="Ellipse_1" data-name="Ellipse 1" fill="#f9bb32" stroke="#707070" stroke-width="1">
    <circle cx="65" cy="65" r="65" stroke="none"/>
    <circle cx="65" cy="65" r="64.5" fill="none"/>
  </g>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="40" viewBox="0 0 37 62"style={{position:"relative", left:"47.9%",top:"53%"}}>
  <text id="P" transform="translate(0 50)" fill="#242424" font-size="55" font-family="Arial-BoldMT, Arial" font-weight="700" ><tspan x="0" y="0">P</tspan></text>
</svg>
</div>
<br></br>
<br></br>
<br></br>





        
        <p></p>
        <p></p>
        <br></br>
        <p></p>
      
      <t style={{color:"#F9BB32"}}>info</t> 
      <div class="hline" ></div>
      
        
      <ul>  
      <t style={{color:"#A1A1A1",position:'absolute', left:'0%'}}>Title:</t>  {name} 
      <p></p>
      <t style={{color:"#A1A1A1",position:'absolute', left:'0%'}}> Partner: </t> &nbsp;&nbsp;&nbsp;&nbsp; {projectPartner.name}             <button style = {ButotnStyle}  > visit </button>
      <p></p> 
      <t style={{color:"#A1A1A1",position:'absolute', left:'0%'}}> Agency: </t> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {Agency}                        <button style = {ButotnStyle} > visit </button>
      <p></p>  
      <t style={{color:"#A1A1A1",position:'absolute', left:'0%'}}> Skills: </t> &nbsp; {rskills} 
      <p></p>  
      <t style={{color:"#A1A1A1",position:'absolute', left:'0%'}}> Deadline: </t> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {deadline} 
      <p></p>
      <t style={{color:"#A1A1A1",position:'absolute', left:'0%'}}> Deadline For Apply: </t> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {deadlineForApply} 
      <p></p>
      <t style={{color:"#A1A1A1",position:'absolute', left:'0%'}}> Upload Date: </t> &nbsp;&nbsp;&nbsp;&nbsp; {uploadDate}
      <p></p>
      <t style={{color:"#A1A1A1",position:'absolute', left:'0%'}}> Submission Date: </t> &nbsp;&nbsp;&nbsp;&nbsp; {submissionDate}
      <p></p>
      <t style={{color:"#A1A1A1",position:'absolute', left:'0%'}}> Experience Level: </t> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {experienceLevel}
      <p></p>
      <t style={{color:"#A1A1A1",position:'absolute', left:'0%'}}> Commit Level: </t> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {commitLevel} 
      <p></p>
      <t style={{color:"#A1A1A1",position:'absolute', left:'0%'}}> work cycle: </t> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {workCycle}
      <p></p>
      <t style={{color:"#A1A1A1",position:'absolute', left:'0%'}}> description: </t> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {description} 
       </ul>
       
       <t style={{color:"#F9BB32"}}>tasks</t> 
       <div class="hline"></div>
       { <Tasksp tasks={this.state.project.tasks}/> }
       

       </div>
       </p>
       

    }
    }
    render() {
      return (
        <div className="GetAllAgencies">
         <div className="html">
           {this.getData()} 
           </div>
        </div>

      );
    }
  }
  export default PartnerNAProject;