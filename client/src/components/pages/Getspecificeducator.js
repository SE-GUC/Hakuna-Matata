import React, { Component } from "react";
import axios from "axios";

export class Getspecificedicator extends Component {
    state = {
      educator: null
    };
    componentDidMount() {
        const {id}=this.props.match.params
        
        axios
          .get(`http://localhost:3333/educationalOrganizations/educator/5ca7c90dc9bb884720938e8b/${id}`)
          .then(res => {
            this.setState({ educator: res.data})
            
          }
            )
    }
    getData(){
      if(this.state.educator != null){
      const {
        _id,
        name,
        certifactes,
        experienceLevel,
        contact
      } = this.state.educator;
      return <p> name: {name} certifactes: {certifactes} experienceLevel: {experienceLevel} contact: {contact}  </p>
    }else{
      return 'hello'
    }
    }
    render() {
      return (
        <div className="GetAlleducators">
          <p> {this.getData()} </p>
        </div>
      );
    }
  }
  export default Getspecificedicator;

  