import React, { Component } from "react";
import axios from "axios";
import course from '../profileComponents/courseicon.png'
import { Link , Redirect } from "react-router-dom";
var store = require('store')
export class GetTrainingProgram extends Component {
    state = {
      name:'',
      description:'',
      type:'',
      duration:'',
      applyDueDate:'',
      startDate:'',
      deleted:false
    };
    delTrain(){
      const {id,trainingProgramId}=this.props.match.params
      axios.delete(`http://localhost:3333/educationalOrganizations/trainingProgram/${id}/${trainingProgramId}`)
     .then(res=>{
   if(res.status==200){
    alert("training prog is deleted successfully")
    this.setState({deleted:true})
}})
  
    
    
      };

    checkButtons(){
      const {id,trainingProgramId}=this.props.match.params
      console.log(id);
      console.log(store.get('payload').id);
   // if(id ==store.get('payload').id){
        return<div>
      
        {" "} <button className="btn btn-danger btn-sm m-2" style = {ButotnStyle} onClick={this.delTrain.bind(this)}  > delete </button> |
        {" "}  <Link to={"/updateTrain/"+id+"/"+trainingProgramId}><button className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  > update </button> </Link>
        </div>
  /*  }
     /* else if(store.get('payload').tags.includes('Member')){
    return <div> <button onClick={this.handleClick.bind(this)} className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  >Apply</button>
    </div>
      }*/
    }
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
                
                startDate:res.data.startDate
                
            })
           
          }
            )
           
        
          
    };


    render() {
      const {id,trainingProgramId}=this.props.match.params
      if(this.state.deleted){
      
        return(<Redirect to=  {"/educationalOrganization/"+id}  ></Redirect>)
        

      }
else{
      return (
        <div style={{ width: '100%' , background : "#242424",margin:'0',textAlign:"center"}} >
      
        <img className="App-img" src={course}   borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>
        {this.checkButtons()}
        <div className="getSpecRoom" style={{position:"relative",top:"27px",marginLeft:'250px',marginRight:'250px',paddingLeft:'20px',paddingRight:'20px',  border: '1px solid', borderRadius:(20,20,20,20)}} >
        <div> <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> info </p> 
      <hr style={lineStyle}></hr>  <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> name:<font  color = "white"> {this.state.name} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> description:<font  color = "white"> {this.state.description} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> type:<font  color = "white"> {this.state.type} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> duration:<font  color = "white"> {this.state.duration} </font></p>
     
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> startDate:<font  color = "white"> {this.state.startDate} </font></p>
     
     
     </div>
         
        
</div>
</div>

      );
    }}
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
  export default GetTrainingProgram;