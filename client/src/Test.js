import React, { Component } from "react";
import axios from "axios";
import { Card, Button, ButtonToolbar, Badge, Col, Nav, Row, Media, Image, Form, OverlayTrigger } from "react-bootstrap";
import Select from "react-select";
import CreatableSelect from 'react-select/lib/Creatable';
import swal from 'sweetalert';

import ImageSrc from './assessments/man.jpg'
import { disconnect } from "mongoose";


class CommentCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      skills: [],
      category: '',
      currTag: 'post',
      content:'',
      showCategories:false

    }
    this.onClickView = this.onClickView.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    this.setState({category: newValue.label})
    console.groupEnd();
  };
  handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  }
  onClickView() {
    if (this.props.type != undefined & this.props.id != undefined) window.location.href = `http://localhost:3000/${this.props.type}/${this.props.objectId}`
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
    axios.get(`http://localhost:3333/skills`)
    .then(res => {
        let arr = []
        res.data.data .map((skill) => {
          arr.push({
            label: skill.name,
            value: skill._id
          })
        })
        this.setState({ skills: arr })
    }).catch(error => {
        alert(error)
    })


  }
  onChange(event){
    this.setState({content:event.target.value})
  }
onClick(){
  const id='5cac402553d4b1157fc7e226'
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
    <Col md={11}/>
    <Col  style={{paddingLeft:62,paddingRight:5}}>
    <Button variant="info" size="lg"  onClick={this.onClick}> Post</Button>
    </Col>
  </Form.Group>

        </Card>
      </div>
    )
  }
}
export default CommentCard;
