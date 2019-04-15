import React, { Component } from "react";
import axios from "axios";
import certificate from '../profileComponents/certificateIcon.jpg'

export class GetCertificate extends Component {
    state = {
      certificate:null,
     
    };
    componentDidMount() {
        const {id,certificateId}=this.props.match.params
  
            axios
          .get(`http://localhost:3333/educationalOrganizations/certificate/${id}/${certificateId}`)
          .then(res => {
            this.setState({ certificate: res.data
                
            })
           console.log(res.data)
          }
            )
        
          
    };
    
    getData(){
      if(this.state.certificate != null){
      const {
        name,
        type,
        accreditation,
      

      } = this.state.certificate;
      return <div> <p style={{ color : "#F9BB32",textAlign: "left", lineHeight:"22px", margin: "10px 0", fontSize: " 15px "}}> info </p> 
      <hr style={lineStyle}></hr>  <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> name:<font  color = "white"> {name} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> type:<font  color = "white"> {type} </font></p>
      <p style={{ color : "#A1A1A1",textAlign: "left",fontSize: " 18px "}}> accreditation:<font  color = "white"> {accreditation} </font></p>
     
     </div>
    }else{
      return 'ya mo8fl eh ele d5lk hena'
    }
    }

    render() {
      return (
        <div style={{ width: '100%' , background : "#242424",margin:'0',textAlign:"center"}} >
        
        <img className="App-img" src={certificate}   borderRadius='12px' width= "120px" margin= "20px" alt="this is  here :("/>

        <div className="getSpecRoom" style={{marginLeft:'250px',marginRight:'250px',paddingLeft:'20px',paddingRight:'20px',  border: '1px solid', borderRadius:(20,20,20,20)}} >
           {this.getData()}  
     
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
  export default GetCertificate;