import React, { Component } from "react";
import FirstComponent from "./RecommendationFirstComponent";
import SecondComponent from "./RecommendationSecondComponent";

class Post extends Component {
    
    render() {
        const  {id,exprtId}  = this.props.match.params 
        return (
            <div style={{ background: "#e5e8e8" ,minHeight: '100vh'}}>
            <FirstComponent/>
            <br/>
            <SecondComponent id={id} expertId={exprtId}/>
            </div>
        )
    }
}
export default Post;