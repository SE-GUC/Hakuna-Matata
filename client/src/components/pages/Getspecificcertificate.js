import React, { Component } from "react";
import axios from "axios";

export class Getspecificcertificate extends Component {
    state = {
      certificate: null
    };
    componentDidMount() {
        const {id}=this.props.match.params
        
        axios
          .get(`http://localhost:3333/educationalOrganizations/certificate/5ca8020ecb0949439c94d03a/${id}`)
          .then(res => {

            this.setState({ certificate: res.data})
            
          }
            )
    }
    getData(){
      if(this.state.certificate != null){
      const {
        _id,
        name,
        type,
        accreditation
      } = this.state.certificate;
      return <p> name: {name} type: {type} accreditation: {accreditation}  </p>
    }else{
      return 'hello'
    }
    }
    render() {
      return (
        <div className="GetAllcertificate">
          <p> {this.getData()} </p>
        </div>
      );
    }
  }
  export default Getspecificcertificate;

  