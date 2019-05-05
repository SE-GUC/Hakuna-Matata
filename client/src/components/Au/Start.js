

import React, { Component } from 'react';
import Navbar from '../layout/Navbar';
import LoginForm from './Login'
import SignUpForm from './Register'
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import './Start.css'
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
      <div  >
   <LoginForm/>
      </div>

    );
  }
}

export default Start;
