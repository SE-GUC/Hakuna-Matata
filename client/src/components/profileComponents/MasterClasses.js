import React from 'react';
import MasterClass from './MasterClass';
class MasterClasses extends React.Component {
  render() {
    return this.props.masterClasses.map((masterClass)=>(
    
      <MasterClass key = {masterClass._id} masterClass= {masterClass} educationalOrganization={this.props.educationalOrganization}/>

    ));
  }
}

export default MasterClasses;