import React, { Component } from "react";
import axios from "axios";

export class GetSpecificCourse extends Component {
    state = {
      courseToShow: ''
    }
    componentDidMount() {
        const {id}=this.props.match.params
        console.log(id)
        axios
          .get(`http://localhost:3333/courses/${id}`)
          .then(res => {
            this.setState({ courseToShow: res.data.data})
            console.log(this.state.courseToShow)
          }
            )
    }
    getData(){
      if(this.state.courseToShow != null){
        const {_id ,name,educatorName,description,places,availablePlaces,payment,courseDuration,startDate,endDate,categories,available,acceptedMembers}=this.state.courseToShow
    return <p> name: {name} educatorName: {educatorName} description: {description} ,places: {places} availablePlace: {availablePlaces} payment: {payment} courseDuration:{courseDuration} 
     startDate:{startDate}  endDate:{endDate} categories:{categories} available:{available} acceptedMembers:{acceptedMembers}</p>
    }else{
      return 'hello'
    }
    }
    render() {
      return (
        <div className="GetAllCourses">
          <p>{this.getData()}  </p>
          
        </div>
      );
    }
  }
  export default GetSpecificCourse;