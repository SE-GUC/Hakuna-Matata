import React, { Component } from 'react';
import Taskp from './Taskp';


class Tasksp extends Component {
  
 
  render() {
    return (this.props.tasks.map((task) => (

      <Taskp key={task._id} task={task} />
    ))
    )
  }
}


export default Tasksp;