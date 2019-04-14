

import React, { Component } from 'react';
import axios from 'axios'


// x

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rePassword: '',
      token: '',
      isClose: false,
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleClickClose = this.handleClickClose.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state.email)
  }
  // handleClickClose(e) {
  //   this.setState({ isClose: true })
  // }
  handleSubmit(event) {

    event.preventDefault();
    if (this.state.password === this.state.rePassword) {
      axios.post(`http://localhost:3333/users/register`, {
        email: this.state.email,
        password: this.state.password,
        fullName: 'Ali Mohamed'
      }).then(res => {
        alert(res.state)
        console.log(res.data)
        window.location.href='startAs';
      })
    } else {
      alert('the passwords Dont match')
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
    }
  }
  getSignUpStyle() {
    if (!this.props.isClose&&this.props.logInClick) {
      return {
        position: 'Absolute',
        bottom: 350,
        right: 700,
        width: '20%',
        height: '35%',
        display: 'block',
        border: '2px solid #F9BB32',
        backgroundColor: 'white'


      }
    } else {

      return {
        position: 'Absolute',
        bottom: 400,
        right: 600,
        width: '20%',
        height: '36%',
        display: 'none'
      }
    }
  }


  render() {
    return (
      <div style={this.getSignUpStyle()}>
        <form onSubmit={this.handleSubmit} className="Field" >
          <br></br>
          <button style={{

            color: 'Red',
            marginLeft: '90%',
            border: 'none',
            fontSize: 14,
            backgroundColor: 'Transparent'


          }} onClick={this.props.handleClickClose} >X</button>
          <input type="text" placeholder=" Email" name="email" onChange={this.onChange} value={this.state.email} style={this.getFormStyleInput()} required />
          <br></br>
          <input type="password" placeholder="Password" name="password" onChange={this.onChange} value={this.state.password} style={this.getFormStyleInput()} required />
          <br></br>
          <input type="password" placeholder="Re-Password" name="rePassword" onChange={this.onChange} value={this.state.rePassword} style={this.getFormStyleInput()} required />
          <br></br>
          <button type="submit" style={this.getFormStyleButton()} >
            <div style={{
              color: 'black',
              fontSize: 20
            }}> Start
                </div>
          </button>
          <br></br>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
