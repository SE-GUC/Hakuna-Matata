

import React, { Component } from 'react';
import Navbar from '../common/Navbar';
import LoginForm from '../Forms/LoginForm'
import SignUpForm from '../Forms/SignUpForm'
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';

const store = require('store')
class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpClick: false,
      logInClick: false,
      isClose: false,
    }

    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickSignUp = this.handleClickSignUp.bind(this)
    this.handleClickLogIn = this.handleClickLogIn.bind(this)
  }
  handleClickClose(e) {
    console.log('hi world')
    this.setState({ isClose: true })
  }
  handleClickSignUp() {
    this.setState({ signUpClick: true })
    this.setState({ isClose: false })
    if (this.state.logInClick) {
      this.setState({ logInClick: false })
      this.setState({ isClose: false })

    }
  }
  handleClickLogIn() {
    console.log('here')

    this.setState({ logInClick: true })
    this.setState({ isClose: false })

    if (this.state.signUpClick) {
      this.setState({ signUpClick: false })
      this.setState({ isClose: false })


    }
  }
  render() {
    return (
      <div >
        <Navbar handleClickLogIn={this.handleClickLogIn}></Navbar>
        <div >
          <LoginForm isClose={this.state.isClose} handleClickClose={this.handleClickClose} logInClick={this.state.logInClick} handleChangetoken={this.props.handleChangetoken} />
        </div>
        <SignUpForm isClose={this.state.isClose} handleClickClose={this.handleClickClose} signUpClick={this.state.signUpClick} handleChangetoken={this.props.handleChangetoken} />
        <div className="postion" style={{
          textAlign:'right',
          left:' bound.left',
 
        }}>
        <div style={{position:'absolute',top:'720px',right:'350px',fontSize:'50px'}}> Be </div>
        <div  style={{position:'absolute',top:'770px',right:'80px',fontSize:'50px'}}> what you want </div>
       <div > 
       <Button  style={{position:'absolute',top:'850px',right:'80px',width:'320px'}} onClick={this.handleClickSignUp} variant='outline-dark' size='lg' >
          <div > Start Using Lirten HUB</div>
        </Button>
        </div>
        </div>
      </div>

    );
  }
}

export default Start;
