import React, { Component } from 'react';
import Task from './Task';
import './Tasks.css'

class Tasks extends Component {
  get() {
    
    return ( 
    this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
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


export default Tasks;