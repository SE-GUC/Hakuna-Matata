import React, { Component } from 'react';
import Educator from './Educator';

class Educators extends Component {
  render() {
    return (this.props.educators.map((educator) => (
      <Educator key={educator._id} educator={educator} />
    ))
    )
  }
}


export default Educators;