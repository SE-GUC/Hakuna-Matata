import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { Form, Col, Button } from "react-bootstrap";
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
    type: null,
    accreditation: null
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
      accreditation: this.state.accreditation
    };
    await axios
      .post(
        `http://localhost:3333/educationalOrganizations/certificate/${id}`,
        data
      )
      .catch(e => {
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
  componentDidMount() {}
  upper = () => {
    return {
      color: "white",
      fontSize: 25
    };
  };
  render() {
    const { classes } = this.props;
    return (
      <div style={{ minHeight: "100vh", background: "white" }}>
        <Col md={{ span: 5, offset: 3 }}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" onChange={this.titleChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Type</Form.Label>
            <Form.Control type="text" onChange={this.typeChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Accreditation</Form.Label>
            <Form.Control type="text" onChange={this.accreditationChange} />
          </Form.Group>
          <div style={{ textAlign: "right" }}>
            <Button
              variant="outline-secondary"
              onClick={this.handleClick.bind(this)}
            >
              Submit
            </Button>
          </div>
        </Col>
      </div>
    );
  }
}
export default withStyles(styles)(CreateTask);
