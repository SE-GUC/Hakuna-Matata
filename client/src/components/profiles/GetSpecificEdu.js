import React, { Component } from 'react';
import axios from 'axios';
import Courses from '../profileComponents/Courses'
import Certificates from '../profileComponents/Certificates'
import Educators from '../profileComponents/Educators'
import MasterClasses from '../profileComponents/MasterClasses'
import TrainingPrograms from '../profileComponents/TrainingPrograms'
import educationalOrganization from '../profileComponents/educational_icon.jpg';

export class GetSpecificEdu extends Component{
    state ={
        educationalOrganization:null,
        courses :[],
        educators :[],
        certificates :[],
        masterClasses :[],
        trainingPrograms :[]
    }
    componentDidMount(){
        const {id}=this.props.match.params
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
    render(){
        return(
            
      
          <div style={{ width: '100%' , background : "#242424",margin:'0'}} >
        
          <img className="App-img" src={educationalOrganization}   borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>
  <br></br>
          <button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  > Give Feedback</button> <font color='#A1A1A1'>|</font> <button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  > Chat</button>  <font color='#A1A1A1'>|</font> <button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  > Creat new Account</button>
          <br></br>
          <p></p>
          <div className="getAllEdu" style={{marginLeft:'250px',marginRight:'250px',paddingLeft:'20px',paddingRight:'20px',  border: '1px solid', borderRadius:(20,20,20,20)}} >
             
             {this.getData()} 
        <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Courses:<button className="btn btn-danger btn-sm m-2" style = {ButotnStyle1}  >+</button></p>
        <hr style={lineStyle}></hr>
         
         <Courses   courses={this.state.courses} educationalOrganization = {this.state.educationalOrganization} />
     <br></br>
     <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Certificates:<button className="btn btn-danger btn-sm m-2" style = {ButotnStyle1}  >+</button></p>
        <hr style={lineStyle}></hr>
         <Certificates   certificates={this.state.certificates} educationalOrganization = {this.state.educationalOrganization} />
      <br></br>
      <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>MasterClasses:<button className="btn btn-danger btn-sm m-2" style = {ButotnStyle1}  >+</button></p>
        <hr style={lineStyle}></hr>
        <MasterClasses   masterClasses={this.state.masterClasses} educationalOrganization = {this.state.educationalOrganization} />  
         <br></br>
         <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Educators:<button className="btn btn-danger btn-sm m-2" style = {ButotnStyle1}  >+</button></p>
        <hr style={lineStyle}></hr>
          <Educators   educators={this.state.educators} educationalOrganization = {this.state.educationalOrganization} />
          <br></br>
          <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>TrainingPrograms:<button className="btn btn-danger btn-sm m-2" style = {ButotnStyle1}  >+</button></p>
        <hr style={lineStyle}></hr>
         <TrainingPrograms   trainingPrograms={this.state.trainingPrograms} educationalOrganization = {this.state.educationalOrganization} /> 
         <br></br>
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
export default GetSpecificEdu