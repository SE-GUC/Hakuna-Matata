import React, { Component } from 'react';

export class  Data extends Component{
    constructor(props){
        super(props);
    }
    render (){
        const{review,reviewer,topp}=this.props
        var  reviewStyle= {
            fontSize: '29px',
            color: '#FFFFFF',
            fontFamily :'Arial',
            position: 'relative',
            textAlign: 'left'
        
        }
  
      
        var  reviewerStyle= {
            fontSize: '30px',
            color: '#A1A1A1',
            fontFamily :'Arial',
            position: "relative",
            textAlign: 'right'

        }


return(
    <div style={{width:"55.1%",marginLeft:"25%"}}>
<p style={reviewStyle}>{review}</p>
<p style={reviewerStyle}>{reviewer}</p><br/>
    </div>
   )
  }  



};


export default Data ;
