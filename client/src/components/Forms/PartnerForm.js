
import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import {Form , Button,Image} from 'react-bootstrap'
import { BrowserRouter as Router, Route,Redirect } from 'react-router-dom';
import '../../bootstrap.css'
import { connect } from 'react-redux'


// x

class PartnerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location:'',
      fieldOfWork:'',
      token: '',
      isClose: false,
      isLoaded:false,
      redirect:false

    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleClickClose = this.handleClickClose.bind(this)
  }

  onChange(e) {

    this.setState({ [e.target.name]: e.target.value })
  }
  // handleClickClose(e) {
  //   this.setState({ isClose: true })
  // }
  handleSubmit(event) {
    const id=this.props.auth.user._id
    event.preventDefault();
    axios.post(`http://localhost:3333/partners/${id}`, {
      partnerName: this.state.name,
      // partnerLocation: this.state.location,
      // fieldOfWork: this.state.fieldOfWork,
  
    }).then(res => {
alert('Done')
window.location.href="http://localhost:3000/HomePage"
    }).catch(e => {
      alert(e.respose)
    })

  }
  
  getLoginStyle() {
   return{
    borderRadius: (15, 50, 30, 5),
    height: 200,
    background: 'transparent',
    width: 250,
    testAlign:'center'
    }
  }


  render() {

     return (
   <div style={this.getLoginStyle()} >
   <Form onSubmit={this.handleSubmit}>
   <Form.Group controlId="forFullName">
   <div class="container">
   <h1 style={{textAlign: "center"}}>Partner Creation</h1>
   </div> 
   <Form.Label style={{textAlign:'left'}}>Full Name</Form.Label>
     <Form.Control type='text' placeholder="Enter full name"  name="name"style={{
       backgroundColor:'transparent'}}  onChange={this.onChange} value={this.state.name}  />

 

   {/* <Form.Label style={{textAlign:'left'}}>Field Of Work</Form.Label>
   
     <Form.Control type='text' placeholder="Field Of Work"  name="fieldOfWork" 
     style={{backgroundColor:'transparent'}}  onChange={this.onChange} value={this.state.fieldOfWork}  />



       <Form.Label style={{textAlign:'left'}}>Location</Form.Label>
     <Form.Control type='text' placeholder="Location"  name="location"style={{
       backgroundColor:'transparent'}}  onChange={this.onChange} value={this.state.location}  /> */}

   </Form.Group>
   <Button variant="outline-info"  type="create" block >
    Create
   </Button>
   </Form>
   </div>
   
    );
  }
}
const mapStateToProps =(state)=>({
  auth:state.auth,
  errors:state.errors,
  info:state.info
})
export default connect(mapStateToProps,{})(PartnerForm)
// export default ;
