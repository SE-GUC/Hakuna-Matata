import React, { Component } from "react";
import axios from "axios";
import course from '../profileComponents/courseicon.png'
import AppliedUser from '../profileComponents/AppliedUserCourse'
import AcceptedUser from '../profileComponents/AcceptedUser'
var store = require('store')  
export class GetCourse extends Component {
    state = {
      course:null,
      Applied:[],
      Accepted:[]
    };
  
    async handleClick() {
      
      const {id,courseId}=this.props.match.params
     
      const handle = store.get('payload').id
      const data = {
        courseId: courseId,
        
      };
      await axios.put(`http://localhost:3333/members/applyForCourse/${handle}`, data);
      window.location.reload(); 
    }
 
    componentDidMount() {
        const {id,courseId}=this.props.match.params
  
            axios
          .get(`http://localhost:3333/educationalOrganizations/course/${id}/${courseId}`)
          .then(res => {
            this.setState({ course: res.data,
                Applied:res.data.listOfApplied,
                Accepted:res.data.listOfAccepted,
                name:res.data.name,
                
            })
           
          }
            )
           
        
          
    };
    GetAppliedUser(){
        return this.state.Applied.map((apply)=>(
    
            <AppliedUser  apply= {apply}
            course={this.state.course}
            id={this.state.id} />))
    }
    GetAcceptedUser(){
        return this.state.Accepted.map((accepted)=>(
    
            <AcceptedUser  accepted= {accepted} />))
    
    }
    getData(){
      if(this.state.course != null){
      const {
        name,
        description,
        places,
        availablePlaces,
        payment,
        courseDuration,
        startDate,
        endDate,
        category,
        educator,

      } = this.state.course;

      return <div> <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> info </p> 
      <hr style={lineStyle}></hr>  <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> name:<font  color = "white"> {name} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> description:<font  color = "white"> {description} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> places:<font  color = "white"> {places} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> availablePlaces:<font  color = "white"> {availablePlaces} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> payment:<font  color = "white"> {payment} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> courseDuration:<font  color = "white"> {courseDuration} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> startDate:<font  color = "white"> {startDate} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> endDate:<font  color = "white"> {endDate} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> category:<font  color = "white"> {category} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> educator:<font  color = "white"> {educator.name} </font> </p>
     
     </div>
    }else{
      return 'ya mo8fl eh ele d5lk hena'
    }
    }

    render() {
      return (
        <div style={{ width: '100%' , background : "#242424",margin:'0',textAlign:"center"}} >
        
        <img className="App-img" src={course}   borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>
        <button
          onClick={this.handleClick.bind(this)}
         className="btn btn-danger btn-sm m-2" style = {ButtonStyle} >
          Apply
        </button>
        <div className="getSpecRoom" style={{position:"relative",top:"27px",marginLeft:'250px',marginRight:'250px',paddingLeft:'20px',paddingRight:'20px',  border: '1px solid', borderRadius:(20,20,20,20)}} >
           {this.getData()}  
          <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> Users applied  </p> 
      <hr style={lineStyle}></hr> 
      {this.GetAppliedUser ()}
        <br></br>
        <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> Users accepted  </p> 
      <hr style={lineStyle}></hr> 
      {this.GetAcceptedUser ()}
        
</div>
</div>

      );
    }
  }
  const lineStyle ={
    backgroundColor:'black',
      borderTop: '1px solid #F9BB32'
    }
    const ButtonStyle = {

      backgroundColor:'#F9BB32',
        color :'#242424',
        width:"130px",
        testAlign:'center',
        pading:'15px 32px',
        borderRadius:'8px',
        float :'center',
        fontSize:'18px',
        position:'relative',
        left:'-120px',
        top:'22px'
    
    }  
  export default GetCourse;