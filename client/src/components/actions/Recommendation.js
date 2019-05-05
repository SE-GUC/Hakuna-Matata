import React, { Component } from "react";
import SecondComponent from "./RecommendationSecondComponent";

class Post extends Component {
    
    render() {
        const  {id,exprtId}  = this.props 
        return (
            <div style={{ background: "white" ,
            width:'100%' ,
                marginRight:30
            }}>
            <SecondComponent id={id} expertId={exprtId}/>
            </div>
        )
    }
}
export default Post;