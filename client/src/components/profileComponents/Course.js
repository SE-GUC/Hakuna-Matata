import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export class Course extends Component {
  getStyle = () =>{
return{
  background : '#242424',
  pading : '10px',
   testAlign:'left'
}
  }
   
    render() {
    return (
        
      <div style={this.getStyle()}>
      <p style ={{color :"white", textAlign: "left" , fontSize :'18px'}}>{ this.props.course.name}<Link style = {ButotnStyle}  to={"/educationalOrganizations/course/"+this.props.educationalOrganizationId+"/"+this.props.course.id}><button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  >Show Course</button></Link>
      
      </p>
     
    </div>
    )
  }
}
const ButotnStyle = {
  backgroundColor:'#242424',
    color :'white',
    testAlign:'center',
    pading:'15px 32px',
    borderRadius:'12px',
    float :'right',
    fontSize:'18px'

}
export default Course
