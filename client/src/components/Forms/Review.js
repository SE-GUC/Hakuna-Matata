import React, { Component } from 'react'

export class Review extends Component {
    getStyle = () =>{
        return{
            background : '#242424',
            pading : '10px',
             testAlign:'left'
        }
          }
           
            render() {
            return (
              <div style={this.getStyle()}>
                <p style ={{color :"white", textAlign: "left" , fontSize :'18px'}}>{this.props.review.reviewers.name}<span style ={{color :"white", float: "right" , fontSize :'18px'}}>{this.props.review.comments.name}</span>
                
                </p>
               
              </div>
            )
          }
        }
        


export default Review