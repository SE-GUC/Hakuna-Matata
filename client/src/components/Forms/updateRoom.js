import React, { Component } from "react";
import axios from "axios";
import room from './room-icon.jpg'
import Slot from './Slot.js'
import Review from './Review.js'
export class GetSpec extends Component {
    state = {
      room :null,
      slots:[],
      reviews:[]
    };
    componentDidMount() {
        const {id,roomId}=this.props.match.params
  
            axios
          .get(`http://localhost:3333/rooms/${roomId}`)
          .then(res => {
            this.setState({ room: res.data,
            slots:res.data.slots
          ,reviews:res.data.reviews})
           
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

      return <div> 
          <button className="btn btn-danger btn-sm m-2" style = {ButotnStyle} onClick ={this.updateFun.bind(this)} > update </button>
        <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> info </p> 
      <hr style={lineStyle}></hr>  <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> capacity:<font  color = "white"> <input type="text" id="capacity_txt" defaultValue= {capacity}  ></input></font></p>
     </div>
    }else{
      return 'ya mo8fl eh ele d5lk hena'
    }
    }
    updateFun(){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        const capacity = document.getElementById("capacity_txt").value
        const data = {
            capacity
        }
        axios.put('http://localhost:3333/rooms/' + id , data)
      window.location = `http://localhost:3000/coWorkingSpaces/5cab83e86b8f820fc0bcf768/showRooms/${id}`
    }

    render() {
      return (
        <div style={{ width: '100%' , background : "#242424",margin:'0',textAlign:"center"}} >
        
        <img className="App-img" src={room}   borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>

        <div className="getSpecRoom" style={{marginLeft:'250px',marginRight:'250px',paddingLeft:'20px',paddingRight:'20px',  border: '1px solid', borderRadius:(20,20,20,20)}} >
           {this.getData()}  
           <br></br>
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
        
</div>
</div>

      );
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