import React, { Component } from 'react';
import './Member.css'
import Member from './Member';


class Members extends Component {
  get () {
    return (this.props.members.map((member) => (
      <Member key={member._id} member={member} />
    ))
    )
  }
  render(){
    return(
      <div className="grid-container">
      { this.get()}
      </div>
      )
  }
}

export default Members;