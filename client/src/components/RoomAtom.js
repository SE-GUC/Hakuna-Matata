import React, { Component } from "react";
import { Link } from "react-router-dom";

export class RoomAtom extends Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted"
    };
  };

  render() {
    const {
    _id,
    reservedId,
    reservedDate ,
    capacity ,
    endOfReservation ,
    reserved
    } = this.props.room;
    return (
      <div style={this.getStyle()}>
        <p>
        reservedId : {reservedId},
        reservedDate : {reservedDate} ,
        capacity : {capacity} ,
        endOfReservation : {endOfReservation} ,
        reserved : {reserved}
          <Link
            to={{
                // aih el path dah ?
              pathname: `/Room/${_id}`,
              state: {
                fromNotifications: true
              }
            }}
          >
            show room
          </Link>
        </p>
      </div>
    );
  }
}

const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  cursor: "pointer",
  float: "right"
};

export default RoomAtom;
