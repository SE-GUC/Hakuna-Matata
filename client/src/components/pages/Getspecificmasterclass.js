import React, { Component } from "react";
import axios from "axios";

export class GetSpecificmasterclass extends Component {
    state = {
      courseToShow: ''
    }
    componentDidMount() {
        const {id}=this.props.match.params
        const{masterClassId}=this.props.match.params
        console.log(id)
        axios
          .get(`http://localhost:3333/educationalOrganizations/masterClass/${id}/${masterClassId}`)
          .then(res => {
            this.setState({ courseToShow: res.data})
            console.log(this.state.courseToShow)
          }
            )
    }
    
    getData(){
      if(this.state.courseToShow != null){
        const {_id ,name,educatorName,description,places,availablePlaces,payment,startDate,endDate,
        levelOfStudents,effort,available,studentsAssigened,courseDuration}=this.state.courseToShow
    return <p> {"name: "+ name}  <br /> {"description: "+description}
    <br />{"places: "+places}<br />{"availblePlaces: "+availablePlaces} <br /> 
    {"payment: "+payment}<br /> {"course duration: "+courseDuration} <br />
    {"Startdate: "+startDate}<br /> {"endDate: "+endDate}<br />
    {"levelofStudents: "+levelOfStudents}<br />{"effort: "+effort}<br />
    {"availble: "[+available]}
     </p>
    }else{
      return 'hello'
    }
    }
    render() {
      return (
        <div className="GetSpecificmasterclass">
          <p>{this.getData()}  </p>
          
        </div>
      );
    }
  }
  export default GetSpecificmasterclass