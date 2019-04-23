import React, { Component } from "react";
import { Form,Button} from "react-bootstrap";
import "./RecommendationSecondComponent.css";
import axios from "axios";
class PostSecondComponent extends Component {
  state={
    content:null
  }
  async handleClick() {
    const  {id,expertId}  = this.props 
    const data = {
      expertId:expertId,
      content:this.state.content
    };
    console.log(data)
    await axios.put(
      `http://localhost:3333/courseRequests/giveRecomendation/${id}`,
      data
    ).catch(e => {
      alert("error ");
    })
    .then(alert("Done: "));
  }
  contentChange = event => {
    this.setState({ content: event.target.value });
  };
  render() {
    return (
      <div style={{textAlign:"right"}}>
      <Form.Control as="textarea" rows="5" onChange={this.contentChange}  bsPrefix='Form-control' defaultValue="write something here .." />
      <Button variant="primary" size="lg" onClick={this.handleClick.bind(this)} active>
    Post
  </Button>
      </div>
    );
  }
}

export default PostSecondComponent;
