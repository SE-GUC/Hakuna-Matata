import React, { Component } from "react";
import axios from "axios";
import Tasks from '../Tasks';
// import { BrowserRouter as Router, Route } from "react-router-dom";

export class GetAllTasks extends Component {
  state = {
    tasks: []
  };
  componentDidMount() {
    axios
      .get('http://localhost:3333/tasks/')
      .then(res => this.setState({ tasks: res.data.data }))
  }
  render() {
    return (
      <div className="GetAllTasks">
        <Tasks
          tasks={this.state.tasks} 
        />
      </div>
    );
  }
}
export default GetAllTasks;
