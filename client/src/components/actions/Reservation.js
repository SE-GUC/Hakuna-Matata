import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TaskMembers.css";
var store = require("store");
export class AppliedCourse extends Component {
  
    async handleClick() {
        console.log(this.props.res._id)
        if(store.get('payload').id==this.props.id){
        
        const  resId = this.props.res._id
         const data = {
            reservationId:  resId,
               state:true
             };
         console.log(data)
         
        await axios.put(`http://localhost:3333/coWorkingSpaces/reservation/${this.props.id}/${this.props.roomId}`, data);
        // window.location.reload(); 
      }else return
    
    }
    async handleClickReject() {
        console.log(this.props.res._id)
        if(store.get('payload').id==this.props.id){
            const id = this.props.id
            const  resId = this.props.res._id
             const data = {
                reservationId:  resId,
               state:false
             };
          
             console.log(data)
             
            await axios.put(`http://localhost:3333/coWorkingSpaces/reservation/${id}/${this.props.roomId}`, data);
            // window.location.reload(); 
       }else{
           return
       }
    }
      getMembers() {
        if(store.get('payload').id==this.props.id&&this.props.res.isAccpted==false){
      return (
        <div>
          
          <button  onClick={this.handleClick.bind(this)}>
              Accept
          </button>
          <button  onClick={this.handleClickReject.bind(this)}>
              Reject
          </button>
        </div>
      );
     }else  return
       
         
     }
    
  
  render() {
console.log(this.props.res._id)
    return <div style={{ background: "#e5e8e8" }}>
    <p>SLOT: {this.props.res.slot}
        <span style={{float:"right"}}>ReservationDate: {this.props.res.reservationDate}</span></p>
        <p>
            reserverName: <Link
            to={`/users/${this.props.res.reserver.id}`}
            style={{ color: "black" }}
          >
            {this.props.res.reserver.name}
          </Link>
          </p>
    {this.getMembers()}
    
    
    </div>;
  }
}

export default AppliedCourse;
