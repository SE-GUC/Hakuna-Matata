import React, { Component } from "react";
import Select from "react-select";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import './NavBar.css'
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

const styles = theme => ({
  dropdown: {
    color: "black",
    selectarrowcolor: "green",
    padding: "0px 4px",
    width: 400
  }
});
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];
class NavBar extends Component {
  educatorChange = event => {
    this.setState({ educator: event });
  };
  render() {
    const { classes } = this.props;
    return (
      <Navbar bg="black" variant="black">
      <Link to={`/MemberProfile`}  className='Nav-link' bsPrefix='navbar-brand'>LirtenHub</Link>
        <Select
          className={classes.dropdown}
          onChange={this.educatorChange}
          icon={classes.dropdownIndicator}
          options={options}
        />
        <Button variant="outline-dark">search</Button>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={{position:'absolute',left:'78%'}}>
          <Link to={`/balabizo`}  className='Nav-link'>home</Link>
            <Link to={`/balabizo`}  className='Nav-link'>profile</Link>
            <Link to={`/History`}  className='Nav-link'>History</Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default withStyles(styles)(NavBar);
