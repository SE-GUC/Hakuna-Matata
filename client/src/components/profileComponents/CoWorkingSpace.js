import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export class CoWorkingSpace extends Component {
  getStyle = () =>{
return{
    background : '#242424',
    pading : '10px',
     testAlign:'center'
}
  }
   
    render() {
    return (
      <div style={this.getStyle()}>
        <p style = {{color :'white'}}> { this.props.coWorkingSpace.coworkingSpaceName}</p>
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
