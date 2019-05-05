import React, { Component } from 'react';
import PhotoComponent from './PhotoComponent'
import Coloredline from './Coloredline'
import Data from './Data'

import WithDate from'./WithDate'


import axios from 'axios'




class UserViewMember extends Component{
   state = {
      memberFullName: '',
      memberWebName: '',
      completedTasksId: [],
      appliedTasksId: [],
      experienceLevel: '',
      memberRating: '',
      allRatedReco: '',
      averageRecoRate: '',
      allRatedTasks: '',
      skills:[],
      memberWorksIn: [],
      memberMasterclasses: [],
      memberCertificates: [],
      memberEvents: [],
      memberHirePerHour: '',
      memberPhoneNumber: '',
      memberDateJoined:'',
      memberLocation: '',
      email:'',
      age:'',
      fieldOfWork:[],
      memberCoursesAppliedIn:[],
      completedProjects:[],
      reviews:[]
    }
     
componentDidMount() {
  const {id}=this.props.match.params
  axios.get(`http://localhost:3333/members/${id}`).then(res => {

    this.setState({ memberFullName : res.data.data.memberFullName})
    this.setState({ memberWebName: res.data.data.memberWebName })
    this.setState({ appliedTaskId : res.data.data.appliedTaskId })
    this.setState({ completedTasksId : res.data.data.completedTasksId })
    this.setState({ _id : res.data.data._id })
    this.setState({experienceLevel : res.data.data.experienceLevel })
    this.setState({ memberRating : res.data.data.memberRating })
    this.setState({ allRatedReco : res.data.data.allRatedReco })
    this.setState({ averageRecoRate : res.data.data.averageRecoRate })
    this.setState({ allRatedTasks : res.data.data.allRatedTasks})
    this.setState({ skills : res.data.data.skills})
    this.setState({ memberWorksIn : res.data.data.memberWorksIn })
    this.setState({ memberMasterclasses : res.data.data.memberMasterclasses })
    this.setState({ memberCertificates : res.data.data.memberCertificates })
    this.setState({ memberEvents : res.data.data.memberEvents })
    this.setState({ memberHirePerHour : res.data.data.memberHirePerHour })
    this.setState({ memberPhoneNumber : res.data.data.memberPhoneNumber })
    this.setState({ memberDateJoined : res.data.data.memberDateJoined })
    this.setState({ memberLocation : res.data.data.memberLocation })
    this.setState({ email : res.data.data.email })
    this.setState({ age : res.data.data.age })
    this.setState({ fieldOfWork : res.data.data.fieldOfWork})
    this.setState({ memberCoursesAppliedIn : res.data.data.memberCoursesAppliedIn})
    this.setState({ completedProjects : res.data.data.completedProjects})
    this.setState({ reviews : res.data.data.reviews})
 
  })
}
Go(){
    const memberFullName=document.getElementById("name_txt").value
    // const age=document.getElementById("age_txt").value
  //  const email=document.getElementById("email_txt").value
    // const fieldOfWork=document.getElementById("fow_txt").value
    // const skills=document.getElementById("skills_txt").value
    const data={
        memberFullName,
        // age,
         //email,
        // fieldOfWork,
        // skills

    }

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    window.alert("Are you sure that you want to Update this Member")
    axios.put(`http://localhost:3333/members/${id}`,data)



    window.location = "http://localhost:3000/UpdatMember/"+id;
}
   

 render(){
   
    
    const mappingInfo = component => <WithDate value={component.name} datee={component.date} ></WithDate>;

    return (
    
      <div style={{position:"relative",width:"100%"}}>
      <style>{'body { background-color }'}</style>
      <br/><br/>
      <div style={{position:"relative", paddingLeft:"1px",
      paddingRight:"1px" ,border:"1px solid", marginLeft:"15%", marginRight:"15%",borderRadius:(20,20,20,20), color:"#FFFFFF", top:"30%"}}>
      

       <button style={{position:"relative", paddingLeft:"1px",
      paddingRight:"1px" ,border:"1px solid", marginLeft:"15%", marginRight:"15%",borderRadius:(20,20,20,20), color:"black",backgroundColor:"#F9BB32",width:"15%",height:"15%",left:"30%"}} onClick={this.Go.bind(this)}>Submit </button>
      
     
      <Coloredline title={"Personal Update"} /><br/>
     
        <div>
        <Data keyy={'Name:'} />  <br/>
        <input type="text" id="name_txt" defaultValue={this.state.memberFullName} style={{position:"relative" ,left:"35%",bottom:"30%",height:"20%"}}></input>
        <br/>
        
        <br/>

        </div>
     
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       </div>
       </div>
       
       
 
    )
  
 }

}
 export default UserViewMember;
 