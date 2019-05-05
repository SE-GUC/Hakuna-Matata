import React, { Component } from 'react';



export class  Data extends Component{
    constructor(props){
        super(props);
    }
    render (){
const{keyy,value}=this.props
const  keyStyle= {
    fontSize: '25px',
    color: '#A1A1A1',
    fontFamily :'Arial',
    position: 'absolute',
    left: "10%"


}

const  valueStyle= {
    fontSize: '25px',
    color: '#FFFFFF',
    fontFamily :'Arial',
    position: 'absolute',
    left:'30%'

}

return(
    <div style={{height:"1.3%"}} >
    <p style={keyStyle}>{keyy}</p>
    <p style={valueStyle}>{value}</p>
    </div>
   )
  }  };


export default Data ;
