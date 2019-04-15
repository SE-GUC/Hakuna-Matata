import React, { Component } from "react";
import axios from "axios";
import Projects from '../projects';
import '../project.css'

// import { BrowserRouter as Router, Route } from "react-router-dom";

export class GetAllProjects extends Component {
  getStyle = () => {
    return {
      background: "grey",
     
    };
  };
  state = {
    projects: []
  };
  componentDidMount() {
    axios
      .get('http://localhost:3333/projects/')
      .then(res => this.setState({ projects: res.data.data }))
  }
  
  render() {
    return (
      <div className="GetAllProjects">
        <Projects
          projects={this.state.projects} 
        />
      </div>
    );
  }
}
export default GetAllProjects;
