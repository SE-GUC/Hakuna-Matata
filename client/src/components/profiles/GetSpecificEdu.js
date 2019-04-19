import React, { Component } from 'react';
import axios from 'axios';
import Courses from '../profileComponents/Courses'
import Certificates from '../profileComponents/Certificates'
import Educators from '../profileComponents/Educators'
import MasterClasses from '../profileComponents/MasterClasses'
import TrainingPrograms from '../profileComponents/TrainingPrograms'
import educationalOrganization from '../profileComponents/educational_icon.jpg';
import {Link} from 'react-router-dom';

var store = require('store')
export class GetSpecificEdu extends Component{
    state ={
        educationalOrganization:null,
        courses :[],
        educators :[],
        certificates :[],
        masterClasses :[],
        trainingPrograms :[],
        eduId:null
    }
    componentDidMount(){
      var id;
        if(this.props.match!==undefined){
          id = this.props.match.params.id
        }else{
          id=this.props.id
        }
        this.setState({eduId:id})
        axios.get(`http://localhost:3333/educationalOrganizations/${id}`).then(res=>{
            //console.log(res);
            this.setState({educationalOrganization: res.data.data})
            //console.log(res.data.data)
      })
      
      axios
      .get(`http://localhost:3333/educationalOrganizations/course/${id}`)
      .then(res => {
        this.setState({ courses: res.data.data})

        console.log(res.data.data)
      }
        )
        
        axios
        .get(`http://localhost:3333/educationalOrganizations/masterClass/${id}`)
        .then(res => {
          this.setState({ masterClasses: res.data.data})
         
        }
          )
          
          axios
          .get(`http://localhost:3333/educationalOrganizations/educator/${id}`)
          .then(res => {
            this.setState({ educators: res.data.data})
            
          }
            )
            
            axios
          .get(`http://localhost:3333/educationalOrganizations/certificate/${id}`)
          .then(res => {
            this.setState({ certificates: res.data.data})
           
          }
            )
            
            axios
          .get(`http://localhost:3333/educationalOrganizations/trainingProgram/${id}`)
          .then(res => {
            this.setState({ trainingPrograms: res.data.data})
            
          }
            )
    }
  
    getData(){
        if(this.state.educationalOrganization!=null){
            const{
              educationOrganizationName,
              educationOrganizationPhoneNumber,
              educationOrganizationLocation
            }=this.state.educationalOrganization
            return <div><p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> Personal </p> 
            <hr style={lineStyle}></hr>  <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> Name:<font  color = "white"> {educationOrganizationName} </font></p>
            <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> Phone Number:<font  color = "white"> {educationOrganizationPhoneNumber} </font></p>
            <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> Location:<font  color = "white"> {educationOrganizationLocation} </font></p>
            </div>
        }
        else {
            return 'ya mo8fl eh ele d5lk hena'
        }
    }

    getCourses(){
if(this.state.courses!=null){
  return <Courses   courses={this.state.courses} educationalOrganizationId = {this.state.eduId} />
    
}else{
  return 'loading'
}

    }
    getCourses(){
      if(this.state.courses!=null){
        return <Courses   courses={this.state.courses} educationalOrganizationId = {this.state.eduId} />
          
      }else{
        return 'loading'
      }
      
          }
          getCertificates(){
            if(this.state.courses!=null){
              return      <Certificates   certificates={this.state.certificates} educationalOrganization = {this.state.educationalOrganization} />
    
            }else{
              return 'loading'
            }
            
                }
                getMasterClasses(){
                  if(this.state.courses!=null){
                    return <MasterClasses   masterClasses={this.state.masterClasses} educationalOrganization = {this.state.educationalOrganization} />  
        
                  }else{
                    return 'loading'
                  }
                  
                      }
                      getEducators(){
                        if(this.state.courses!=null){
                          return  <Educators   educators={this.state.educators} educationalOrganization = {this.state.educationalOrganization} />
            
                        }else{
                          return 'loading'
                        }
                        
                            }
                            
