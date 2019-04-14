import React, { Component } from 'react';
import Task from './Task';
import './Tasks.css'

class Tasks extends Component {
  
 
  render() {
    return (this.props.tasks.map((task) => (

      <Task key={task._id} task={task} />
    ))
    )
  }
}


export default Tasks;