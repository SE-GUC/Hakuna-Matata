import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import { Form } from "react-bootstrap";
import Select from "react-select";
import {Link} from 'react-router-dom';

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
    educator:[],
    places:null,
    price:null,
    duration:null,
    description: "",
    selectedValue: "a",
    category: null,
    startDate: new Date(),
    endDate:new Date(),
    techCompanies: [],
    eduId:null
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
    const { id } = this.props.match.params;
    console.log(id)
    this.setState({eduId:id})
   
    console.log(this.state.eduId)
    const data = {
      name: this.state.title,
      educator:{id:this.state.educator.value,name:this.state.educator.label},
      description: this.state.description,
      places:this.state.places,
      availablePlaces:this.state.places,
      payment:this.state.price,
      courseDuration:this.state.duration,
      startDate:this.state.startDate,
      endDate:this.state.endDate,
      category:this.state.category,
      isAvailable:this.state.selectedValue === "yes" ? true : false,
    };
   await axios.post(`http://localhost:3333/educationalOrganizations/course/${id}`, data);
   
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
          options={this.getOptions()}
        />
          <div className={classes.root}>
            <TextField
              id="Title"
              label="places"
              margin="normal"
              onChange={this.placeschange}
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
              onChange={this.pricechange}
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
              label="course duration"
              margin="normal"
              onChange={this.durationchange}
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
              label="category"
              margin="normal"
              onChange={this.categoryChange}
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
        <Link style = {ButotnStyle1} to={"/educationalOrganization/"+this.props.match.params.id}>
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
        </Link>
      </div>
    );
  }
}
const ButotnStyle1 = {
  backgroundColor:'#242424',
    color :'white',
    testAlign:'center',
    pading:'15px 32px',
    borderRadius:'12px',
    float :'right',
    fontSize:'18px'

}
export default withStyles(styles)(CreateTask);
