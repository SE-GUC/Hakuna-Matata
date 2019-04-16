import React, { Component } from "react";
import { Link } from "react-router-dom";
import KeyImagee from '../../assessments/member_icon.svg'
import MemberIcon from '../../components/profileComponents/CardPhoto';
export class Member extends Component {
  getStyle = () => {
    return {
      background:  "#15161a",
      padding: "5px" ,
      borderBottom: "1px #ccc dotted" ,
      border : "thin solid #FFFFFF" ,
      borderRadius : 25 ,
  
    };
  };

  render() {
    const {
      _id,
      memberFullName,
      skills
    } = this.props.member;

  let rskills ="";
    if(skills != null){
for(let i=0 ; i<skills.length ; i++ ){
      rskills += skills[i].name
    if((i+1)<skills.length){
      rskills += " | "
    }
    }}
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
        }}>{memberFullName}</p>
        <p style={{fontSize: '15px',
              textAlign: 'center',
              color:'#FFFFFF',
              position:'relative',
              left:'65px',
              top:'-30px'}}>
        {rskills}</p>
      <Link  to={"/member/"+_id}><button className="btn btn-danger btn-sm m-2" style = {ButtonStyle}  >visit</button></Link>
   
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


export default Member;
