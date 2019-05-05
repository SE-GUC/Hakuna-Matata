import React, { Component } from "react";
import axios from "axios";
import Rooms from './Rooms';
import Facilite from './Facilite';
import {Link} from 'react-router-dom';
//import co from '../models/User'


// import BusinessPlan from '../../profileComponents/BusinessPlan';
export class updateCo extends Component {
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

    getData(){
      if(this.state.coWorkingSpace != null){
      const {
        _id,
        coworkingSpaceName,
        
        coworkingSpaceLocation,
        
        coworkingSpaceFacilites,
        coworkingSpaceMaxNoRooms ,
        coworkingSpacePhoneNumber
      } = this.state.coWorkingSpace;

      let nums ="";
      if(coworkingSpacePhoneNumber != null){
  for(let i=0 ; i<coworkingSpacePhoneNumber.length ; i++ ){
    nums += coworkingSpacePhoneNumber[i]
      if((i+1)<coworkingSpacePhoneNumber.length){
        nums += " | "
      }
      }}
      return<div> <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> Personal </p> 
       <hr style={lineStyle}></hr>  <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> name:<font  color = "white"> <input type="text" id="name_txt" defaultValue = {coworkingSpaceName} ></input> </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> Facilites:<font  color = "white"> <input type="text" id="Facilites_txt" defaultValue= {coworkingSpaceFacilites} ></input> </font></p>
       <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> location:<font  color = "white">  <input type="text" id="location_txt" defaultValue= {coworkingSpaceLocation} ></input> </font></p>
       <p style={{ color : "#F9BB32",textAlign: "left",fontSize: " 15px "}}> businessPlans:</p>
       <hr style={lineStyle}></hr>
       <br></br>
       <p style={{ color : "#F9BB32",textAlign: "left",fontSize: " 15px "}}> phoneNumbers: </p>
       <hr style={lineStyle}></hr>
       <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> phone number:<font  color = "white"> <input type="text" id="phone_txt" defaultValue= {nums} ></input> </font></p>
       <br></br>
       <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Rooms:</p>
        <hr style={lineStyle}></hr>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> maxNoRooms:<font  color = "white"> <input type="text" id="room_txt" defaultValue= {coworkingSpaceMaxNoRooms}></input> </font></p>
       </div>
    
    }else{
      return <p style={{color:'white'}}>ya mo8fl eh ele d5lk hena</p>
    }
    }
     deleteFun(){
     

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    axios.delete('http://localhost:3333/coworkingSpaces/'+id)
    window.alert(id)
    window.location('http://localhost:3333/coworkingSpaces/'+id)
      }
      updateFun (){
        const coworkingSpaceName = document.getElementById("name_txt").value
        const coworkingSpaceFacilites = document.getElementById("Facilites_txt").value
        const coworkingSpaceLocation = document.getElementById("location_txt").value
        const coworkingSpacePhoneNumber = document.getElementById("phone_txt").value
        const coworkingSpaceMaxNoRooms = document.getElementById("room_txt").value
        const data = {
          coworkingSpaceName,
          coworkingSpaceFacilites,
          coworkingSpaceLocation,
          coworkingSpacePhoneNumber,
          coworkingSpaceMaxNoRooms
        }
        var url = window.location.pathname;
         var id = url.substring(url.lastIndexOf('/') + 1);
         axios.put('http://localhost:3333/coWorkingSpaces/' + id , data)
         window.location =  `http://localhost:3000/coWorkingSpaces/${id}`
      }
    render() {
      return (
        <div style={{ width: '100%' , background : "#242424",margin:'0',textAlign:"center"}} >
        
        <img className="App-img"  class="center"  borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>
<br></br>
<button className="btn btn-danger btn-sm m-2" style = {ButotnStyle} onClick ={this.updateFun.bind(this)} > update </button>
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

  export default updateCo;
