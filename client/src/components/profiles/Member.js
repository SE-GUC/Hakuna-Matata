import React, { Component } from 'react';
import PhotoComponent from '../../components/profileComponents/PhotoComponent'
import Coloredline from '../../components/profileComponents/Coloredline'
import Data from '../../components/profileComponents/Data'
import WithDate from '../../components/profileComponents/WithDate'
import NavBar from '../../components/profileComponents/NavBar'
import KeyImagee from '../../assessments/member_icon.svg'
import axios from 'axios'
import ButtonsDynamic from '../../components/profileComponents/ButtonsDynamic'




class Member extends Component {
  state = {
    tags: [],
    memberFullName: '',
    memberWebName: '',
    completedTasksId: [],
    appliedTasksId: [],
    experienceLevel: '',
    memberRating: '',
    allRatedReco: '',
    averageRecoRate: '',
    allRatedTasks: '',
    skills: [],
    memberWorksIn: [],
    memberMasterclasses: [],
    memberCertificates: [],
    memberEvents: [],
    memberHirePerHour: '',
    memberPhoneNumber: '',
    memberDateJoined: '',
    memberLocation: '',
    email: '',
    age: '',
    fieldOfWork: [],
    memberCoursesAppliedIn: [],
    completedProjects: [],
    reviews: []
  }

  componentDidMount() {
    //console.log("Hello body")
    var id;
        if(this.props.match!==undefined){
          id = this.props.match.params.id
        }else{
          id=this.props.id
        }
    axios.get(`http://localhost:3333/members/${id}`).then(res => {
      this.setState({ tags: res.data.data.tags })
      this.setState({ memberFullName: res.data.data.memberFullName })
      this.setState({ memberWebName: res.data.data.memberWebName })
      this.setState({ appliedTaskId: res.data.data.appliedTaskId })
      this.setState({ completedTasksId: res.data.data.completedTasksId })
      this.setState({ _id: res.data.data._id })
      this.setState({ experienceLevel: res.data.data.experienceLevel })
      this.setState({ memberRating: res.data.data.memberRating })
      this.setState({ allRatedReco: res.data.data.allRatedReco })
      this.setState({ averageRecoRate: res.data.data.averageRecoRate })
      this.setState({ allRatedTasks: res.data.data.allRatedTasks })
      this.setState({ skills: res.data.data.skills })
      this.setState({ memberWorksIn: res.data.data.memberWorksIn })
      this.setState({ memberMasterclasses: res.data.data.memberMasterclasses })
      this.setState({ memberCertificates: res.data.data.memberCertificates })
      this.setState({ memberEvents: res.data.data.memberEvents })
      this.setState({ memberHirePerHour: res.data.data.memberHirePerHour })
      this.setState({ memberPhoneNumber: res.data.data.memberPhoneNumber })
      this.setState({ memberDateJoined: res.data.data.memberDateJoined })
      this.setState({ memberLocation: res.data.data.memberLocation })
      this.setState({ email: res.data.data.email })
      this.setState({ age: res.data.data.age })
      this.setState({ fieldOfWork: res.data.data.fieldOfWork })
      this.setState({ memberCoursesAppliedIn: res.data.data.memberCoursesAppliedIn })
      this.setState({ completedProjects: res.data.data.completedProjects })
      this.setState({ reviews: res.data.data.reviews })

    })
  }


  render() {
    const mappingFunction = component => component + " |";
    const mappingSkills = component => component.name + " |";
    const mappingInfo = component => <WithDate value={component.name} datee={component.date} ></WithDate>;

    return (
      <div style={{ position: "relative", width: "100%" }}>
        <style>{'body { background-color }'}</style>
        <NavBar /><br /><br />
        <div style={{
          position: "relative", paddingLeft: "1px",
          paddingRight: "1px", border: "1px solid", marginLeft: "15%", marginRight: "15%", borderRadius: (20, 20, 20, 20), color: "#FFFFFF", top: "30%"
        }}>
          <PhotoComponent KeyImage={KeyImagee} /><br></br>
          <ButtonsDynamic tags={this.state.tags} /><br /><br />

          <Coloredline title={"Personal"} /><br />
          <Data keyy={'Name:'} value={this.state.memberFullName} /><br />
          <Data keyy={'Age:'} value={this.state.age} /><br />
          <Data keyy={'Email:'} value={this.state.email} /><br />
          <Data keyy={'Fields of work:'} value={this.state.fieldOfWork.map(mappingFunction)} /><br />
          <Data keyy={'Skills:'} value={this.state.skills.map(mappingSkills)} /><br />

          <Coloredline title={"Events"} />
          <p>{this.state.memberEvents.map(mappingInfo)}</p><br />
          <Coloredline title={"Projects"} />
          <p>{this.state.completedProjects.map(mappingInfo)}</p><br />
          <Coloredline title={"Certificates"} /><br />
          <p>{this.state.memberCertificates.map(mappingInfo)}</p><br />
        </div>

      </div>

    )

  }

}
export default Member;
