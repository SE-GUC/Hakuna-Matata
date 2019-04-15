import React, { Component } from "../../../../node_modules/react";
import axios from "../../../../node_modules/axios";
import { withStyles } from "../../../../node_modules/@material-ui/core/styles";
import TextField from "../../../../node_modules/@material-ui/core/TextField";
import Select from "../../../../node_modules/react-select";
import "./CreateTask.css";
import { Form } from "../../../../node_modules/react-bootstrap";
// import console = require("console");
const styles = theme => ({
  dropdown: {
    color: "black",
    selectarrowcolor: "green",
    padding: "4px 200px",
    width: 800,
    position: "absolute",
    right: "30%"
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
    width: 400,
    position: "absolute",
    left: "20%"
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
    description: null,
    descriptioninput:null,
    monetaryCompensation: null,
    techCompanies: [],
    skills: [],
    commitementLevels: [
      { label: 0, value: 0 },
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 },
      { label: 5, value: 5 }
    ],
    commitementLevel: null,
    experienceLevels: [
      { label: 0, value: 0 },
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 },
      { label: 5, value: 5 }
    ],
    experienceLevel: null,
    deadline: null
  };
  titleChange = event => {
    this.setState({ title: event.target.value });
  };
  descriptionChange = event => {
    this.setState({ description: event.target.value });
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
  updateDeadline(evt) {
    this.setState({
      deadline: evt.target.value
    });
  }
  async handleClick() {
    var arr = [];
    const { id } = this.props.match.params;
    this.state.skills.map(m => arr.push({ name: m.label }));
    var data={}
    if(this.state.name){
      data.name=this.state.name
    }
    if(this.state.description){
      data.description=this.state.description
    }
    if(this.state.deadline){
      data.deadline=this.state.deadline
    }
    if(this.state.commitementLevel){
      console.log(this.state.commitementLevel)
      data.commitLevel=this.state.commitementLevel
    }
    if(this.state.experienceLevel){
      data.experienceLevel=this.state.experienceLevel
    }
    if(this.state.monetaryCompensation){
      data.monetaryCompensation=this.state.monetaryCompensation
    }
    if(this.state.skills.length>0){
      data.requiredSkills=arr
    }
    console.log(data)
    await axios.put(`http://localhost:3333/tasks/${id}`, data);
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
  async componentDidMount() {
    const { id } = this.props.match.params;
    await axios.get(`http://localhost:3333/tasks/${id}`).then(res => this.setState({ descriptioninput: res.data.data.description }))
    console.log(this.state.descriptioninput)
   await axios
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
      <div style={this.getStyle()}>
        <text style={this.upper()}>
          A partner who submitted this form waiting for your consultancy.
        </text>
        <br />
        <br />
        <text style={{ color: "#F9BB32", position: "absolute", left: "20%" }}>
          Fields Submitted
        </text>
        <br />
        <hr
          style={{
            borderColor: "#F9BB32",
            backgroundColor: "#F9BB32",
            height: 0,
            width: 600.25,
            position: "absolute",
            left: "20%"
          }}
        />
        <br />
        <text
          style={{
            color: "gray",
            fontSize: 25,
            position: "absolute",
            left: "20%"
          }}
        >
          Description :{" "}
        </text>
        <textarea
          style={{
            color: "gray",
            fontSize: 25,
            background: "#242424",
            borderColor: "#242424",
            width: 500.25,
            height: 110,
            position: "absolute",
            left: "30%"
          }}
          value={this.state.descriptioninput}
          readOnly
        >
        </textarea>
        <br />
        <br />
        <br />
        <br />
        <br />
        <text style={{ color: "#F9BB32", position: "absolute", left: "20%" }}>
          Fields waiting for your consultancy
        </text>
        <br />
        <hr
          style={{
            borderColor: "#F9BB32",
            backgroundColor: "#F9BB32",
            height: 0,
            width: 600.25,
            position: "absolute",
            left: "20%"
          }}
        />
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
        <br />
        <br />
        <br />
        <br />
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
        <br />
        <br />
        <br />
        <br />
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
        <br />
        <br />
        <br />
        <br />
        <text
          style={{
            fontSize: 20,
            color: "white",
            position: "absolute",
            left: "20%"
          }}
        >
          What skills do you wish for ?
        </text>
        <br />
        <br />
        <Select
          className={classes.dropdown}
          onChange={this.skillsChange}
          icon={classes.dropdownIndicator}
          options={this.getOptions()}
          isMulti
        />
        <br />
        <text
          style={{
            fontSize: 20,
            color: "white",
            position: "absolute",
            left: "20%"
          }}
        >
          What is the commitement level you wish for ?
        </text>
        <br />
        <br />
        <Select
          className={classes.dropdown}
          onChange={this.commitChange}
          icon={classes.dropdownIndicator}
          options={this.state.commitementLevels}
        />
        <text
          style={{
            fontSize: 20,
            color: "white",
            position: "absolute",
            left: "20%"
          }}
        >
          What is the experience level you wish for ?
        </text>
        <br />
        <Select
          className={classes.dropdown}
          onChange={this.experienceChange}
          icon={classes.dropdownIndicator}
          options={this.state.experienceLevels}
        />
        <p
          style={{
            color: "white",
            fontSize: 25,
            position: "absolute",
            left: "20%"
          }}
        >
          Deadline
        </p>
        <br />
        <br />
        <div style={{ position: "absolute", left: "20%" }}>
          <Form.Group controlId="formGriddeadline">
            <Form.Control
              type="date"
              onChange={evt => this.updateDeadline(evt)}
            />
          </Form.Group>
        </div>
        <br />
        <br />
        <button
          onClick={this.handleClick.bind(this)}
          style={{
            background: "#F9BB32",
            borderRadius: "10%",
            width: 100,
            height: 20,
            position: "absolute", left: "40%" 
          }}
        >
          submit
        </button>
        <br />
        <br />
      </div>
    );
  }
}
export default withStyles(styles)(CreateTask);
