import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
export class Reservation extends Component {
  constructor(props) {
    super(props)
    this.state={
      reservationId:props.reservationId,
      roomId:props.roomID,
      isAccepted:props.isAccepted
    }
    this.setState({reservationId:this.props.reservationId,
    roomId:this.props.roomId,
  name:this.props.name})
  
    this.acceptReservation = this.acceptReservation.bind(this)
}


  
  getStyle = () =>{
return{
    background : '#242424',
    pading : '10px',
     testAlign:'left'
}
  }
   

acceptReservation(){
  const reservationId=this.state.reservationId
  const roomId=this.state.roomId
  console.log(reservationId)
  console.log(roomId)
  
  axios.put(`http://localhost:3333/rooms/${roomId}/accept/${reservationId}`).then(res=>{
    console.log('heree2')
    if(res.status==200){
      alert('Accepted reservation')
      window.location.reload();
    }
    else{
      alert('Something went wrong')
    }
            
           

        }

        ).catch(err=>{alert(err.response.error)}
        );
}

    render() {
      if(this.state.isAccepted){
        return (
          <div style={this.getStyle()}>
            <p style ={{color :"white", textAlign: "left" , fontSize :'18px'}}>{this.props.name}  
            <text style ={{color :"green", textAlign: "right" , fontSize :'18px',position:'absolute', right:'21%'}}>Accepted</text>
     
            
            </p>
           
          </div>
        )
      }
      else{
        return (
          <div style={this.getStyle()}>
            <p style ={{color :"white", textAlign: "left" , fontSize :'18px'}}>{this.props.name}
        <button className="btn btn-danger btn-sm m-2" style = {ButotnStyle} onClick={this.acceptReservation} >Accept</button>
            
            </p>
           
          </div>
        )
      }
 
  }
}
const ButotnStyle = {
  backgroundColor:'#242424',
    color :'white',
    testAlign:'center',
    pading:'15px 32px',
    borderRadius:'12px',
    float :'right',
    fontSize:'18px'

}

export default Reservation
