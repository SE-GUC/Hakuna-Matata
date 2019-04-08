import React, { Component } from "react";
import axios from "axios";
export class GEtSpacificcourses1 extends Component {
    state = {
      course: null
    };
    componentDidMount() {
        const {id}=this.props.match.params
        axios
          .get(`http://localhost:3333/educationalOrganizations/course/5ca89160d7a22338e473abbf/${id}`)
          .then(res => {
            this.setState({ course: res.data})
            console.log(id)
          }
            )
    }
    getData(){
      if(this.state.course != null){
      const {
        _id,
        name,
        educatorName,
        description,
        places,
        availablePlaces,
        payment,
        courseDuration,
        startDate,
        endDate,
        categories,
        available,
        listOfApplies,
        acceptedMembers
      } = this.state.course;
      return <p>  name: {name} , educatorName: {educatorName} , description: {description} , places:
      {places} ,  availablePlaces: {availablePlaces} , payment: {payment} , courseDuration: {courseDuration} , 
      startDate: {startDate} , endDate: {endDate} , categories: {categories}
       ,available: {available} , listOfApplies: {listOfApplies} , acceptedMembers: {acceptedMembers}    </p>
    }else{
      return 'hello'
    }
    }
    render() {
      return (
        <div className="GetAllCourses1">
          <p> {this.getData()} </p>
        </div>
      );
    }
  }
  export default GEtSpacificcourses1;