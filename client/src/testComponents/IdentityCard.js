import React from "react";
import { Link } from 'react-router-dom';
import { Card, Image, Media, Badge,Button } from "react-bootstrap";
import ImageSrc from '../assessments/man.jpg'
function IdentityCard(props) {
    let show =props.updated ? <Button variant="dark" onClick={props.onClick}> <i class="far fa-edit"></i></Button>:props.tag
    console.log(props.updated )
    return (
        <div>
            <Card border="light">
                <Media>
                    <Image src={ImageSrc} roundedCircle
                        style={{
                            width: 100,
                            height: 100
                        }} />
                    <Media.Body>
                        <br />
                        <h5><Link to={`/users/${props.ownerPath}`} style={{ color: "#3192a0" ,marginLeft:5 }} >{props.displayedName}</Link>
                            <Badge style={{
                                position: 'absolute',
                                right: '2px'
                            }} variant={props.tagColor}>{show}</Badge>
                            </h5>
  
                    </Media.Body>
                </Media>
            </Card>
        </div>
    );
}
export default IdentityCard;
