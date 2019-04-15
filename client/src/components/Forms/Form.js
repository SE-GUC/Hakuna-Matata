

import React, { Component } from 'react';
import './Form.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

// x

class Form extends Component {
  constructor(props) {
    super(props);
   this.state={
       name:'',
       type:''
   }
    this.onChange = this.onChange.bind(this)
    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }     
  handleSubmitSignUp(event) {

    event.preventDefault();
    if (this.state.newPassword === this.state.newRePassword) {
      axios.post(`http://localhost:3333/users/register`, {
        email: this.state.newEmail,
        password: this.state.newPassword,
        fullName: 'Ali Mohamed'
      }).then(res => {
        
      })
    } else {
      alert('the passwords Dont match')
    }

  }

  getFormStyle1() {

    return {
      width: 250,
      height: 40,
      borderRadius: (10, 10, 10, 10),
      marginTop: '10px',
      backgroundColor: 'Transparent',
      borderColor:'white'
    }
  }


  render() {
          //           
    return (
        <form onSubmit={this.handleSubmitSignUp} className="Field" >
        {

        this.props.inputs.map( ( input) => (
        <input  placeholder={input.name} type={input.type} name={input.name} value={this.state.name} onChange={this.state.onChange} style={this.getFormStyle1()}/>
      ))
      }
      </form>
      );
     
    // return (


 
        
    //         <div style={this.getSignUpStyle()}>
    //           <form onSubmit={this.handleSubmitSignUp} className="Field" >
    //             <button style={{

    //               color: 'Red',
    //               marginLeft: '280px',
    //               border: 'none',
    //               fontSize: 14,
    //               backgroundColor: 'Transparent'

    //             }} onClick={this.handleClickClose}>X</button>

    //             <br></br>
    //             <input type="text" placeholder=" Email" name="newEmail" onChange={this.onChange} value={this.state.newEmail} style={this.getFormStyle1()} required />
    //             <br></br>
    //             <input type="password" placeholder="Password" name="newPassword" onChange={this.onChange} value={this.state.newPassword} style={this.getFormStyle1()} required />
    //             <input type="password" placeholder="Re-Password" name="newRePassword" onChange={this.onChange} value={this.state.newRePassword} style={this.getFormStyle1()} required />

    //             <br></br>
    //             <button type="submit" style={this.getFormStyle1()} >
    //               <div style={{
    //                 color: 'black',
    //                 fontSize: 20
    //               }}> Start
    //             </div>
    //             </button><br></br>

    //           </form>
  

    // );
  }
}

export default Form;
