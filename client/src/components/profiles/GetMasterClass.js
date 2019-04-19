import React, { Component } from "react";
import axios from "axios";
import masterClass from '../profileComponents/masterClassIcon.png'
import AppliedUser from '../profileComponents/AppliedUser'
import AcceptedUser from '../profileComponents/AcceptedUser'
import Courses from '../profileComponents/Courses'
var store = require('store')
export class GetMasterClass extends Component {
    state = {
      masterClass:null,
      Applied:[],
      Accepted:[],
      eduId:null,
      courses:[],
      id:null
    };
    
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
                courses:res.data.courses,
                id:id
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
      const {
        name,
        description,
        places,
        availablePlaces,
        payment,
        MasterClassDuration,
        levelOfStudents,

        startDate,
        endDate,
        category,
        effort,

      } = this.state.masterClass;
      return <div> <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> info </p> 
      <hr style={lineStyle}></hr>  <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> name:<font  color = "white"> {name} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> description:<font  color = "white"> {description} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> places:<font  color = "white"> {places} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> availablePlaces:<font  color = "white"> {availablePlaces} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> payment:<font  color = "white"> {payment} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> MasterClassDuration:<font  color = "white"> {MasterClassDuration} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> startDate:<font  color = "white"> {startDate} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> endDate:<font  color = "white"> {endDate} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> category:<font  color = "white"> {category} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> effort:<font  color = "white"> {effort} </font> </p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> levelOfStudents:<font  color = "white"> {levelOfStudents} </font> </p>
     
     </div>
    }else{
      return 'ya mo8fl eh ele d5lk hena'
    }
    }
checkApply(){
  console.log(store.get('payload').tags)
  if(store.get('payload').tags.includes('Member')){
  
return <button
onClick={this.handleClick.bind(this)}
className="btn btn-danger btn-sm m-2" style = {ButtonStyle} >
Apply
</button>
  }else{
return
  }
}
    render() {
      return (
        <div style={{ width: '100%' , background : "#242424",margin:'0',textAlign:"center"}} >
        
        <img className="App-img" src={masterClass}   borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>
        {this.checkApply()}
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
  export default GetMasterClass;