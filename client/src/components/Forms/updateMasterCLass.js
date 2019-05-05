import React, { Component } from "react";
import axios from "axios";
import masterClass from '../profileComponents/masterClassIcon.png'
import AppliedUser from '../profileComponents/AppliedUser'
import AcceptedUser from '../profileComponents/AcceptedUser'
import Courses from '../profileComponents/Courses'
import { Link , Redirect } from "react-router-dom";
var store = require('store')
export class updateMasterClass extends Component {
    state = {
      masterClass:null,
      Applied:[],
      Accepted:[],
      eduId:null,
      courses:[],
      id:null, updated:false,
      name: ''
      , description: ''
     , payment: ''
       ,places: ''
      , availablePlaces: ''
       , MasterClassDuration: ''
      
       , startDate: ''
       , endDate: ''
       , levelOfStudents: ''
       , effort: ''
       , isAvailable: false
       
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
        placesChange = (e) => {
        this.setState({
           places: e.target.value
        })
        }
        availablePlacesChange = (e) => {
        this.setState({
           availblePlaces: e.target.value
        })
        }
        paymentChange = (e) => {
        this.setState({
           payment: e.target.value
        })
        }
        MasterClassDurationChange = (e) => {
        this.setState({
           MasterClassDuration: e.target.value
        })
        }
        startDateChange = (e) => {
        this.setState({
           startDate: e.target.value
        })
        }
        endDateChange = (e) => {
        this.setState({
           endDate: e.target.value
        })
        }
        
        effortChange = (e) => {
        this.setState({
           effort: e.target.value
        })
        }
        levelOfStudentsChange = (e) => {
        this.setState({
           levelOfStudents: e.target.value
        })}
  
        onSubmit = (e) => {
         
  
          const {id,masterClassId}=this.props.match.params
          
              axios.put(`http://localhost:3333/masterClasses/${masterClassId}`,{
                 name: this.state.name
                , description: this.state.description
               , payment: this.state.payment
                 ,places: this.state.places
                , availablePlaces: this.state.availablePlaces
                 , MasterClassDuration: this.state.MasterClassDuration
                
                 , startDate: this.state.startDate
                 , endDate: this.state.endDate
                 , levelOfStudents: this.state.levelOfStudents
                 , effort: this.state.effort
                 , isAvailable: this.state.isAvailable
                 , courses: this.state.courses
            
          })
          .then(response => { 
            this.setState({updated:true})
          
              alert('updated successfully')
 
             })
          .catch(error => {
              alert('wrong data type or missing field')
          });
          }
  
    async handleClick() {
      
      const {id,masterClassId}=this.props.match.params
     
      const handle = store.get('payload').id
      const data = {
        masterClassId: masterClassId,
        
      };
      await axios.put(`http://localhost:3333/members/applyForMasterClass/${handle}`, data);
      window.location.reload(); 
    }
 
    componentDidMount() {
        const {id,masterClassId}=this.props.match.params
  this.setState({eduId:id})
            axios
          .get(`http://localhost:3333/educationalOrganizations/masterClass/${id}/${masterClassId}`)
          .then(res => {
            this.setState({ masterClass: res.data,
                Applied:res.data.listOfApplied,
                Accepted:res.data.listOfAccepted,
                name:res.data.name,
                description:res.data.description,
                places:res.data.places,
                availablePlaces:res.data.availablePlaces,
                payment:res.data.payment,
                MasterClassDuration:res.data.MasterClassDuration,
                levelOfStudents:res.data.levelOfStudents,
                startDate:res.data.startDate,
                endDate:res.data.endDate,
                effort:res.data.effort,
               
  
            })
           console.log(res.data)
          }
            )
        
          
    };
    GetAppliedUser(){
        return this.state.Applied.map((apply)=>(
    
            <AppliedUser  apply= {apply}
            data={this.state.masterClass}
            id={this.state.id}
            >
             </AppliedUser> ))
    }
    GetAcceptedUser(){
        return this.state.Accepted.map((accepted)=>(
    
            <AcceptedUser  accept= {accepted} />))
    
    }
    getData(){
        
      if(this.state.masterClass != null){
      
      return <div> 
      
      <hr style={lineStyle}></hr>  <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> name: <input type="text" placeholder={this.state.name}  onChange={e => this.nameChange(e)}/></p>
    <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> description: <input type="text" placeholder={this.state.description}  onChange={e => this.descriptionChange(e)}/></p>
    <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> places: <input type="text" placeholder={this.state.places}  onChange={e => this.placesChange(e)}/></p>
<p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> availablePlaces: <input type="text" placeholder={this.state.availablePlaces}  onChange={e => this.availablePlacesChange(e)}/></p>
<p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> payment: <input type="text" placeholder={this.state.payment}  onChange={e => this.paymentChange(e)}/></p>
<p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> MasterClassDuration: <input type="text" placeholder={this.state.MasterClassDuration}   onChange={e => this.MasterClassDurationChange(e)}/></p>
<p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> startDate: <input type="text" placeholder={this.state.startDate}  onChange={e => this.startDateChange(e)}/></p>
<p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> endDate: <input type="text" placeholder={this.state.endDate}  onChange={e => this.endDateChange(e)}/></p>

<p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> effort: <input type="text" placeholder={this.state.effort}  onChange={e => this.effortChange(e)}/> </p>
<p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> levelOfStudents: <input type="text" placeholder={this.state.levelOfStudents}  onChange={e => this.levelOfStudentsChange(e)}/> </p>
   
     </div>

    }else{
      return 'ya mo8fl eh ele d5lk hena'
    }
    }
checkApply(){
 
return <button
onClick={this.onSubmit}
className="btn btn-danger btn-sm m-2" style = {ButtonStyle} >
Update
</button>
 
}
    render() {
        const {id,masterClassId}=this.props.match.params
        if(this.state.updated){
            return(<Redirect to=  {"/educationalOrganizations/masterClass/"+id+"/"+masterClassId}  ></Redirect>)
        }
        else{
      return (
        <div style={{ width: '100%' , background : "#242424",margin:'0',textAlign:"center"}} >
        {this.checkApply()}
        
        <img className="App-img" src={masterClass}   borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>
        

        {/*removed this.check apply from here */}
        <div className="getSpecRoom" style={{marginLeft:'250px',marginRight:'250px',position:'relative',top:'27px',paddingLeft:'20px',paddingRight:'20px',  border: '1px solid', borderRadius:(20,20,20,20)}} >
        
           {this.getData()}  
          <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> Users applied  </p> 
      <hr style={lineStyle}></hr> 
      {this.GetAppliedUser ()}
     
        <br></br>
        <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> Users accepted  </p> 
      <hr style={lineStyle}></hr> 
      {this.GetAcceptedUser ()}
      <br></br>
      <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> Courses </p> 
      <hr style={lineStyle}></hr>
      <Courses courses={this.state.courses} educationalOrganizationId={this.state.eduId}></Courses>
        
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
    
  export default updateMasterClass;