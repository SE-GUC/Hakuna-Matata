import React, { Component } from "react";
import Select from "react-select";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { logoutUser } from '../../globalStore/actions/authActions'

import './HomeNavbar.css'
import {Navbar,Nav,NavDropdown,Button,Dropdown} from "react-bootstrap";

const styles = theme => ({
  dropdown: {
    color: "black",
    selectarrowcolor: "green",
    padding: "0px 4px",
    width: 400
  }
});
const options = [
  { value: "tasks", label: "Tasks" },
  { value: "projects", label: "Projects" },
  { value: "courses", label: "Courses" },
  { value: "members", label: "Members" },
  { value: "partners", label: "Partners" },
  { value: "masterClasses", label: "Master Classes" },
  { value: "trainingPrograms", label: "Training Programs" },
  { value: "consultancyAgencies", label: "Consultancy Agencies" },
  { value: "educationOrganizations", label: "Education Organization" },
  { value: "coworkingSpaces", label: "Coworking Spaces" },
];
var store = require('store')

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      search:false,
      redirected:false,
    }
    this.handleCLick = this.handleCLick.bind(this)
    this.onSelect = this.onSelect.bind(this)

  }
  educatorChange = event => {
    this.setState({ educator: event });
  };
  handleCLick(){
    this.props.logoutUser()
    store.set('payload',null)
    window.location.href ="http://localhost:3000"
  }
  onSelect(){
    this.setState({search:true})

  }

  renderRedirect = () => {
    if (this.state.search) {
      if(this.state.educator.value=="tasks"){
        window.location.href ="http://localhost:3000/tasks"
      return <Redirect to='/tasks' />}
      if(this.state.educator.value=="projects"){
        window.location.href ="http://localhost:3000/projects"

      return <Redirect to='/projects' />
            }      if(this.state.educator.value=="courses"){
              window.location.href ="http://localhost:3000/courses"

      return <Redirect to='/courses' />}
      if(this.state.educator.value=="members"){
        window.location.href ="http://localhost:3000/members"

      return <Redirect to='/members' />
    }
      if(this.state.educator.value=="partners"){
        window.location.href ="http://localhost:3000/partners"

      return <Redirect to='/partners' />
    }
      if(this.state.educator.value=="masterClasses"){
        window.location.href ="http://localhost:3000/masterClasses"

      return <Redirect to='/masterClasses' />
      }
      if(this.state.educator.value=="trainingPrograms"){
        window.location.href ="http://localhost:3000/trainingPrograms"

      return <Redirect to='/trainingPrograms' />
    }
      if(this.state.educator.value=="consultancyAgencies"){
        window.location.href ="http://localhost:3000/consultancyAgencies"

      return <Redirect to='/consultancyAgencies' />
    }
      if(this.state.educator.value=="educationOrganizations"){
        window.location.href ="http://localhost:3000/educationOrganizations"

      return <Redirect to='/educationOrganizations' />
    }
      if(this.state.educator.value=="coworkingSpaces"){
        window.location.href ="http://localhost:3000/coworkingSpaces"

      return <Redirect to='/coworkingSpaces' />
      
    }
  }
  }

  getid(){
    if(this.props.auth.isAuthenticated){
      return this.props.auth.user._id
      
   }
  }
  getDisplay(){
    if(store.get('payload')!=null)
      return {
        display:'block'
      }
    else return {
      display:'none'
    } }
  render() {
    const { classes } = this.props;
    const {redirect,search} = this.state;
    if(redirect){
      window.location.href ="http://localhost:3000"
     return <Redirect   to='/' />
     }

    return (
  
      <div style={{ marginBottom:56,backgroundColor:'#1c1c1c'}}>
       {this.renderRedirect()}
       {/* <i class="far fa-check-circle"></i> */}
      <Navbar style={{backgroundColor:'#111111'}}  fixed='top'	>
      <Link to={`/HomePage`}  className='Nav-link'>LirtenHub</Link>
        <Select
          className={classes.dropdown}
          onChange={this.educatorChange}
          icon={classes.dropdownIndicator}
          options={options}
        />
        <Button variant="outline-dark" onClick={this.onSelect}>search</Button>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={{position:'absolute',left:'78%'}}>
          <Link  push to={`/HomePage`}  className='Nav-link'><i className="fas fa-home"></i>Home</Link>
            <Link push to={`/users/${this.getid()}`}  className='Nav-link'><i className="fas fa-user"></i> </Link>
            <Link push to={`/History`}  className='Nav-link'><i className="fas fa-archive"></i></Link>
           
        <Nav.Item>
        <Dropdown>
  <Dropdown.Toggle  style={{backgroundColor:'#111111' ,border:'none'}}>
  <i class="fas fa-cogs"></i>
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="/chatbot"><i class="fas fa-inbox"></i>Chatbot</Dropdown.Item>
    <Dropdown.Item href="/startAs">Start As</Dropdown.Item>
    <Dropdown.Item onClick={this.handleCLick}> <div style={{color:'red'}}> Logout </div></Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
    
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
     
     
      </div>
    );
  }
}
// export default ;
const mapStateToProps =(state)=>({
  auth:state.auth,
  errors:state.errors
})

export default connect(mapStateToProps,{logoutUser})(withStyles(styles)(NavBar));