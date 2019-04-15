import React, { Component } from "react";
import axios from "axios";
import CoWorkingSpaces from '../CoWorkingSpaces';
// import { BrowserRouter as Router, Route } from "react-router-dom";

export class GetAllCoworkingSpace extends Component {
  state = {
    coWorkingSpaces: []
  };
  componentDidMount() {
    axios
      .get('http://localhost:3333/coWorkingSpaces')
      .then(res =>{ this.setState({ coWorkingSpaces: res.data.data })
      console.log(res.data.data)

  }
      )
      
  }
  render() {
    return (
      <div className="GetAllCoworkingSpace">
        <CoWorkingSpaces
        coWorkingSpaces={this.state.coWorkingSpaces}
        />
      </div>
    );
  }
}
export default GetAllCoworkingSpace;