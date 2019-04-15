import React, { Component } from "react";
import axios from "axios";
import RoomsAtom from '../RoomsAtom';
// import { BrowserRouter as Router, Route } from "react-router-dom";

export class GetAllRoomsAtom extends Component {
  state = {
    rooms: []
  };
  componentDidMount() {
    axios
    .get('http://localhost:3333/rooms')
      .then(res => this.setState({ rooms: res.data }))
  }
  render() {
    return (
      <div className="GetAllRoomsAtom">
        <RoomsAtom
          rooms={this.state.rooms} 
        />
      </div>
    );
  }
}
export default GetAllRoomsAtom;
