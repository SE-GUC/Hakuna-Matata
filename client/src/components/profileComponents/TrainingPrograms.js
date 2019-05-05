import React from 'react';
import TrainingProgram from './TrainingProgram';
class TrainingPrograms extends React.Component {
  render() {
    return this.props.trainingPrograms.map((trainingProgram)=>(
    
      <TrainingProgram key = {trainingProgram._id} trainingProgram= {trainingProgram} educationalOrganization={this.props.educationalOrganization}/>

    ));
  }
}

export default TrainingPrograms;