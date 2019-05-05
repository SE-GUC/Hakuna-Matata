import React, { Component } from "react";
import { Container, Col, Spinner, Card, Row, Button ,ProgressBar} from "react-bootstrap";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from "axios";
import ListOfUsers from './ListOfItems'
import IdentityCard from './IdentityCard'
import Moment from 'react-moment';
import { connect } from 'react-redux'

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
class TaskProfile extends Component {
    constructor(props){
        super(props)
    this.state = {
        task: null,
        skills: [],
        appliedConsultancies: [],
        appliedMembers: [],
        taskPartner: null,
        isOwner:false
    };
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        const currUserId=this.props.auth.user._id
        // console.log(id);
        axios.get(`http://localhost:3333/tasks/${id}`).then(res => {
            if(res.data.data!=null){
            this.setState({
                task: res.data.data,
                skills: res.data.data.requiredSkills,
                appliedConsultancies: res.data.data.appliedConsultancies,
                appliedMembers: res.data.data.appliedMembers,
                taskPartner: res.data.data.taskPartner
            });
            if(res.data.data.taskPartner.id===currUserId ) this.setState({isOwner:true})
            else{ 
                if( res.data.data.consultancyAgency !=undefined) 
                if( res.data.data.consultancyAgency.id===currUserId) this.setState({isOwner:true})
            }
        }else{
            window.location.href =`http://localhost:3000/NotFound`
        }
            // console.log(res.data.data);
        });
    }
    // handleClick() {
    //     const tempTags = ["Member"]
    //     const tempId="5cac402553d4b1157fc7e226"
    //     const { id } = this.props.match.params;
    //     const data = {
    //         taskId:id,
    //     }
    //     if (tempTags.includes("Member")) {
       
    //         // console.log(data.taskId + ' '+)
    //         axios.put(`http://localhost:3333/members/applyForTask/${tempId}`, data).then(res =>{
    //             swal({
    //                 title: "Done",
    //                 text: res.data.msg,
    //                 icon: "success",
    //               })
    //               window.location.href =`http://localhost:3000/tasks/${id}`
    //             }
    //             ).catch(e => {
    //                 swal({
    //                     title: "Oh",
    //                     text: e.response.data.error,
    //                      icon: "error",
    //                   })
    //             });
    //     }
    //     else if (tempTags.includes("ConsultancyAgency")) {
    //         axios.put(`http://localhost:3333/consultancyAgencies/applyForTask/${tempId}`, data).then(res =>{
    //             swal({
    //                 title: "Done",
    //                 text: res.data.msg,
    //                 icon: "success",
    //               })
    //               window.location.href =`http://localhost:3000/tasks/${id}`
    //             }
    //             ).catch(e => {
    //                 swal({
    //                     title: "Oh",
    //                     text: e.response.data.error,
    //                      icon: "error",
    //                   })
    //             });
    //     }

