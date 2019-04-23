import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import { Form, Col, Button } from "react-bootstrap";
import Select from "react-select";
var store = require("store");
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
    background: "#e5e8e8",
    color: "#e5e8e8",
    "&$checked": {
      background: "grey",
      color: "grey"
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
    educator: [],
    places: null,
    price: null,
    duration: null,
    description: "",
    selectedValue: "a",
    category: null,
    startDate: new Date(),
    endDate: new Date(),
    techCompanies: [],
    eduId: null
  };

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
  };
  titleChange = event => {
    this.setState({ title: event.target.value });
  };
  educatorChange = event => {
    this.setState({ educator: event });
  };
  placeschange = event => {
    this.setState({ places: event.target.value });
  };
  pricechange = event => {
    this.setState({ price: event.target.value });
  };
  durationchange = event => {
    this.setState({ duration: event.target.value });
  };
  categoryChange = event => {
    this.setState({ category: event.target.value });
  };
  descriptionChange = event => {
    this.setState({ description: event.target.value });
  };
  startDateChange(evt) {
    this.setState({
      startDate: evt.target.value
    });
  }
  endDateChange(evt) {
    this.setState({
      endDate: evt.target.value
    });
  }
  DateChange = date => {
    this.setState({
      startDate: date
    });
  };
  async handleClick() {
    const  id  = store.get("payload").id ;
    this.setState({ eduId: id });

    console.log(this.state.eduId);
    const data = {
      name: this.state.title,
      educator: {
        id: this.state.educator.value,
        name: this.state.educator.label
      },
      description: this.state.description,
      places: this.state.places,
      availablePlaces: this.state.places,
      payment: this.state.price,
      courseDuration: this.state.duration,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      category: this.state.category,
      isAvailable: this.state.selectedValue === "yes" ? true : false
    };
    await axios
      .post(`http://localhost:3333/educationalOrganizations/course/${id}`, data)
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
      .get(`http://localhost:3333/educationalOrganizations/educator/${id}`)
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
      <div style={{ minHeight: "100vh", background: "white" }}>
        <Col md={{ span: 5, offset: 3 }}>
        <form onSubmit={this.handleClick.bind(this)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" onChange={this.titleChange} required/>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Educator</Form.Label>
            <Select
              onChange={this.educatorChange}
              icon={classes.dropdownIndicator}
              options={this.getOptions()}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Places</Form.Label>
            <Form.Control type="text" onChange={this.placeschange} required/>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>price</Form.Label>
            <Form.Control type="text" onChange={this.pricechange} required/>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Course Duration</Form.Label>
            <Form.Control type="text" onChange={this.durationchange} required/>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" onChange={this.descriptionChange}  required/>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" onChange={this.categoryChange} required />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
            required
              type="date"
              selected={this.state.startDate}
              onChange={evt => this.startDateChange(evt)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>End Date</Form.Label>
            <Form.Control
            required
              type="date"
              selected={this.state.endDate}
              onChange={evt => this.endDateChange(evt)}
            />
          </Form.Group>
          <Form.Label>Is the course available ?</Form.Label>
          <div>
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
            <text style={{ color: "black", width: 50, height: 50 }}>Yes</text>
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
            <text style={{ color: "black", width: 50, height: 50 }}>No</text>
          </div>
          <div style={{ textAlign: "right" }}>
            <Button
            type='submit'
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
