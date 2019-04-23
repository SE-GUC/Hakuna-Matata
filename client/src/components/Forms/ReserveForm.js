
import React, { Component } from 'react';
import axios from 'axios'
import { Link , Redirect } from "react-router-dom";



// x

export class ReserveForm extends Component {
  constructor(props) {
    super(props);
    this.state={
        name:null,
        date:null,
        slot:null,
        reserved:false
    }
  

    this.onChange = this.onChange.bind(this)
  }



   
  onSubmit = (e) => {

    const {roomId}=this.props.match.params
    
         axios.put(`http://localhost:3333/rooms/${roomId}/reserve`,{
            slot:this.state.slot,
            reservationDate: this.state.date,
            reserverID:"5cac402653d4b1157fc7e227",
             reserverName:this.state.name,
             isAccpted:false
                   
        }).then(res=>{
            alert('reserved Sucessfully')
            this.setState({reserved:true});

        }

        ).catch(err=>{alert(err.response.error)}
        );
      
 
  }
  onChange(e) {
    
    switch(e.target.name){
        case 'slot':
       this.setState({slot:e.target.value})

        break;
        case 'date':
        this.setState({date:e.target.value})
        
        break;
        case 'name':
        this.setState({name:e.target.value})
      
        break;

    }
  }

  getFormStyleInput() {

    return {
      width: '80%',
      padding: '6%',
      marginTop: '3%',
      marginLeft: '3%',
      border: '1px solid #F9BB32',
      backgroundColor: 'Transparent',
    }
  }
  getFormStyleButton() {


      return {
        width: '80%',
        padding: '4.5%',
        marginTop: '10px',
        marginLeft: '10%',
        backgroundColor: '#F9BB32',
        display: 'block'
  
      }
    
  }
  overRideButton() {

    return {
      width: '80%',
      padding: '4.5%',
      marginTop: '10px',
      marginLeft: '10%',
      backgroundColor: '#F9BB32',
      display: 'block'

    
  
  }}
  getLoginStyle() {
      return {
        position: 'Absolute',
        bottom: '30%',
        right: '42%',
        width: '20%',
        height: '40%',
        display: 'block',
        border: '2px solid #F9BB32',
        backgroundColor: 'white'


      }
   
  }


  render() {
      
    const {id,roomId}=this.props.match.params
    if(this.state.reserved){
        console.log('heree')
        return(
        <div>
        
        <Redirect to=  {"/coWorkingSpaces/"+id+"/showRooms/"+roomId}  ></Redirect>
        </div>)
        
    }
    else{
    return (
      <div style={this.getLoginStyle()}>

      <p>Please enter reservation details</p>
      
  
          <input type="text" placeholder="Slot" name="slot" onChange={this.onChange} style={this.getFormStyleInput()} required />
          <br></br>
          <input type="text" placeholder="Date" name="date" onChange={this.onChange}  style={this.getFormStyleInput()} required />
          <br></br>
          <input type="text" placeholder="User Name" name="name" onChange={this.onChange}  style={this.getFormStyleInput()} required />
          <br></br>
          <button type="submit" onClick={this.onSubmit}
 style={this.getFormStyleButton()} >
            <div style={{
              color: 'black',
              fontSize: 20
            }}> Reserve
                </div>
          </button>
          <br></br>

      
      </div>
    );
  }
}
}

export default ReserveForm;
