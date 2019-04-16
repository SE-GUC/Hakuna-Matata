import React, { Component } from 'react';
import ConsultancyAgency from './ConsultancyAgency';

import './ConsultancyAgency.css'
class ConsultancyAgencies extends Component {
  get () {
    return (this.props.consultancyAgencies.map((consultancyAgency) => (
      <ConsultancyAgency key={consultancyAgency._id} consultancyAgency={consultancyAgency} />
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

export default ConsultancyAgencies;