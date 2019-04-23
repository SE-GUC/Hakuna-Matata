
import React, { Component } from 'react';
import axios from 'axios'
import {Card} from 'react-bootstrap'
import {Form , Button,Image} from 'react-bootstrap'
import '../../bootstrap.css'
var store = require('store')

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
     reply: '',
      messages:[],
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getinfo = this.getinfo.bind(this)
    
  }
  componentDidMount(){
    const id=store.get('payload').id

    axios.get(`http://localhost:3333/users/${id}/`)
    .then(res => {
      this.setState({ messages: res.data.data.chatBot})}
    )}
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  getData(){
    console.log("here")
    const handle='5cb30836830d0d0496cbe505'
    axios.get(`http://localhost:3333/users/${id}/`)
    .then(res => {
      this.setState({ messages: res.data.data.chatBot})}
    )}
  
  handleSubmit(event) {
    
    event.preventDefault();
    const id=store.get('payload').id
    const handle='5cb30836830d0d0496cbe505'
    axios.post(`htt p://localhost:3333/chatBots/Question/${id}`, {
      question: this.state.message
    }).then(res => {
    this.setState({reply:res.data})
      this.getData()
  }).catch(e => {
    
   })

  } 
  getinfo(){
    let arr=[]
    for(let index=0; index<this.state.messages.length;index++)
        arr.push(<p>{this.state.messages[index].message}</p>)
  return arr
  }
 render(){
   return(
     <div>
       <div>{this.getinfo()}</div>
<Form onSubmit={this.handleSubmit}>
  <Form.Group controlId="formBa sicEmail">
    <Form.Control type="text" placeholder="Enter ur Message" name="message" value={this.state.message} onChange={this.onChange} />
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>;
     </div>
   )
 }
} 
export default LoginForm;