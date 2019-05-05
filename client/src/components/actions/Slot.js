import React, { Component } from 'react'

export class Skill extends Component {
           
            render() {
              console.log(this.props.slot)
            return (
              <div style={{ background: "white" }}>
                <p>{this.props.slot}
                
                </p>
               
              </div>
            )
          }
        }
        


export default Skill