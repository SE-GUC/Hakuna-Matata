import React, { Component } from "react";
import {Row} from "react-bootstrap";
class SecondComponent extends Component {
    render() {
      return (
        <Row style={{height:100,background:'white'}}>
          <p>
             {this.props.data}
          </p>
          </Row>
      )
    }
}

export default SecondComponent;