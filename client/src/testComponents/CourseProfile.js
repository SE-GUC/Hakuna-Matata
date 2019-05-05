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
class CourseProfile extends Component {
    constructor(props){
        super(props)
    this.state = {
        course: null,
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
        isOwner:false
    };
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        const currUserId=this.props.auth.user._id
        // console.log(id);
        axios.get(`http://localhost:3333/courses/${id}`).then(res => {
            if(res.data.data!=null){
            this.setState({
                course: res.data.data,
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
        });
    }

   
    handleClickMember =()=> {
        const memberId=this.props.auth.user._id
        const { id } = this.props.match.params;
        const data = {
            courseId:id,
        }
            // console.log(data.projectId + ' '+)
            axios.put(`http://localhost:3333/members/applyForCourse/${memberId}`, data).then(res =>{
                swal({
                    title: "Done",
                    text: res.data.msg,
                    icon: "success",
                  })
                  window.location.href =`http://localhost:3000/courses/${id}`
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

        if (this.state.course.payment)
            returnedArr.push(
                <Container style={containerStyle} fluid>
                    <Row> <Col sm={1} style={colStyle} >Payment </Col>
                        <Col sm={4} style={infoStyle}><div style={itemStyle}>{this.state.course.payment} $  </div> </Col> </Row>
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
            courseId:id
        }
        axios.put(`http://localhost:3333/educationalOrganizations/acceptMemberInCourse/${this.props.auth.user._id}`, data).then(res =>{
            swal({
                title: "Done",
                text: res.data.msg,
                icon: "success",
              })
              window.location.href =`http://localhost:3000/courses/${id}`
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
        <ListOfUsers items={this.state.listOfApplied} title='Applied Members' type='users' onClick={this.assignMember}/>
        </div>
      
    }
    getApplyBtn=()=>{
        const memberTags = this.props.auth.user.tags
            if(memberTags.includes("Member")) return <Button variant="dark" size='lg' style={{ marginLeft: '30%', width: '20%'}}onClick={this.handleClickMember} > Apply </Button>
        
    }
    
    render() {
        if (this.state.course) {
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
  
  export default connect(mapStateToProps,{})(CourseProfile);

// export default TaskProfile;
