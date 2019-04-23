import React, { Component } from "react";
import axios from "axios";
import course from '../profileComponents/courseicon.png'
import AppliedUser from '../profileComponents/AppliedUserCourse'
import AcceptedUser from '../profileComponents/AcceptedUser'
import { Link , Redirect } from "react-router-dom";
var store = require('store')  
export class GetCourse extends Component {
    state = {
      course:null,
      Applied:[],
      Accepted:[],
      deleted:false
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
    delCourse(){ 
      const {id,courseId}=this.props.match.params
      axios.delete(`http://localhost:3333/educationalOrganizations/course/${id}/${courseId}`)
      .then(res=>{
        if(res.status==200){
          alert("course is deleted successfully");
         this.setState({deleted:true})
  
      };
      })}
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
    checkButtons(){
     const {id,courseId}=this.props.match.params
   /*   console.log(id);
      console.log(store.get('payload').id);
      if(id ==store.get('payload').id){*/
        return<div>
      
        {" "} <button className="btn btn-danger btn-sm m-2" style = {ButotnStyle} onClick={this.delCourse.bind(this)}  > delete </button> |
        {" "}  <Link to={"/updateCourse/"+id+"/"+courseId}><button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  > update </button> </Link>
        </div>
    }
   /*   else{
    return <div> <button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  >Apply</button>
    </div>
      }
    }*/
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
      const {id,courseId}=this.props.match.params
      if(this.state.deleted){
      
        return(<Redirect to=  {"/educationalOrganization/"+id}  ></Redirect>)
        

      }
else{
      return (
        <div style={{ width: '100%' , background : "#242424",margin:'0',textAlign:"center"}} >
        
        <img className="App-img" src={course}   borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>
        {this.checkButtons()}
        
      
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
  export default GetCourse;