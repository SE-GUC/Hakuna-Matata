import React, { Component } from "react";
import axios from "axios";
import {Form, Col,Button} from 'react-bootstrap';
import Select from "react-select";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
var store = require("store");
const styles = theme => ({
  Radio: {
    width: 0,
    height: 0,
    background: "#e5e8e8",
    color: "#e5e8e8",
    "&$checked": {
      background: "grey",
      color: "grey"
    }
  },
  checked: {},
});
export class CreateTask extends Component {
  state = {
    title: null,
    description: "",
    selectedValue: null,
    monetaryCompensation: null,
    techCompanies: [],
    experienceLevels: [
      { label: 0, value: 0 },
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 },
      { label: 5, value: 5 }
    ],
    commitementLevels: [
      { label: 0, value: 0 },
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 },
      { label: 5, value: 5 }
    ],
    skills: [],
    commitementLevel: 0,
    experienceLevel: 0,
    deadline: new Date()
  };

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
  };
  titleChange = event => {
    this.setState({ title: event.target.value });
    console.log(this.state.title)
  };
  monetaryChange = event => {
    this.setState({ monetaryCompensation: event.target.value });
  };
  skillsChange = event => {
    this.setState({ skills: event });
  };
  commitChange = event => {
    this.setState({ commitementLevel: event.label });
  };
  experienceChange = event => {
    this.setState({ experienceLevel: event.label });
  };
  descriptionChange = event => {
    this.setState({ description: event.target.value });
  };
  updateDeadline(evt) {
    this.setState({
      deadline: evt.target.value
    });
  }
  DateChange = date => {
    this.setState({
      startDate: date
    });
  };
  async handleClick() {
    var arr = [];
    const  {id}  = this.props.match.params
    this.state.skills.map(m => arr.push({ name: m.label }));
    const data = {
      name: this.state.title,
      description: this.state.description,
      consultyNeeded: this.state.selectedValue === "yes" ? true : false,
      deadline: this.state.deadline,
      commitLevel: this.state.commitementLevel,
      experienceLevel: this.state.experienceLevel,
      monetaryCompensation: this.state.monetaryCompensation,
      requiredSkills: arr
    };
     await axios.post(`http://localhost:3333/projects/task/${id}`, data).catch(e => {
        alert('error ')
      }).then(alert('Done: '));
  }
  getStyle = () => {
    return {
      background: "#242424",
      minHeight: "100vh"
    };
  };
  upper = () => {
    return {
      color: "white",
      fontSize: 25
    };
  };
  consultancy = () => {
    return {
      color: "white",
      fontSize: 25,
      padding: "4px 200px",
      display: "flex"
    };
  };
  dropdown = () => {
    return {
      background: "gray",
      fontSize: 25,
      padding: "4px 100px",
      width: 25
    };
  };
  componentDidMount() {
    axios
      .get("http://localhost:3333/tasks/skills")
      .then(res => this.setState({ techCompanies: res.data.data }));
  }
  getOptions() {
    var arr = [];
    this.state.techCompanies.map(techCompany =>
      arr.push({
        sytle: { background: "red" },
        label: techCompany.name,
        value: techCompany._id
      })
    );
    return arr;
  }
  render() {
    const { classes } = this.props;
    return (
        <div style={{background:'white',minHeight:'100vh'}}>
      <Col md={{ span: 5, offset: 3 }} >
      <form onSubmit={this.handleClick.bind(this)}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text"  onChange={this.titleChange} required/>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" onChange={this.descriptionChange} required/>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Monetary Compensation</Form.Label>
          <Form.Control type="text" onChange={this.monetaryChange} required/>
        </Form.Group>
        <Form.Label> Do you wish to have consultancy ?</Form.Label>
        <div >
          <Radio
            checked={this.state.selectedValue === "yes"}
            onChange={this.handleChange}
            value="yes"
            name="radio-button-demo"
            aria-label="A"
            classes={{
              root: classes.Radio,
              checked: classes.checked
            }}
          />
          <text style={{ color: "black", width: 50, height: 50 ,padding:'4px'}}>Yes</text>
          <Radio
            checked={this.state.selectedValue === "no"}
            onChange={this.handleChange}
            value="no"
            name="radio-button-demo"
            aria-label="C"
            classes={{
              root: classes.Radio,
              checked: classes.checked
            }}
          />
          <text style={{ color: "black", width: 50, height: 50 ,padding:'4px'}}>No</text>
          <br></br>
          <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>What skills do you wish for ?</Form.Label>
          <Select
          className={classes.dropdown}
          onChange={this.skillsChange}
          icon={classes.dropdownIndicator}
          options={this.getOptions()}
          isMulti
        />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>What is the commitement level you wish for ?</Form.Label>
          <Select
          onChange={this.commitChange}
          icon={classes.dropdownIndicator}
          options={this.state.commitementLevels}
        />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>What is the experience level you wish for ?</Form.Label>
          <Select
          onChange={this.experienceChange}
          icon={classes.dropdownIndicator}
          options={this.state.experienceLevels}
        />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Deadline</Form.Label>
          <Form.Control
          required
              type="date"
              selected={this.state.startDate}
              onChange={evt => this.updateDeadline(evt)}
            />
        </Form.Group >
        <div style={{textAlign:'right'}}>
        <Button variant="outline-secondary">Submit</Button>
        </div>
        </div>
        </form>
      </Col>
      </div>
    );
  }
}
export default withStyles(styles)(CreateTask);
