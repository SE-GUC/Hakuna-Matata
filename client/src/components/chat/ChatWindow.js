
import React, { Component } from 'react';
import axios from 'axios'
import {Card, Container} from 'react-bootstrap'
import {Form , Button,Image} from 'react-bootstrap'
import '../../bootstrap.css'
import { connect } from 'react-redux'

class Chatbot extends Component {
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
    const id=this.props.auth.user._id

    axios.get(`http://localhost:3333/users/${id}/`)
    .then(res => {
      this.setState({ messages: res.data.data.chatBot})
      }).catch(err=>{
        alert(err)
    }
    )}
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  getData(){
    console.log("here")
    const id=this.props.auth.user._id
    axios.get(`http://localhost:3333/users/${id}/`)
    .then(res => {
      this.setState({ messages: res.data.data.chatBot})
      console.log( res.data.data.chatBot)
    }
    ).catch(error=>{
      console.log(error)
    })
    }
  
  handleSubmit(event) {

    event.preventDefault();
    const id=this.props.auth.user._id
    axios.post(`http://localhost:3333/chatBots/Question/${id}`, {
      question: this.state.message
    }).then(res => {
    this.setState({reply:res.data})
    console.log(res)
    this.getData()
  }).catch(e => {
alert(e)
  })

  } 
  getinfo(){
    let arr=[]
    for(let index=0; index<this.state.messages.length;index++){
if(index%2==0){
        arr.push(     <Card style={{textAlign:'left' ,border:'none'}}>
          <Card.Body>{this.state.messages[index].message}</Card.Body>
        </Card>)
        }else{
          arr.push(   <Card style={{textAlign:'right ' ,border:'none'}}>
          <Card.Body><div style={{color:"#17a2b8"}}>{this.state.messages[index].message}</div></Card.Body>
        </Card>)
        }
        }
  return arr
  }
 render(){
   return(
     <Container>
       <div>{this.getinfo()}</div>
<Form onSubmit={this.handleSubmit} style={{marginTop:10}}>
  <Form.Group controlId="formBa sicEmail">
    <Form.Control type="text" placeholder="Enter ur Message" name="message" value={this.state.message} onChange={this.onChange} />
  </Form.Group>

  <Button variant="dark" type="submit">
    Submit
  </Button>
</Form>
     </Container>
   )
 }
} 
const mapStateToProps =(state)=>({
  auth:state.auth,
  errors:state.errors
})

export default connect(mapStateToProps,{})(Chatbot);
