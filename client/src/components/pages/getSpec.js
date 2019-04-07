import React, { Component } from "react";
import axios from "axios";
import Rooms from '../Rooms';
export class GetSpec extends Component {
    state = {
      coWorkingSpace: null,
      rooms :[]
    };
    componentDidMount() {
        const {id}=this.props.match.params
        axios
          .get(`http://localhost:3333/coworkingSpaces/${id}`)
          .then(res => {
            this.setState({ coWorkingSpace: res.data})
            console.log(res.data)
          }
            )
            axios
          .get(`http://localhost:3333/coworkingSpaces/readRooms/${id}`)
          .then(res => {
            this.setState({ rooms: res.data})
            console.log(res.data)
          }
            )
        
            
    }
    getData(){
      if(this.state.coWorkingSpace != null){
      const {
          name,
        phoneNumber,
        
        location,
        businessPlans,
        facilites,
        maxNoRooms
      } = this.state.coWorkingSpace;
      return <p> name: {name} phoneNumber: {phoneNumber}  location: {location} businessPlans: {businessPlans} facilites: {facilites} maxNoRooms: {maxNoRooms}  </p>
    }else{
      return 'ya mo8fl eh ele d5lk hena'
    }
    }
    render() {
      return (
        <div className="getSpec">
         <h1>MY CoWorkingSpace Profile</h1>
     
           {this.getData()} 
         <Rooms   rooms={this.state.rooms} coWorkingSpace = {this.state.coWorkingSpace} />
        </div>
      );
    }
  }
  export default GetSpec;