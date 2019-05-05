import React from "react";
import { Link } from 'react-router-dom';
import { Card ,Container,Row,Col,Button} from "react-bootstrap";

 const itemStyle={
  marginBottom:10,marginTop:10, color: '#6c757d'
 }
 
const itemLinkStyle={ 
  marginBottom:10,marginTop:10, color: "#3192a0"
}

const buttonColStyle={
  marginRight:3, padding:0
}

function ListOfItems(props) {
  const items= props.items.map((item)=>{{
    if(item.id){
      if(props.type!=='tasks'&&props.type!=='courses' &&props.onClick!= undefined)
      return(<Container style={{marginBottom:7,marginTop:0,marginLeft:2,marginRight:0 ,padding:0}} fluid>
      <Row>  <Col  sm={7} style={{ marginRight:125}}><Link to={`/${props.type}/${item.id}`} style={itemLinkStyle}>{item.name}  </Link> </Col>
      <Col style={buttonColStyle} sm={0}> <Button size='sm' variant='dark' onClick={()=>props.onClick(item.id,true)}> Accept</Button> </Col>
      <Col style={buttonColStyle} sm={0}> <Button size='sm' variant='danger' onClick={()=>props.onClick(item.id,false)} > Reject </Button> </Col> </Row>
      </Container>
      );
      return(<Container style={{marginBottom:7,marginTop:0,marginLeft:2,marginRight:0 ,padding:0}} fluid>
        <Row>  <Col  sm={7} style={{ marginRight:125}}><Link to={`/${props.type}/${item.id}`} style={itemLinkStyle}>{item.name}  </Link> </Col></Row>
        </Container>
        );
    }
      return (<Container style={{marginBottom:7,marginTop:0,marginLeft:2,marginRight:0 ,padding:0}} fluid>
      <Row>  <Col  sm={7} style={{ marginRight:125}}><p  style={itemStyle}> {item.name}</p></Col> </Row>
      </Container>)
   
  }})
  if(props.items.length>0)
  return (
  
    <div  style={{marginBottom:0,marginTop:0}}>
      <Card style={{border:'none'}}  >
          <Card.Title>{props.title}</Card.Title>
              {items}
      </Card>
    </div>
  );
  return (
  
    <div  style={{marginBottom:0,marginTop:0}}>
    </div>
  );
}
export default ListOfItems;
