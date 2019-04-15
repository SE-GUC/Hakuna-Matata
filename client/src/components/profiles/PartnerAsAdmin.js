import React, { Component } from 'react';
import PhotoComponent from '../../components/profileComponents/PhotoComponent'
import Coloredline from '../../components/profileComponents/Coloredline'
import Data from '../../components/profileComponents/Data'
import WithDate from'../../components/profileComponents/WithDate'
import NavBar from '../../components/profileComponents/NavBar'
import ApplyData from '../../components/profileComponents/ApplyData'
import axios from 'axios'
import KeyImage from '../../assessments/partner_icon.svg'
import Buttons from '../../components/profileComponents/ButtonsAdmin'




class PartnerAsAdmin extends Component{
   state = {
    
    partnerName:'',
    partnerPhoneNumber:'',
    partnerLocation:'',
    partnerDateJoined:'',
    partnerPartners: [],
    fieldOfWork:[],
    partnerEvents:[],
    partnerProjects: [],
    partnerTasks: [],
    feedbackForm: [],
    skills:[],
    age:'',
    email:''

    }
     
    componentDidMount() {
      
        const  handle  = '5cab83e86b8f820fc0bcf768'
        axios.get(`http://localhost:3333/partners/${handle}`).then(res => {
      
          this.setState({ partnerName : res.data.data.partnerName})
          this.setState({ partnerLocation: res.data.data.partnerLocation})
          this.setState({partnerPartners : res.data.data.partnerPartners })
          this.setState({ partnerDateJoined : res.data.data.partnerDateJoined })
          this.setState({ partnerEvents : res.data.data.partnerEvents })
          this.setState({ partnerProjects : res.data.data.partnerProjects })
          this.setState({ partnerTasks : res.data.data.partnerTasks})
          this.setState({ skills : res.data.data.skills})
          this.setState({ feedbackForm : res.data.data.feedbackForm })
          this.setState({ partnerPhoneNumber : res.data.data.partnerPhoneNumber })
          this.setState({ email : res.data.data.email })
          this.setState({ age : res.data.data.age })
          this.setState({ fieldOfWork : res.data.data.fieldOfWork})
       
        })
      }
     
   

 render(){
   const mappingFunction = component => component+" |";
    const mappingSkills = component => component.name+" |";
    const mappingInfo = component => <WithDate value={component.name} datee={component.date} ></WithDate>;
    const mappingJobs = component => <ApplyData data={component.name}></ApplyData>;

    return (
      <div style={{position:"relative",width:"100%"}}>
      <style>{'body { background-color }'}</style>
      <NavBar /><br/><br/>
      <div style={{position:"relative", paddingLeft:"1px",
      paddingRight:"1px" ,border:"1px solid", marginLeft:"15%", marginRight:"15%",borderRadius:(20,20,20,20), color:"#FFFFFF", top:"30%"}}>
      <PhotoComponent KeyImage={KeyImage}/>
      <Buttons></Buttons><br/> <br/>
    
      <Coloredline title={'Personal'}/><br/>
      <Data keyy={'Name:'} value={this.state.partnerName}  /><br/>
     <Data keyy={'Age:'} value={this.state.age}  /><br/>
     <Data keyy={'Email:'} value={this.state.email}  /><br/>
     <Data keyy={'Fields of work:'} value={this.state.fieldOfWork.map(mappingFunction)}  /><br/>
     <Data keyy={'Skills:'} value={this.state.skills.map(mappingSkills) }/><br/>
      <Coloredline title={'Jobs'}/><br/>
      <p>{this.state.partnerTasks.map(mappingInfo)}</p><br/>
      <Coloredline title={'Events'}/><br/>
      <p>{this.state.partnerEvents.map(mappingInfo)}</p><br/>
      </div>

       </div>
       
       
 
    )
  
 }

}
 export default PartnerAsAdmin;
 