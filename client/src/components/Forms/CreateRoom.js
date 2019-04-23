import React, { Component } from "react";
import axios from "axios";
import { Form, Col, Button } from "react-bootstrap";
export class CreateTask extends Component {
  state = {
    title: null,
    slots: null
  };

  titleChange = event => {
    this.setState({ title: event.target.value });
  };
  slotsChange = event => {
    this.setState({ slots: event.target.value.split(",") });
  };
  async handleClick() {
    const { id } = this.props.match.params;
    const data = {
      capacity: this.state.title,
      slots: this.state.slots
    };
    await axios
      .post(`http://localhost:3333/coworkingSpaces/room/${id}`, data)
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
          <form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Capacity</Form.Label>
              <Form.Control type="text" onChange={this.titleChange} required />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Slots</Form.Label>
              <Form.Control type="text" onChange={this.slotsChange} required />
            </Form.Group>
            <div style={{ textAlign: "right" }}>
              <Button
                onClick={this.handleClick.bind(this)}
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
export default CreateTask;
