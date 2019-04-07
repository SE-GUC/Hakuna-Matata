import React, { Component } from "react";
import axios from "axios";
export class GetSpec extends Component {
    state = {
      room :null
    };
    componentDidMount() {
        const {id,roomId}=this.props.match.params
  
            axios
          .get(`http://localhost:3333/coworkingSpaces/showRoom/${id}/${roomId}`)
          .then(res => {
            this.setState({ room: res.data})
            console.log(this.state.room)
            
          }
            )
        
            console.log(this.state.room)
    };
    getData(){
      if(this.state.room != null){
      const {
        capacity,
        reservedDate,
        
        endOfReservation,
        reservedId,
        
      } = this.state.room;
      return <p> capacity: {capacity} reservedDate: {reservedDate}  endOfReservation: {endOfReservation} reservedId: {reservedId} </p>
    }else{
      return 'ya mo8fl eh ele d5lk hena'
    }
    }
    render() {
      return (
        <div className="getSpecRoom">
         <h1>MY Room Profile</h1>
     
          {this.getData()} 
        </div>
      );
    }
  }
  export default GetSpec;