import React, { Component } from "react";
import {  Col, Button, Form, Card } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import swal from 'sweetalert';
import CreatableSelect from 'react-select/lib/Creatable';
import { connect } from 'react-redux'

import axios from "axios";

class MasterclassForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:'',
            educator:null,
            description:'',
            places:0,
            availablePlaces:0,
            payment:0,
            courseDuration:'',
            startDate:'',
            endDate:'',
            category:'',
            isAvailable:false,
            listOfApplied:[],
            listOfAccepted:[],
            skills:[],
            members:[]
        };
        this.onChange = this.onChange.bind(this)
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

        onChange(e) {
            this.setState({ [e.target.name]: e.target.value })
        }
        handleChange1 = (newValue, actionMeta) => {
            console.log(`action: ${actionMeta.action}`);
            if(newValue!=null) this.setState({category: newValue.label})
          };
          handleChange = (newValue, actionMeta) => {

            if(newValue!=null){ 
                if(newValue.label==newValue.value) this.setState({educator:{name: newValue.label}})
                else  this.setState({educator:{name: newValue.label ,id:newValue.value}})
                
        }
          };
    handleChange2(date) {
        this.setState({     
            startDate: new Date(date)
        });
    }
    handleChange3(date) {
        this.setState({     
            endDate: new Date(date)
        });
    }
    handleInputChange = (inputValue, actionMeta) => {
        console.group('Input Changed');
        console.log(inputValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
      }
    componentDidMount() {
        let temp =[]
        this.props.info.skills.map((skill) => {
            temp.push({value:skill._id,label:skill.name})
        })
        this.setState({skills:temp})
        axios
            .get(`http://localhost:3333/members`)
            .then(res => {
                let arr = []
                res.data.data.map((member) => {
                    arr.push({ value:member._id, label:member.memberFullName})
                })
                this.setState({ members: arr })
                console.log(this.state.members)
                console.log(this.state.skills)
            }).catch(error => {
                alert(error)
            })
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            name:this.state.name,
            educator:this.state.educator,
            description:this.state.description,
            places:this.state.places,
            payment:this.state.payment,
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            category:this.state.category,

        };
        axios.post(`http://localhost:3333/educationalOrganizations/masterClass/${this.props.auth.user._id}`, data).then(res =>
        swal({
            title: "Done",
            text: res.data.msg,
            icon: "success",
          })
        ).catch(e => {
            console.log(e.response)
            swal({
                title: "Error",
                text:e.response.data.error,
                icon: "error",
              })
        });
        console.log(data)
        console.log('DONE')
    }
    getInfo =()=>{ return this.state.skills}
    render() {
        
            return (

                <div    >
                    
                    <Form onSubmit={this.handleSubmit}>
                    <Card style={{paddingLeft:5,paddingRight:5 ,marginBottom:6}} >
                    <Form.Label>Masterclass Name</Form.Label>
                        <Form.Control type="text" name='name' placeholder="courses..." onChange={this.onChange} value={this.state.name} required />

                        <Form.Label>Masterclass Educator</Form.Label>
                        <CreatableSelect
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        options={this.state.members}
      />
                             <Form.Label>Category</Form.Label>
                        <CreatableSelect
        
        onChange={this.handleChange1}
        onInputChange={this.handleInputChange}
        options={this.state.skills}
      />
                        <Form.Label> Description</Form.Label>
                        <Form.Control  as="textarea" rows="3"  name='description' placeholder="description..." onChange={this.onChange} value={this.state.description} required />
                        <Form.Row>
                        <Form.Group as={Col} >
                        <Form.Label> Places</Form.Label>
                        <Form.Control type="number" name='places' placeholder="places..." onChange={this.onChange} value={this.state.places} required />
                        </Form.Group  >
                        <Form.Group as={Col} >
                        <Form.Label>Payment</Form.Label>
                        <Form.Control type="number" name='payment' placeholder="payment is in $$$" onChange={this.onChange} value={this.state.payment} required />
                        </Form.Group  >

                        </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col} >
                                <Form.Label>Start Date</Form.Label>
                                <br />
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChange2}
                                    dateFormat="d MMMM  yyyy"
                                />
                            </Form.Group>
                        <Form.Group as={Col} >
                                <Form.Label>End Date</Form.Label>
                                <br />
                                <DatePicker
                                    selected={this.state.endDate}
                                    onChange={this.handleChange3}
                                    dateFormat="d MMMM  yyyy"
                                />
                            </Form.Group>

                        </Form.Row>



                        </Card>
                        <Button variant="dark" size="sm" type="submit" block >Create</Button>
                    </Form>
                    
                </div>
               
            )
 

        
    }
}

const mapStateToProps =(state)=>({
    auth:state.auth,
    errors:state.errors,
    info:state.info
  
  })
  
  export default connect(mapStateToProps,{})(MasterclassForm);
