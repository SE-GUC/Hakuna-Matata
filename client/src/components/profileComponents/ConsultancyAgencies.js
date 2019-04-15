import React, { Component } from 'react';
import ConsultancyAgency from './ConsultancyAgency';


class ConsultancyAgencies extends Component {
  render() {
    return (this.props.consultancyAgencies.map((consultancyAgency) => (
      <ConsultancyAgency key={consultancyAgency._id} consultancyAgency={consultancyAgency} />
    ))
    )
  }
}

export default ConsultancyAgencies;