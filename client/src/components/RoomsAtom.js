import React, { Component } from 'react';
import RoomAtom from './RoomAtom';

class RoomsAtom extends Component {
  render() {
    return (this.props.rooms.map((room) => (
      <RoomAtom key={room._id} room={room} />
    ))
    )
  }
}


export default RoomsAtom;