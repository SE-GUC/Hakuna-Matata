
import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';


// x

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: '',
      isLoaded: false,
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
  // handleClickClose(e) {
  //   this.setState({ isClose: true })
  // }
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
      console.log(res.data)
        this.setState({isLoaded:true})
        this.setState({id:res.data.id})
        this.setState({tags:res.data.tags})
    }).catch(e => {
      alert(e.response.error)
      this.props.handleChangetoken('')

    }).then(alert('A email loged in was submitted: '))

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

getpath(){
  if(this.state.tags.length>0)
    return `/HomePage`
    return `/startAS`
}
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
          <Link id={this.state.id} tags={this.state.tags} style={this.overRideButton()} to={{
                        pathname:this.getpath(),

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
    );
  }
}

export default LoginForm;
