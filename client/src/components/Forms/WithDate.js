import React, { Component } from 'react';

export class  WithDate extends Component{
    constructor(props){
        super(props);
    }
    render (){
const{value,datee}=this.props
const  valueStyle= {

    fontSize: '30px',
    color: '#FFFFFF',
    fontFamily :'Arial',
    position: 'absolute',
    left: '10%'


}

const  dateeStyle= {
    fontSize: '30px',
    color: '#A1A1A1',
    fontFamily :'Arial',
    position: 'absolute',
    right: '10%'

}


return(
    <div style={{  width:"55.1%",height:"1.736%"}}  >
   <p> <p style={valueStyle}>{value}</p>
    <p style={dateeStyle}>{datee}</p> </p> <br/> <br/>
    </div>
   )
  }  };


export default WithDate ;
