<<<<<<< HEAD
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
=======
import React, { Component } from "../../../../node_modules/react";
import axios from "../../../../node_modules/axios";
import "./CreateTask.css";
import { withStyles } from "../../../../node_modules/@material-ui/core/styles";
import TextField from "../../../../node_modules/@material-ui/core/TextField";
import Radio from "../../../../node_modules/@material-ui/core/Radio";
import Select from "../../../../node_modules/react-select";
import "./CreateTask.css";
import { Form } from "../../../../node_modules/react-bootstrap";
import { Next } from "../../../../node_modules/react-bootstrap/PageItem";
const styles = theme => ({
  dropdown: {
    color: "black",
    selectarrowcolor: "green",
    padding: "4px 200px",
    width: 800
  },
  root: {
    padding: "4px 200px",
    display: "flex"
  },
  Radio: {
    width: 0,
    height: 0,
    background: "white",
    color: "white",
    "&$checked": {
      background: "gold",
      color: "gold"
    }
  },
  checked: {},
  root1: {
    width: 400
  },

  cssLabel: {
    color: "gray"
  },

  cssOutlinedInput: {
    color: "white"
  }
>>>>>>> master
});
export class CreateTask extends Component {
  state = {
    title: null,
    description: "",
<<<<<<< HEAD
    selectedValue: null,
=======
    selectedValue: "a",
>>>>>>> master
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
<<<<<<< HEAD
    console.log(this.state.title)
=======
>>>>>>> master
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
<<<<<<< HEAD
    const  {id}  = this.props.match.params
    var name = "";
    console.log('helloo')
    await axios
      .get(`http://localhost:3333/partners/${id}`)
      .then(res => (name = res.data.data.partnerName));
=======
    const { id } = this.props.match.params;
    var name="";
    await axios
      .get(`http://localhost:3333/partners/${id}`)
      .then(res => name=res.data.data.partnerName);
>>>>>>> master
    this.state.skills.map(m => arr.push({ name: m.label }));
    const data = {
      name: this.state.title,
      taskPartner: {
        id: id,
        name: name
      },
      description: this.state.description,
      consultyNeeded: this.state.selectedValue === "yes" ? true : false,
      deadline: this.state.deadline,
      commitLevel: this.state.commitementLevel,
      experienceLevel: this.state.experienceLevel,
      monetaryCompensation: this.state.monetaryCompensation,
      requiredSkills: arr
    };
<<<<<<< HEAD
    console.log(data)
     await axios.post("http://localhost:3333/tasks/", data).catch(e => {
        alert('error ')
      }).then(alert('Done: '));
=======
    await axios.post("http://localhost:3333/tasks/", data);
>>>>>>> master
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
<<<<<<< HEAD
        <div style={{background:'white',minHeight:'100vh'}}>
      <Col md={{ span: 5, offset: 3 }} >
      <form >
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
=======
      <div style={this.getStyle()}>
        <div>
          <text style={this.upper()}>
            Please fill the fields below and our admins will get back to you.
          </text>
          <br />
          <div className={classes.root}>
            <TextField
              id="Title"
              label="Name"
              margin="normal"
              onChange={this.titleChange}
              className={classes.root1}
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel
                }
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput
                }
              }}
            />
          </div>
          <div className={classes.root}>
            <TextField
              id="Description"
              label="Description"
              margin="normal"
              onChange={this.descriptionChange}
              className={classes.root1}
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel
                }
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput
                }
              }}
            />
          </div>

          <div className={classes.root}>
            <TextField
              id="Monetary Compensation"
              label="Monetary Compensation"
              margin="normal"
              onChange={this.monetaryChange}
              className={classes.root1}
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel
                }
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput
                }
              }}
            />
          </div>

          <text style={this.consultancy()}>
            Do you wish to have consultancy ?
          </text>
        </div>
        <div style={this.consultancy()}>
>>>>>>> master
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
<<<<<<< HEAD
          <text style={{ color: "black", width: 50, height: 50 ,padding:'4px'}}>Yes</text>
=======
          <text style={{ color: "gray", width: 50, height: 50 }}>Yes</text>
>>>>>>> master
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
<<<<<<< HEAD
          <text style={{ color: "black", width: 50, height: 50 ,padding:'4px'}}>No</text>
          <br></br>
          <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>What skills do you wish for ?</Form.Label>
          <Select
=======
          <text style={{ color: "gray", width: 50, height: 50 }}>No</text>
        </div>
        <text style={this.consultancy()}>What skills do you wish for ?</text>
        <Select
>>>>>>> master
          className={classes.dropdown}
          onChange={this.skillsChange}
          icon={classes.dropdownIndicator}
          options={this.getOptions()}
          isMulti
        />
<<<<<<< HEAD
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>What is the commitement level you wish for ?</Form.Label>
          <Select
=======
        <text style={this.consultancy()}>
          What is the commitement level you wish for ?
        </text>
        <Select
          className={classes.dropdown}
>>>>>>> master
          onChange={this.commitChange}
          icon={classes.dropdownIndicator}
          options={this.state.commitementLevels}
        />
<<<<<<< HEAD
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>What is the experience level you wish for ?</Form.Label>
          <Select
=======
        <text style={this.consultancy()}>
          What is the experience level you wish for ?
        </text>
        <Select
          className={classes.dropdown}
>>>>>>> master
          onChange={this.experienceChange}
          icon={classes.dropdownIndicator}
          options={this.state.experienceLevels}
        />
<<<<<<< HEAD
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Deadline</Form.Label>
          <Form.Control
          required
=======
        <div>
          <p
            style={{
              color: "white",
              fontSize: 25,
              padding: "4px 200px",
              display: "flex"
            }}
          >
            Deadline
          </p>
          <div style={{ position: "absolute", left: "33%" }}>
          <Form.Group controlId="formGriddeadline">
            <Form.Control
>>>>>>> master
              type="date"
              selected={this.state.startDate}
              onChange={evt => this.updateDeadline(evt)}
            />
<<<<<<< HEAD
        </Form.Group >
        <div style={{textAlign:'right'}}>
        <Button onClick={this.handleClick.bind(this)} variant="outline-secondary">Submit</Button>
        </div>
        </div>
        </form>
      </Col>
=======
          </Form.Group>
          >
          </div>
        </div>
        <button
          onClick={this.handleClick.bind(this)}
          style={{
            background: "#F9BB32",
            borderRadius: "10%",
            width: 100,
            height: 20,
            position:'absolute',
            left:'50%',
          }}
        >
          submit
        </button>
>>>>>>> master
      </div>
    );
  }
}
export default withStyles(styles)(CreateTask);
