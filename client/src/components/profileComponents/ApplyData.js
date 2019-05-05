import React, { Component } from 'react';

import CurvedButton from './CurvedButton'


export class  ApplyData extends Component{
    constructor(props){
        super(props);
    }
    render (){
const{data}=this.props

        
const  dataStyle= {
    fontSize: '25px',
    color: '#FFFFFF',
    fontFamily :'Arial',
    position: 'absolute',
   left: "10%"

}


return(
    <div  > 
    <CurvedButton title={'apply'} leftt={'10%'}/>
    <p style={dataStyle}>{data}</p><br/><br/>
    
    </div>
   )
  }  };


export default ApplyData ;
