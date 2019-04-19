import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Form } from "react-bootstrap";
import Select from "react-select";
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
    type:null,
    duration:null,
    price:null,
    duration:null,
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
    applyDueDate:new Date(),
    educatorOptions:[],
    educator:null,
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
    const { id } = this.props.match.params;
    var arr = [];
    this.state.skills.map(m => arr.push({ name: m.label }));
    const data = {
      name: this.state.title,
      description: this.state.description,
      trainer:{id:this.state.educator.value,name:this.state.educator.label},
      type:this.state.type,
      duration:this.state.duration,
      startDate:this.state.startDate,
      applyDueDate:this.state.applyDueDate,
      requiredSkills:arr,
    };
    console.log(data)
    await axios.post(`http://localhost:3333/educationalOrganizations/trainingProgram/${id}`, data);
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
    const {id}=this.props.match.params;
    axios
      .get("http://localhost:3333/tasks/skills")
      .then(res => this.setState({ techCompanies: res.data.data }));
    axios
      .get(`http://localhost:3333/educationalOrganizations/educator/${id}`)
      .then(res => this.setState({ educatorOptions: res.data.data }));
      console.log(this.state.educatorOptions)
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
          <text style={this.consultancy()}>educator</text>
        <Select
          className={classes.dropdown}
          onChange={this.educatorChange}
          icon={classes.dropdownIndicator}
          options={this.getOptionsEducator()}
        />
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
              id="Title"
              label="type"
              margin="normal"
              onChange={this.typeChange}
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
              id="Title"
              label="duration"
              margin="normal"
              onChange={this.durationChange}
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
        <div>
          <p
            style={{
              color: "white",
              fontSize: 25,
              padding: "4px 200px",
              display: "flex"
            }}
          >
            Start Date
          </p>
          <div style={{ position: "absolute", left: "33%" }}>
          <Form.Group controlId="formGriddeadline">
            <Form.Control
              type="date"
              selected={this.state.startDate}
              onChange={evt => this.startDateChange(evt)}
            />
          </Form.Group>
          </div>
        </div>
        <br></br>
        <div>
          <p
            style={{
              color: "white",
              fontSize: 25,
              padding: "4px 200px",
              display: "flex"
            }}
          >
            Apply Due Date
          </p>
          <div style={{ position: "absolute", left: "33%" }}>
          <Form.Group controlId="formGriddeadline">
            <Form.Control
              type="date"
              selected={this.state.applyDueDate}
              onChange={evt => this.applyDueDateChange(evt)}
            />
          </Form.Group>
          </div>
        </div>

        <br></br>
        </div>
        
          <text style={this.consultancy()}>What skills do you wish for ?</text>
        <Select
          className={classes.dropdown}
          onChange={this.skillsChange}
          icon={classes.dropdownIndicator}
          options={this.getOptions()}
          isMulti
        />
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
      </div>
    );
  }
}
export default withStyles(styles)(CreateTask);
