import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from "axios";
var store = require('store')
export class ConsultancyAgencyMembers extends Component {
    getStyle = () =>{
        return{
            background : '#242424',
            pading : '10px',
             testAlign:'left'
        }
          }
          async handleClick() {
            const id=this.props.task._id
            console.log(id)
            const data = {
              memberId: this.props.member.id,
              ownerId:this.props.taskPartner.id,
            };
            console.log(data)
            await axios.put(
              `http://localhost:3333/tasks/assignMemberToTask/${id}`,
              data
            );
          }
          getMembers(){
            if(store.get('payload').tags.includes('Partner')&&store.get('payload')._id==this.props.task.taskPartner.id){
              return <p style ={{color :"white", textAlign: "left" , fontSize :'18px'}}>{this.props.member.name}<button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  onClick={this.handleClick.bind(this)}>Accept</button><Link style = {ButotnStyle} to={"/members/"+this.props.member.id}><button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  >Show Profile</button></Link>
              
              </p>
            }
            else{
              return<p style ={{color :"white", textAlign: "left" , fontSize :'18px'}}>{this.props.member.name}<Link style = {ButotnStyle} to={"/members/"+this.props.member.id}><button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  >Show Profile</button></Link>
              
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


export default ConsultancyAgencyMembers