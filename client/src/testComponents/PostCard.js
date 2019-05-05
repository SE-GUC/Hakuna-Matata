import React, { Component } from "react";
import axios from "axios";
import { Card, Button, ButtonToolbar, Badge, Col, Nav, Row, Media, Image, Form, OverlayTrigger } from "react-bootstrap";
import Select from "react-select";
import CreatableSelect from 'react-select/lib/Creatable';
import swal from 'sweetalert';
import { connect } from 'react-redux'

import ImageSrc from '../assessments/man.jpg'
import { disconnect } from "mongoose";


class PostCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      skills: [],
      category: '',
      currTag: 'post',
      content:'',
      showCategories:false

    }
    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    if(newValue!=null) this.setState({category: newValue.label})
    console.groupEnd();
  };
  handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  }
  getCategory() {
    if (this.state.showCategories) return { display: 'block' }
    return { display: 'none' }
  }
  handleSelect(eventKey) {
    if(eventKey==='courseRequest') this.setState({showCategories:true})
    else  this.setState({showCategories:false})
    this.setState({currTag:eventKey})
  }
  componentDidMount() {
 
        let arr = []
        this.props.info.skills.map((skill) => {
          arr.push({
            label: skill.name,
            value: skill._id
          })
        })
        this.setState({ skills: arr })
 


  }
  onChange(event){
    this.setState({content:event.target.value})
  }
onClick(){
  const id=this.props.auth.user._id
  if(this.state.currTag==='post')
  axios
  .post(`http://localhost:3333/posts`,{
    content:this.state.content,
    applyingMemberId:id
  })
  .then(res =>
    swal({
        title: "Done",
        text: res.data.msg,
        icon: "success",
      })
    ).catch(e => {
        console.log(e.response)
        swal({
            title: "Error",
            text:e.response.data.error,
            icon: "error",
          })
    });
  if(this.state.currTag==='courseRequest')
  axios
  .post(`http://localhost:3333/courseRequests`,{
    description:this.state.content,
    category:this.state.category,
    applyingMemberId:id
  })
  .then(res =>
    swal({
        title: "Done",
        text: res.data.msg,
        icon: "success",
      })
    ).catch(e => {
        console.log(e.response)
        swal({
            title: "Error",
            text:e.response.data.error,
            icon: "error",
          })
    });
  if(this.state.currTag==='report')
  axios
  .put(`http://localhost:3333/consultancyAgencies/report/${id}`,{
    report:this.state.content,
  })
  .then(res =>
    swal({
        title: "Done",
        text: res.data.msg,
        icon: "success",
      })
    ).catch(e => {
        console.log(e.response)
        swal({
            title: "Error",
            text:e.response.data.error,
            icon: "error",
          })
    });
    this.setState({content:''})

}
  render() {
    return (
      <div style={{ marginBottom: '13px' }}>
        <Card border="light">
        <div style={{paddingLeft:10}}>
          <Nav variant="tabs" defaultActiveKey="/HomePage" onSelect={k => this.handleSelect(k)} >
            <Nav.Item>
              <Nav.Link eventKey="post">Post</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="courseRequest">Course Request</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="report" > Report </Nav.Link>
            </Nav.Item>
          </Nav>
          </div>
          <br />
          <Card style={{ border: 'none' }}>
            <Media>
              <div >

              </div>
              <Image src={ImageSrc} roundedCircle
                style={{
                  width: 70,
                  height: 70,
                  marginRight: 10
                }} />
              <Media.Body>
                <Form>
                  <div style={this.getCategory()}>
                  <CreatableSelect
                    isClearable
                    onChange={this.handleChange}
                    onInputChange={this.handleInputChange}
                    options={this.state.skills}
                  />
                  </div>
                  <Form.Control as="textarea" rows="3" placeholder="Write what you want "  onChange={this.onChange} name="content" value={this.state.content}style={{ border: 'none', marginTop: 4 }} /> 
                </Form>
              </Media.Body>
            </Media>

          </Card>

    <Form.Group as={Row} style={{margin:2}} >
    <Col md={9}/>
    <Col  style={{paddingLeft:89,paddingRight:5}}>
    <Button variant="info"   onClick={this.onClick}> Post</Button>
    </Col>
  </Form.Group>

        </Card>
      </div>
    )
  }
}
const mapStateToProps =(state)=>({
  auth:state.auth,
  errors:state.errors,
  info:state.info
})

export default connect(mapStateToProps,{})(PostCard);
// export default PostCard;
