import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Axios from 'axios';
import { Link } from 'react-router-dom';

 class CourseToShow extends Component {

getStyle = () =>{
          return {
              padding :'10px',
              borderBottom:'1px #92a8d1 solid',
              background: '#f4f4f4',
          }   
  }

    render() {
        const {_id ,name,educatorName,description,places,availablePlaces,payment,courseDuration,startDate,endDate,categories,available,acceptedMembers}=this.props.courseToShow
         return (
        
      <div style ={this.getStyle()}>
        <p>
        {"name: "+ name}
        <br />
        {"educatorName :"+ educatorName}
        <br />
        {"description :"+ description}
        <br />
        {"places :"+ places}
        <br />
        {"availablePlaces :"+ availablePlaces}
        <br />
        {"payment :"+ payment}
        <br />
        {"courseDuration :"+ courseDuration}
        <br />
        {"startDate :"+ startDate}
        <br />
        {"endDate :"+ endDate}
        <br />
        {"categories :"+ categories}
        <br />
        {"available :"+ available}
        <br />
        {"acceptedMembers :"+ acceptedMembers}

        <Link  to={{
  pathname: `/courses/${_id}`,

}} >View Course</Link> 
        </p>
      </div>
     
    )
  }
}
/*Course.propTypes ={
    course:PropTypes.object.isRequired
  }*/
export default  CourseToShow
