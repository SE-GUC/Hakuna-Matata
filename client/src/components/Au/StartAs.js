

import React, { Component } from 'react';
 import './Start.css';
// import StartHeader from './StartHeader.js';
import ReactCardFlip from 'react-card-flip';
import MemberForm from '../Forms/MemberForm'
import PartnerForm from '../Forms/PartnerForm'
import CoworkingSpaceForm from '../Forms/CoworkingSpaceForm'
import EducationOrganizationForm from '../Forms/EducationOrganizationForm'
import ConsultancyForm from '../Forms/ConsultancyForm'
import member from '../../assessments/man.jpg'
import { connect } from 'react-redux'
import { Card, CardDeck, Container, Col, Row, Button } from "react-bootstrap";

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
      isFlippedPartner: false,
      isFlippedCoWorkingSpace: false,
      isFlippedConsultancyAgency: false,
      isFlippedEducationalOrganization: false
    }



    this.handleClickFlippMember = this.handleClickFlippMember.bind(this);
    this.handleClickFlippPartner = this.handleClickFlippPartner.bind(this);
    this.handleClickFlippCoWorkingSpace = this.handleClickFlippCoWorkingSpace.bind(this);
    this.handleClickFlippConsultancyAgency = this.handleClickFlippConsultancyAgency.bind(this);
    this.handleClickFlippEducationalOrganization = this.handleClickFlippEducationalOrganization.bind(this);


  }
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      if(!this.props.auth.user.emailVerified)  window.location.href="http://localhost:3000/verificationpage"
    }else{
      window.location.href="http://localhost:3000"
    }
  }

  handleClickFlippPartner(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlippedPartner: !prevState.isFlippedPartner }));
    this.setState({ isFlippedEducationalOrganization: false });
    this.setState({ isFlippedMember: false });
    this.setState({ isFlippedCoWorkingSpace: false });
    this.setState({ isFlippedConsultancyAgency: false });
  }
  handleClickFlippMember(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlippedMember: !prevState.isFlippedMember }));
    this.setState({ isFlippedEducationalOrganization: false });
    this.setState({ isFlippedPartner: false });
    this.setState({ isFlippedCoWorkingSpace: false });
    this.setState({ isFlippedConsultancyAgency: false });
  }
  handleClickFlippCoWorkingSpace(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlippedCoWorkingSpace: !prevState.isFlippedCoWorkingSpace }));
    this.setState({ isFlippedEducationalOrganization: false });
    this.setState({ isFlippedPartner: false });
    this.setState({ isFlippedMember: false });
    this.setState({ isFlippedConsultancyAgency: false });
  }
  handleClickFlippConsultancyAgency(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlippedConsultancyAgency: !prevState.isFlippedConsultancyAgency }));
    this.setState({ isFlippedEducationalOrganization: false });
    this.setState({ isFlippedPartner: false });
    this.setState({ isFlippedMember: false });
    this.setState({ isFlippedCoWorkingSpace: false });
  }
  handleClickFlippEducationalOrganization(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlippedEducationalOrganization: !prevState.isFlippedEducationalOrganization }));
    this.setState({ isFlippedConsultancyAgency: false });
    this.setState({ isFlippedPartner: false });
    this.setState({ isFlippedMember: false });
    this.setState({ isFlippedCoWorkingSpace: false });
  }



  getCards() {

    var table = []
    let tags=[]
    if(this.props.auth.user.tags!=undefined) tags=this.props.auth.user.tags
    if (!tags.includes('Member')) {
      table.push(<Col >
        <ReactCardFlip isFlipped={this.state.isFlippedMember} flipDirection="horizontal">
          <dev style={{
            borderRadius: (15, 50, 30, 5),

           

            textAlign: 'center'
          }} key="front">
            <img className="App-img" src={member} class="center" borderRadius='12px' width="120px" margin="20px" alt="this is  here :(" />

            <p>Member</p>

            <Button variant="outline-info"   onClick={this.handleClickFlippMember}><i class="fas fa-redo"/></Button>
          </dev>

          <dev style={{
            borderRadius: (15, 50, 30, 5),

           

            testAlign: 'center'
          }} key="back">
            <MemberForm />


            <Button style={{ marginTop: 40  }}  variant="outline-info" onClick={this.handleClickFlippMember}><i class="fas fa-redo"/></Button>

          </dev>
        </ReactCardFlip>

      </Col>)
    }
    if (!tags.includes('Partner')) {
      table.push(<Col >
        <ReactCardFlip isFlipped={this.state.isFlippedPartner} flipDirection="horizontal">
          <dev style={{
            borderRadius: (15, 50, 30, 5),

         

            textAlign: 'center'
          }} key="front">
            <img className="App-img" src={member} class="center" borderRadius='12px' width="120px" margin="20px" alt="this is  here :(" />

            <p>Partner</p>

            <Button   variant="outline-info"  onClick={this.handleClickFlippPartner}><i class="fas fa-redo"/></Button>
          </dev>

          <dev style={{
            borderRadius: (15, 50, 30, 5),



            testAlign: 'center'
          }} key="back">

            <PartnerForm />

            <Button style={{ marginTop:43  }}
 variant="outline-info"               onClick={this.handleClickFlippPartner}><i class="fas fa-redo"/></Button>
          </dev>

        </ReactCardFlip>

      </Col>)
    }
    if (!tags.includes('CoworkingSpace')) {
      table.push(<Col>
        <ReactCardFlip isFlipped={this.state.isFlippedCoWorkingSpace} flipDirection="horizontal">
          <dev style={{
            borderRadius: (15, 50, 30, 5),

 

            textAlign: 'center'
          }} key="front">
            <img className="App-img" src={member} class="center" borderRadius='12px' width="120px" margin="20px" alt="this is  here :(" />

            <p>CoworkingSpace</p>

            <Button variant="outline-info"  onClick={this.handleClickFlippCoWorkingSpace}><i class="fas fa-redo"/></Button>
          </dev>

          <dev style={{
            borderRadius: (15, 50, 30, 5),



            testAlign: 'center'
          }} key="back">

            <CoworkingSpaceForm />



            <Button style={{ marginTop: 89}} variant="outline-info" 
              onClick={this.handleClickFlippCoWorkingSpace}><i class="fas fa-redo"/></Button>
          </dev>
        </ReactCardFlip>

      </Col>)
    }
    if (!tags.includes('EducationOrganization')) {
      table.push(<Col style={{
        padding: '10px 25px 10px 25px',
        textAlign: 'center'

      }}>
        <ReactCardFlip isFlipped={this.state.isFlippedEducationalOrganization} flipDirection="horizontal">
          <dev style={{
            borderRadius: (15, 50, 30, 5),

        
            textAlign: 'center'
          }} key="front">
            <img className="App-img" src={member} class="center" borderRadius='12px' width="120px" margin="20px" alt="this is  here :(" />

            <p>EducationOrganization</p>

            <Button variant="outline-info"  onClick={this.handleClickFlippEducationalOrganization}><i class="fas fa-redo"/></Button>
          </dev>

          <dev style={{
            borderRadius: (15, 50, 30, 5),

    

            testAlign: 'center'
          }} key="back">
            <EducationOrganizationForm />


            <Button style={{ marginTop: 83 }} variant="outline-info" 
              onClick={this.handleClickFlippEducationalOrganization}><i class="fas fa-redo"/></Button>
          </dev>
        </ReactCardFlip>

      </Col>)
    }
    if (!tags.includes('ConsultancyAgency')) {
      table.push(<Col>
        <ReactCardFlip isFlipped={this.state.isFlippedConsultancyAgency} flipDirection="horizontal">
          <dev style={{ borderRadius: (15, 50, 30, 5), textAlign: 'center' }} key="front">
            <img className="App-img" src={member} class="center" borderRadius='12px' width="120px" margin="20px" alt="this is  here :(" />
            <p>ConsultancyAgency</p>
            <Button variant="outline-info"  onClick={this.handleClickFlippConsultancyAgency}><i class="fas fa-redo"/></Button>
          </dev>
          <dev style={{borderRadius: (15, 50, 30, 5),textAlign: 'center'}} key="back">
            <dev style={{ marginBottom: 20 }}> <ConsultancyForm />  </dev>
            <Button style={{ marginTop: 83  }} variant="outline-info"  onClick={this.handleClickFlippConsultancyAgency}><i class="fas fa-redo"/></Button>
          </dev>
        </ReactCardFlip>
      </Col>)

    }

    return table
  }
  render() {
    return (
      <div className="Bg-Cards"  >

        <div style={{textAlign: 'center' }}>
          <Container >
            < Row>
              {this.getCards()}
            </Row>
          </Container>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  info: state.info
})

export default connect(mapStateToProps, {})(StartAs);
