import React from 'react';
import CoWorkingSpace from './CoWorkingSpace';
class CoWorkingSpaces extends React.Component {
  render() {
    return this.props.coWorkingSpaces.map((coWorkingSpace)=>(
      <CoWorkingSpace key = {coWorkingSpace._id} coWorkingSpace = {coWorkingSpace}/>
    ));
  }
}

export default CoWorkingSpaces;
