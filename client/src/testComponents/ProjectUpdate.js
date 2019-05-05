import React, { Component } from "react";
import { Container, Col, Spinner, Card, Row, Button, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

import axios from "axios";
import UpdateListOfItems from './UpdateListOfItems'
import ListOfUsers from './ListOfItems'
import IdentityCard from './IdentityCard'
import Moment from 'react-moment';

// var store = require("store");
const itemLinkStyle = {
    color: "#3192a0"
}
const itemStyle = {
    color: '#6c757d'
}
const containerStyle = {
    marginBottom: 7, marginTop: 0, marginLeft: 2, marginRight: 0, padding: 0
}
const colStyle = {
    paddingRight: 0, flex: '0 0 21.3%', maxWidth: ' 21.3%'
}
const infoStyle = {
    paddingLeft: 0, marginRight: 90
}

const buttonColStyle = {
    marginRight: 3, padding: 0
}
class ProjectUpdate extends Component {
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
            workCycle: 0,
            newSkillsSelect: [],
            serverSkills: [],
           
        };
        
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.onChangeMul = this.onChangeMul.bind(this)
        this.onClickSkillDelete = this.onClickSkillDelete.bind(this)
        this.onClickNewSkillAdd = this.onClickNewSkillAdd.bind(this)
    }
    handleDelete(){
        const { id } = this.props.match.params;

        axios.delete(`http://localhost:3333/projects/${id}`).then(res =>{
        swal({
            title: "Done",
            text: res.data.msg,
            icon: "success",
          })
          window.location.href =`http://localhost:3000/HomePage`
        }
        ).catch(e => {
            swal({
                title: "Oh",
                text: e,
                icon: "error",
              })
        });
        console.log('DONE')
    }
    onSubmit(event) {
        event.preventDefault();
        const { id } = this.props.match.params;
     
        let newSkills= this.state.requiredSkills;
        newSkills.concat(this.state.skills.filter(function(el) {
            return newSkills.indexOf(el) === -1;
        }));
        const data = {
            name: this.state.name,
            description: this.state.description,
            consultyNeeded: this.state.consultyNeeded,
            commitLevel: this.state.commitLevel,
            experienceLevel: this.state.experienceLevel,
            monetaryCompensation: this.state.monetaryCompensation,
            requiredSkills:newSkills,
        };
        axios.put(`http://localhost:3333/projects/${id}`, data).then(res =>{
        swal({
            title: "Done",
            text: res.data.msg,
            icon: "success",
          })
          window.location.href =`http://localhost:3000/projects/${id}`}
        ).catch((e )=> {
        swal({
            title: "Error",
            text: e.response.data.error,
            icon: "error",
          })
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onChangeMul(e) {
        const temp = []
        const options = e.target.selectedOptions
        for (let index = 0; index < options.length; index++)
            temp.push({ name: options[index].value })
        this.setState({ requiredSkills: temp });
        
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get(`http://localhost:3333/projects/${id}`).then(res => {
            this.setState({
                project: res.data.data,
                skills: res.data.data.requiredSkills,
                name: res.data.data.name,
                appliedMembers: res.data.data.appliedMembers,
                description: res.data.data.description,
                monetaryCompensation: res.data.data.monetaryCompensation,
                experienceLevel: res.data.data.experienceLevel,
                commitLevel: res.data.data.commitLevel,
                consultyNeeded: res.data.data.consultyNeeded,
                workCycle: res.data.data.workCycle,
                projectPartner: res.data.data.projectPartner,
            });
            console.log(res.data.data);
        });
        axios
            .get(`http://localhost:3333/skills`)
            .then(res => {
                this.setState({ serverSkills: res.data.data })
            }).catch(error => {
                alert(error)
            })
    }
    getInfo() {
        const returnedArr = []
        if (this.state.project.name)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row>  <Col sm={1} style={colStyle}   >Name</Col>
                        <Col sm={7} style={infoStyle}>                        <Form.Control type="text" name='name' placeholder="name..." onChange={this.onChange} value={this.state.name} required /></Col> </Row>

                    {/* <div style={itemStyle}>{this.state.project.name}  </div>  */}
                </Container>)
        if (this.state.project.project)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle}>Project</Col>
                        <Col sm={4} style={infoStyle}><Link to={`/projects/${this.state.project.project.id}`} style={itemLinkStyle}>{this.state.project.project.name}  </Link> </Col>
                    </Row>
                </Container>)
        if (this.state.project.projectMember)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle}>Member</Col>
                        <Col sm={4} style={infoStyle}><Link to={`/users/${this.state.project.projectMember.id}`} style={itemLinkStyle}>{this.state.project.projectMember.name}  </Link> </Col>
                    </Row>
                </Container>)
        if (this.state.project.consultancyAgency)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle} >Consultancy </Col>
                        <Col sm={4} style={infoStyle}><Link to={`/users/${this.state.project.consultancyAgency.id}`} style={itemLinkStyle}>{this.state.project.consultancyAgency.name}  </Link> </Col>
                    </Row>
                </Container>)
        if (this.state.project.description)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle} >Description </Col>
                        <Col sm={7} style={infoStyle}> <Form.Control name="description" as="textarea" rows="3" onChange={this.onChange} value={this.state.description} required />
                            {/* <p style={itemStyle}>{this.state.project.description}  </p> */}
                        </Col> </Row>
                </Container>)

        if (this.state.project.monetaryCompensation)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle} >Monetary Compensation </Col>
                        <Col sm={7} style={infoStyle}>                                 <Form.Control type="number" name="monetaryCompensation" placeholder="..$$" onChange={this.onChange} value={this.state.monetaryCompensation} required />

                            {/* <div style={itemStyle}>{this.state.project.monetaryCompensation} $  </div>  */}
                        </Col> </Row>
                </Container>)
        if (this.state.project.deadline)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle} >Deadline </Col>
                        <Col sm={4} style={infoStyle}><p style={itemStyle}> <Moment format=" DD,MMMM YYYY">
                            {this.state.project.deadline}
                        </Moment> </p> </Col> </Row>
                </Container>)
        if (this.state.project.experienceLevel)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row>  <Col sm={1} style={colStyle}   >Experience Level</Col>
                        <Col sm={7} style={infoStyle}>             <Form.Control name="experienceLevel" as="select" onChange={this.onChange} value={this.state.experienceLevel} required>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Form.Control>
                            {/* <div style={itemStyle}>{this.state.project.experienceLevel}  </div>  */}
                        </Col> </Row>
                </Container>)
        if (this.state.project.commitLevel)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row>  <Col sm={1} style={colStyle}   >Commit Level</Col>
                        <Col sm={7} style={infoStyle}>  <Form.Control name="commitLevel" as="select" onChange={this.onChange} value={this.state.commitLevel} required>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Form.Control>
                            {/* <div style={itemStyle}> {this.state.project.commitLevel}  </div> */}
                        </Col> </Row>
                </Container>)
        if (this.state.project.workCycle)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row>  <Col sm={1} style={colStyle}   >Work Cycle</Col>
                        <Col sm={7} style={infoStyle}>
                            <Form.Control name="workCycle" as="select" onChange={this.onChange} value={this.state.workCycle} required>
                                <option value="0">0</option>
                                <option value="24">25</option>
                                <option value="50">50</option>
                                <option value="75">75</option>
                                <option value="100">100</option>
                            </Form.Control>
                            {/* <div style={itemStyle}>{this.state.project.workCycle}  </div>  */}
                        </Col> </Row>
                </Container>)
        if (this.state.project.rate)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row>  <Col sm={1} style={colStyle}   >Rate</Col>
                        <Col sm={7} style={infoStyle}>
                            <Form.Control name="rate" as="select" onChange={this.onChange} value={this.state.rate} required>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Control>
                            {/* <div style={itemStyle}>{this.state.project.rate}  </div>  */}
                        </Col> </Row>
                </Container>)
        if (this.state.project.linkOfProject)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row>  <Col sm={1} style={colStyle}   >Link Of Project</Col>
                        <Col sm={4} style={infoStyle}><div style={itemStyle}>{this.state.project.linkOfProject}  </div> </Col> </Row>
                </Container>)
        if (this.state.project.submissionDate)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle} >Submission Date </Col>
                        <Col sm={4} style={infoStyle}><p style={itemStyle}> <Moment format=" DD,MMMM YYYY">
                            {this.state.project.submissionDate}
                        </Moment> </p> </Col> </Row>
                </Container>)
        return returnedArr
    }
    onClickSkillDelete(name) {
        const temp =this.state.skills.filter(skill=> skill.name!=name)
        this.setState({skills:temp})
    }
    onClickNewSkillAdd() {
        console.log('here')
        let arr = []
        this.state.serverSkills.map((skill) => {
            arr.push(<option key={skill._id} value={skill.name}>{skill.name} </option>)
        })
        this.setState({
            newSkillsSelect: [
                <Container style={containerStyle} fluid>
                    <Row style={{ marginLeft: 2 }}> <Col sm={7} style={infoStyle}>
                        <Form.Control name='newSkillsSelect' as="select" multiple onChange={this.onChangeMul} required>
                            {arr}
                        </Form.Control> </Col>
                    </Row>
                </Container>
            ]
        }
        );
    }

    
    render() {
        if (this.state.project) {
            return (
                <div >
                    <Card style={{ minHeight: '100vh',backgroundColor: 'white'}}>
                        <Form onSubmit={this.onSubmit}>
                            <Card style={{ marginBottom: 7, paddingLeft: 5, border: 'none' }} >
                                <IdentityCard ownerPath={this.state.project.projectPartner.id} displayedName={this.state.project.projectPartner.name} date={this.state.project.uploadDate} />
                                <div style={{ marginBottom: 10, marginTop: 10 }}>
                                    <Card style={{ border: 'none' }}>
                                        <Card.Title>General Informations</Card.Title>
                                        {this.getInfo()}
                                    </Card>
                                </div>
                                <UpdateListOfItems onClickNewSkillDelete={this.onClickNewSkillDelete} onClickSkillDelete={this.onClickSkillDelete} onClickAdd={this.onClickNewSkillAdd} newSkills={this.state.newSkillsSelect} items={this.state.skills} title='Required Skills' type='skills' buttonName='Skill'/>
                    <ListOfUsers items={this.state.project.tasks} title='Sub Tasks' type='tasks' />

                            </Card>
                            <div style={{
                                margin: '0 auto', paddingLeft: 5,
                                width: '40%'
                            }}>
                                <Button variant="dark" size='sm' style={{
                                    marginRight: 5,
                                }} type="submit"> Update </Button>
                                <Button variant="danger" size='sm' style={{
                                    marginRight: 5,
                                }} type="button" onClick={this.handleDelete}> Delete </Button>
                            </div>
                        </Form>
    
                    </Card>

                </div>
            );
        } else {
            return <Spinner animation="border" variant="dark" />

        }
    }
}

export default ProjectUpdate;
