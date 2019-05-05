
import React, { Component } from 'react';
import axios from 'axios'
import {Form , Button} from 'react-bootstrap'
import '../../bootstrap.css'
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
        alert('Fola 3lek')
        console.log(res.data)
        this.props.handleClickClose()
})
    } else {
      alert('the passwords Dont match')
    }

  }
   getLoginStyle() {
      if (!this.props.isClose && this.props.signUpClick) {
        return {
          position:'absolute',
          right:'600px',
          top:'300px',
          backgroundColor:'transparent',
          display: 'block',
          width:'24%',
          height:'50%',
          padding:'10px',
  
        }
      } else {
        return {
      
          display: 'none'
        }
      }
    }
  

  render() {
    
   
    return (
  <div style={this.getLoginStyle()} >
  <Form onSubmit={this.handleSubmit}>
  <Form.Group controlId="formBasicEmail">
  <div class="container">
  <h1 style={{textAlign: "center"}}>Join our Family</h1>
  </div>
  <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email"  name="email"style={{
      backgroundColor:'transparent'
    }}  onChange={this.onChange} value={this.state.email}  />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label><br></br>
    <Form.Control type="password" placeholder="Password"  name="password"  style={{
      backgroundColor:'transparent'
    }} onChange={this.onChange} value={this.state.password} />
    <Form.Label>Re-Password</Form.Label><br></br>
    <Form.Control type="password" placeholder="Re-Password"  name="rePassword"  style={{
      backgroundColor:'transparent'
    }} onChange={this.onChange} value={this.state.rePassword} />
  </Form.Group>
  
  <Button variant="primary"  type="sign up" block >
    Sign up 
  </Button>
  
  </Form>
  </div>
    );
  }
}

export default SignUpForm;
