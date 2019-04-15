import React, { Component } from 'react';
import Project from './project';
//import './projects.css';

class Projects extends Component {
  get(){
    
    return (

        this.props.projects.map((project) => (
          <Project key={project._id} project={project} />



          )))
    }
    render(){
      return(
        <div className="grid-container">
        {this.get()}
        </div>
        )
    }
}


export default Projects;