import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Form, Col,Button } from "react-bootstrap";
import Select from "react-select";
var store = require("store");
const styles = theme => ({
  dropdown: {
    color: "black",
    selectarrowcolor: "green"
  },
  root: {
    padding: "4px 200px",
    display: "flex"
  },
  root1: {
    width: 400
  },

  cssLabel: {
    color: "gray"
  },

  cssOutlinedInput: {
    color: "white"
  }
});
export class CreateTask extends Component {
  state = {
    title: null,
    type: null,
    duration: null,
    price: null,
    duration: null,
    description: "",
    selectedValue: "a",
    category: null,
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
    startDate: new Date(),
    applyDueDate: new Date(),
    educatorOptions: [],
    educator: null
  };
  educatorChange = event => {
    this.setState({ educator: event });
  };
  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
  };
  titleChange = event => {
    this.setState({ title: event.target.value });
  };
  typeChange = event => {
    this.setState({ type: event.target.value });
  };
  durationChange = event => {
    this.setState({ places: event.target.value });
  };
  priceChange = event => {
    this.setState({ price: event.target.value });
  };
  durationChange = event => {
    this.setState({ duration: event.target.value });
  };
  categoryChange = event => {
    this.setState({ category: event.target.value });
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
  startDateChange(evt) {
    this.setState({
      startDate: evt.target.value
    });
  }
  applyDueDateChange(evt) {
    this.setState({
      applyDueDate: evt.target.value
    });
  }
  DateChange = date => {
    this.setState({
      startDate: date
    });
  };
  async handleClick() {
    const  {id}  = this.props.match.params ;
    var arr = [];
    this.state.skills.map(m => arr.push({ name: m.label }));
    const data = {
      name: this.state.title,
      description: this.state.description,
      trainer: {
        id: this.state.educator.value,
        name: this.state.educator.label
      },
      type: this.state.type,
      duration: this.state.duration,
      startDate: this.state.startDate,
      applyDueDate: this.state.applyDueDate,
      requiredSkills: arr
    };
    console.log(data);
    await axios.post(
      `http://localhost:3333/educationalOrganizations/trainingProgram/${id}`,
      data
    ).catch(e => {
      alert("error ");
    })
    .then(alert("Done: "));
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
    const { id } = this.props.match.params;
    axios
      .get("http://localhost:3333/tasks/skills")
      .then(res => this.setState({ techCompanies: res.data.data }));
    axios
      .get(`http://localhost:3333/educationalOrganizations/educator/${id}`)
      .then(res => this.setState({ educatorOptions: res.data.data }));
    console.log(this.state.educatorOptions);
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
  getOptionsEducator() {
    var arr = [];
    this.state.educatorOptions.map(techCompany =>
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
      <div style={{ minHeight: "100vh", background: "white" }}>
        <Col md={{ span: 5, offset: 3 }}>
        <form onSubmit={this.handleClick.bind(this)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" required onChange={this.titleChange}/>
          </Form.Group>
          <Form.Label>Educator</Form.Label>
          <Select
            className={classes.dropdown}
            onChange={this.educatorChange}
            icon={classes.dropdownIndicator}
            options={this.getOptionsEducator()}
          />
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" required onChange={this.descriptionChange}/>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>type</Form.Label>
            <Form.Control type="text" required onChange={this.typeChange}/>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>duration</Form.Label>
            <Form.Control type="text" required onChange={this.durationChange}/>
          </Form.Group>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
          required
              type="date"
              selected={this.state.startDate}
              onChange={evt => this.startDateChange(evt)}
            />
           <Form.Label>Apply Due Date</Form.Label> 
           <Form.Control
           required 
              type="date"
              selected={this.state.applyDueDate}
              onChange={evt => this.applyDueDateChange(evt)}
            />
            <div style={{ textAlign: "right" }}>
            <Button type='submit'
              variant="outline-secondary"
            >
              Submit
            </Button>
            </div>
            </form>
        </Col>
      </div>
    );
  }
}
export default withStyles(styles)(CreateTask);
