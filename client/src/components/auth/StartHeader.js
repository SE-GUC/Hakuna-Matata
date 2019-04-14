




import React, { Component } from 'react';
import './StartHeader.css';
// import { Link } from 'react-router-dom';



class StartHeader extends Component {

  render() {
    return (
        <div style={{    
          backgroundColor:' #242424',
          padding:'0px',
          margin:'0px ',
          fontSize:'25px',
          borderBottom: '1px solid darkgrey'        }
        }
          >
        <div className='Logo'>Lirtenhub</div>
        <div style={{
              position: 'absolute',
              right:  '0.09em',
              top:  '0em',
        }}>
        <button style={this.buttonHAStyle()}> Help</button>
        <button style={this.buttonHAStyle()}> About Us</button>
        <button style={this.buttonSignin()} onClick={this.props.handleClickLogIn}> Sign in</button>
        </div>
      </div>
    );
  }

  buttonHAStyle(){
    return{
      width: 100,
      height: 25,
      border:'none',
      backgroundColor: 'Transparent',
      fontSize:'20px',
      fontWeight:'200',
      color:'white'

 
    }
  }
  buttonSignin(){
    return{
      width: 100,
      height: 25,
      border:'none',
      backgroundColor: 'Transparent',
      fontWeight:'200',
      fontSize:'20px',
      color:'#F9BB32'
    }  
  } 
}

export default StartHeader;