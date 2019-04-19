import React, { Component } from "react";
import axios from "axios";
import Tasks from '../Tasks';
import Chat from '../../chat/Chat';
import '../Task.css';
var store = require('store')
// import { BrowserRouter as Router, Route } from "react-router-dom";

export class GetAllTasks extends Component {
  getStyle = () => {
    return {
      background: "grey",
     
    };
  };  
  state = {
    tasks: []
  };
  componentDidMount() {
    axios
      .get('http://localhost:3333/tasks/')
      .then(res => this.setState({ tasks: res.data.data}))
      

console.log(store.get('payload').id)
  }
  render() {
    return (
      
      <div className="GetAllTasks">
        <Tasks
          tasks={this.state.tasks} 
        />
                  <Chat/>

      </div>
    );
  }
}
export default GetAllTasks;
