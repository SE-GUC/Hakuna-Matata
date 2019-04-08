import React, { Component } from "react";
import axios from "axios";

export class GetSpecificRoomAtom extends Component {
    state = {
      r1: null
    };
    componentDidMount() {
      console.log("hello")
        const {id}=this.props.match.params
        axios
          .get(`http://localhost:3333/rooms/${id}`)
          .then(res => {
            this.setState({ r1: res.data})
            console.log(this.state.r1)
          }
            )
    }
    getData(){
      if(this.state.r1 != null){
        const {
          _id,
          reservedId,
          reservedDate ,
          capacity ,
          endOfReservation ,
          reserved
          } = this.state.r1;
      return <p>
          reservedId : {reservedId},
        reservedDate : {reservedDate} ,
        capacity : {capacity} ,
        endOfReservation : {endOfReservation} ,
        reserved : {reserved}
           </p>
    }else{
      return 'hello'
    }
    }
    render() {
      return (
        <div className="GetSpecificRoomAtom">
          <p> {this.getData()} </p>
        </div>
      );
    }
  }
  export default GetSpecificRoomAtom;