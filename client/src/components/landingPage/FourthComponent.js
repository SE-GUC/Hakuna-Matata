import React, { Component } from "react";
import { InputGroup, FormControl,Button,Row} from "react-bootstrap";
import './FourthComponent.css'
class FourthComponent extends Component {
    render() {
      return (
        <Row style={{background:'white'}}>
        <FormControl
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          bsPrefix="Form-control"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary">Button</Button>
        </InputGroup.Append>
      </Row>
      )
    }
}
export default FourthComponent;