import React, { Component } from "react";
import { Link } from "react-router-dom";
import KeyImagee from '../../assessments/member_icon.svg'
import MemberIcon from '../../components/profileComponents/CardPhoto';
import './ConsultancyAgency.css'
export class consultancyAgency extends Component {


  render() {
    const {
      _id,
      consultancyAgencyName,
    } = this.props.consultancyAgency;
  
  return (
      
    <div
            style={{
      position: "absoulte", paddingLeft: "1px",
      paddingRight: "1px", border: "1px solid",width:"25rem",height:"10rem", borderRadius: (2, 2, 20, 20), color: "#707070", backgroundColor:"#15161A",top: "30%"
    }}>
    <MemberIcon style={{position:"relative",left:"3px",top:'1px'}} KeyImage={KeyImagee} />
    <p style={{fontSize: '29px',
            textAlign: 'center',
            color:'#FFFFFF',
            position:'relative',
            left:'65px',
            top:'-5px'
      }}>{consultancyAgencyName}</p>
      
    <Link  to={"/consultancyAgencies/"+_id}><button className="btn btn-danger btn-sm m-2" style = {ButtonStyle}  >visit</button></Link>
 
  </div>
);
}
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
left:'200px',
top:'-10px'

} 

export default consultancyAgency;
