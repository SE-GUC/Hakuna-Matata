import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export class Room extends Component {
  getStyle = () =>{
return{
    background : '#f4f4f4',
    pading : '10px',
     borderBottom : '1px #ccc dotted',
     testAlign:'center'
}
  }
   
    render() {
    return (
      <div style={this.getStyle()}>
        <p>ROOM</p>
        <Link style = {linkStyle} to={"/coWorkingSpaces/"+this.props.coWorkingSpace._id+"/showRooms/"+this.props.room._id}  >Profile</Link>
        
      </div>
    )
  }
}
const linkStyle = {
    color :'#00000',
    testAlign:'right'

}
export default Room
