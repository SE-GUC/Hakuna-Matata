import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from "axios";
var store = require('store')
export class Consultancy extends Component {
  getStyle = () =>{
return{
  background : '#242424',
  pading : '10px',
   testAlign:'left'
}
  }
  async handleClick() {
    const id=this.props.task.taskPartner.id
    console.log(id)
    const data = {
      consultancyAgencyId: this.props.consultancy.id,
      taskId:this.props.task._id
    };
    console.log(data)
    await axios.put(
      `http://localhost:3333/partners/assignConstlancyAgencyToTask/${id}`,
      data
    );
  }
  getMembers(){
    if(store.get('payload').tags.includes('Partner')&&store.get('payload')._id==this.props.task.taskPartner.id){
      return<p style ={{color :"white", textAlign: "left" , fontSize :'18px'}}>{this.props.consultancy.name}<button className="btn btn-danger btn-sm m-2" style = {ButotnStyle} onClick={this.handleClick.bind(this)} >Accept</button><Link style = {ButotnStyle} to={"/consultancyAgencies/"+this.props.consultancy.id}><button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  >Show  Consultancy Agency</button></Link>
     
     </p>
    }
    else{
      return<p style ={{color :"white", textAlign: "left" , fontSize :'18px'}}>{this.props.consultancy.name}<Link style = {ButotnStyle} to={"/consultancyAgencies/"+this.props.consultancy.id}><button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  >Show  Consultancy Agency</button></Link>
     
      </p>
    }
  }
   
    render() {
    
      return (
        
      
     <div style={this.getStyle()}>
     {this.getMembers()}
    
   </div>
    )
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
export default Consultancy
