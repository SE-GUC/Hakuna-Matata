import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";  
import {ButtonGroup,Form} from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { Button } from "@material-ui/core";
var store = require("store");

const styles = theme => ({
    dropdown: {
      color: "black",
      selectarrowcolor: "green",
      padding: "4px 200px",
      width: 800
    },
    root: {
      padding: "4px 200px",
      display: "flex"
    },
    Radio: {
      width: 0,
      height: 0,
      background: "#e5e8e8",
      color: "#e5e8e8",
      "&$checked": {
        background: "grey",
        color: "grey"
      }
    },
    checked: {},
    root1: {
      width: 400
    },
  
    cssLabel: {
      color: "gray"
    },
  
    cssOutlinedInput: {
      color: "white"
    }
  });

class Post extends Component {
  constructor(props){
    super(props)
      this.state={
        experienceLevels: [
            { label: 0, value: 0 },
            { label: 1, value: 1 },
            { label: 2, value: 2 },
            { label: 3, value: 3 },
            { label: 4, value: 4 },
            { label: 5, value: 5 }
          ],  
          educator:null ,
          skills:[],
          courseRequest:false,
          post:true,
          event:false,
          report:false,
          description:''


      }
      this.handleEvent=this.handleEvent.bind(this)
      this.handlePost=this.handlePost.bind(this)
      this.handleRequest=this.handleRequest.bind(this)
      this.handleReport=this.handleReport.bind(this)
      this.handleSubmit=this.handleSubmit.bind(this)
      this.handleChange=this.handleChange.bind(this)
      
    }
      componentDidMount(){

          this.setState({ skills: this.props.info.skills })
          this.getDateInfo()
       
      }
      getDateInfo(){
        let arr=[]
        this.state.skills.map((skill)=>{
          arr.push({
            label:skill.name,
            value:skill._id
          })
        })
        this.setState({experienceLevels:arr})
        console.log(this.state.experienceLevels)

      }
      getCategory(){
        if(this.state.courseRequest){
        return {
          display:'block'
        }
        
      }
        return {
          display:'none'
        }

      }

      educatorChange = event => {
        this.setState({ educator: event.value });
      };  
      handleChange(event){
        this.setState({ description: event.target.value });
        console.log(this.state.description)

      }
      handleReport(){
        this.setState({event:false})
        this.setState({courseRequest:false})
        this.setState({post:false})
        this.setState({report:true})

      }
      handleEvent(){
        this.setState({event:true})
        this.setState({courseRequest:false})
        this.setState({post:false})
        this.setState({report:false})

      }
      handlePost(){
        this.setState({event:false})
        this.setState({courseRequest:false})
        this.setState({post:true})
        this.setState({report:false})
      }
      handleRequest(){
        this.setState({event:false})
        this.setState({courseRequest:true})
        this.setState({post:false})
        this.setState({report:false})

      }
      handleSubmit(){
        console.log('here')
        if(this.state.report){
          axios
          .put(`http://localhost:3333/consultancyAgencies/report/${store.get("payload").id}`,{
            report:this.state.description,
          })
          .then(res => {
            alert('Done')
          }).catch(error=>{
            alert(error)
          })
        
        }else{
          if(this.state.courseRequest){
            console.log(store.get("payload").id)
            console.log(this.state.description)
            console.log(this.state.educator)
            axios
            .post(`http://localhost:3333/courseRequests`,{
              description:this.state.description,
              category:this.state.educator,
              applyingMemberId:store.get("payload").id
            })
            .then(res => {
              alert('Done')
            }).catch(error=>{
              alert(error)
            })
          }else{
            if(this.state.post){
              axios
              .post(`http://localhost:3333/posts`,{
                description:this.state.description,
                applyingMemberId:store.get("payload").id
              })
              .then(res => {

                alert('Done')
              })
            }else{
              if(this.state.event){
                axios
                .put(`http://localhost:3333/consultancyAgencies/event/${store.get("payload").id}`,{
                  name:this.state.description,
                })
                .then(res => {
                  alert('Done')
                }).catch(error=>{
                  alert(error)
                })
              
              }
            }
          }

        }
      }
    render() {
        const {classes}=this.props
        return (
            
            <div style={{ background: "#e5e8e8" }}>

<div style={{ background: "white" , marginLeft:"550px", marginRight:"550px",marginTop:"20px" }}>

<Form>
<ButtonGroup size="lg">
    <Button  onClick={this.handleEvent}>Event</Button>
    <Button onClick={this.handlePost}>Post</Button>
    <Button onClick={this.handleRequest}>Request</Button>
    <Button onClick={this.handleReport}>Report</Button>
  </ButtonGroup>
        <br/>
<div style={this.getCategory()}>
<Form.Label>Select catagroy</Form.Label>
    <Select 
          onChange={this.educatorChange}
          icon={classes.dropdownIndicator}
          options={this.state.experienceLevels}
        />
</div>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="3" onChange={this.handleChange} name="description"  value={this.state.description} />
   
  </Form.Group>
  <div style={{
    textAlign:"right"
  }}>
  <Button variant="primary "  onClick={this.handleSubmit} style={{backgroundColor:'#e5e8e8'}}>
    Post
  </Button>
  </div>
</Form>
</div>
            </div>
        )
    }
}

export default withStyles(styles)(Post);