import React, { Component } from 'react';
import Title from './Title';

export class  ColoredLine extends Component{
    constructor(props){
        super(props);
    }
    render (){
const{ title}=this.props
return(
    <div>
       <p> <Title title={title}/><br/><br/> </p>
    <hr
        style={{
            color: '#F9BB32',
            backgroundColor:'#F9BB32',
            width: '80%', 
            border: 0,
            height: 2,
            position: "absolute",
            left: "10%" , 
            blockSize:"fixed"
        }} 
    />
    </div>)
    
  }  };


export default ColoredLine ;
