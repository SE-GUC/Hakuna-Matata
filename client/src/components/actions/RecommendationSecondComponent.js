import React, { Component } from "react";
import { Form,Button} from "react-bootstrap";
import "./RecommendationSecondComponent.css";
import axios from "axios";
var store = require("store");

class PostSecondComponent extends Component {
  state={
    content:null
  }
   handleClick() {
  
    const  {id,expertId}  = this.props 
    const data = {
      expertId:store.get("payload").id,
      content:this.state.content
    };

    console.log(data)
    console.log(id)
     axios.put(
      `http://localhost:3333/courseRequests/giveRecomendation/${id}`,
      data
    ).then(res=>{
      console.log(res)
      alert(res.data)
    }
    ).catch(e => {
      console.log(e)
      alert(e);
    })
    


}
  contentChange = event => {
    this.setState({ content: event.target.value });
  };
  render() {
    return (
      <div style={{textAlign:"right"}}>
      <Form.Control  onChange={this.contentChange}   defaultValue="write something here .." />
      <Button variant="light"  onClick={this.handleClick.bind(this)} active>
    Post
  </Button>
      </div>
    );
  }
}

export default PostSecondComponent;
