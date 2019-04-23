

import React, { Component } from 'react';
// import './Start.css';
// import StartHeader from './StartHeader.js';
import ReactCardFlip from 'react-card-flip';
import MemberForm from '../Forms/MemberForm'
import PartnerForm from '../Forms/PartnerForm'
import CoworkingSpaceForm from '../Forms/CoworkingSpaceForm'
import EducationOrganizationForm from '../Forms/EducationOrganizationForm'
import ConsultancyForm from '../../components/Forms/ConsultancyForm'
import member from '../../assessments/man.jpg'
const store = require('store')
class StartAs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberClose: false,
      partnerClose: false,
      coworkingSpaceClose: false,
      educationOrganizationClose: false,
      consultancyClose: false,
      tags: ['CoworkingSpace'],

      memberDisplay: false,
      partnerDisplay: false,
      coworkingSpaceDisplay: false,
      educationOrganizationDisplay: false,
      consultancyDisplay: false,
      isFlippedMember: false,
      isFlippedPartner:false,
      isFlippedCoWorkingSpace:false,
      isFlippedConsultancyAgency:false,
      isFlippedEducationalOrganization:false
    }

    this.handleClickMemberClose = this.handleClickMemberClose.bind(this)
    this.handleClickPartnerClose = this.handleClickPartnerClose.bind(this)
    this.handleClickCoworkingSpaceClose = this.handleClickCoworkingSpaceClose.bind(this)
    this.handleClickEducationOrganizationClose = this.handleClickEducationOrganizationClose.bind(this)
    this.handleClickConsultancyClose = this.handleClickConsultancyClose.bind(this)
    this.handleClickFlippPartner = this.handleClickFlippPartner.bind(this);
    this.handleClickFlippMember = this.handleClickFlippMember.bind(this);
    this.handleClickFlippCoWorkingSpace = this.handleClickFlippCoWorkingSpace.bind(this);
    this.handleClickFlippConsultancyAgency = this.handleClickFlippConsultancyAgency.bind(this);
    this.handleClickFlippEducationalOrganization = this.handleClickFlippEducationalOrganization.bind(this);
    
    this.handleClickMember = this.handleClickMember.bind(this)
    this.handleClickPartner = this.handleClickPartner.bind(this)
    this.handleClickConsultancy = this.handleClickConsultancy.bind(this)
    this.handleClickCoworkingSpace = this.handleClickCoworkingSpace.bind(this)
    this.handleClickEducationOrganization = this.handleClickEducationOrganization.bind(this)
  }
  handleClickMemberClose(e) {
    this.setState({ memberClose: !this.state.memberClose })
  }
  handleClickFlippPartner(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlippedPartner: !prevState.isFlippedPartner }));
  }
  handleClickFlippMember(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlippedMember: !prevState.isFlippedMember }));
  }
  handleClickFlippCoWorkingSpace(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlippedCoWorkingSpace: !prevState.isFlippedCoWorkingSpace }));
  }
  handleClickFlippConsultancyAgency(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlippedConsultancyAgency: !prevState.isFlippedConsultancyAgency}));
  }
  handleClickFlippEducationalOrganization(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlippedEducationalOrganization: !prevState.isFlippedEducationalOrganization }));
  }
  handleClickPartnerClose(e) {
    this.setState({ partnerClose: !this.state.partnerClose })
  }
  handleClickCoworkingSpaceClose(e) {
    this.setState({ coworkingSpaceClose: !this.state.coworkingSpaceClose })
  }
  handleClickEducationOrganizationClose(e) {
    this.setState({ educationOrganizationClose: !this.state.educationOrganizationClose })
  }
  handleClickConsultancyClose(e) {
    this.setState({ consultancyClose: !this.state.consultancyClose })
  }
  handleClickMember() {
    this.setState({ memberDisplay: true })
    this.setState({ partnerDisplay: false })
    this.setState({ consultancyDisplay: false })
    this.setState({ educationOrganizationDisplay: false })
    this.setState({ coworkingSpaceDisplay: false })

    this.setState({ memberClose: false })
    this.setState({ partnerClose: false })
    this.setState({ coworkingSpaceClose: false })
    this.setState({ educationOrganizationClose: false })
    this.setState({ consultancyClose: false })

  }
  handleClickPartner() {
    this.setState({ memberDisplay: false })
    this.setState({ partnerDisplay: true })
    this.setState({ consultancyDisplay: false })
    this.setState({ educationOrganizationDisplay: false })
    this.setState({ coworkingSpaceDisplay: false })
    this.setState({ memberClose: false })
    this.setState({ partnerClose: false })
    this.setState({ coworkingSpaceClose: false })
    this.setState({ educationOrganizationClose: false })
    this.setState({ consultancyClose: false })
  }
  handleClickConsultancy() {
    this.setState({ memberDisplay: false })
    this.setState({ partnerDisplay: false })
    this.setState({ consultancyDisplay: true })
    this.setState({ educationOrganizationDisplay: false })
    this.setState({ coworkingSpaceDisplay: false })
    this.setState({ memberClose: false })
    this.setState({ partnerClose: false })
    this.setState({ coworkingSpaceClose: false })
    this.setState({ educationOrganizationClose: false })
    this.setState({ consultancyClose: false })
  }
  handleClickCoworkingSpace() {
    this.setState({ memberDisplay: false })
    this.setState({ partnerDisplay: false })
    this.setState({ consultancyDisplay: false })
    this.setState({ educationOrganizationDisplay: false })
    this.setState({ coworkingSpaceDisplay: true })
    this.setState({ memberClose: false })
    this.setState({ partnerClose: false })
    this.setState({ coworkingSpaceClose: false })
    this.setState({ educationOrganizationClose: false })
    this.setState({ consultancyClose: false })
  }
  handleClickEducationOrganization() {
    this.setState({ memberDisplay: false })
    this.setState({ partnerDisplay: false })
    this.setState({ consultancyDisplay: false })
    this.setState({ educationOrganizationDisplay: true })
    this.setState({ coworkingSpaceDisplay: false })
    this.setState({ memberClose: false })
    this.setState({ partnerClose: false })
    this.setState({ coworkingSpaceClose: false })
    this.setState({ educationOrganizationClose: false })
    this.setState({ consultancyClose: false })
  }

  getCards() {
    
    var table = []
    console.log(this.props.tags)
    if (!this.props.tags.includes('Member')) {
      table.push(<td style={{
        padding: '10px 25px 10px 25px',
        textAlign:'center'

      }}>
      <ReactCardFlip isFlipped={this.state.isFlippedMember} flipDirection="horizontal">
          <dev style={{
          borderRadius: (15, 50, 30, 5),
          height: 200,
          background: '#e5e8e8',
          width: 250,
          textAlign:'center'
        }}  key="front">
          <img className="App-img" src={member} class="center"  borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>

          <p>Member</p>
            
            <button style={ButotnStyle1} onClick={this.handleClickFlippMember}>flip</button>
          </dev>
   
          <dev style={{
          borderRadius: (15, 50, 30, 5),
          height: 200,
          background: '#e5e8e8',
          width: 250,
          testAlign:'center'
        }} key="back">
{/* 
          <p style={{color:'black'}}>>You can apply for a task</p>
          <p style={{color:'black'}}>>You can apply for a project</p>
          <p style={{color:'black'}}>>You can apply for a course</p>
          <p style={{color:'black'}}>>You can apply for a masterClass</p>
          <p style={{color:'black'}}>>You can reserve a room</p>
          <p style={{color:'black'}}>>You can create post</p>
          <p style={{color:'black'}}>>You can create course request</p>
          <p style={{color:'black'}}>>You can give recommendation</p>
          <p style={{color:'black'}}>>You can give comment</p>
          <p style={{color:'black'}}>>You can rate recommendation</p>
          <p style={{color:'black'}}>>You can give like</p>
           
            <button  onClick={this.handleClickMember} style={ButotnStyle} >
          <div style={{
            color: 'black',
            fontSize: 20
          }}> Create</div>
        </button>
        <br></br>
        <br></br>
            <button style={ButotnStyle1}
            onClick={this.handleClickFlippMember}>flip</button> */}
     <MemberForm  />
     <br></br>
     <br></br>
     
     <button style={ButotnStyle1} onClick={this.handleClickFlippMember}>flip</button>
          
          </dev>
        </ReactCardFlip>
       
      </td>)
    }
    if (!this.props.tags.includes('Partner')) {
      table.push(<td style={{
        padding: '10px 25px 10px 25px',
        textAlign:'center'

      }}>
      <ReactCardFlip isFlipped={this.state.isFlippedPartner} flipDirection="horizontal">
          <dev style={{
          borderRadius: (15, 50, 30, 5),
          height: 200,
          background: '#e5e8e8',
          width: 250,
          textAlign:'center'
        }}  key="front">
          <img className="App-img" src={member} class="center"  borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>

          <p>Partner</p>
            
            <button style={ButotnStyle1} onClick={this.handleClickFlippPartner}>flip</button>
          </dev>
   
          <dev style={{
          borderRadius: (15, 50, 30, 5),
          height: 200,
          background: '#e5e8e8',
          width: 250,
          testAlign:'center'
        }} key="back">
{/* 
          <p style={{color:'black'}}>>You can create task</p>
          <p style={{color:'black'}}>>You can create project</p>
          <p style={{color:'black'}}>>You can assign Member for Task or Project</p>
          <p style={{color:'black'}}>>You can assign ConsultancyAgency for Task or Project</p>
          <p style={{color:'black'}}>>You can create post</p>
          <p style={{color:'black'}}>>You can give comment</p>
          <p style={{color:'black'}}>>You can give like</p>
           
            <button  onClick={this.handleClickPartner} style={ButotnStyle} >
          <div style={{
            color: 'black',
            fontSize: 20
          }}> Create</div>
        </button> */}
                <PartnerForm  />

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
            <button style={ButotnStyle1}  
            onClick={this.handleClickFlippPartner}>flip</button>
          </dev>
        </ReactCardFlip>
       
      </td>)
    }
    if (!this.props.tags.includes('CoworkingSpace')) {
      table.push(<td style={{
        padding: '10px 25px 10px 25px',
        textAlign:'center'

      }}>
      <ReactCardFlip isFlipped={this.state.isFlippedCoWorkingSpace} flipDirection="horizontal">
          <dev style={{
          borderRadius: (15, 50, 30, 5),
          height: 200,
          background: '#e5e8e8',
          width: 250,
          textAlign:'center'
        }}  key="front">
          <img className="App-img" src={member} class="center"  borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>

          <p>CoworkingSpace</p>
            
            <button style={ButotnStyle1} onClick={this.handleClickFlippCoWorkingSpace}>flip</button>
          </dev>
   
          <dev style={{
          borderRadius: (15, 50, 30, 5),
          height: 200,
          background: '#e5e8e8',
          width: 250,
          testAlign:'center'
        }} key="back">

          {/* <p style={{color:'black'}}>>You can offer your rooms</p>
          <p style={{color:'black'}}>>You can add new Rooms</p>
          <p style={{color:'black'}}>>You can Accept rooms reservations</p>
        
            <button  onClick={this.handleClickCoworkingSpace} style={ButotnStyle} >
          <div style={{
            color: 'black',
            fontSize: 20
          }}> Create</div>
        </button> */}
                <CoworkingSpaceForm    />

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
            <button style={ButotnStyle1}
            onClick={this.handleClickFlippCoWorkingSpace}>flip</button>
          </dev>
        </ReactCardFlip>
       
      </td>)
    }
    if (!this.props.tags.includes('EducationOrganization')) {
      table.push(<td style={{
        padding: '10px 25px 10px 25px',
        textAlign:'center'

      }}>
      <ReactCardFlip isFlipped={this.state.isFlippedEducationalOrganization} flipDirection="horizontal">
          <dev style={{
          borderRadius: (15, 50, 30, 5),
          height: 200,
          background: '#e5e8e8',
          width: 250,
          textAlign:'center'
        }}  key="front">
          <img className="App-img" src={member} class="center"  borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>

          <p>EducationOrganization</p>
            
            <button style={ButotnStyle1} onClick={this.handleClickFlippEducationalOrganization}>flip</button>
          </dev>
   
          <dev style={{
          borderRadius: (15, 50, 30, 5),
          height: 200,
          background: '#e5e8e8',
          width: 250,
          testAlign:'center'
        }} key="back">
{/* 
          <p style={{color:'black'}}>>You can create course</p>
          <p style={{color:'black'}}>>You can create masterClass</p>
          <p style={{color:'black'}}>>You can create TrainingProgram</p>
          <p style={{color:'black'}}>>You can create certificate</p>
          <p style={{color:'black'}}>>You can accept members for course or masterClasses</p>
        
            <button  onClick={this.handleClickFlippEducationalOrganization} style={ButotnStyle} >
          <div style={{
            color: 'black',
            fontSize: 20
          }}> Create</div>
        </button> */}
                <EducationOrganizationForm  />

        <br></br>
        <br></br>
        <br></br>
        <br></br>
            <button style={ButotnStyle1}
            onClick={this.handleClickFlippEducationalOrganization}>flip</button>
          </dev>
        </ReactCardFlip>
       
      </td>)
    }
    if (!this.props.tags.includes('ConsultancyAgency')) {
      table.push(<td style={{
        padding: '10px 25px 10px 25px',
        textAlign:'center'

      }}>
      <ReactCardFlip isFlipped={this.state.isFlippedConsultancyAgency} flipDirection="horizontal">
          <dev style={{
          borderRadius: (15, 50, 30, 5),
          height: 200,
          background: '#e5e8e8',
          width: 250,
          textAlign:'center'
        }}  key="front">
          <img className="App-img" src={member} class="center"  borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>

          <p>ConsultancyAgency</p>
            
            <button style={ButotnStyle1} onClick={this.handleClickFlippConsultancyAgency}>flip</button>
          </dev>
   
          <dev style={{
          borderRadius: (15, 50, 30, 5),
          height: 200,
          background: '#e5e8e8',
          width: 250,
          testAlign:'center'
        }} key="back">
{/* 
          <p style={{color:'black'}}>>You can apply task</p>
          <p style={{color:'black'}}>>You can apply Project</p>
          <p style={{color:'black'}}>>You can assign member for a  task</p>
          <p style={{color:'black'}}>>You can assign member for a project</p>
          <p style={{color:'black'}}>>You can add report or event</p>
        
            <button  onClick={this.handleClickConsultancy} style={ButotnStyle} >
          <div style={{
            color: 'black',
            fontSize: 20
          }}> Create</div>
        </button> */}
                <ConsultancyForm />

        <br></br>
        <br></br>
        
        <br></br>
        <br></br>
            <button style={ButotnStyle1}
            onClick={this.handleClickFlippConsultancyAgency}>flip</button>
          </dev>
        </ReactCardFlip>
       
      </td>)
    
    }

    return table
  }
  render() {
    return (
      <div style={{
        backgroundColor:'white',
        minHeight: '100vh',
    backgroundSize:'cover',
      }}
      >
       
        <header style={{
          padding: 0,
          margin: 0,
          textAlign: 'center',
          fontSize: '40px',
          borderBottom: '1px solid darkgrey',
          color: 'white'
        }}  >
          Start As
        </header>
        <div style={{
        textAlign:'center'
      }}
        >
        <table style={{
          position: 'absolute',
          left: '3%',
          top: '40%',
          textAlign:'center',
          paddingLeft:'45px',paddingRight:'100px',
          marginLeft:'150px'
        }}>
          <tr>
            {this.getCards()}
          </tr>
        </table>
       </div>

      </div>

    );
  }
}
const ButotnStyle = {
  backgroundColor:'#e5e8e8',
    color :'black',
    testAlign:'center',
    pading:'15px 32px',
    borderRadius:'12px',
    float :'center',
    fontSize:'18px'
} 
 const ButotnStyle1 = {
  backgroundColor:'#e5e8e8',
  color :'black',
  testAlign:'center',

  float :'center',
  fontSize:'18px'
}  
export default StartAs;
