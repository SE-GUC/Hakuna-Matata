
import React, { Component } from 'react';
import {Nav,Navbar,Button} from 'react-bootstrap';
import './Navbar.css'
import '../../bootstrap.css'
import axios from 'axios'
import { BrowserRouter as Router, Route,Redirect } from 'react-router-dom';


// x

class NavbarStart extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isLoading: false,
      redirect:false
    };
  }

   handleClick() {
  
    this.setState({ isLoading: true }, () => {
    console.log('here')
      axios.get(`http://localhost:3333/members`).then(res => {
        this.setState({ isLoading: false });
      });
      this.props.handleClickLogIn();

    });
  }

fontStyle(){
  return{
    color:'white'
  }
}
  render() {
     const { isLoading } = this.state;

    return (

        <Navbar collapseOnSelect expand="lg"  variant="dark"  >
        <Navbar.Brand href="#home" className="Navbar-Brand"> <div style={{
           color:'grey',
           fontSize:35
        }} >LirtenHub</div></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            <Nav.Link href="/" >
            <div style={this.fontStyle()}>Help</div>
            </Nav.Link>
            <Nav.Link eventKey={2} href="/">
            <div style={this.fontStyle()}>About</div>
            
            {/* <div style={this.fontStyle()}>About us</div> */}
            </Nav.Link>
            <Button 
          
        disabled={isLoading}
        onClick={!isLoading ? this.handleClick : null}
        bsPrefix="Button"
      >
        <div style={this.fontStyle()}>{isLoading ? 'Loading…' : 'Sign In'}</div> 
      </Button>
           
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
    );
  }
}

export default NavbarStart;
