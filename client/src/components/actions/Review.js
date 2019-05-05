import React, { Component } from 'react'
import { Link } from "react-router-dom";
export class Skill extends Component {
           
            render() {
              console.log(this.props.slot)
            return (
              <div style={{ background: "white" }}>
           <p>
               <Link
            to={'/users/'+this.props.review.reviewers.id}
            style={{ color: "black" }}
          >
            {this.props.review.reviewers.name}
          </Link>
          <p style={{textAlign:'right'}} >
          {this.props.review.comments.name}
         
                
                </p>
                </p> 
              </div>
            )
          }
        }
        


export default Skill