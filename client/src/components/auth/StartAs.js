

import React, { Component } from 'react';
// import './Start.css';
// import StartHeader from './StartHeader.js';
import MemberForm from '../MemberForm'
import PartnerForm from '../PartnerForm'
import CoworkingSpaceForm from '../CoworkingSpaceForm'
import EducationOrganizationForm from '../EducationOrganizationForm'
import ConsultancyForm from '../ConsultancyForm'

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
    }

    this.handleClickMemberClose = this.handleClickMemberClose.bind(this)
    this.handleClickPartnerClose = this.handleClickPartnerClose.bind(this)
    this.handleClickCoworkingSpaceClose = this.handleClickCoworkingSpaceClose.bind(this)
    this.handleClickEducationOrganizationClose = this.handleClickEducationOrganizationClose.bind(this)
    this.handleClickConsultancyClose = this.handleClickConsultancyClose.bind(this)

    this.handleClickMember = this.handleClickMember.bind(this)
    this.handleClickPartner = this.handleClickPartner.bind(this)
    this.handleClickConsultancy = this.handleClickConsultancy.bind(this)
    this.handleClickCoworkingSpace = this.handleClickCoworkingSpace.bind(this)
    this.handleClickEducationOrganization = this.handleClickEducationOrganization.bind(this)
  }
  handleClickMemberClose(e) {
    this.setState({ memberClose: !this.state.memberClose })
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
    console.log(this.props.id)
    console.log('this.props.id')
    var table = []
    if (!this.props.tags.includes('Member')) {
      table.push(<td style={{
        padding: '10px 25px 10px 25px'

      }}>
        <button style={{
          borderRadius: (15, 50, 30, 5),
          height: 200,
          background: '#383838',
          width: 250,
        }} onClick={this.handleClickMember} >
          <div style={{
            color: 'white',
            fontSize: 20
          }}> Member</div>
        </button>
      </td>)
    }
    if (!this.props.tags.includes('Partner')) {
      table.push(<td style={{
        padding: '10px 25px 10px 25px'

      }}>

        <button style={{
          borderRadius: (15, 50, 30, 5),

          background: '#383838',
          width: 250,
          height: 200,


        }} onClick={this.handleClickPartner} >
          <div style={{
            color: 'white',
            fontSize: 20
          }}> Partner</div>
        </button>
      </td>)
    }
    if (!this.props.tags.includes('CoworkingSpace')) {
      table.push(<td style={{
        padding: '10px 25px 10px 25px'

      }}>
        <button style={{
          borderRadius: (15, 50, 30, 5),

          background: '#383838',
          width: 250,
          height: 200,


        }} onClick={this.handleClickCoworkingSpace} >
          <div style={{
            color: 'white',
            fontSize: 20
          }}> CoworkingSpace</div>
        </button>
      </td>)
    }
    if (!this.props.tags.includes('EducationOrganization')) {
      table.push(<td style={{
        padding: '10px 25px 10px 25px'

      }}>

        <button style={{
          borderRadius: (15, 50, 30, 5),
          background: '#383838',
          width: 250,
          height: 200,


        }} onClick={this.handleClickEducationOrganization} >
          <div style={{
            color: 'white',
            fontSize: 20
          }}> EducationOrganization</div>
        </button>
      </td>)
    }
    if (!this.props.tags.includes('ConsultancyAgency')) {
      table.push(
        <td style={{
          padding: '10px 25px 10px 25px'

        }}>
          <button style={{
            borderRadius: (15, 50, 30, 5),
            background: '#383838',
            width: 250,
            height: 200,



          }} onClick={this.handleClickConsultancy} >
            <div style={{
              color: 'white',
              fontSize: 20
            }}> ConsultancyAgency</div>
          </button>
        </td>
      )
    }

    return table
  }
  render() {
    return (
      <div className="Start">
        {console.log('here')}
        {console.log(this.props.id)}
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
        <table style={{
          position: 'absolute',
          left: '3%',
          top: '40%',
        }}>
          <tr>
            {this.getCards()}
          </tr>
        </table>
       
        <MemberForm isClose={this.state.memberClose} handleClickClose={this.handleClickMemberClose} logInClick={this.state.memberDisplay} id={this.props.id} />


        <PartnerForm isClose={this.state.partnerClose} handleClickClose={this.handleClickPartnerClose} logInClick={this.state.partnerDisplay} id={this.props.id} />

        <CoworkingSpaceForm isClose={this.state.coworkingSpaceClose} handleClickClose={this.handleClickCoworkingSpaceClose} logInClick={this.state.coworkingSpaceDisplay} id={this.props.id} />

        <EducationOrganizationForm isClose={this.state.educationOrganizationClose} handleClickClose={this.handleClickEducationOrganizationClose} logInClick={this.state.educationOrganizationDisplay} id={this.props.id} />

        <ConsultancyForm isClose={this.state.consultancyClose} handleClickClose={this.handleClickConsultancyClose} logInClick={this.state.consultancyDisplay} id={this.props.id} />

      </div>

    );
  }
}

export default StartAs;
