import React, { Component } from 'react'
<<<<<<< HEAD
import axios from "axios";
var store = require('store')
=======

>>>>>>> master
export class AppliedUser extends Component {
  getStyle = () =>{
return{
  background : '#242424',
  pading : '10px',
   testAlign:'left'
}
  }
<<<<<<< HEAD
  async handleClick() {
   const id = this.props.id
   const masterClassId = this.props.masterClass._id
  
    const data = {
      masterClassId: masterClassId,
      memberId:this.props.apply.id,
      state:true
    };
    console.log(data.memberId)
    await axios.put(`http://localhost:3333/educationalOrganizations/acceptMemberInMasterClass/${id}`, data);
    window.location.reload(); 
 
  }
  async handleClickReject() {
    const id = this.props.id
    const masterClassId = this.props.masterClass._id
    
    const data = {
      masterClassId: masterClassId,
      memberId:this.props.apply.id,
      state:false
    };
    await axios.put(`http://localhost:3333/educationalOrganizations/acceptMemberInMasterClass/${id}`, data);
    window.location.reload(); 
  }
   
    render() {
    if(this.props.id==store.get('payload')){
      return (
        
      <div style={this.getStyle()}>
      <p style ={{color :"white", textAlign: "left" , fontSize :'18px'}}>{ this.props.apply.name}<button onClick={this.handleClick.bind(this)} className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  > Accept</button>
      <button onClick={this.handleClickReject.bind(this)} className="btn btn-danger btn-sm m-2" style = {ButotnStyle}> reject</button>
      </p>
      
     
    </div>
    )}else{
     return <div style={this.getStyle()}>
 <p style ={{color :"white", textAlign: "left" , fontSize :'18px'}}>{ this.props.apply.name}</p></div>
    }
=======
   
    render() {
    return (
        
      <div style={this.getStyle()}>
      <p style ={{color :"white", textAlign: "left" , fontSize :'18px'}}>{ this.props.apply.name}<button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  > Accept/Reject</button>
      
      </p>
     
    </div>
    )
>>>>>>> master
  }
}
const ButotnStyle = {
  backgroundColor:'#242424',
    color :'white',
    testAlign:'center',
    pading:'15px 32px',
    borderRadius:'12px',
    float :'right',
    fontSize:'18px'

}
export default AppliedUser
