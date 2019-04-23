import React, { Component } from "react";
import axios from "axios";
import course from '../profileComponents/courseicon.png'
import { Link , Redirect } from "react-router-dom";
var store = require('store')
export class updateTrainingprogram extends Component {
    state = {
      name:'',
      description:'',
      type:'',
      duration:'',
      applyDueDate:null,
      startDate:null,
      updated:false
    };
   


    nameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    descriptionChange = (e) => {
        this.setState({
            description: e.target.value
        })
        }
        typeChage = (e) => {
        this.setState({
            type: e.target.value
        })
        }
        durationChange = (e) => {
        this.setState({
           duration: e.target.value
        })
        }
        
        applyDueChange = (e) => {
        this.setState({
           applyDueDate: e.target.value
        })
        }
        startDateChange = (e) => {
        this.setState({
           startDate: e.target.value
        })
        }
   
  
        onSubmit = (e) => {
         
  
            const {id,trainingProgramId}=this.props.match.params
              axios.put(`http://localhost:3333/trainingPrograms/${trainingProgramId}`,{
                 name: this.state.name
                , description: this.state.description,
               type:this.state.type,
              duration:this.state.duration,
              
                startDate:this.state.startDate
            
          })
          .then(response => { 
            this.setState({updated:true})
          
              alert('updated successfully')
 
             })
          .catch(error => {
              alert('wrong data type or missing field')
          });
          }



    checkButtons(){
      const {id,trainingProgramId}=this.props.match.params
      console.log(id);
      console.log(store.get('payload').id);
   // if(id ==store.get('payload').id){
        return<div>
      
       
        {" "}  <button onClick={this.onSubmit} className="btn btn-danger btn-sm m-2" style = {ButotnStyle}  > update </button> 
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
      if(this.state.updated){
        
        return(<Redirect to=  {"/educationalOraganizations/trainingProgram/"+id+"/"+trainingProgramId}  ></Redirect>)
        

      }
else{
      return (
        <div style={{ width: '100%' , background : "#242424",margin:'0',textAlign:"center"}} >
      
        <img className="App-img" src={course}   borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>
        {this.checkButtons()}
        <div className="getSpecRoom" style={{position:"relative",top:"27px",marginLeft:'250px',marginRight:'250px',paddingLeft:'20px',paddingRight:'20px',  border: '1px solid', borderRadius:(20,20,20,20)}} >
        <div> <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> info </p> 
      <hr style={lineStyle}></hr>  <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> name:<input type="text" placeholder={this.state.name}  onChange={e => this.nameChange(e)}/></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> description:<input type="text" placeholder={this.state.description}  onChange={e => this.descriptionChange(e)}/></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> type:<input type="text" placeholder={this.state.type}  onChange={e => this.typeChage(e)}/></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> duration:<input type="text" placeholder={this.state.duration}  onChange={e => this.durationChange(e)}/></p>
    
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> startDate:<input type="text" placeholder={this.state.startDate}  onChange={e => this.startDateChange(e)}/></p>
     
     
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
  export default updateTrainingprogram;