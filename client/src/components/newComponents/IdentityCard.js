import React from "react";
import { Link } from 'react-router-dom';
import { Card, Image, Media, Badge } from "react-bootstrap";
import Moment from 'react-moment';
import ImageSrc from '../../assessments/man.jpg';
function IdentityCard(props) {
    return (
        <div>
            <Card style={{margin:0}}>
                <Media>
                    <Image src={ImageSrc} roundedCircle
                        style={{
                            width: 90,
                            height: 90
                        }} />
                    <Media.Body>
                        <br />
                        <h5><Link to={`/users/${props.id}`} style={{ color: "#3192a0" ,marginLeft:5 }} >{props.displayedName}</Link>
                            <Badge style={{
                                position: 'absolute',
                                right: '2px'
                            }} variant={props.tagColor}>{props.tag}</Badge>
                        </h5>
                        <p style={{ marginLeft:4 }}>
                        <Moment format="MMMM DD, YYYY">
                        {props.date}
            </Moment></p>
                    </Media.Body>
                </Media>
            </Card>
        </div>
    );
}
export default IdentityCard;
