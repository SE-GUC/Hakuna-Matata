import React from 'react';
import Room from './Room';
class Rooms extends React.Component {
  render() {
    return this.props.rooms.map((room)=>(
    
      <Room key = {room._id} room= {room} coWorkingSpace={this.props.coWorkingSpace}/>

    ));
  }
}

export default Rooms;
