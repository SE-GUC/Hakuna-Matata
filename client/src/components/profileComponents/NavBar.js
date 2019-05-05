import React, { Component } from 'react'
import{BrowserRouter as Router,Link,Route} from 'react-router-dom'

 class NavBar extends Component {
    
  render() {
    const headerStyle={
      color: "#ffffff",
      width: "138px",
      height: "6.828703703703703%",
      fontFamily:"Microsoft Yi Baiti",
      fontSize:"20px",
      fontWeight:"200",
      letterSpacing:"2px",
      position: "absolute",
      top:"-15px",
      left:"0%",
    }
    const borderStyle={
      width:"99.6%",
      height:"4.05%",
      borderBottom:"1px solid #707070",
      backgroundColor:"#242424",
      position:"fixed",
      top:"0%",
      left:"0%"}

    const secondHeaderStyle={
      color: "#ffffff",
      width: "67px",
      height: "34px",
      fontFamily:"Arial",
      fontSize:"18px",
      fontWeight:"200",
      letterSpacing:"1.2px",
      position: "absolute",
      top:"0px",
      left:"0.5%",
      textTransform:"uppercase"
    }

    
    const taskLink= {
        color: "#959595",
        textDecoration: "none" ,
        fontFamily:"Cambria",
        fontSize:"20px",
        fontWeight:"200",
        position: "absolute",
        top:"0.347222%",
        left:"75%",
      
   }

    const memberLink={
        color: "#959595",
        textDecoration: "none" ,
        fontFamily:"Cambria",
        fontSize:"20px",
        fontWeight:"200",
        position:"absolute",
        top:"0.347222%",
        left:"79%",
    }
    const partnerLink={
        color: "#959595",
        width: "166px",
        height: "51px",
        textDecoration: "none" ,
        fontFamily:"Cambria",
        fontSize:"20px",
        fontWeight:"200",
        position:"absolute",
        top:"0.347222%",
        left:"85%",
        
        
    }
    const moreLink={
        color: "#959595",
        textDecoration: "none" ,
        fontFamily:"Cambria",
        fontSize:"20px",
        fontWeight:"200",
        position:"absolute",
        top:"0.347222%",
        left:"90.5%"
    }
    const notificationStyle={
      width:"45px",
      height:"30px",
      position:"absolute",
      top:"0.347222%",
      left:"94%"

    }
    const loginStyle={
      width:"58px",
      height:"30px",
      position:"absolute",
      top:"0.347222%",
      left:"96.4%"

    }
    const lirtenLoginStyle={
      width:"50px",
      height:"30px",
      position:"absolute",
      top:"0.347222%",
      left:"2.5%"

    }
      return (
      <div style = {borderStyle}>
        <h1 style={headerStyle}>Lirten</h1>
        <h2 style={secondHeaderStyle}>Hub</h2>
        <ul>
     <Link style={taskLink} to="/tasks">Tasks</Link>
      <Link style={memberLink} to="/members">Members</Link>
      <Link style={partnerLink} to="/partners">Partners</Link>
      <Link style={moreLink} to="/">More</Link>
     </ul>
     <img  style={notificationStyle} src={require('../../assessments/notification.svg')} />
     <img  style={loginStyle} src={require('../../assessments/loginIcon.svg')} />
     <img  style={lirtenLoginStyle} src={require('../../assessments/lirtenlogo_icon.svg')} />
      </div>
    )
  }
}

export default NavBar

