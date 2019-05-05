import React, { Component } from 'react'

export class Skill extends Component {
           
            render() {
              console.log(this.props.skill)
            return (
              <div style={{ background: "white" }}>
                <p>{this.props.skill.name}
                
                </p>
               
              </div>
            )
          }
        }
        


export default Skill