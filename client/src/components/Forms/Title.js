import React, { Component } from 'react';
const  Style= {
    fontSize: '25px',
    color: '#F9BB32',
    fontFamily :'Arial',
    position: 'absolute',
    left: '10%',

}


export class  Title extends Component{
    constructor(props){
        super(props);
    }
    render (){
const{title}=this.props
return(
    <div>
<p style={Style}>{title}</p>
    </div>
   )
  }  



};


export default Title ;
