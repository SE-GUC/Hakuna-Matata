import React, { Component } from "react";
import axios from "axios";
import course from '../../profileComponents/courseicon.png'
import AppliedUser from '../../profileComponents/AppliedUserCourse'
import AcceptedUser from '../../profileComponents/AcceptedUser'
import { Link , Redirect } from "react-router-dom";
var store = require('store')  

export class updateCourse extends Component {
    state = {
      course:null,
      Applied:[],
      Accepted:[],
      name:'',
      description:'',
      places:0,
       availablePlaces:0,
      payment:0,
       courseDuration:'',
      startDate:'',
       endDate:'',
        category:'',
    isAvailable:false,
    updated:false,
    educator:null,



          
    };
  
    nameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
   
    desChange = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    durChange = (e) => {
        this.setState({
            durChange: e.target.value
        })
    }
    placesChange = (e) => {
        this.setState({
            places: e.target.value
        })
    }
    avPlacChange = (e) => {
        this.setState({
            availablePlaces: e.target.value
        })
    }
    
    paymentChange = (e) => {
        this.setState({
            payment: e.target.value
        })
    }
    sdChange = (e) => {
        this.setState({
            startDate: e.target.value
        })
    }
    edChange = (e) => {
        this.setState({
            endDate: e.target.value
        })
    }
    catChange = (e) => {
        this.setState({
            category: e.target.value
        })
    }
    isAChange = (e) => {
        this.setState({
            isAvailable: e.target.value
        })
    }
    onSubmit = (e) => {
       

        const {id,courseId}=this.props.match.params
            axios.put(`http://localhost:3333/courses/${courseId}`,{
                name:this.state.name,
                description:this.state.description,
                places:this.state.places,
                 availablePlaces:this.state.availablePlaces,
                payment:this.state.payment,
                 courseDuration:this.state.courseDuration,
                startDate:this.state.startDate,
                 endDate:this.state.endDate,
                  category:this.state.category,
              isAvailable:this.state.isAvailable,
              educator:this.state.educator
            
          
        })
        .then(response => { 
            this.setState({updated:true})
            
            alert('updated Sucessfully')
        })
        .catch(error => {
            alert('wrong data type or missing field')
        });
        }
 
    componentDidMount() {
        const {id,courseId}=this.props.match.params
  
            axios
          .get(`http://localhost:3333/educationalOrganizations/course/${id}/${courseId}`)
          .then(res => {
            this.setState({ course: res.data,
                name:res.data.name,
                Applied:res.data.listOfApplied,
                Accepted:res.data.listOfAccepted,
                description:res.data.description,
                places:res.data.places,
                availablePlaces:res.data.availablePlaces,
                payment:res.data.payment,
                courseDuration:res.data.courseDuration,
                startDate:res.data.startDate,
                endDate:res.data.endDate,
                category:res.data.category,
                isAvailable:res.data.isAvailable,
                educator:res.data.educator,

          
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
  

      return <div> <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> info </p> 
      <hr style={lineStyle}></hr>  <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> name: <input type="text" placeholder={this.state.name}  onChange={e => this.nameChange(e)}/></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> description: <input type="text" placeholder={this.state.description}  onChange={e => this.desChange(e)}/></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> places: <input type="text" placeholder={this.state.places}  onChange={e => this.placesChange(e)}/></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> availablePlaces: <input type="text" placeholder={this.state.availablePlaces}  onChange={e => this.avPlacChange(e)}/></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> payment: <input type="text" placeholder={this.state.payment}  onChange={e => this.paymentChange(e)}/></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> courseDuration: <input type="text" placeholder={this.state.courseDuration}  onChange={e => this.durChange(e)}/></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> startDate: <input type="text" placeholder={this.state.startDate}  onChange={e => this.sdChange(e)}/> </p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> endDate: <input type="text" placeholder={this.state.endDate}  onChange={e => this.edChange}/></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> category: <input type="text" placeholder={this.state.category}  onChange={e => this.catChange(e)}/></p>
      
     
     </div>
    }else{
      return 'ya mo8fl eh ele d5lk hena'
    }
    }

    render() {
        const {id,courseId}=this.props.match.params
        if(this.state.updated){
      
            return(<Redirect to=  {"/educationalOrganizations/course/"+id+"/"+courseId}  ></Redirect>)
            
    
          }
         else{ 
      return (
        <div style={{ width: '100%' , background : "#242424",margin:'0',textAlign:"center"}} >
        
        <img className="App-img" src={course}   borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>
      
        <button
          onClick={this.onSubmit}
         className="btn btn-danger btn-sm m-2" style = {ButtonStyle} >
          Update
        </button>
        <div className="getSpecRoom" style={{position:"relative",top:"27px",marginLeft:'250px',marginRight:'250px',paddingLeft:'20px',paddingRight:'20px',  border: '1px solid', borderRadius:(20,20,20,20)}} >
           {this.getData()}  
          <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> Users applied  </p> 
      <hr style={lineStyle}></hr> 
      {this.GetAppliedUser ()}
        <br></br>
        <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> Users accepted  </p> 
      {this.GetAcceptedUser ()}
        
</div>
</div>

      );
    }}
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
  export default updateCourse;