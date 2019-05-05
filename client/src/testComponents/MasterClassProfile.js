import React, { Component } from "react";
import { Container, Col, Spinner, Card, Row, Button ,ProgressBar,Modal} from "react-bootstrap";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from "axios";
import ListOfUsers from './ListOfItems'
import IdentityCard from './IdentityCard'
import Moment from 'react-moment';
import { connect } from 'react-redux'
import CourseForm from "./CourseForm";
import UpdateListOfItems from './UpdateListOfItems'

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
class MasterclassProfile extends Component {
    constructor(props){
        super(props)
    this.state = {
        masterclass: null,
        name: '',
        listOfApplied: [],
        listOfAccepted: [],
        category:'',
        endDate: null,
        startDate: null,
        description: '',
        educator: null,
        places: 0,
        educationalOrganization: null,
        isOwner:false,
        modalClose:false
    };
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        const currUserId=this.props.auth.user._id
        // console.log(id);
        axios.get(`http://localhost:3333/masterClasses/${id}`).then(res => {
            if(res.data.data!=null){
            this.setState({
                masterclass: res.data.data,
                name: res.data.data.name,
                listOfApplied: res.data.data.listOfApplied,
                listOfAccepted: res.data.data.listOfAccepted,
                category: res.data.data.category,
                endDate: res.data.data.endDate,
                startDate: res.data.data.startDate,
                description: res.data.data.description,
                educator: res.data.data.educator,
                places: res.data.data.places,
                educationalOrganization: res.data.data.educationalOrganization
            });
            if(res.data.data.educationalOrganization !=undefined)
            if(res.data.data.educationalOrganization.id===currUserId ) this.setState({isOwner:true})
        }else{
            window.location.href =`http://localhost:3000/NotFound`
        }
            // console.log(res.data.data);
        }).catch(err=>{
            window.location.href =`http://localhost:3000/NotFound`
        });
    }

   
    handleClickMember =()=> {
        const memberId=this.props.auth.user._id
        const { id } = this.props.match.params;
        const data = {
            masterClassId:id,
        }
            // console.log(data.projectId + ' '+)
            axios.put(`http://localhost:3333/members/applyForMasterClass/${memberId}`, data).then(res =>{
                swal({
                    title: "Done",
                    text: res.data.msg,
                    icon: "success",
                  })
                  window.location.href =`http://localhost:3000/masterClasses/${id}`
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
        if (this.state.name)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row>  <Col sm={1} style={colStyle}   >Name</Col>
                        <Col sm={4} style={infoStyle}><div style={itemStyle}>{this.state.name}  </div> </Col> </Row>
                </Container>)
        if (this.state.educator)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle}>Educator</Col>
                        <Col sm={4} style={infoStyle}><Link to={`/users/${this.state.educator.id}`} style={itemLinkStyle}>{this.state.educator.name}  </Link> </Col>
                    </Row>
                </Container>)
        if (this.state.description)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle} >Description </Col>
                        <Col sm={4} style={infoStyle}><p style={itemStyle}>{this.state.description}  </p> </Col> </Row>
                </Container>)

        if (this.state.masterclass.payment)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle} >Payment </Col>
                        <Col sm={4} style={infoStyle}><div style={itemStyle}>{this.state.masterclass.payment} $  </div> </Col> </Row>
                </Container>)
        

        if (this.state.places)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row>  <Col sm={1} style={colStyle}   >Places</Col>
                        <Col sm={4} style={infoStyle}><div style={itemStyle}>{this.state.places}  </div> </Col> </Row>
                </Container>)

        if (this.state.startDate)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle} >Start Date </Col>
                        <Col sm={4} style={infoStyle}><p style={itemStyle}> <Moment format=" DD,MMMM YYYY">
                            {this.state.startDate}
                        </Moment> </p> </Col> </Row>
                </Container>)
                        if (this.state.endDate)
                        returnedArr.push(
                            <Container style={containerStyle} fluid>
                                <Row> <Col sm={1} style={colStyle} >End Date </Col>
                                    <Col sm={4} style={infoStyle}><p style={itemStyle}> <Moment format=" DD,MMMM YYYY">
                                        {this.state.endDate}
                                    </Moment> </p> </Col> </Row>
                            </Container>)
        return returnedArr
    }
    assignMember = (memberId,state) =>{
        
        const { id } = this.props.match.params;
        const data = {
            memberId:memberId,
        
            state:state,
            masterClassId:id
        }
        axios.put(`http://localhost:3333/educationalOrganizations/acceptMemberInMasterClass/${this.props.auth.user._id}`, data).then(res =>{
            swal({
                title: "Done",
                text: res.data.msg,
                icon: "success",
              })
              window.location.href =`http://localhost:3000/masterClasses/${id}`
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

    onClickNewTaskAdd = () => this.setState({ modalShow: true });

    getApplied=()=>{
        if(this.state.isOwner){ return <div>
                    {/* <UpdateListOfItems onClickAdd={this.onClickNewTaskAdd} items={this.state.masterclass.courses} title='Sub Courses' type='courses' buttonName='Course' /> */}
                    <ListOfUsers items={this.state.masterclass.courses} title='Sub Courses' type='courses' />
        <ListOfUsers items={this.state.listOfApplied} title='Applied Members' type='users' onClick={this.assignMember}/>
        </div>}
        else return <ListOfUsers items={this.state.masterclass.courses} title='Sub Courses' type='courses' />
      
    }
    getApplyBtn=()=>{
        const memberTags = this.props.auth.user.tags

            if(memberTags.includes("Member")) return <Button variant="dark" size='lg' style={{ marginLeft: '30%', width: '20%'}}onClick={this.handleClickMember} > Apply </Button>
        
    }
    
    render() {
        let modalClose = () => this.setState({ modalShow: false });

        if (this.state.masterclass) {
            let  owner=this.state.educationalOrganization!= undefined ? this.state.educationalOrganization:{name:'Unknow',id:undefined}
            return (
                <div style={{ paddingLeft:5,minHeight: '100vh', backgroundColor:'white'
                }}>
                <Card style={{ marginBottom: 7, paddingLeft:5 ,border:'none'}} >
 
                                                 <IdentityCard ownerPath={owner.id} displayedName={owner.name}  />
                    <div style={{ marginBottom: 10, marginTop: 10 }}>
                        <Card style={{ border: 'none' }}>
                            <Card.Title>General Informations</Card.Title>
                            {this.getInfo()}
                        </Card>
                    </div>
                    <ListOfUsers items={this.state.listOfAccepted} title='Accepted Members' type='users' />
                    {this.getApplied()}
                    </Card>
   {this.getApplyBtn()}
                                      

   <Modal animation onHide={modalClose} show={this.state.modalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                        <Modal.Header closeButton='true'>
                            <Modal.Title id="contained-modal-title-vcenter">
                                New Task
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <CourseForm isMasterclass='true' id={this.props.match.param}/>
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
  
  export default connect(mapStateToProps,{})(MasterclassProfile);

// export default TaskProfile;
