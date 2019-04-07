import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
export class GetAllMc extends Component{
    state ={
        masterclass:[]
    }
    componentDidMount(){
        const {id}=this.props.match.params
        axios.get(`http://localhost:3333/educationalOrganizations/masterClass/${id}/`).then(res=>{
            //console.log(res);
            this.setState({masterclass: res.data})
            console.log(res.data)
      })
    }
  
  
    render()
    
    {
        const {id}=this.props.match.params
        const userList=this.state.masterclass.map((master,key)=>{
        return(
          <Router><li key={master._id}>{master.name}</li>
          <Link to ={{pathname:`/educationalOrganizations/masterClass/${id}/`+master._id}}>View
          </Link>
          </Router>
        )
      })
      return <ul>{userList}</ul>
    }}

export default GetAllMc
