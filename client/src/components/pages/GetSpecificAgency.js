import React, { Component } from "react";
import axios from "axios";

export class GetSpecificAgency extends Component {
    state = {
      consultancyAgency: null
    };
    componentDidMount() {
        const {id}=this.props.match.params
        axios
          .get(`http://localhost:3333/consultancyAgencies/${id}`)
          .then(res => {
            this.setState({ consultancyAgency: res.data.data})
          }
            )
    }
    getData(){
      if(this.state.consultancyAgency != null){
      const {
        name,
        rate,
        information,
        partners,
        members,
        reports
      } = this.state.consultancyAgency;
      var temp=""
      for(var i= 0; i < partners.length; i++) {
        temp += partners[i]+" , ";
     }
     var temp1=""
      for(var i= 0; i < members.length; i++) {
        temp1 += members[i]+" , ";
     }
     var temp2=""
      for(var i= 0; i < reports.length; i++) {
        temp2 += reports[i]+" , ";
     }
      return <p> name: {name} rate: {rate} information: {information} partners: {temp} members: {temp1} reports: {temp2}  </p>
    }else{
      return 'hello'
    }
    }
    render() {
      return (
        <div className="GetAllAgencies">
           {this.getData()} 
        </div>
      );
    }
  }
  export default GetSpecificAgency;