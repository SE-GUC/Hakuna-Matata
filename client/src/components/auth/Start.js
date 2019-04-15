

import React, { Component } from 'react';
import './Start.css';
import StartHeader from './StartHeader.js';
import LoginForm from '../forms/LoginForm'
import SignUpForm from '../forms/SignUpForm'

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpClick:false,
      logInClick:false,
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

    console.log('hi')
    if(this.state.logInClick){
      this.setState({ logInClick: false })
      this.setState({ isClose: false })

    }
  }
  handleClickLogIn() {
    this.setState({ logInClick: true })
    this.setState({ isClose: false })

    if(this.state.signUpClick){
      this.setState({ signUpClick: false })
      this.setState({ isClose: false })


    }
  }
  render() {
    return (
      <div className="Start">
        <StartHeader style={{
          padding: 0,
          margin: 0,
        }} handleClickLogIn={this.handleClickLogIn} >
        </StartHeader>
      <div style={{
       
       
      }}>  <LoginForm  id ={this.props.id} isClose={this.state.isClose} handleClickClose ={this.handleClickClose} logInClick={this.state.logInClick} handleChangetoken={this.props.handleChangetoken} /> 
      </div> 
        <SignUpForm  isClose={this.state.isClose} handleClickClose={this.handleClickClose} signUpClick={this.state.signUpClick} handleChangetoken={this.props.handleChangetoken}   />
      
                  <div style={{
                    position: 'absolute',
                    left: '66%',
                    top: '70%',
                    fontSize: 50,
                    color:'white'
                  }} > Be... </div>
                  <div style={{
                    position: 'absolute',
                    left: '66%',
                    top: '75%',
                    fontSize: 50,
                    color:'white'
                  }} >  What you want </div>
                              <button style={{
              borderRadius: (15, 50, 30, 5),
              position: 'absolute',
              background: '#383838',
              width: 330,
              height: 50,
              left: '66%',
              top: '83%',

            }} onClick={this.handleClickSignUp} >
              <div style={{
                color: 'white',
                fontSize: 20

              }}> Start Using Lirten HUB</div>
                          </button>

                  </div>
               
    );
  }
}

export default Start;
