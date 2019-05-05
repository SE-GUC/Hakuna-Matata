import React, { Component } from "react";
import { Image, Badge, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./FirstComponent.css";
class FirstComponent extends Component {
  get() {
    if (this.props.rec === "true") {
      return (
        <div style={{ position: "absolute", left: "80%", width: 250 }}>
          <Row>
            <Badge bsPrefix="Badge" style={{ color: "gold" }}>
              #
            </Badge>
            <p style={{ color: "gold" }}>{this.props.tag}</p>
          </Row>
        </div>
      );
    } else {
      return (
        <div style={{ position: "absolute", left: "80%", width: 250 }}>
          <Row>
            <Badge bsPrefix="Badge">#</Badge>
            <p>{this.props.tag}</p>
          </Row>
        </div>
      );
    }
  }
  render() {
    return (
      <Row style={{ background: "white" }}>
        <div>
          <Image
            src={require("../../assessments/man.jpg")}
            width="60px"
            height="60px"
            roundedCircle
          />
        </div>
        <div>
          <Link to={`/user/${this.props.id}`} style={{ color: "black" }}>
            {this.props.name}
          </Link>
          <p>{this.props.date}</p>
        </div>
        {this.get()}
      </Row>
    );
  }
}

export default FirstComponent;
