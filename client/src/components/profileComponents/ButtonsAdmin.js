import React, { Component } from 'react';
import Button from './Button'
export class  ButtonsAdmin extends Component{
    
    render (){

return(
    <div style={{  height:"5.787%", }}>
    <style>{'body { background-color:#242424; }'}</style>
   <p style={{ position:'absolute',alignItems: 'center', left: '25.5%', justifyContent: 'center', fontSize: '30px',
    color: '#A1A1A1',}} >
    <Button style={{backgroundColor:'#940000'}}>Delete Account</Button> | <Button style={{backgroundColor:'#F9BB32'}}>Chat</Button></p>
    </div>
    
   )
  }  };


export default ButtonsAdmin;