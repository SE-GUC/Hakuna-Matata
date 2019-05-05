
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React, { Component } from 'react'
import Col from   'react-bootstrap/Col'
import './Form.css'

// var store=require('store') 

import axios from 'axios';
  export default class traingingPrograme extends Component {


    constructor(){
      super();
      this.state={
        name:'',
        // trainer:'',
        description:'',
        type:'',
        
        duration:'',
        applyDueDate:'',
        startDate:'',
        
        requiredSkills:[],
        
      }
  }

  //   state = {
  //     userName : '',
  // }

  // componentDidMount(){
  //     const user = JSON.parse(localStorage.getItem('user'));
  //     if(!user){
  //       return  this.props.history.push('/Login');
  //     }
  //     this.setState({userName: user.userName})
  //   }

handleInputChange1  = event => {this.setState({name:event.target.value});}
// handleInputChange2  = event => {this.setState({trainer:event.target.value});}
handleInputChange3  = event => {this.setState({description:event.target.value});}
handleInputChange4  = event => {this.setState({type:event.target.value});}
handleInputChange5  = event => {this.setState({duration:event.target.value});}
handleInputChange6  = event => {this.setState({applyDueDate:event.target.value});}
handleInputChange7  = event => {this.setState({startDate:event.target.value});}
handleInputChange8  = event => {this.setState({requiredSkills:event.target.value});}



//handleSubmit(e){
  handleSubmit= event =>{
  event.preventDefault();
  // const token = store.get('payload').token;
  // if(!token){
  //    console.log('no token');
  //    return;
  // }
const  data= {
    name     :this.state.name,
    // trainer :this.state.trainer,
    description :this.state.description,
    type :this.state.type,
    duration :this.state.duration,
    applyDueDate :this.state.applyDueDate ,
    
    startDate :this.state.startDate,
    // requiredSkills :[this.state.requiredSkills],
    

  
    // educationalOrganization :this.state.educationalOrganization,
     }
     const { match: { params } } = this.props;

  axios.put(`http://localhost:3333/trainingPrograms/${params.id}`,data).then(response => { 
      console.log(response)
      alert('successful update')
      // localStorage.removeItem('token')
      // localStorage.removeItem('user'); 
      // this.props.history.push('/Login');
    })
    .catch(error => {
        console.log(error.response)
    });



}


handleDelete= event =>{
  event.preventDefault();
  const { match: { params } } = this.props;

  axios.delete(`http://localhost:3333/trainingProgram/$${params.id}`).then(response => { 
  console.log(response)
  alert('Successful Delete')
  // localStorage.removeItem('token')
  // localStorage.removeItem('user'); 
  // this.props.history.push('/Login');
})
.catch(error => {
    console.log(error.response)
});


}



    render() {
      return (
        <div className="container">
            

            <form onSubmit= {this.handleSubmit} className="form-horizontal" role="form">

            <h2>UPDATE</h2>



                <div className="form-group">
                    <label htmlFor="name" className="col-sm-3 control-label">name</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange1} type="text" id="name" placeholder="name" className="form-control" autoFocus/>
                    </div>
                </div>


                {/* <div className="form-group">
                    <label htmlFor="trainer" className="col-sm-3 control-label">trainer</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange2}  type="text" id="trainer" placeholder="trainer" className="form-control" autoFocus/>
                    </div>
                </div> */}


                <div className="form-group">
                    <label htmlFor="description" className="col-sm-3 control-label">description</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange3} type="text" id="description" placeholder="description" className="form-control" autoFocus/>
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="duration" className="col-sm-3 control-label">duration</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange5} type="text" id="duration" placeholder="duration" className="form-control" autoFocus/>
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="applyDueDate" className="col-sm-3 control-label">applyDueDate</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange6} type="date" id="applyDueDate" placeholder="applyDueDate" className="form-control" autoFocus/>
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="startDate" className="col-sm-3 control-label">startDate</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange7} type="date" id="startDate" placeholder="startDate" className="form-control" autoFocus/>
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="type" className="col-sm-3 control-label">type</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange4} type="text" id="type" placeholder="type" className="form-control" autoFocus/>
                    </div>
                </div>


                {/* <div className="form-group">
                    <label htmlFor="requiredSkills" className="col-sm-3 control-label">requiredSkills</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange8} type="text" id="requiredSkills" placeholder="requiredSkills" className="form-control" autoFocus/>
                    </div>
                </div> */}


                


                <div className="form-group">
                    
                    <div className="col-sm-9">
                        <button type="submit"  className="form-control" autoFocus> Update</button>
                    </div>
                </div>


                <div className="form-group">
                    
                    <div className="col-sm-9">
                    <button onClick= {this.handleDelete} type="submit"  className="form-control" autoFocus> Delete</button>
                    </div>
                </div>



               

                

            </form>
            

            
        </div>


        



        
          
      )
    }
  }
  


