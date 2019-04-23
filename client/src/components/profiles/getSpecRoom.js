import React, { Component } from "react";
import axios from "axios";
import room from '../profileComponents/room-icon.jpg'
import Slot from '../profileComponents/Slot.js'
import Review from '../profileComponents/Review.js'
import Reservation from '../profileComponents/Reservation'
import { Link , Redirect } from "react-router-dom";
export class GetSpec extends Component {
    state = {
      room :null,
      slots:[],
      reviews:[],
      reservations:[],
      isloaded:false
    };
    componentDidMount() {
        const {id,roomId}=this.props.match.params
  
            axios
          .get(`http://localhost:3333/rooms/${roomId}`)
          .then(res => {
            this.setState({ room: res.data,
            slots:res.data.slots
          ,reviews:res.data.reviews,
          reservations:res.data.reservations,
            isloaded:true})
            console.log(this.state.reservations)
           
          }
            )
        
          
    };
    getSlots(){
      return this.state.slots.map((slot)=>(
    
        <Slot  slot= {slot} />
      ))}
      getReviews(){
        return this.state.reviews.map((review)=>(
      
          <Review  review= {review} />
        ))}
        
    getData(){
      if(this.state.room != null){
      const {
        capacity,
   
      } = this.state.room;
      return <div> <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> info </p> 
      <hr style={lineStyle}></hr>  <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> capacity:<font  color = "white"> {capacity} </font></p>
     </div>
    }else{
      return 'ya mo8fl eh ele d5lk hena'
    }
    }
    updateFun(){
      var url = window.location.pathname;
      var id = url.substring(url.lastIndexOf('/') + 1);
      window.location = `http://localhost:3000/updateRoom/${id}`
    }
    deleteFun(){
     

      var url = window.location.pathname;
      var url_array = url.split('/') 
      var id = url_array[url_array.length-3];
      var roomId = url.substring(url.lastIndexOf('/') + 1);
      axios.delete('http://localhost:3333/coWorkingSpaces/room/' +id+ '/' +roomId)
      window.location.reload(true); 
      
        }

        getReservations(){
          const {id,roomId}=this.props.match.params
          return(
          <div>
           { this.state.reservations.map(reser=>
             <Reservation isAccepted={reser.isAccpted} reservationId={reser._id} roomID={roomId} name={reser.reserverName}/>
           )}
           </div>
          )

        }


    render() {
      const {id,roomId}=this.props.match.params
      if(this.state.isloaded){
      return (
        <div style={{ width: '100%' , background : "#242424",margin:'0',textAlign:"center"}} >
           <br></br>
        <img className="App-img" src={room}   borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>
     <br></br>
     <br></br>
     <Link style = {ButotnStyle} to={"/coWorkingSpaces/"+id+"/showRooms/"+roomId+"/reserve"}><button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  >Reserve</button></Link>  <font color='#A1A1A1'> | </font>
        <button  className="btn btn-danger btn-sm m-2" style = {ButotnStyle} onClick = {this.updateFun.bind(this)} > update</button> <font color='#A1A1A1'>|</font> <button className="btn btn-danger btn-sm m-2" style = {ButotnStyle} onClick = {this.deleteFun.bind(this)} > delete</button>
        <br></br>
           <br></br>
        <div className="getSpecRoom" style={{marginLeft:'250px',marginRight:'250px',paddingLeft:'20px',paddingRight:'20px',  border: '1px solid', borderRadius:(20,20,20,20)}} >
           {this.getData()}  
         
       <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Slots:</p>
        <hr style={lineStyle}></hr>
        {this.getSlots()}
        <br></br>
        <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Reviews:</p>
        <hr style={lineStyle}></hr>
        {this.getReviews()}
        <br></br>
        <p style ={{color :"#F9BB32", textAlign: "left",fontSize: " 15px "}}>Reservations:</p>
        <hr style={lineStyle}></hr>

      {this.getReservations()}
        
</div>
</div>

      );
    }
    else{
      return (
        <div style={{ width: '100%' , background : "#242424",margin:'0',textAlign:"center"}}>
        <h1>LOADING</h1>
        </div>
        
        
        )
        
    }
  
  }
  
  }
  const lineStyle ={
    backgroundColor:'black',
      borderTop: '1px solid #F9BB32'
    }
    const ButotnStyle = {
      backgroundColor:'#F9BB32',
        color :'#242424',
        testAlign:'center',
        pading:'15px 32px',
        borderRadius:'12px',
        float :'center',
        fontSize:'18px'
    }  
  export default GetSpec;