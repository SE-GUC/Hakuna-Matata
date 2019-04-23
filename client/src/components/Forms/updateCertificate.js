import React, { Component } from "react";
import axios from "axios";
import certificate from '../profileComponents/certificateIcon.jpg'
import { Link , Redirect } from "react-router-dom";

export class updateCertificate extends Component {
    state = {
      certificate:null,
      name:'',
      type:'',
      accreditation:'',
      updated:false,
     
    };

    nameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    typeChange = (e) => {
        this.setState({
            type: e.target.value
        })
    }
    accChange = (e) => {
        this.setState({
            accreditation: e.target.value
        })
    }
    
    onSubmit = (e) => {
       

        const {id,certificateId}=this.props.match.params
        
            axios.put(`http://localhost:3333/certificates/${certificateId}`,{
                name:this.state.name,
                type:this.state.type,
                accreditation:this.state.accreditation,

          
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
        const {id,certificateId}=this.props.match.params
  
            axios
          .get(`http://localhost:3333/educationalOrganizations/certificate/${id}/${certificateId}`)
          .then(res => {
            this.setState({ certificate: res.data,
                name: res.data.name,
                type: res.data.type,
                accreditation:res.data.accreditation

                
            })
           console.log(res.data)
          }
            )
        
          
    };
    
    getData(){
      if(this.state.certificate != null){
     
        return <div> <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> info </p> 
        <hr style={lineStyle}></hr>  <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> name: <input type="text" placeholder={this.state.name}  onChange={e => this.nameChange(e)}/></p>
        <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> type: <input type="text" placeholder={this.state.type}  onChange={e => this.typeChange(e)}/></p>
        <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> accreditation: <input type="text" placeholder={this.state.accreditation}  onChange={e => this.accChange(e)}/></p>
       
     </div>
    }else{
      return 'ya mo8fl eh ele d5lk hena'
    }
    }

    render() {


        const {id,certificateId}=this.props.match.params
        if(this.state.updated){
            console.log("lalalalllall")
        
          return(<Redirect to=  {"/educationalOraganizations/certificate/"+id+"/"+certificateId}  ></Redirect>)
          
  
        }
       else{
      return (
        <div style={{ width: '100%' , background : "#242424",margin:'0',textAlign:"center"}} >
        
        <img className="App-img" src={certificate}   borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>

        <button
          onClick={this.onSubmit}
         className="btn btn-danger btn-sm m-2" style = {ButtonStyle} >
          Update
        </button>
        <div className="getSpecRoom" style={{marginLeft:'250px',marginRight:'250px',paddingLeft:'20px',paddingRight:'20px',  border: '1px solid', borderRadius:(20,20,20,20)}} >
           {this.getData()}  
     
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
  export default updateCertificate;