
import React, { Component } from "react";
import { Container, Col, Spinner, Card, Row, Button, ProgressBar, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { connect } from 'react-redux'
import axios from "axios";
import ListOfUsers from './ListOfItems'
import TaskForm from './TaskForm'
import UpdateListOfItems from './UpdateListOfItems'
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
    paddingRight: 0, flex: '0 0 17.7%', maxWidth: ' 17.7%'
}
const infoStyle = {
    paddingLeft: 0, marginRight: 125
}
class ProjectProfile extends Component {
    constructor(props){
        super(props)
    this.state = {
        project: null,
        skills: [],
        appliedConsultancies: [],
        appliedMembers: [],
        projectPartner: null,
        tasks: [],
        modalShow: false,
        isOwner:false
    };
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        const currUserId=this.props.auth.user._id
        console.log(id);
        axios.get(`http://localhost:3333/projects/${id}`).then(res => {
            if (res.data.data != null){
                this.setState({
                    project: res.data.data,
                    skills: res.data.data.requiredSkills,
                    appliedConsultancies: res.data.data.appliedConsultancies,
                    appliedMembers: res.data.data.appliedMembers,
                    projectPartner: res.data.data.projectPartner,
                    tasks: res.data.data.tasks
                });
                // console.log()
                if(res.data.data.projectPartner.id===currUserId ) this.setState({isOwner:true})
                else{ 
                    if( res.data.data.consultancyAgency !=undefined) 
                    if( res.data.data.consultancyAgency.id===currUserId) this.setState({isOwner:true})
                }
                
            }else {
                window.location.href = `http://localhost:3000/NotFound`
            }
            // console.log(res.data.data);
        });
    }
    handleClickCA =()=> {
        const memberId=this.props.auth.user._id
        const { id } = this.props.match.params;
        const data = {
            projectId:id,
        }

            axios.put(`http://localhost:3333/consultancyAgencies/applyForProject/${memberId}`, data).then(res =>{
                swal({
                    title: "Done",
                    text: res.data.msg,
                    icon: "success",
                  })
                  window.location.href =`http://localhost:3000/projects/${id}`
                }
                ).catch(e => {
                    swal({
                        title: "Oh",
                        text: e.response.data.error,
                         icon: "error",
                      })
                });
        

    }
    handleClickMember =()=> {
        const memberId=this.props.auth.user._id
        const { id } = this.props.match.params;
        const data = {
            projectId:id,
        }
            // console.log(data.projectId + ' '+)
            axios.put(`http://localhost:3333/members/applyForProject/${memberId}`, data).then(res =>{
                swal({
                    title: "Done",
                    text: res.data.msg,
                    icon: "success",
                  })
                  window.location.href =`http://localhost:3000/projects/${id}`
                }
                ).catch(e => {
                    console.log(e.response)
                    swal({
                        title: "Oh",
                        text: e.response.data.error,
                         icon: "error",
                      })
                });
    }
    getInfo() {
        const returnedArr = []
        if (this.state.project.name)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row>  <Col sm={1} style={colStyle}   >Name</Col>
                        <Col sm={4} style={infoStyle}><div style={itemStyle}>{this.state.project.name}  </div> </Col> </Row>
                </Container>)
        // if (this.state.project.project)
        //     returnedArr.push(
        //         <Container style={containerStyle} fluid>
        //             <Row> <Col sm={1} style={colStyle}>Project</Col>
        //                 <Col sm={4} style={infoStyle}><Link to={`/projects/${this.state.project.project.id}`} style={itemLinkStyle}>{this.state.project.project.name}  </Link> </Col>
        //             </Row>
        //         </Container>)
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
                        <Col sm={4} style={infoStyle}><p style={itemStyle}>{this.state.project.description}  </p> </Col> </Row>
                </Container>)

        if (this.state.project.monetaryCompensation)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle} >Monetary Compensation </Col>
                        <Col sm={4} style={infoStyle}><div style={itemStyle}>{this.state.project.monetaryCompensation} $  </div> </Col> </Row>
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
                        <Col sm={4} style={infoStyle}><div style={itemStyle}>{this.state.project.experienceLevel}  </div> </Col> </Row>
                </Container>)
        if (this.state.project.commitLevel)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row>  <Col sm={1} style={colStyle}   >Commit Level</Col>
                        <Col sm={4} style={infoStyle}><div style={itemStyle}> {this.state.project.commitLevel}  </div> </Col> </Row>
                </Container>)

        if (this.state.project.rate)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row>  <Col sm={1} style={colStyle}   >Rate</Col>
                        <Col sm={4} style={infoStyle}><div style={itemStyle}>{this.state.project.rate}  </div> </Col> </Row>
                </Container>)
        if (this.state.project.workCycle != undefined)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row>  <Col sm={1} style={colStyle}   >Work Cycle</Col>
                        <Col sm={4} style={infoStyle}><ProgressBar animated variant="info" now={this.state.project.workCycle} /> </Col> </Row>
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
    onClickNewTaskAdd = () => this.setState({ modalShow: true });
    assignMember = (memberId,state) =>{
        
        const { id } = this.props.match.params;
        const data = {
            memberId:memberId,
            ownerId:this.props.auth.user._id,
            state:state
        }
        console.log(data)
        axios.put(`http://localhost:3333/projects/assignMemberToProject/${id}`, data).then(res =>{
            swal({
                title: "Done",
                text: res.data.msg,
                icon: "success",
              })
              window.location.href =`http://localhost:3000/projects/${id}`
            }
            ).catch(e => {
                console.log(e.response)
                swal({
                    title: "Oh",
                    text: e.response.data.error,
                     icon: "error",
                  })
            });
    };
    assignConsultancyAgency = (memberId,state) =>{
        
        const { id } = this.props.match.params;
        const data = {
            projectId:id,
            consultancyAgencyId:memberId,
            state:state
        }
        console.log(data)
        axios.put(`http://localhost:3333/partners/assignConstlancyAgencyToProject/${this.props.auth.user._id}`, data).then(res =>{
            swal({
                title: "Done",
                text: res.data.msg,
                icon: "success",
              })
              window.location.href =`http://localhost:3000/projects/${id}`
            }
            ).catch(e => {
                console.log(e.response)
                swal({
                    title: "Oh",
                    text: e.response.data.error,
                     icon: "error",
                  })
            });
    };

    getAppliedAndTasks=()=>{
        if(this.state.isOwner) return <div>
        <UpdateListOfItems onClickAdd={this.onClickNewTaskAdd} items={this.state.project.tasks} title='Sub Tasks' type='tasks' buttonName='Task' />
        <ListOfUsers items={this.state.appliedMembers} title='Applied Members' type='users' onClick={this.assignMember}/>
        <ListOfUsers items={this.state.appliedConsultancies} title='Applied Consultancies' type='users' onClick={this.assignConsultancyAgency} /></div>
        else  return <ListOfUsers items={this.state.project.tasks} title='Sub Tasks' type='tasks' />
    }
    getApplyBtn=()=>{
        const memberTags = this.props.auth.user.tags
        if(this.state.project.consultyNeeded){
            if(this.state.project.consultancyAgency ==null || this.state.project.consultancyAgency ==undefined) {
                if(memberTags.includes("ConsultancyAgency")) return <Button variant="dark" size='lg' style={{ marginLeft: '30%', width: '20%'}}onClick={this.handleClickCA} > Apply </Button>
            }  
        }
        if(this.state.project.projectMember ==null || this.state.project.projectMember ==undefined) {
            if(memberTags.includes("Member")) return <Button variant="dark" size='lg' style={{ marginLeft: '30%', width: '20%'}}onClick={this.handleClickMember} > Apply </Button>
        } 
    }
    
    render() {
        let modalClose = () => this.setState({ modalShow: false });
        
        if (this.state.project) {
            return (
                <div style={{
                    paddingLeft: 5, backgroundColor: 'white', minHeight: '100vh'
                }}>
                    <Card style={{ marginBottom: 7, paddingLeft: 5, border: 'none' }} >

                        <IdentityCard ownerPath={this.state.project.projectPartner.id} displayedName={this.state.project.projectPartner.name} date={this.state.project.uploadDate} onClick={()=>{
                            window.location.href=`http://localhost:3000/updateProject/${this.props.match.params.id}`
                        }} updated={this.state.isOwner} />

                        <div style={{ marginBottom: 10, marginTop: 10 }}>
                            <Card style={{ border: 'none' }}>
                                <Card.Title>General Informations</Card.Title>
                                {this.getInfo()}
                            </Card>
                        </div>
                        <ListOfUsers items={this.state.skills} title='Required Skills' type='skills' />
                         {this.getAppliedAndTasks()}
                    </Card>
   {this.getApplyBtn}

                    <Modal animation onHide={modalClose} show={this.state.modalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                        <Modal.Header closeButton='true'>
                            <Modal.Title id="contained-modal-title-vcenter">
                                New Task
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <TaskForm isProject='true' id={this.props.match.params}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={modalClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            );
        } else {
            return <Spinner animation="border" variant="dark" />

        }
    }
}
const mapStateToProps =(state)=>({
    auth:state.auth,
    errors:state.errors,
    info:state.info
  
  })
  
  export default connect(mapStateToProps,{})(ProjectProfile);
// export default ProjectProfile;
