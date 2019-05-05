
import React, { Component } from 'react';
import axios from 'axios'
<<<<<<< HEAD
import {Form , Button,Image} from 'react-bootstrap'
import { BrowserRouter as Router, Route,Redirect } from 'react-router-dom';
import '../../bootstrap.css'
import Facebook from './facebook.png'
import Instagram from './instagram.png'
import Twitter  from './twitter.png'
import Linkedin from './linkedin.png'
=======
import { Link } from 'react-router-dom';


>>>>>>> master
// x

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: '',
      isLoaded: false,
<<<<<<< HEAD
      redirect: false,
      id:'',
      tags:[]
=======
      id:'',
>>>>>>> master
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleClickClose = this.handleClickClose.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state.email)
  }
<<<<<<< HEAD
  handleSubmit(event) {

    event.preventDefault();
    console.log(this.state.email)
    console.log(this.state.password)
=======
  // handleClickClose(e) {
  //   this.setState({ isClose: true })
  // }
  handleSubmit(event) {

    event.preventDefault();
>>>>>>> master
    axios.post(`http://localhost:3333/users/login`, {
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      this.setState({
        token: res.data
      })
<<<<<<< HEAD
      this.props.handleChangetoken(res.data)
        this.setState({isLoaded:true})
        this.setState({id:res.data.id})
        this.setState({tags:res.data.tags})
        this.setState({redirect: true})

=======
      console.log('hi')
      this.props.handleChangetoken(res.data)
      
        this.setState({isLoaded:true})
        this.setState({id:res.data.id})
>>>>>>> master
    }).catch(e => {
      alert(e)
      this.props.handleChangetoken('')

    }).then(alert('A email loged in was submitted: '))

<<<<<<< HEAD
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
=======
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

    if(!this.state.isLoaded){
      return {
        width: '80%',
        padding: '4.5%',
        marginTop: '10px',
        marginLeft: '10%',
        backgroundColor: '#F9BB32',
        display: 'block'
  
      }
    }else{
      return {
        width: '80%',
        padding: '4.5%',
        marginTop: '10px',
        marginLeft: '10%',
        backgroundColor: '#F9BB32',
        display: 'none'
      }
    }
  }
  overRideButton() {
  if(this.state.isLoaded){
    return {
      width: '80%',
      padding: '4.5%',
      marginTop: '10px',
      marginLeft: '10%',
      backgroundColor: '#F9BB32',
      display: 'block'

    }
  }else{
    return {
      width: '80%',
      padding: '4.5%',
      marginTop: '10px',
      marginLeft: '10%',
      backgroundColor: '#F9BB32',
      display: 'none'
    }
  }}
  getLoginStyle() {
    if (!this.props.isClose && this.props.logInClick) {
      return {
        position: 'Absolute',
        bottom: 350,
        right: 700,
        width: '20%',
        height: '30%',
        display: 'block',
        border: '2px solid #F9BB32',
        backgroundColor: 'white'

>>>>>>> master

      }
    } else {
      return {
<<<<<<< HEAD
=======
        position: 'Absolute',
        bottom: 400,
        right: 600,
        width: '20%',
        height: '36%',
>>>>>>> master
        display: 'none'
      }
    }
  }

<<<<<<< HEAD
getpath(){
  if(this.state.tags.length>0)
    return `/HomePage`
    return `/StartAs`
}
  render() {
    
    const {redirect} = this.state;
    if(redirect){
      window.location.href= this.getpath()
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
=======

  render() {
    return (
      <div style={this.getLoginStyle()}>
        <form onSubmit={this.handleSubmit} className="Field" >
          <br></br>
          <button style={{

            color: 'Red',
            marginLeft: '90%',
            border: 'none',
            fontSize: 14,
            backgroundColor: 'Transparent'


          }} onClick={this.props.handleClickClose}>X</button>
          <input type="text" placeholder=" Email" name="email" onChange={this.onChange} value={this.state.email} style={this.getFormStyleInput()} required />
          <br></br>
          <input type="password" placeholder="Password" name="password" onChange={this.onChange} value={this.state.password} style={this.getFormStyleInput()} required />
          <br></br>
            <button type="submit" style={this.getFormStyleButton()} >
            <div style={{
              color: 'black',
              fontSize: 20
            }}> Sign in
                </div>
          </button>
          <Link id={this.props.id} style={this.overRideButton()} to={{
                        pathname: `/startAS`,

                    }}> Go</Link>
          <br></br>
          {/* <p style={{
                  color: '#364C5F',
                  fontSize: 12,
                  textAlign: 'left',
                  paddingLeft: '48px'
                }}>not member?</p>  */}
          {/* <button style={{
                  position: 'absolute',
                  paddingLeft: '10px',
                  color: 'white',
                  bottom: '73px',
                  left: '130px',
                  border: 'none',
                  fontSize: 14,
                  backgroundColor: 'Transparent'

                }} onClick={this.handleClickSignup}>create an account</button> */}
        </form>
      </div>
>>>>>>> master
    );
  }
}

export default LoginForm;
