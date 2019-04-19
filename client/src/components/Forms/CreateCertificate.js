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
    type:null,
    accreditation:null,
  };

  titleChange = event => {
    this.setState({ title: event.target.value });
  };
  typeChange = event => {
    this.setState({ type: event.target.value });
  };
  accreditationChange = event => {
    this.setState({ accreditation: event.target.value });
  };
  async handleClick() {
    const { id } = this.props.match.params;
    const data = {
      name: this.state.title,
      type: this.state.type,
      accreditation:this.state.accreditation,
    };
    console.log(data)
    await axios.post(`http://localhost:3333/educationalOrganizations/certificate/${id}`, data);
  }
  getStyle = () => {
    return {
      background: "#242424",
      minHeight: "100vh"
    };
  };
  componentDidMount() {
  }
  upper = () => {
    return {
      color: "white",
      fontSize: 25
    };
  };
  render() {
    const { classes } = this.props;
    return (
      <div style={this.getStyle()}>
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
              label="accreditation"
              margin="normal"
              onChange={this.accreditationChange}
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
