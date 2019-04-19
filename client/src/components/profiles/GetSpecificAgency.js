import React, { Component } from "react";
import axios from "axios";
import consultancyAgency from '../profileComponents/agency_icon.jpg';
import ConsultancyAgencyPartner from '../profileComponents/ConsultancyAgencyPartner.js'
import ConsultancyAgencyMembers from '../profileComponents/ConsultancyAgencyMembers.js'
import ConsultancyAgencyReports from '../profileComponents/ConsultancyAgencyReports.js'
import ConsultancyAgencyOffer from '../profileComponents/ConsultancyAgencyOffer.js'
import ConsultancyAgencyLocation from '../profileComponents/ConsultancyAgencyLocation.js'
import ConsultancyAgencyEvent from '../profileComponents/ConsultancyAgencyEvent.js'
import ConsultancyAgencyTask from '../profileComponents/ConsultancyAgencyTask.js'
import ConsultancyAgencyProject from '../profileComponents/ConsultancyAgencyProject.js'

export class GetSpecificAgency extends Component {
    state = {
      consultancyAgency: null,
      consultancyAgencyPartners:[],
      consultancyAgencyMembers:[],
      consultancyAgencyReports:[],
      consultancyAgencyOffers:[],
      consultancyAgencyLocation:[],
      consultancyAgencyEvents:[],
      consultancyAgencyAcceptedInTasks:[],
      consultancyAgencyAcceptedInPorjects:[]
      
    };
    componentDidMount() { 
      var id;
      if(this.props.match!==undefined){
        id = this.props.match.params.id
      }else{
        id=this.props.id
      }
        axios
          .get(`http://localhost:3333/consultancyAgencies/${id}`)
          .then(res => {
            this.setState({ consultancyAgency: res.data.data ,
              consultancyAgencyPartners:res.data.data.consultancyAgencyPartners 
              ,consultancyAgencyMembers:res.data.data.consultancyAgencyMembers,
              consultancyAgencyReports:res.data.data.consultancyAgencyReports,
              consultancyAgencyOffers:res.data.data.consultancyAgencyOffers,
              consultancyAgencyLocation:res.data.data.consultancyAgencyLocation,
              consultancyAgencyEvents:res.data.data.consultancyAgencyEvents,
              consultancyAgencyAcceptedInTasks:res.data.data.consultancyAgencyAcceptedInTasks,
              consultancyAgencyAcceptedInPorjects:res.data.data.consultancyAgencyAcceptedInPorjects
            })
          
          }
            )
    }
   
      getPartners(){
      return this.state.consultancyAgencyPartners.map((partner)=>(
    
        <ConsultancyAgencyPartner  partner= {partner} />
      ))}

      getMembers(){
        return this.state.consultancyAgencyMembers.map((member)=>(
      
          <ConsultancyAgencyMembers  member= {member} />
        ))}

        getReports(){
          return this.state.consultancyAgencyReports.map((report)=>(
        
            <ConsultancyAgencyReports  report= {report} />
          ))}
          getOffers(){
            return this.state.consultancyAgencyOffers.map((offer)=>(
          
              <ConsultancyAgencyOffer  offer= {offer} />
            ))}
            getLocations(){
              return this.state.consultancyAgencyLocation.map((location)=>(
            
                <ConsultancyAgencyLocation  location= {location} />
              ))}

              getEvents(){
                return this.state.consultancyAgencyEvents.map((event)=>(
              
                  <ConsultancyAgencyEvent  event= {event} />
                ))}     
                getTasks(){
                  return this.state.consultancyAgencyAcceptedInTasks.map((task)=>(
                
                    <ConsultancyAgencyTask  task= {task} />
                  ))}
                  getProjects(){
                    return this.state.consultancyAgencyAcceptedInPorjects.map((project)=>(
                  
                      <ConsultancyAgencyProject  project= {project} />
                    ))}
                            
    getData(){
      if(this.state.consultancyAgency != null){
      const {
        consultancyAgencyName,
        consultancyAgencyManager, 
        consultancyAgencyHeadquarters,
        consultancyAgencyRate,
        consultancyAgencyRevenues,
        consultancyAgencyRevenuePerEmployee,
        consultancyAgencyLocation,
        consultancyAgencyPhoneNumber,
        consultancyAgencyFiscalYear
      } = this.state.consultancyAgency;
      
      return  <div><p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> Personal </p> 
            <hr style={lineStyle}></hr>  <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> name:<font  color = "white"> {consultancyAgencyName} </font></p>
            <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> manger:<font  color = "white"> {consultancyAgencyManager} </font></p>
            <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> Headquarters:<font  color = "white"> {consultancyAgencyHeadquarters} </font></p>
            <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> Rate:<font  color = "white"> {consultancyAgencyRate} </font></p>
            <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> Revenues:<font  color = "white"> {consultancyAgencyRevenues} </font></p>
            <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> RevenuePerEmployee:<font  color = "white"> {consultancyAgencyRevenuePerEmployee} </font></p>
            <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> Location:<font  color = "white"> {consultancyAgencyLocation} </font></p>
            <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> PhoneNumber:<font  color = "white"> {consultancyAgencyPhoneNumber} </font></p>
            <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> FiscalYear:<font  color = "white"> {consultancyAgencyFiscalYear} </font></p>
            
            </div>
    }else{
      return 'hello'
    }
    }
    render() {
      return (
        <div style={{ width: '100%' , background : "#242424",margin:'0',textAlign:"center"}} >
        
          <img className="App-img" src={consultancyAgency}   borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>
  <br></br>

   <br></br>
<p></p>
          <div className="GetSpecificAgency" style={{marginLeft:'250px',marginRight:'250px',paddingLeft:'20px',paddingRight:'20px',  border: '1px solid', borderRadius:(20,20,20,20)}} >
             {this.getData()} 
        
      
      
             <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Partner:</p>
        <hr style={lineStyle}></hr>
         
         {this.getPartners()}
     <br></br>
     <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Members:</p>
        <hr style={lineStyle}></hr>
        {this.getMembers()}
      <br></br>
      <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Reports:</p>
        <hr style={lineStyle}></hr>
        {this.getReports()}
         <br></br>
         <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Events:</p>
        <hr style={lineStyle}></hr>
        {this.getEvents()}
        <br></br>
          <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Locations:</p>
        <hr style={lineStyle}></hr>
        {this.getLocations()}
         <br></br>
         <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Offers:</p>
        <hr style={lineStyle}></hr>
        {this.getOffers()}
         <br></br>
         <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Tasks:</p>
        <hr style={lineStyle}></hr>
        {this.getTasks()}
        <br></br>
         <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Projects:</p>
        <hr style={lineStyle}></hr>
         {/* <ConsultancyAgencyProjects   trainingPrograms={this.state.trainingPrograms} educationalOrganization = {this.state.educationalOrganization} />  */}
         <br></br>
         
        </div>
        
      </div>
      )
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
  export default GetSpecificAgency;