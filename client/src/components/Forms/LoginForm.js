
import React, { Component } from 'react';
import axios from 'axios'
import {Form , Button,Image} from 'react-bootstrap'
import { BrowserRouter as Router, Route,Redirect } from 'react-router-dom';
import '../../bootstrap.css'
import Facebook from './facebook.png'
import Instagram from './instagram.png'
import Twitter  from './twitter.png'
import Linkedin from './linkedin.png'
// x

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: '',
      isLoaded: false,
      redirect: false,
      id:'',
      tags:[]
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleClickClose = this.handleClickClose.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state.email)
  }
  handleSubmit(event) {

    event.preventDefault();
    axios.post(`http://localhost:3333/users/login`, {
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      this.setState({
        token: res.data
      })
      this.props.handleChangetoken(res.data)
        this.setState({isLoaded:true})
        this.setState({id:res.data.id})
        this.setState({tags:res.data.tags})
        this.setState({redirect: true})

    }).catch(e => {
      alert(e)
      this.props.handleChangetoken('')

    }).then(alert('A email loged in was submitted: '))

  } 
  getLoginStyle() {
    if (!this.props.isClose && this.props.logInClick) {
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

getpath(){
  if(this.state.tags.length>0)
    return `/HomePage`
    return `/History`
}
  render() {
    
    const {redirect} = this.state;
    if(redirect){
     return <Redirect push to={this.getpath()} /> }
    return (
<div style={this.getLoginStyle()} >
<Form onSubmit={this.handleSubmit}>
  <Form.Group controlId="formBasicEmail">
  <div class="container">
  <h1 style={{textAlign: "center"}}>Login</h1>
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
  </Form.Group>
  <Form.Group controlId="formBasicChecbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary"  type="sign in" block >
    Sign in 
  </Button>
  <Image src={Facebook} style={{width:'50px',height:'50px',position:'absolute',right:'310px',top:'350px'}} rounded />
  <Image src={Instagram} style={{width:'50px',height:'50px',position:'absolute',right:'240px',top:'350px'}} rounded />
  <Image src={Linkedin} style={{width:'50px',height:'50px',position:'absolute',right:'170px',top:'350px'}} rounded />
  <Image src={Twitter} style={{width:'50px',height:'50px',position:'absolute',right:'100px',top:'350px'}} rounded />
</Form>
</div>
    );
  }
}

export default LoginForm;
