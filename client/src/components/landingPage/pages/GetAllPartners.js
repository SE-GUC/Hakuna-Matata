import React, { Component } from "react";
import axios from "axios";
import Partners from '../Partners';
// import { BrowserRouter as Router, Route } from "react-router-dom";

export class GetAllpartners extends Component {
  state = {
    partners: []
  };
  componentDidMount() {
    axios
      .get('http://localhost:3333/partners')
      .then(res => this.setState({ partners: res.data.data }))
  }
  render() {
    return (
      <div className="GetAllPartners">
        <Partners
          partners={this.state.partners}
        />
      </div>
    );
  }
}
export default GetAllpartners;
