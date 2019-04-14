import React, { Component } from 'react';
import SVG from 'react-inlinesvg';
export class  PhotoComponent extends Component{
    constructor(props){
        super(props);
    }
    render (){
        const{ KeyImage}=this.props

return(
    
    <div style={{  height:"20%", top:"10%" }}>
    <style>{'body { background-color:#242424; }'}</style>
    <br></br>
    <SVG src={KeyImage} style={{position: "relative" ,left:"45.3%"}}/>
    </div>
   )
  }  };


export default PhotoComponent ;
