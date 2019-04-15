import React, { Component } from 'react';
import Certificate from './Certificate';

class Certificates extends Component {
  render() {
    return (this.props.certificates.map((certificate) => (
      <Certificate key={certificate._id} certificate={certificate} educationalOrganization={this.props.educationalOrganization} />
    ))
    )
  }
}


export default Certificates;