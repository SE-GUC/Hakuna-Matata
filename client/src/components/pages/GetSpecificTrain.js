import React, { Component } from "react";
import axios from "axios";

export class GetSpecificTrain extends Component {
    state = {
      TrainToShow: ''
    }
    componentDidMount() {
        const {id}=this.props.match.params
        const{programId}=this.props.match.params
        console.log(id)
        axios
          .get(`http://localhost:3333/educationalOrganizations/trainingProgram/${id}/${programId}`)
          .then(res => {
            this.setState({ TrainToShow: res.data})
            console.log(this.state.TrainToShow)
          }
            )
    }
    getData(){
      if(this.state.TrainToShow != null){
        const {_id ,name,trainerId,trainerName,description,type,duration}=this.state.TrainToShow
    return <p> name: {name}<br/> description: {description} 
     </p>
    }else{
      return 'hello'
    }
    }
    render() {
      return (
        <div className="GetSpecificTrain">
          <p>{this.getData()}  </p>
          
        </div>
      );
    }
  }
  export default GetSpecificTrain
