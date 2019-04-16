import React, { Component } from 'react';
import SVG from 'react-inlinesvg';
export class  PhotoComponent extends Component{
    constructor(props){
        super(props);
    }
    render (){
        const{ KeyImage}=this.props

return(
    
    <div style={{  height:"1%", top:"1px" }}>
    <style>{'body { background-color:#242424; }'}</style>
    <br></br>
    <SVG src={KeyImage} style={{position: "relative" ,left:"5%",top:"1px"}}/>
    </div>
   )
  }  };


export default PhotoComponent ;
