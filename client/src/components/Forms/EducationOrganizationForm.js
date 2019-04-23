
import React, { Component } from 'react';
import axios from 'axios'
import {Form , Button,Image} from 'react-bootstrap'
import { BrowserRouter as Router, Route,Redirect } from 'react-router-dom';
import '../../bootstrap.css'
const store = require('store')


// x

class EducationOrganizationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     name: '',
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
    console.log(this.state.name)
  }
  // handleClickClose(e) {
  //   this.setState({ isClose: true })
  // }
  handleSubmit(event) {
console.log(this.state.name)
    event.preventDefault();
    axios.post(`http://localhost:3333/educationalOrganizations/${store.get('payload').id}`, {
      educationOrganizationName: this.state.name,
    }).then(res => {
      this.setState({
        token: res.data
      })
      this.setState({isLoaded:true})
      this.setState({redirect:true})

    }).catch(e => {
      alert('error ')
    }).then(alert('Done: '))

  }
  getLoginStyle() {
    return {
      borderRadius: (15, 50, 30, 5),
      height: 200,
      background: 'transparent',
      width: 250,
      testAlign:'center'

    }
  } 


  render() {   const {redirect} = this.state;
  if(redirect){
   return <Redirect push to={'/HomePage'} /> }
  return (
<div style={this.getLoginStyle()} >
<Form onSubmit={this.handleSubmit}>
<Form.Group controlId="formBasicEmail">
<div class="container">
<h1 style={{textAlign: "center"}}>Educational Organization Creation</h1>
</div>

<Form.Label style={{textAlign:'left'}}>Full Name</Form.Label>
  <Form.Control  placeholder="Enter full name"  name="name"style={{
    backgroundColor:'transparent'}} onChange={this.onChange} value={this.state.name}/>
{/* <input type="text" class="form-control" placeholder="Enter full name" style={{
    backgroundColor:'transparent'
  }}  onChange={this.onChange} value={this.state.fullName}></input> */}
</Form.Group>
<Button variant="primary"  type="create" block >
 Create
</Button>
</Form>
</div>

    );
  }
}

export default EducationOrganizationForm;
