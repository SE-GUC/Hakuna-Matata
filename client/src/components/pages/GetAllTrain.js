import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
export class GetAllTrain extends Component{
    state ={
       training:[]
    }
    componentDidMount(){
        const {id}=this.props.match.params
        axios.get(`http://localhost:3333/educationalOrganizations/trainingProgram/${id}/`).then(res=>{
            //console.log(res);
            this.setState({training: res.data})
            console.log(res.data)
      })
    }
  
  
    render()
    
    {
        const {id}=this.props.match.params
        const userList=this.state.training.map((trainingg,key)=>{
        return(
          <Router><li key={trainingg._id}>{trainingg.name}</li>
          <Link to ={{pathname:`/educationalOrganizations/trainingProgram/${id}/`+trainingg._id}}>View
          </Link>
          </Router>
        )
      })
      return <ul>{userList}</ul>
    }}

export default GetAllTrain


