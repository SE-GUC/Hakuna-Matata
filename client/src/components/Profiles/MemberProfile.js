import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


class MemberProfile extends Component {
    state = {
        deactivated:'', completedTaskId:'', appliedTaskId:'', skills:'', _id:'', fullName:'', webName:'', levelOfExperience:'', allRatedReco:'', averageRecoRate:'', allRatedTasks:'', dateJoined:'', __v:''
      }
  componentDidMount() {
    //console.log("Hello body")
    const { handle } = this.props.match.params
    axios.get(`http://localhost:3333/members/${handle}`).then(res => {
      //console.log(res);
      this.setState({ deactivated : res.data.deactivated })
      this.setState({ completedTaskId : res.data.completedTaskId })
      this.setState({ appliedTaskId : res.data.appliedTaskId })
      this.setState({ skills : res.data.skills })
      this.setState({ _id : res.data._id })
      this.setState({ fullName : res.data.fullName })
      this.setState({ webName : res.data.webName })
      this.setState({ levelOfExperience : res.data.levelOfExperience })
      this.setState({ allRatedReco : res.data.allRatedReco })
      this.setState({ averageRecoRate : res.data.averageRecoRate })
      this.setState({ dateJoined : res.data.dateJoined })
      this.setState({ __v : res.data.deactivated })
      //console.log(this.state.users[0].fullName)
    })
  }
  getMemberData(){
 
      if(this.state._id!==''){
          let memberData=[]
          memberData.push(  <p 
            key={this.state._id}
            style={{
                color:'black'
            }}>
        {this.state.deactivated} <br></br>{this.state.fullName} <br></br>{this.state.webName} <br></br>{this.state.levelOfExperience} <br></br>{this.state.dateJoied }</p>)
        memberData.push(             <Link
          to={{
            pathname: `/tasks/${'5ca8efd35bb8f4166005d7ef'}`,
            state: {
              fromNotifications: true
            }
          }}
        >
          show task
        </Link>)
          return memberData
      }else{
        return " "
      }
  }
  render() {
    return (
  <div className="MemberProfile">
{this.getMemberData()}
  </div>

    );
  }
}

export default MemberProfile;
