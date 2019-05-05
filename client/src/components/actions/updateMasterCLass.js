
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React, { Component } from 'react'
import Col from   'react-bootstrap/Col'
import './Form.css'

// var store=require('store') 

import axios from 'axios';
  export default class updateMasterCLass extends Component {


    constructor(){
      super();
      this.state={
        name:'',
        description:'',
        payment:'',
        places:'',
        
        availablePlaces:'',
        MasterClassDuration:'',
        startDate:'',
        endDate:'',
        levelOfStudents:'',
        effort:'',
        isAvailable:false,
        
        courses:[],
        listOfApplied:[],
        listOfAccepted:[],
        educationalOrganization:null
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
handleInputChange2  = event => {this.setState({description:event.target.value});}
handleInputChange3  = event => {this.setState({payment:event.target.value});}
handleInputChange4  = event => {this.setState({places:event.target.value});}
handleInputChange5  = event => {this.setState({availablePlaces:event.target.value});}
handleInputChange6  = event => {this.setState({MasterClassDuration:event.target.value});}
handleInputChange7  = event => {this.setState({startDate:event.target.value});}
handleInputChange8  = event => {this.setState({endDate:event.target.value});}
handleInputChange9  = event => {this.setState({levelOfStudents:event.target.value});}
handleInputChange10 = event => {this.setState({effort:event.target.value});}
handleInputChange11 = event => {this.setState({isAvailable:event.target.value});}
handleInputChange12 = event => {this.setState({courses:event.target.value});}
handleInputChange13 = event => {this.setState({listOfApplied:event.target.value});}
handleInputChange14 = event => {this.setState({listOfAccepted:event.target.value});}
handleInputChange15 = event => {this.setState({educationalOrganization:event.target.value});}



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
    description :this.state.description,
    payment :this.state.payment ,
    places :this.state.places,
    availablePlaces  : this.state.availablePlaces,
    MasterClassDuration :this.state.MasterClassDuration,
    startDate :this.state.startDate ,
    endDate :this.state.endDate,
    levelOfStudents :this.state.levelOfStudents,
    effort :this.state.effort,
    isAvailable :true,

  
    // educationalOrganization :this.state.educationalOrganization,
     }
     const { match: { params } } = this.props;
     axios.put(`http://localhost:3333/masterClasses/${params.id}`,data).then(response => { 
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
  axios.delete(`http://localhost:3333/masterClasses/${params.id}`).then(response => { 
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


                <div className="form-group">
                    <label htmlFor="description" className="col-sm-3 control-label">description</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange2}  type="text" id="description" placeholder="description" className="form-control" autoFocus/>
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="payment" className="col-sm-3 control-label">payment</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange3} type="text" id="payment" placeholder="payment" className="form-control" autoFocus/>
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="places" className="col-sm-3 control-label">places</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange4} type="number" id="places" placeholder="places" className="form-control" autoFocus/>
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="availablePlaces" className="col-sm-3 control-label">availablePlaces</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange5} type="number" id="availablePlaces" placeholder="availablePlaces" className="form-control" autoFocus/>
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="MasterclassNameDuration" className="col-sm-3 control-label">MasterclassNameDuration</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange6} type="text" id="MasterclassNameDuration" placeholder="MasterclassNameDuration" className="form-control" autoFocus/>
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="startDate" className="col-sm-3 control-label">startDate</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange7} type="date" id="startDate" placeholder="startDate" className="form-control" autoFocus/>
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="endDate" className="col-sm-3 control-label">endDate</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange8} type="date" id="endDate" placeholder="endDate" className="form-control" autoFocus/>
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="levelOfStudents" className="col-sm-3 control-label">levelOfStudents</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange9} type="text" id="levelOfStudents" placeholder="levelOfStudents" className="form-control" autoFocus/>
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="effort" className="col-sm-3 control-label">effort</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange10} type="text" id="effort" placeholder="effort" className="form-control" autoFocus/>
                    </div>
                </div>


                


                {/* <div className="form-group">
                    <label htmlFor="courses" className="col-sm-3 control-label">courses</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange12} type="text" id="courses" placeholder="courses" className="form-control" autoFocus/>
                    </div>
                </div> */}


                {/* <div className="form-group">
                    <label htmlFor="listOfApplied" className="col-sm-3 control-label">listOfApplied</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange13} type="text" id="listOfApplied" placeholder="listOfApplied" className="form-control" autoFocus/>
                    </div>
                </div> */}


                {/* <div className="form-group">
                    <label htmlFor="listOfAccepted" className="col-sm-3 control-label">listOfAccepted</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange14} type="text" id="listOfAccepted" placeholder="listOfAccepted" className="form-control" autoFocus/>
                    </div>
                </div> */}


                {/* <div className="form-group">
                    <label htmlFor="educationalOrganization" className="col-sm-3 control-label">educationalOrganization</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange15} type="text" id="educationalOrganization" placeholder="educationalOrganization" className="form-control" autoFocus/>
                    </div>
                </div> */}


                <div className="form-group">
                    <label htmlFor="isAvailable" className="col-sm-3 control-label">isAvailable</label>
                    <div className="col-sm-9">
                        <input onChange={ this.handleInputChange11} input type="checkbox"  id="isAvailable" placeholder="isAvailable" className="form-control" autoFocus/>
                    </div>
                </div>


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
  


