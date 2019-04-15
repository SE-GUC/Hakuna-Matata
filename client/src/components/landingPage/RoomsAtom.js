import React, { Component } from 'react';
import RoomAtom from './RoomAtom';

class RoomsAtom extends Component {
  get() {
    return (this.props.rooms.map((room) => (
      <RoomAtom key={room._id} room={room} />
    )))
  }
  render(){
    return(
      <div className="grid-container">
      {this.get()}
      </div>
      )
  }
}


export default RoomsAtom;