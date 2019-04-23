import React, { Component } from "react";
import { Form,Button} from "react-bootstrap";
import "./PostSecondComponent.css";
class PostSecondComponent extends Component {
  render() {
    return (
      <div style={{textAlign:"right"}}>
      <Form.Control as="textarea" rows="5"  bsPrefix='Form-control' defaultValue="write something here .." />
      <Button variant="primary" size="lg" active>
    Post
  </Button>
      </div>
    );
  }
}

export default PostSecondComponent;
