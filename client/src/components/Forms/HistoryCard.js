import React, { Component } from "react";
import {Card} from 'react-bootstrap'
import './HistoryCard.css'
import History from './save.png'
import Moment from 'react-moment';  
import  {Link}  from 'react-router-dom';
export class HistoryCard extends Component {
 getrow(name,type,id){
   return(
    <Link id={this.props.id} to={{
                        pathname: `${type}/${id}`,

                    }}> {name}</Link>
   )
 }
 gettype(action){
   let type=''
   switch(action){
     case 'Apply For Task': type='tasks';break
     case 'Apply For Project':type='projects';break
     case 'Apply For Course':type='courses';break
     case 'Apply For Master Class':type='masterClasses';break
     case 'Reserve a room':type='rooms';break
     case 'Accept Reservation of Room':type='rooms';break
     case 'Accept Member For Coure':type='members';break
     case 'Accept Member For Master Class':type='members';break
     case 'Assign Consultancy Agency To Project':type='consultancyAgencies';break
     case 'Assign Consultancy Agency To Task':type='consultancyAgencies';break
     case 'Assign Member To Project':type='members';break
     case 'Assign Member To Task':type='members';break
     default:type='users'
     
   }
   return type
  
 }
  render() {
    console.log(this.props.history.action)
 const _id=this.props.history._id
 const action=this.props.history.action
 const name = this.props.history.name.name
 const id = this.props.history.name.id
 const date=this.props.history.date
 const type=this.gettype(action)
  return(
    <div >  
        <div >
    <Card  style={{ width: '800px' ,height:'80px',fontSize:'23px',borderRadius:'5px'}}>
  <Card.Img style={{width:'80px', position:'absolute',top:'2px',right:'700px'}} src={History}></Card.Img> 
  <Card.Body>
    
    <Card.Text style={{position:'absolute',right:'130px',top:'25px',backgroundColor:'transparent'}}>
      {action} with name {this.getrow(name,type,id)}  on { <Moment format="YYYY/MM/DD">{date}</Moment>} 
    </Card.Text>
  </Card.Body>
</Card>
</div>  
</div>  
  )
}
getStyle(){
    return{
    width:'1200px',
    height:'120px',
    right:'350px',
    }
}
}
export default HistoryCard