    // }
    handleClickCA =()=> {
        const memberId=this.props.auth.user._id
        const { id } = this.props.match.params;
        const data = {
            taskId:id,
        }

        axios.put(`http://localhost:3333/consultancyAgencies/applyForTask/${memberId}`, data).then(res =>{
                swal({
                    title: "Done",
                    text: res.data.msg,
                    icon: "success",
                  })
                  window.location.href =`http://localhost:3000/tasks/${id}`
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
            taskId:id,
        }
            // console.log(data.projectId + ' '+)
            axios.put(`http://localhost:3333/members/applyForTask/${memberId}`, data).then(res =>{
                swal({
                    title: "Done",
                    text: res.data.msg,
                    icon: "success",
                  })
                  window.location.href =`http://localhost:3000/tasks/${id}`
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
        if (this.state.task.name)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row>  <Col sm={1} style={colStyle}   >Name</Col>
                        <Col sm={4} style={infoStyle}><div style={itemStyle}>{this.state.task.name}  </div> </Col> </Row>
                </Container>)
        if (this.state.task.project)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle}>Project</Col>
                        <Col sm={4} style={infoStyle}><Link to={`/projects/${this.state.task.project.id}`} style={itemLinkStyle}>{this.state.task.project.name}  </Link> </Col>
                    </Row>
                </Container>)
        if (this.state.task.taskMember)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle}>Member</Col>
                        <Col sm={4} style={infoStyle}><Link to={`/users/${this.state.task.taskMember.id}`} style={itemLinkStyle}>{this.state.task.taskMember.name}  </Link> </Col>
                    </Row>
                </Container>)
        if (this.state.task.consultancyAgency)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle} >Consultancy </Col>
                        <Col sm={4} style={infoStyle}><Link to={`/users/${this.state.task.consultancyAgency.id}`} style={itemLinkStyle}>{this.state.task.consultancyAgency.name}  </Link> </Col>
                    </Row>
                </Container>)
        if (this.state.task.description)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle} >Description </Col>
                        <Col sm={4} style={infoStyle}><p style={itemStyle}>{this.state.task.description}  </p> </Col> </Row>
                </Container>)

        if (this.state.task.monetaryCompensation)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle} >Monetary Compensation </Col>
                        <Col sm={4} style={infoStyle}><div style={itemStyle}>{this.state.task.monetaryCompensation} $  </div> </Col> </Row>
                </Container>)
        if (this.state.task.deadline)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle} >Deadline </Col>
                        <Col sm={4} style={infoStyle}><p style={itemStyle}> <Moment format=" DD,MMMM YYYY">
                            {this.state.task.deadline}
                        </Moment> </p> </Col> </Row>
                </Container>)
        if (this.state.task.experienceLevel)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row>  <Col sm={1} style={colStyle}   >Experience Level</Col>
                        <Col sm={4} style={infoStyle}><div style={itemStyle}>{this.state.task.experienceLevel}  </div> </Col> </Row>
                </Container>)
        if (this.state.task.commitLevel)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row>  <Col sm={1} style={colStyle}   >Commit Level</Col>
                        <Col sm={4} style={infoStyle}><div style={itemStyle}> {this.state.task.commitLevel}  </div> </Col> </Row>
                </Container>)
        if (this.state.task.workCycle)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row>  <Col sm={1} style={colStyle}   >Work Cycle</Col>
                        <Col sm={4} style={infoStyle}><ProgressBar animated variant="info" now={this.state.task.workCycle}  />  </Col> </Row>
                </Container>)
        if (this.state.task.rate)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row>  <Col sm={1} style={colStyle}   >Rate</Col>
                        <Col sm={4} style={infoStyle}><div style={itemStyle}>{this.state.task.rate}  </div> </Col> </Row>
                </Container>)
        if (this.state.task.linkOfTask)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row>  <Col sm={1} style={colStyle}   >Link Of Task</Col>
                        <Col sm={4} style={infoStyle}><div style={itemStyle}>{this.state.task.linkOfTask}  </div> </Col> </Row>
                </Container>)
        if (this.state.task.submissionDate)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle} >Submission Date </Col>
                        <Col sm={4} style={infoStyle}><p style={itemStyle}> <Moment format=" DD,MMMM YYYY">
                            {this.state.task.submissionDate}
                        </Moment> </p> </Col> </Row>
                </Container>)
        return returnedArr
    }
    assignMember = (memberId,state) =>{
        
        const { id } = this.props.match.params;
        const data = {
            memberId:memberId,
            ownerId:this.props.auth.user._id,
            state:state
        }
        console.log(data)
        axios.put(`http://localhost:3333/tasks/assignMemberToTask/${id}`, data).then(res =>{
            swal({
                title: "Done",
                text: res.data.msg,
                icon: "success",
              })
              window.location.href =`http://localhost:3000/tasks/${id}`
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
        axios.put(`http://localhost:3333/partners/assignConstlancyAgencyToTask/${this.props.auth.user._id}`, data).then(res =>{
            swal({
                title: "Done",
                text: res.data.msg,
                icon: "success",
              })
              window.location.href =`http://localhost:3000/tasks/${id}`
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

    getApplied=()=>{
        if(this.state.isOwner) return <div>
        <ListOfUsers items={this.state.appliedMembers} title='Applied Members' type='users' onClick={this.assignMember}/>
        <ListOfUsers items={this.state.appliedConsultancies} title='Applied Consultancies' type='users' onClick={this.assignConsultancyAgency} /></div>
      
    }
    getApplyBtn=()=>{
        const memberTags = this.props.auth.user.tags
        if(this.state.task.consultyNeeded){
            if(this.state.task.consultancyAgency ==null || this.state.task.consultancyAgency ==undefined) {
                if(memberTags.includes("ConsultancyAgency")) return <Button variant="dark" size='lg' style={{ marginLeft: '30%', width: '20%'}}onClick={this.handleClickCA} > Apply </Button>
            }  
        }
        if(this.state.task.taskMember ==null || this.state.task.taskMember ==undefined) {
            if(memberTags.includes("Member")) return <Button variant="dark" size='lg' style={{ marginLeft: '30%', width: '20%'}}onClick={this.handleClickMember} > Apply </Button>
        } 
    }
    
    render() {
        if (this.state.task) {
            return (
                <div style={{ paddingLeft:5,minHeight: '100vh', backgroundColor:'white'
                }}>
                <Card style={{ marginBottom: 7, paddingLeft:5 ,border:'none'}} >

                                                <IdentityCard ownerPath={this.state.task.taskPartner.id} displayedName={this.state.task.taskPartner.name} date={this.state.task.uploadDate} onClick={()=>{
                            window.location.href=`http://localhost:3000/updateTask/${this.props.match.params.id}`
                        }} updated={this.state.isOwner} />
                    <div style={{ marginBottom: 10, marginTop: 10 }}>
                        <Card style={{ border: 'none' }}>
                            <Card.Title>General Informations</Card.Title>
                            {this.getInfo()}
                        </Card>
                    </div>
                    <ListOfUsers items={this.state.skills} title='Required Skills' type='skills' />
                    {this.getApplied()}
                    </Card>
   {this.getApplyBtn}
                                      


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
  
  export default connect(mapStateToProps,{})(TaskProfile);

// export default TaskProfile;
