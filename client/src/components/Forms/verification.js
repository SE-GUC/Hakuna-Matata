import React, { Component } from 'react'
import axios from 'axios'
import {Form , Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { verifyUser } from'../../globalStore/actions/authActions'
import'./verification.css';
 class verification extends Component {

constructor(props) {
    super(props);
    this.state = {
        secretToken:''
    }
    // this.onChange = this.onChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleClickClose = this.handleClickClose.bind(this)
}
handleSubmit = event =>{

    event.preventDefault();
    const  token=this.state.secretToken
    this.props.verifyUser(token)
}
componentDidMount(){
  if(this.props.auth.isAuthenticated){
    console.log(this.props.auth.user)
    if(this.props.auth.user.emailVerified) {
      console.log(this.props.auth.user.tags)
      if(this.props.auth.user.tags ==undefined ||this.props.auth.user.tags ==null ||this.props.auth.user.tags.length ==0)  window.location.href="http://localhost:3000/startAs"
      window.location.href="http://localhost:3000/Homepage"
    }
  }else{
    window.location.href="http://localhost:3000"
  }
}

onChange= e => {
    
    this.setState({ [e.target.name]: e.target.value })
    
    }
  render() {
    return (
<div  className="Bg-text3" >
    <Form onSubmit={this.handleSubmit}>
        
        
        <Form.Label>Verify</Form.Label>
          <Form.Control type="text" placeholder="Put your token here "  name="secretToken"style={{
            backgroundColor:'transparent'
          }}  onChange={this.onChange} value={this.state.secretToken}  />
          <Form.Text className="text-muted">
            <h3>Please get the verification token that sent to your email to verify your account</h3>
          </Form.Text>

          <Button variant="info"  type="Verify" block >
            Verify 
        </Button>
        </Form>
       
</div>
    )
  }
}
const mapStateToProps =(state)=>({
  auth:state.auth,
    errors:state.errors
  })
  
  export default connect(mapStateToProps,{verifyUser})(verification);