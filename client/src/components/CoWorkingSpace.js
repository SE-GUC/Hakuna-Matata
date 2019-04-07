import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export class CoWorkingSpace extends Component {
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
        <p style = {{color :'#fffff'}}> { this.props.coWorkingSpace.name}</p>
        <Link style = {linkStyle} to={"/coWorkingSpaces/"+this.props.coWorkingSpace._id}  >Profile</Link>
        
      </div>
    )
  }
}
const linkStyle = {
    color :'#00000',
    testAlign:'right'

}
export default CoWorkingSpace
