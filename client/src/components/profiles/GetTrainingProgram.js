import React, { Component } from "react";
import axios from "axios";
import course from '../profileComponents/courseicon.png'
export class GetTrainingProgram extends Component {
    state = {
      name:'',
      description:'',
      type:'',
      duration:'',
      applyDueDate:'',
      startDate:''
    };

    componentDidMount() {
        const {id,trainingProgramId}=this.props.match.params
  
            axios
          .get(`http://localhost:3333/educationalOrganizations/trainingProgram/${id}/${trainingProgramId}`)
          .then(res => {
            this.setState({
                name:res.data.name,
                description:res.data.description,
                type:res.data.type,
                duration:res.data.duration,
                applyDueDate:res.data.duration,
                startDate:res.data.startDate
                
            })
           
          }
            )
           
        
          
    };


    render() {
      return (
        <div style={{ width: '100%' , background : "#242424",margin:'0',textAlign:"center"}} >
        
        <img className="App-img" src={course}   borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>
        <div className="getSpecRoom" style={{position:"relative",top:"27px",marginLeft:'250px',marginRight:'250px',paddingLeft:'20px',paddingRight:'20px',  border: '1px solid', borderRadius:(20,20,20,20)}} >
        <div> <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> info </p> 
      <hr style={lineStyle}></hr>  <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> name:<font  color = "white"> {this.state.name} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> description:<font  color = "white"> {this.state.description} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> type:<font  color = "white"> {this.state.type} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> duration:<font  color = "white"> {this.state.duration} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> applyDueDate:<font  color = "white"> {this.state.applyDueDate} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> startDate:<font  color = "white"> {this.state.startDate} </font></p>
     
     
     </div>
         
        
</div>
</div>

      );
    }
  }
  const lineStyle ={
    backgroundColor:'black',
      borderTop: '1px solid #F9BB32'
    }
   
  export default GetTrainingProgram;