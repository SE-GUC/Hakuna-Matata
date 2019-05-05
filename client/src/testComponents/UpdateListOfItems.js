import React ,{Component} from "react";
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
class ListOfItems extends Component {
  constructor(props){
super(props);
this.state={
 items:[],
}
}
componentDidMount(){
  console.log('agine')
  let items=[]
  if(this.props.type==='skills')
  this.props.items.map(item => {
    items.push(<Container style={{marginBottom:7,marginTop:0,marginLeft:2,marginRight:0 ,padding:0}} fluid>
           <Row>  <Col  sm={8} style={{ marginRight:159,}}><p  style={itemStyle}> {item.name}  </p></Col>
              <Col style={buttonColStyle} sm={0}> <Button size='sm' style={{border:'none',color:'red' ,background:'white'}} onClick={this.onClickDelete.bind(this, item.name)}> X </Button></Col></Row>
         </Container>)
         
  })
  else
  if(this.props.type==='tasks')
    this.props.items.map((item)=>{{
      items.push(<Container style={{marginBottom:7,marginTop:0,marginLeft:2,marginRight:0 ,padding:0}} fluid>
      <Row>  <Col  sm={7} style={{ marginRight:125}}><Link to={`/${this.props.type}/${item.id}`} style={itemLinkStyle}>{item.name}  </Link> </Col> </Row>
      </Container>
      );
      }})

  this.setState({items:items})
}
temp(){
  let items=[]
  this.props.items.map(item => {
    items.push(<Container style={{marginBottom:7,marginTop:0,marginLeft:2,marginRight:0 ,padding:0}} fluid>
           <Row>  <Col  sm={8} style={{ marginRight:159,}}><p  style={itemStyle}> {item.name}  </p></Col>
              <Col style={buttonColStyle} sm={0}> <Button size='sm' style={{border:'none',color:'red' ,background:'white'}} onClick={this.onClickDelete.bind(this, item.name)}> X </Button></Col></Row>
         </Container>)
         
  });
  console.log('items')
  return items
}

onClickDelete(name){
  const temp =this.state.items.filter(skill=> skill.name!=name)
  this.setState({items:temp})
  this.props.onClickSkillDelete(name)
}
returnedComponent(){

}
  render(){ 
 if(this.props.items.length==this.state.items.length)
  return (
  
    <div  style={{marginBottom:0,marginTop:0}}>
      <Card style={{border:'none'}}  >
      <Container style={{marginBottom:7,marginTop:0,marginLeft:2,marginRight:0 ,padding:0}} fluid>
      <Row><Col  sm={8} style={{ marginRight:140}}>  <Card.Title>{this.props.title}</Card.Title></Col> 
      <Col style={buttonColStyle} sm={0}> <Button size='sm' variant='secondary' style={{border:'none'}} onClick={this.props.onClickAdd}> Add {this.props.buttonName} </Button></Col>
       </Row>
          </Container>
              {this.state.items}
              {this.props.newSkills}
      </Card>
    </div>
  );
  return (

    <div  style={{marginBottom:0,marginTop:0}}>
          <Card style={{border:'none'}}  >
      <Container style={{marginBottom:7,marginTop:0,marginLeft:2,marginRight:0 ,padding:0}} fluid>
      <Row><Col  sm={8} style={{ marginRight:140}}>  <Card.Title>{this.props.title}</Card.Title></Col> 
      <Col style={buttonColStyle} sm={0}> <Button size='sm' variant='secondary' style={{border:'none'}} onClick={this.props.onClickAdd}> Add {this.props.buttonName} </Button></Col>
       </Row>
          </Container>
          {this.temp()}
          {this.props.newSkills}    
      </Card>
    </div>
  );
}
}
export default ListOfItems;
