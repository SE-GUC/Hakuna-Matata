import React, { Component } from 'react';
import Button from './Button';


export class  CurvedButton extends Component{
    
    constructor(props){
        super(props);
    }
   

    render (){
        const {leftt,title}=this.props;
       
return(
   <Button style={{
    textAlign: 'center',
    fontSize: '15px',
    borderRadius:'30pt',
    width:"10%",
    height:'0.5%',
    backgroundColor: '#242424',
    borderColor: '#A1A1A1',
    color: '#FFFFFF',
    fontFamily :'Arial',
    position: 'absolute',
    verticalAlign: 'middle',

   
    right: leftt

    }}><div style ={{verticalAlign: 'middle'}}>{title}</div></Button>)
    
  }  };


export default CurvedButton ;
