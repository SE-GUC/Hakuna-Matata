import React, { Component } from 'react';
import {getUser} from './userdata'
function Test(props){
    return(
        
        <div>
  {console.log("in testtt "+ getUser())}
  
        <h1 style={{
            color:'white'
        }}>Test</h1>
        </div>
    )
}
export default Test