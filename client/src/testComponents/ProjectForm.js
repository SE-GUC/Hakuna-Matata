import React, { Component } from "react";
import {  Col, Button, Form, Card } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import swal from 'sweetalert';
import { connect } from 'react-redux'

import axios from "axios";
class ProjectForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project: null,
            name: '',
            description: '',
            monetaryCompensation: 0,
            experienceLevel: 0,
            commitLevel: 0,
            consultyNeeded: true,
            deadline: new Date(),
            requiredSkills: [],
            skills: [],
            skillsLoad: false,
        };
        this.onChange = this.onChange.bind(this)
        this.onChangeMul = this.onChangeMul.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

        onChange(e) {
            this.setState({ [e.target.name]: e.target.value })
        }
    handleChange(date) {
        this.setState({     
            deadline: new Date(date)
        });
    }
    onChangeMul(e) {
        const temp = []
        const options = e.target.selectedOptions
        for (let index = 0; index < options.length; index++)
            temp.push({ name: options[index].value })
        this.setState({ requiredSkills: temp });
    }
    componentDidMount() {

                this.setState({ skills:this.props.info.skills })

    }

    getDateInfo() {
        let arr = []
        this.state.skills.map((skill) => {
            arr.push(<option key={skill._id} value={skill.name}>{skill.name} </option>)
        })
        return arr

    }
    handleSubmit(event) {
        event.preventDefault();
        const id = this.props.auth.user._id
        const name = this.props.auth.user.partnerName
        const data = {
            name: this.state.name,
            projectPartner: {
                id: id,
                name: name
            },
            description: this.state.description,
            consultyNeeded: this.state.consultyNeeded,
            deadline: this.state.deadline,
            commitLevel: this.state.commitLevel,
            experienceLevel: this.state.experienceLevel,
            monetaryCompensation: this.state.monetaryCompensation,
            requiredSkills: this.state.requiredSkills,
        };
        axios.post("http://localhost:3333/projects/", data).then(res =>
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

    render() {
        
            return (

                <div    >

                    <Form onSubmit={this.handleSubmit}>
                    <Card style={{paddingLeft:5,paddingRight:5 ,marginBottom:6}} >
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control type="text" name='name' placeholder="name..." onChange={this.onChange} value={this.state.name} required />
                        <Form.Label> Description</Form.Label>
                        <Form.Control name="description" as="textarea" rows="3" onChange={this.onChange} value={this.state.description} required />
                        <br />
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Experience Level</Form.Label>
                                <Form.Control name="experienceLevel" as="select" onChange={this.onChange} value={this.state.experienceLevel} required>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Commit Level</Form.Label>
                                <Form.Control name="commitLevel" as="select" onChange={this.onChange} value={this.state.commitLevel} required>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Monetary Compensation</Form.Label>
                                <Form.Control type="number" name="monetaryCompensation" placeholder="..$$" onChange={this.onChange} value={this.state.monetaryCompensation} required />
                            </Form.Group>
                        </Form.Row>
                        <Form.Label>Required Skills</Form.Label>
                        <Form.Control name='requiredSkills' as="select" multiple onChange={this.onChangeMul} required>
                            {this.getDateInfo()}
                        </Form.Control>
                        <br />

                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Deadline</Form.Label>
                                <br />
                                <DatePicker
                                    selected={this.state.deadline}
                                    onChange={this.handleChange}
                                    dateFormat="d MMMM  yyyy"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" style={{ marginLeft: 20 }}>
                                <Form.Label>Consulty Needed</Form.Label>
                                <br />
                                <Form.Check
                                    type="radio"
                                    label="Yes"
                                    name="consultyNeeded"
                                    id="formHorizontalRadios1"
                                    inline
                                    value={true}
                                    onChange={this.onChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="No"
                                    name="consultyNeeded"
                                    id="formHorizontalRadios2"
                                    inline
                                    value={false}

                                    onChange={this.onChange}
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
  
  export default connect(mapStateToProps,{})(ProjectForm);
