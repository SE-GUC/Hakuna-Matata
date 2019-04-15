import React, { Component } from "react";
import axios from "axios";
import course from '../../components/courseicon.png'
import AppliedUser from '../AppliedUser'
import AcceptedUser from '../AcceptedUser'
export class GetCourse extends Component {
    state = {
      course:null,
      Applied:[],
      Accepted:[]
    };
    componentDidMount() {
        const {id,courseId}=this.props.match.params
  
            axios
          .get(`http://localhost:3333/educationalOrganizations/course/${id}/${courseId}`)
          .then(res => {
            this.setState({ course: res.data,
                Applied:res.data.listOfApplied,
                Accepted:res.data.listOfAccepted
            })
           
          }
            )
        
          
    };
    GetAppliedUser(){
        return this.state.Applied.map((apply)=>(
    
            <AppliedUser  apply= {apply} />))
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
        educatorName,

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
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> educator:<font  color = "white"> {educatorName.name} </font> </p>
     
     </div>
    }else{
      return 'ya mo8fl eh ele d5lk hena'
    }
    }

    render() {
      return (
        <div style={{ width: '100%' , background : "#242424",margin:'0'}} >
        
        <img className="App-img" src={course}   borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>

        <div className="getSpecRoom" style={{marginLeft:'250px',marginRight:'250px',paddingLeft:'20px',paddingRight:'20px',  border: '1px solid', borderRadius:(20,20,20,20)}} >
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