import React, { Component } from "react";
import axios from "axios";
import Rooms from '../Rooms';
import coWorkingSpace from '../coworkingspace_icon.jpg';
import Facilite from '../Facilite';
import {Link} from 'react-router-dom';

import BusinessPlan from '../BusinessPlan';
export class GetSpec extends Component {
    state = {
      coWorkingSpace: null,
      rooms :[]
    };
    componentDidMount() {
        const {id}=this.props.match.params
        axios
          .get(`http://localhost:3333/coworkingSpaces/${id}`)
          .then(res => {
            this.setState({ coWorkingSpace: res.data.data})
            console.log(res.data.data)
          }
            )
            axios
          .get(`http://localhost:3333/coworkingSpaces/room/${id}`)
          .then(res => {
            this.setState({ rooms: res.data.data})
            console.log(res.data.data)
          }
            )
        
            
    }
    getFacilities(){
      return this.state.coWorkingSpace.coworkingSpacePhoneNumber.map((facilite)=>(
    
        <Facilite  facilite= {facilite} />
      ))
     
        
      }
    getPlan(){
      return this.state.coWorkingSpace.coworkingSpaceBusinessPlans.map((businessPlan)=>(
    
        <BusinessPlan  businessPlan= {businessPlan} />
      ))}

    getData(){
      if(this.state.coWorkingSpace != null){
      const {
        coworkingSpaceName,
        
        coworkingSpaceLocation,
        
        coworkingSpaceFacilites,
        coworkingSpaceMaxNoRooms
      } = this.state.coWorkingSpace;
      return<div> <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> Personal </p> 
       <hr style={lineStyle}></hr>  <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> name:<font  color = "white"> {coworkingSpaceName} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> Facilites:<font  color = "white"> {coworkingSpaceFacilites} </font></p>
       <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> location:<font  color = "white"> {coworkingSpaceLocation} </font></p>
       <p style={{ color : "#F9BB32",textAlign: "left",fontSize: " 15px "}}> businessPlans:</p>
       <hr style={lineStyle}></hr>
       {this.getPlan()}
       <br></br>
       <p style={{ color : "#F9BB32",textAlign: "left",fontSize: " 15px "}}> phoneNumbers:</p>
       <hr style={lineStyle}></hr>
       {this.getFacilities()}
       <br></br>
       <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Rooms:<Link style = {ButotnStyle} to={"/coWorkingSpaces/createRoom/"+this.state.coWorkingSpace._id}><button className="btn btn-danger btn-sm m-2" style = {ButotnStyle1}  >+</button></Link></p>
        <hr style={lineStyle}></hr>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> maxNoRooms:<font  color = "white"> {coworkingSpaceMaxNoRooms} </font></p>
       </div>
    
    }else{
      return <p style={{color:'white'}}>ya mo8fl eh ele d5lk hena</p>
    }
    }
    render() {
      return (
      
        <div style={{ width: '100%' , background : "#242424",margin:'0'}} >
        
        <img className="App-img" src={coWorkingSpace}   borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>
<br></br>
<button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  > Give Feedback</button> <font color='#A1A1A1'>|</font> <button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  > Chat</button>  <font color='#A1A1A1'>|</font> <button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  > Creat new Account</button>
    <br></br>
    <p></p>
        <div className="getSpec" style={{marginLeft:'250px',marginRight:'250px',paddingLeft:'20px',paddingRight:'20px',  border: '1px solid', borderRadius:(20,20,20,20)}} >
           {this.getData()} 

         <Rooms   rooms={this.state.rooms} coWorkingSpace = {this.state.coWorkingSpace} />
        
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
  export default GetSpec;
