
import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import {Form , Button,Image} from 'react-bootstrap'
import { BrowserRouter as Router, Route,Redirect } from 'react-router-dom';
import '../../bootstrap.css'
const store = require('store')
// x

class MemberForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     slot: '',
     reservationDate: '',
     name:'',
     token: '',
      isClose: false,
      isLoaded:false,

    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleClickClose = this.handleClickClose.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state.slot)
    console.log(this.state.reservationDate)
    console.log(this.state.name)
  }
  // handleClickClose(e) {
  //   this.setState({ isClose: true })
  // }
//   async handleClick() {
        
//     const {id,roomId}=this.props.match.params
   


//  };
//  console.log(data)
//     await axios.put(`http://localhost:3333/coWorkingSpaces/room/reserve/${id}/${roomId}`, data).catch(e => {
//         alert(e)
//       }).then(alert('Done: '));
//    window.location.reload(); 
// }


async handleSubmit() {
    const id=this.props.id
    const roomId=this.props.roomId
    console.log(id)
    console.log(roomId)
const idUser =store.get('payload').id
          const data = {
                  slot: this.state.slot,
                  reservationDate:this.state.reservationDate,
                  reserver:{
                      id:idUser,
                      name:this.state.name
                  }
                };
                console.log(data)
                await axios.put(`http://localhost:3333/coWorkingSpaces/room/reserve/${id}/${roomId}`, data).catch(e => {
                    alert(e)
                  }).then(alert('Done: '));
                window.location.reload(); 
   
  }


  getLoginStyle() {
      return {
        borderRadius: (15, 50, 30, 5),
        height: 200,
        background: 'transparent',
        width: 250,
        testAlign:'center'

      }
    } 
  


  render() { 

  return (
<div style={this.getLoginStyle()} >

<Form.Group controlId="formBasicEmail">

<Form.Label style={{textAlign:'left'}}>Slot</Form.Label>
  <Form.Control  placeholder="Enter Slot wanted"  name="slot"style={{
    backgroundColor:'transparent'}} onChange={this.onChange} value={this.state.slot}/>
{/* <input type="text" class="form-control" placeholder="Enter full name" style={{
    backgroundColor:'transparent'
  }}  onChange={this.onChange} value={this.state.fullName}></input> */}
</Form.Group>

<Form.Group controlId="formBasicEmail">
<Form.Label style={{textAlign:'left'}}>ReservationDate</Form.Label>
  <Form.Control  placeholder="Enter Date wanted"  name="reservationDate" style={{
    backgroundColor:'transparent'}} onChange={this.onChange} value={this.state.reservationDate}/>

</Form.Group>


<Form.Group controlId="formBasicEmail">
<Form.Label style={{textAlign:'left'}}>name of Reserver</Form.Label>
  <Form.Control  placeholder="Enter Date wanted"  name="name"style={{
    backgroundColor:'transparent'}} onChange={this.onChange} value={this.state.name}/>
</Form.Group>
<Button variant="primary"  type="create" block  onClick={this.handleSubmit}>
 Reserve
</Button>

</div>

    );
  }
}

export default MemberForm;
