import React, { Component } from 'react';
import CoWorkingSpace from './CoWorkingSpace'
class CoWorkingSpaces extends Component{
    get() {
        return ( this.props.coWorkingSpaces.map((coWorkingSpace) =>(
          <CoWorkingSpace key ={coWorkingSpace._id} coWorkingSpace={coWorkingSpace} />
         )));
       }
       render(){
        return(
          <div className="grid-container">
          { this.get()}
          </div>
          )
      }
     
}
export default CoWorkingSpaces