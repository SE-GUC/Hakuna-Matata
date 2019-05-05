import React, { Component } from 'react';
import PhotoComponent from './PhotoComponent'
import Coloredline from './Coloredline'
import Data from './Data'
import axios from 'axios'
import WithDate from'./WithDate'




class PartnerAsUser extends Component{
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
      
      const {id}=this.props.match.params
        axios.get(`http://localhost:3333/partners/${id}`).then(res => {
      
          this.setState({ partnerName : res.data.data.partnerName})
          this.setState({ partnerLocation: res.data.data.partnerLocation})
         
          let partnerPartners1 = "";
          if((res.data.data.partnerPartners) != null){
              for(let i=0 ; i<(res.data.data.partnerPartners) ; i++ ){
                partnerPartners1 += (res.data.data.partnerPartners[i]).name
                  if((i+1)<(res.data.data.partnerPartners).length){
                    partnerPartners1 += " | "
                    
                  }
              }
              
              this.setState({partnerPartners : partnerPartners1 })   
          }   
          this.setState({ partnerDateJoined : res.data.data.partnerDateJoined })

          let partnerEvents1 = "";
          if((res.data.data.partnerPartners) != null){
              for(let i=0 ; i<(res.data.data.partnerPartners) ; i++ ){
                partnerEvents1 += (res.data.data.partnerPartners)[i].name
                  if((i+1)<(res.data.data.partnerPartners).length){
                    partnerEvents1 += " | "
                  }
              }
              this.setState({partnerEvents : partnerEvents1 })    
          }   


          let partnerProjects1 = "";
          if((res.data.data.partnerPartners) != null){
              for(let i=0 ; i<(res.data.data.partnerPartners) ; i++ ){
                partnerProjects1 += (res.data.data.partnerPartners)[i].name
                  if((i+1)<(res.data.data.partnerPartners).length){
                    partnerProjects1 += " | "
                  }
              }
              this.setState({partnerProjects : res.data.data.partnerProjects })    
          } 

         
          this.setState({ partnerTasks : res.data.data.partnerTasks})
          this.setState({ skills : res.data.data.skills})
          this.setState({ feedbackForm : res.data.data.feedbackForm })
          this.setState({ partnerPhoneNumber : res.data.data.partnerPhoneNumber })
          this.setState({ email : res.data.data.email })
          this.setState({ age : res.data.data.age })
          this.setState({ fieldOfWork : res.data.data.fieldOfWork})
          console.log("ameeen")
       
        })
      }
     
      Go(){
        

        const partnerName=document.getElementById("name_txt").value
        const partnerPhoneNumber=document.getElementById("num_txt").value
        const partnerLocation=document.getElementById("loc_txt").value
        const partnerPartners=document.getElementById("pp_txt").value;
        const fieldOfWork=document.getElementById("fow_txt").value
        // const partnerProjects=document.getElementById("pps_txt").value
        // const partnerEvents=document.getElementById("pe_txt").value
        // const feedbackForm=document.getElementById("fbf_txt").value
        const data={
     }
     if(partnerName&&partnerName!=""){
      data.partnerName=partnerName
    }
    if(partnerPhoneNumber&&partnerPhoneNumber!=""){
      data.partnerPhoneNumber=partnerPhoneNumber
    }
    if(partnerLocation&&partnerLocation!=""){
      data.partnerLocation=partnerLocation
    }
    if(partnerPartners&&partnerPartners!=""){
      data.partnerPartners=partnerPartners.split(',')
    }
    if(fieldOfWork&&fieldOfWork!=""){
      data.fieldOfWork=fieldOfWork.split(',')
    }
        console.log(data)
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        console.log(id)
        // window.alert("Are you sure that you want to Update this Partner")
        axios.put(`http://localhost:3333/partners/${id}`,data)
    
    
    
        // window.location = "http://localhost:3000/UpdatePartner/"+id;
    }
    
       
    

 render(){
   
  const mappingInfo = component => <WithDate value={component.name} datee={component.date} ></WithDate>;

    return (
        <div>
      <br/><br/>
      <div style={{position:"relative", paddingLeft:"1px",
      paddingRight:"1px" ,border:"1px solid", marginLeft:"15%", marginRight:"15%",borderRadius:(20,20,20,20), color:"#FFFFFF", top:"30%"}}>
      <style>{'body { background-color }'}</style>
      <br></br>

      <button style={{position:"relative", paddingLeft:"1px",
      paddingRight:"1px" ,border:"1px solid", marginLeft:"15%", marginRight:"15%",borderRadius:(20,20,20,20), color:"black",backgroundColor:"#F9BB32",width:"15%",height:"15%",left:"30%"}} onClick={this.Go.bind(this)}>Submit </button>
      <Coloredline title={'Personal Update'}/><br/>

      
     <div>
        <Data keyy={'Name:'} />  <br/>
        <input type="text" id="name_txt" defaultValue={this.state.partnerName} style={{position:"relative" ,left:"40%",bottom:"30%",height:"20%",width:"35%"}}></input>
        <br/>
        <Data keyy={'partnerPhoneNumber:'}  /> <br/>
        <input type="text" id="num_txt" defaultValue={this.state.partnerPhoneNumber} style={{position:"relative" ,left:"40%",bottom:"30%",width:"35%"}}></input>
        <br/>
        <Data keyy={'partnerLocation:'} /><br/>
        <input type="text" id="loc_txt" defaultValue={this.state.partnerLocation} style={{position:"relative" ,left:"40%",bottom:"30%",width:"35%"}}></input>
        <br/>
        <Data keyy={'partnerPartners:'} /><br/>
        <input type="text" id="pp_txt" defaultValue={this.state.partnerPartners} style={{position:"relative" ,left:"40%",bottom:"3%",width:"35%"}}></input>
        <br/>
        <Data keyy={'fieldOfWork:'} /> <br/>
        <input type="text" id="fow_txt" defaultValue={this.state.fieldOfWork} style={{position:"relative" ,left:"40%",bottom:"30%",width:"35%"}}></input>
        <br/>
        <Data keyy={'partnerProjects:'} /> <br/>
        <input type="text" id="pps_txt" defaultValue={this.state.partnerProjects.map(mappingInfo)} style={{position:"relative" ,left:"40%",bottom:"30%",width:"35%"}}></input>
        <br/>
        <Data keyy={'partnerEvents:'} /> <br/>
        <input type="text" id="pe_txt" defaultValue={this.state.partnerEvents} style={{position:"relative" ,left:"40%",bottom:"30%",width:"35%"}}></input>
        <br/>
        <Data keyy={'feedbackForm:'} /> <br/>
        <input type="text" id="fbf_txt" defaultValue={this.state.feedbackForm} style={{position:"relative" ,left:"40%",bottom:"30%",width:"35%"}}></input>
        <br/>

        </div>
        <br/>
        <br/>
      
      
      </div>
       </div>
       
       
 
    )
  
 }

}
 export default PartnerAsUser;
 