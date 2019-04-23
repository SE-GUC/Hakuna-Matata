import React, { Component } from "react";
import FirstComponent from "./RoomProfileFirst";
import SecondComponent from "./RoomProfileSecond";
import Member from './TaskMembers'
import Consultancy from './Consultancy'
import Skill from "./Skill";
import Slot from '../abdo/Slot.js'
import Review from '../abdo/Review.js'
import Reservation from './Reservation'
import { Container, Col } from "react-bootstrap";
import axios from "axios";
import { Button } from "@material-ui/core";
import './TaskProfile.css'
import ReactCardFlip from 'react-card-flip';
import ReserveRoom from './RoomReservation'
// import AppliedUser from './AppliedCourse.js'
// import AcceptedUser from './AcceptedCourse.js'

var store = require("store");
class Card extends Component {
    state = {
        room :null,
        slots:[],
        reviews:[],
        reservations:[],
        coWorkingSpaceId:null,
        isFlipped:false
      };



      handleClickFlipp(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
      }
      componentDidMount() {
          const {id,roomId}=this.props.match.params
    this.setState({coWorkingSpaceId:id})
              axios
            .get(`http://localhost:3333/coWorkingSpaces/room/${id}/${roomId}`)
            .then(res => {
                console.log(res.data.data)

                this.setState({ room: res.data.data,
              slots:res.data.data.slots
            
        })
        this.setState({ reservations:this.state.room.reservations
            ,reviews:this.state.room.reviews
      })
             
            }
              )
          
            
      };    
// async handleClick() {
        
//         const {id,roomId}=this.props.match.params
       
//         const handle = store.get('payload').id
//         const data = {
//           slot: "slot1",
//           reservationDate:"5/12/2012",
//           reserver:{
//               id:this.state.coWorkingSpaceId,
//               name:"mohamed"
//           }
//         };
//         await axios.put(`http://localhost:3333/coWorkingSpaces/room/reserve/${id}/${roomId}`, data).catch(e => {
//             alert(e)
//           }).then(alert('Done: '));
//         window.location.reload(); 
//     }
   
    getSlots(){
        return this.state.slots.map((slot)=>(
      
          <Slot  slot= {slot} />
        ))}
        getReviews(){
        
          return this.state.reviews.map((review)=>(
        
            <Review  review= {review} />
          ))}
          getReservations(){
            return this.state.reservations.map((res)=>(
          
              <Reservation  res= {res}  id={this.state.coWorkingSpaceId} roomId={this.state.room.id}
              />
            ))}
            
    
  render() {
    if (this.state.room) {
      return (
        <Container>
          <Col style={{minHeight:'100vh',background:'white'}}md={{ span: 8, offset: 2 }}>
              <FirstComponent
                room={this.state.room}
                id={this.state.coWorkingSpaceId}
              />
              <hr></hr>
              <h5>General Informations</h5>
                <SecondComponent
                  room={this.state.room}
                />
                <h5>Slots</h5>
                {this.getSlots()}
                <h5>Reviewes</h5>
                {this.getReviews()}
                <h5>Reservations</h5>
                {this.getReservations()}
                
              <hr></hr>
              
              <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
          <dev style={{
         
          background: '#e5e8e8',
          textAlign:'center'
        }}  key="front">
<Button style={{width:'100%',textTransform:'lowercase'}} onClick={this.handleClickFlipp.bind(this)} class='Btn'>Reserve</Button>
          </dev>
   
          <dev style={{
          background: '#e5e8e8',
          testAlign:'center'
        }} key="back">

     <ReserveRoom id={this.state.coWorkingSpaceId} roomId={this.state.room.id} />
     <br></br>

<br></br>
<br></br>
<br></br>
     
     <button style={ButotnStyle1} onClick={this.handleClickFlipp.bind(this)}>back</button>
          
          </dev>
        </ReactCardFlip>
      
          </Col>
        </Container>
      );
    } else {
      return <p>loading ..</p>;
    }
  }
}
const ButotnStyle1 = {
    backgroundColor:'#e5e8e8',
    color :'black',
    testAlign:'center',
  
    float :'center',
    fontSize:'18px'
  }  
export default Card;
