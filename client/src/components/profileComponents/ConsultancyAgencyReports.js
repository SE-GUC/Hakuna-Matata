import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export class ConsultancyAgencyReports extends Component {
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
                <p style ={{color :"white", textAlign: "left" , fontSize :'18px'}}>{this.props.report.info}<span style ={{color :"white", float: "right" , fontSize :'18px'}}>{this.props.report.postDate}</span>
                
                </p>
               
              </div>
            )
          }
        }
        const ButotnStyle = {
          backgroundColor:'#242424',
            color :'white',
            testAlign:'center',
            pading:'15px 32px',
            borderRadius:'12px',
            float :'right',
            fontSize:'18px'
        
        }


export default ConsultancyAgencyReports