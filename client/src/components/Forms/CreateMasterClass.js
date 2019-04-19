import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import { Form } from "react-bootstrap";
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
});
export class CreateTask extends Component {
  state = {
    title: null,
    educator:null,
    places:null,
    price:null,
    duration:null,
    levelOfStudents:null,
    effort:null,
    description: "",
    selectedValue: "a",
    startDate: new Date(),
    endDate:new Date()
  };

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
  };
  titleChange = event => {
    this.setState({ title: event.target.value });
  };
  educatorChange = event => {
    this.setState({ educator: event.target.value });
  };
  placesChange = event => {
    this.setState({ places: event.target.value });
  };
  priceChange = event => {
    this.setState({ price: event.target.value });
  };
  durationChange = event => {
    this.setState({ duration: event.target.value });
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
  levelChange=evt=> {
    this.setState({
      levelOfStudents: evt.target.value
    });
  }
  effortChange=evt=> {
    this.setState({
      effort: evt.target.value
    });
  }
endDateChange(evt) {
    this.setState({
      endDate: evt.target.value
    });
  }
  async handleClick() {
    const { id } = this.props.match.params;
    const data = {
      name: this.state.title,
      description: this.state.description,
      places:this.state.places,
      availablePlaces:this.state.places,
      payment:this.state.price,
      MasterClassDuration:this.state.duration,
      startDate:this.state.startDate,
      endDate:this.state.endDate,
      levelOfStudents:this.state.levelOfStudents,
      effort:this.state.effort,
      isAvailable:this.state.selectedValue === "yes" ? true : false,
    };
    console.log(data)
    await axios.post(`http://localhost:3333/educationalOrganizations/masterClass/${id}`, data);
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
              id="Title"
              label="places"
              margin="normal"
              onChange={this.placesChange}
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
              label="price"
              margin="normal"
              onChange={this.priceChange}
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
              label="masterclass duration"
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
          <div className={classes.root}>
            <TextField
              id="Title"
              label="level of students needed"
              margin="normal"
              onChange={this.levelChange}
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
              label="effort"
              margin="normal"
              onChange={this.effortChange}
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
          <div style={{ position: "absolute", left: "36%" }}>
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
            end Date
          </p>
          <div style={{ position: "absolute", left: "36%" }}>
          <Form.Group controlId="formGriddeadline">
            <Form.Control
              type="date"
              selected={this.state.endDate}
              onChange={evt => this.endDateChange(evt)}
            />
          </Form.Group>
          </div>
        </div>

        <br></br>
        <text style={this.consultancy()}>
            Is the course available ?
          </text>
        </div>
        <div style={this.consultancy()}>
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
          <text style={{ color: "gray", width: 50, height: 50 }}>Yes</text>
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
          <text style={{ color: "gray", width: 50, height: 50 }}>No</text>
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
      </div>
    );
  }
}
export default withStyles(styles)(CreateTask);
