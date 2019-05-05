


import React from "react";
import { Link } from 'react-router-dom';
import { Card, Image, Media, Container,Col } from "react-bootstrap";
import Moment from 'react-moment';
import ImageSrc from '../../assessments/man.jpg';
function CommentCard(props) {
    let comment= props.masterclass!=undefined ?<Link to={`/users/${props.masterclass.id}`} style={{ color: "#3192a0" ,marginLeft:5 }} >{props.masterclass.name}</Link> : props.content
    return (
        <div className="d-flex flex-column">
        <Media>
                    <Image src={ImageSrc} roundedCircle
                        style={{
                            width: 40,
                            height: 40
                        }} />
                   
                        <br />
                        <Container border='none' style={{paddingLeft:0}}>
                     <Col style={{paddingLeft:0}}>  <Link to={`/users/${props.id}`} style={{ color: "#3192a0" ,marginLeft:5 }} >{props.displayedName}</Link></Col> 
                        <Col style={{paddingLeft:5}}>   { comment}</Col>
                        </Container>
                    
                   
                </Media>
        </div>
    );
}
export default CommentCard;
