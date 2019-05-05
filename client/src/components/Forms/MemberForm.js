
import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import {Form , Button,Image} from 'react-bootstrap'
import { BrowserRouter as Router, Route,Redirect } from 'react-router-dom';
import '../../bootstrap.css'
import { connect } from 'react-redux'
=======


>>>>>>> master
// x

class MemberForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     fullName: '',
      token: '',
      isClose: false,
<<<<<<< HEAD
      isLoaded:false,
      redirect:false
=======
      isLoaded:false
>>>>>>> master
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleClickClose = this.handleClickClose.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
<<<<<<< HEAD
=======
    console.log(this.state.fullName)
    console.log(this.props.id)

>>>>>>> master
  }
  // handleClickClose(e) {
  //   this.setState({ isClose: true })
  // }
  handleSubmit(event) {
<<<<<<< HEAD
    const id=this.props.auth.user._id

    event.preventDefault();
    axios.post(`http://localhost:3333/members/${id}`, {
      memberFullName: this.state.fullName,
    }).then(res => {
      alert('Done')
      window.location.href="http://localhost:3000/HomePage"
    }).catch(e => {
      alert('error ')
    })
       
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
<h1 style={{textAlign: "center"}}>Member Creation</h1>
</div>

<Form.Label style={{textAlign:'left'}}>Full Name</Form.Label>
  <Form.Control  placeholder="Enter full name"  name="fullName"style={{
    backgroundColor:'transparent'}} onChange={this.onChange} value={this.state.fullName}/>
{/* <input type="text" class="form-control" placeholder="Enter full name" style={{
    backgroundColor:'transparent'
  }}  onChange={this.onChange} value={this.state.fullName}></input> */}
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
export default connect(mapStateToProps,{})(MemberForm)
// export default MemberForm;
=======

    event.preventDefault();
    axios.post(`http://localhost:3333/members/${this.props.id}`, {
      memberFullName: this.state.fullName,
    }).then(res => {
      this.setState({
        token: res.data
      })
      this.setState({isLoaded:true})
      //this.setState({id:res.data.id})
    }).catch(e => {
      alert('error ')
    }).then(alert('Done: '))

  }
  getFormStyleInput() {

    return {
      width: '80%',
      padding: '6%',
      marginTop: '3%',
      marginLeft: '3%',
      border: '1px solid #F9BB32',
      backgroundColor: 'Transparent',
    }
  }


  getFormStyleButton() {

    if(!this.state.isLoaded){
      return {
        width: '80%',
        padding: '4.5%',
        marginTop: '10px',
        marginLeft: '10%',
        backgroundColor: '#F9BB32',
        display: 'block'
  
      }
    }else{
      return {
        width: '80%',
        padding: '4.5%',
        marginTop: '10px',
        marginLeft: '10%',
        backgroundColor: '#F9BB32',
        display: 'none'
      }
    }
  }
  overRideButton() {
  if(this.state.isLoaded){
    return {
      width: '80%',
      padding: '4.5%',
      marginTop: '10px',
      marginLeft: '10%',
      backgroundColor: '#F9BB32',
      display: 'block'

    }
  }else{
    return {
      width: '80%',
      padding: '4.5%',
      marginTop: '10px',
      marginLeft: '10%',
      backgroundColor: '#F9BB32',
      display: 'none'
    }
  }}
  getLoginStyle() {
    if (!this.props.isClose && this.props.logInClick) {
      return {
        position: 'Absolute',
        bottom: 350,
        right: 700,
        width: '20%',
        height: '30%',
        display: 'block',
        border: '2px solid #F9BB32',
        backgroundColor: 'white'


      }
    } else {
      return {
        position: 'Absolute',
        bottom: 400,
        right: 600,
        width: '20%',
        height: '36%',
        display: 'none'
      }
    }
  }


  render() {
    return (
      <div style={this.getLoginStyle()}>
        <form onSubmit={this.handleSubmit} className="Field" >
          <br></br>
          <button style={{

            color: 'Red',
            marginLeft: '90%',
            border: 'none',
            fontSize: 14,
            backgroundColor: 'Transparent'


          }} onClick={this.props.handleClickClose}>X</button>
          <input type="text" placeholder=" Full Name" name="fullName" onChange={this.onChange} value={this.state.fullName} style={this.getFormStyleInput()} required />
          <br></br>
  <button type="submit" style={this.getFormStyleButton()} >
            <div style={{
              color: 'black',
              fontSize: 20
            }}> Continue
                </div>
          </button>
          <Link id={this.props.id} style={this.overRideButton()} to={{
                        pathname: `/HomePage`,

                    }}> Go</Link>

          <br></br>

        </form>
      </div>
    );
  }
}

export default MemberForm;
>>>>>>> master
