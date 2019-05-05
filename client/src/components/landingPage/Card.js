import React, { Component } from "react";
import FirstComponent from "./FirstComponent";
import SecondComponent from "./SecondComponent";
import ThirdComponent from "./ThirdComponent";
import FourthComponent from"../actions/Recommendation";
import { Container, Col, Row } from "react-bootstrap";
var store = require("store");

class Card extends Component {
  state = {
    boolean: true
  };
  get() {
    if (this.props.type === "CourseRequest" || this.props.type === "Post") {
      return <FourthComponent id={this.props.objectId} expertId={store.get('payload').id} />;
    } else {
      return;
    }
  }
  getData(){
    if(this.props.type==='Event'|| this.props.type==='Report'){
      return  ;
    }
    else{
      return  <ThirdComponent type={this.props.type} id={this.props.objectId} memberId={this.props.id}/>;
    }
  }
  render() {
    return (
      <Container
        style={{
          backgroundColor: '#e5e8e8',
          padding:'3px',
          backgroundSize: "cover"
        }}
      >
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div>
              <FirstComponent
                name={this.props.name}
                date={this.props.date}
                tag={this.props.type}
                id={this.props.id}
                memberId={this.props.memberId}
                rec={this.props.rec}
              />
              <SecondComponent data={this.props.description} />
              {this.getData()}
              {this.get()}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Card;
