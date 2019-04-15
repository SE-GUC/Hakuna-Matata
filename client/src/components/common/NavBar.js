




import React, { Component } from 'react';
import { ReactComponent as ProfileIcon } from '../../assessments/profileIconsvg.svg';
import { Link } from 'react-router-dom';



class NavBar extends Component {
  constructor(props){
    super(props);
    
  }
  
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
        
       <Link to={{
                        pathname: `/HomePage`,

                    }} style={this.buttonSignin()} > Tasks</Link>
       <Link to={{
                        pathname: `/members`,

                    }} style={this.buttonSignin()} > Members</Link>
       <Link  to={{
                        pathname: `/partner`,

                    }}style={this.buttonSignin()} > Partners</Link>
        <Link to={{
                        pathname: `/`,

                    }}style={this.buttonSignin()} > More</Link>
        <ProfileIcon style={this.img()} ></ProfileIcon>

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
  img(){
    return{
      width: 100,
      height: 23,
      border:'none',
      backgroundColor: 'Transparent',
      fontWeight:'200',
      fontSize:'20px',
      color:'#F9BB32'
    }  
  }  
}

export default NavBar;