import React, { Component } from 'react';
import './Partner.css'
import Partner from './Partner';


class partners extends Component {
  get () {
    return (this.props.partners.map((partner) => (
      <Partner key={partner._id} partner={partner} />
    ))
    )
  }
  render(){
    return(
      <div className="grid-container">
      { this.get()}
      </div>
      )
  }
}

export default partners;