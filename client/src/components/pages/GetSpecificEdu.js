import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export class GetSpecificEdu extends Component{
    state ={
        educationalOrganization:null
    }
    componentDidMount(){
        const {id}=this.props.match.params
        axios.get(`http://localhost:3333/educationalOrganizations/${id}`).then(res=>{
            //console.log(res);
            this.setState({educationalOrganization: res.data.data})
            //console.log(res.data.data)
      })
    }
  
    getData(){
        if(this.state.educationalOrganization!=null){
            const{
                name
            }=this.state.educationalOrganization
            return<p>name:{name}</p>
        }
        else {
            return 'hello'
        }
    }
    render(){
        const {id}=this.props.match.params
        return(
            
            <div className ="getAllEdu">
            {this.getData()}
            <Link
            to={{
              pathname: `/educationalOrganizations/masterClass/${id}`,
              state: {
                fromNotifications: true
              }
            }}
          >
show Master Class
          </Link>
          <br/>
          <Link
            to={{
              pathname: `/educationalOrganizations/trainingProgram/${id}`,
              state: {
                fromNotifications: true
              }
            }}
          >
show Training programs
          </Link>
    
            </div>
        )
    }
}
export default GetSpecificEdu