                      getTrainingPrograms(){
                        if(this.state.courses!=null){
                          return  <TrainingPrograms   trainingPrograms={this.state.trainingPrograms} educationalOrganization = {this.state.educationalOrganization} /> 
            
                        }else{
                          return 'loading'
                        }
                        
                            }  
                            addCourseButton(){
                              if(this.state.id==store.get('payload').id){
                                return  <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Courses:<Link style = {ButotnStyle} to={"/createCourse/"+this.state.educationalOrganization._id}><button className="btn btn-danger btn-sm m-2" style = {ButotnStyle1}  >+</button></Link></p>
                              }
                              else{
                        return  <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Courses:</p>
                        }
                      }
                      addCertificateButton(){
                        if(this.state.id==store.get('payload').id){
                          return  <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Certificates:<Link style = {ButotnStyle} to={"/createCertificate/"+this.state.educationalOrganization._id}><button className="btn btn-danger btn-sm m-2" style = {ButotnStyle1}  >+</button></Link></p>
                        }
                        else{
                  return  <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Certificates:</p>
                  }
                }
                addMasterClassesButton(){
                  if(this.state.id==store.get('payload').id){
                    return  <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>MasterClasses:<Link style = {ButotnStyle} to={"/createMasterClass/"+this.state.educationalOrganization._id}><button className="btn btn-danger btn-sm m-2" style = {ButotnStyle1}  >+</button></Link></p>
                  }
                  else{
            return  <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>MasterClasses:</p>
            }
          }
          addEducatorsButton(){
            if(this.state.id==store.get('payload').id){
              return  <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Educators:<Link style = {ButotnStyle} to={"/createEducator/"+this.state.educationalOrganization._id}><button className="btn btn-danger btn-sm m-2" style = {ButotnStyle1}  >+</button></Link></p>
            }
            else{
      return  <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Educators:</p>
      }
    }
    addTrainingProgramsButton(){
      if(this.state.id==store.get('payload').id){
        return  <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>TrainingPrograms:<Link style = {ButotnStyle} to={"/createTrainingProgram/"+this.state.educationalOrganization._id}><button className="btn btn-danger btn-sm m-2" style = {ButotnStyle1}  >+</button></Link></p>
      }
      else{
return  <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>TrainingPrograms:</p>
}
}

    checkButtons(){
      if(this.state.id==store.get('payload').id){
        return <button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  > Creat new Account</button>
    }
      else{
return <div> <button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  > Give Feedback</button> <font color='#A1A1A1'>|</font> <button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  > Chat</button> 
  </div>
      }
    }
                        
    render(){
      if(this.state.educationalOrganization!=null){ 
      return(
            
      
          <div style={{ width: '100%' , background : "#242424",margin:'0',textAlign:"center"}} >
        
          <img className="App-img" src={educationalOrganization}   borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>
  <br></br>
         {this.checkButtons()} <br></br>
          <p></p>
          <div className="getAllEdu" style={{marginLeft:'250px',marginRight:'250px',paddingLeft:'20px',paddingRight:'20px',  border: '1px solid', borderRadius:(20,20,20,20)}} >
             
             {this.getData()} 
        {this.addCourseButton()}
                              
        <hr style={lineStyle}></hr>
         
    {this.getCourses()}
     <br></br>
     {this.addCertificateButton()} 
                       
      <hr style={lineStyle}></hr>
     {this.getCertificates()}
      <br></br>
      {this.addCertificateButton()} <hr style={lineStyle}></hr>
        {this.getMasterClasses()}
      
         <br></br>
        {this.addEducatorsButton()}<hr style={lineStyle}></hr>
         {this.getEducators()}
          <br></br>
       {this.addTrainingProgramsButton()} <hr style={lineStyle}></hr>
         {this.getTrainingPrograms()}
         <br></br>
        </div>
          </div>
            
        );}else{
          return "loading"
        }

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
export default GetSpecificEdu