
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


class CoworkingSpaceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     name: '',
<<<<<<< HEAD
     PhoneNumber:'',
     Location:'',
     BusinessPlans:[],
     MaxNoRooms:0,
      token: '',
      isClose: false,
      isLoaded:false,
      redirect:false,
      numberOfBusinessPlans:0
=======
      token: '',
      isClose: false,
      isLoaded:false
>>>>>>> master

    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
<<<<<<< HEAD
    this.onCLickAdd = this.onCLickAdd.bind(this)
=======
>>>>>>> master
    // this.handleClickClose = this.handleClickClose.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state.name)
  }
  // handleClickClose(e) {
<<<<<<< HEAD
  //   this.setState({ isClose: true }) 
  // }
  handleSubmit(event) {
    const id=this.props.auth.user._id
    event.preventDefault();
    axios.post(`http://localhost:3333/coworkingSpaces/${id}`, {
      coworkingSpaceName: this.state.name,
      // coworkingSpacePhoneNumber:this.state.PhoneNumber,
      // coworkingSpaceLocation:this.state.Location,
      // coworkingSpaceMaxNoRooms:this.state.MaxNoRooms
    }).then(res => {
      alert('Done')
      window.location.href="http://localhost:3000/HomePage"
=======
  //   this.setState({ isClose: true })
  // }
  handleSubmit(event) {

    event.preventDefault();
    axios.post(`http://localhost:3333/coworkingSpaces/${this.props.id}`, {
      coworkingSpaceName: this.state.name,
    }).then(res => {
      this.setState({
        token: res.data
      })
      this.setState({isLoaded:true})
>>>>>>> master
    }).catch(e => {
      alert('error ')
    }).then(alert('Done: '))

  }
<<<<<<< HEAD
  addFields(){
    let sum = []
    for(let i=0;i<this.state.numberOfBusinessPlans;i++){
      sum.push( <input type="text" class="form-control" placeholder="Location" style={{
        backgroundColor:'transparent'
      }}  onChange={this.onChange} value={this.state.numberOfBusinessPlans}></input>)
    }
return sum
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
onCLickAdd(){

  let temp=this.state.BusinessPlans
  temp.push(1
  )
  this.setState({BusinessPlans:temp})
}

getB(){
  
}
  render() {
    const {redirect} = this.state;
  if(redirect){
    return <Redirect push to={'/HomePage'} /> }
    return (
  <div style={this.getLoginStyle()} >
  <Form onSubmit={this.handleSubmit}>
  <Form.Group >
  <div class="container">
  <h1 style={{textAlign: "center"}}>Coworking Space Creation</h1>
  </div>
  
  <Form.Label style={{textAlign:'left'}}>Full Name</Form.Label>
    <Form.Control type='text' placeholder="Enter full name"  name="name"style={{
      backgroundColor:'transparent'
    }}  onChange={this.onChange} value={this.state.name}  />
  {/* <Form.Label style={{textAlign:'left'}}>PhoneNumber</Form.Label>
    <Form.Control type='text' placeholder="PhoneNumber"  name="PhoneNumber"style={{
      backgroundColor:'transparent'
    }}  onChange={this.onChange} value={this.state.PhoneNumber}  />
 
  <Form.Label style={{textAlign:'left'}}>Location</Form.Label>
    <Form.Control type='text' placeholder="Location"  name="Location"style={{
      backgroundColor:'transparent'
    }}  onChange={this.onChange} value={this.state.Location}  />
 <Form.Label style={{textAlign:'left'}}>Max number of rooms</Form.Label>
    <Form.Control type='text' placeholder="Max Num of Rooms"  name="MaxNoRooms"style={{
      backgroundColor:'transparent'
    }}  onChange={this.onChange} value={this.state.MaxNoRooms}  />
  */}

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
export default connect(mapStateToProps,{})(CoworkingSpaceForm)
// export default CoworkingSpaceForm;
=======
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
          <input type="text" placeholder="Name" name="name" onChange={this.onChange} value={this.state.name} style={this.getFormStyleInput()} required />
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

export default CoworkingSpaceForm;
>>>>>>> master
