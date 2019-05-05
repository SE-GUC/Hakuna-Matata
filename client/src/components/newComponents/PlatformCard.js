import React, { Component } from "react";
import axios from "axios";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import IdentityCard from "./IdentityCard.js";
import CommentCard from "./CommentCard.js";
import { Card, Button, ButtonToolbar, ButtonGroup, Form, Col ,Row ,OverlayTrigger} from "react-bootstrap";
import CreatableSelect from 'react-select/lib/Creatable';
import { connect } from 'react-redux'


const colStyle = {
  paddingRight: 0, flex: '0 0 88.3%', maxWidth: ' 88.3%'
}
const colStyleBtn = {
  paddingRight: 0, flex: '0 0 85.3%', maxWidth: ' 88.3%'
}

class PlatformCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      showBtnRate: false,
      showBtnLike:false,
      masterclasses:[],
      masterclass:null,
      content:'',
      userRate:0,
      temp:[],
      btnChanged:false,
      number:0,
      number1:0,
    }
    this.onClickView = this.onClickView.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitComment = this.handleSubmitComment.bind(this)
    this.rate0=this.rate0.bind(this)
    this.rate1=this.rate1.bind(this)
    this.rate2=this.rate2.bind(this)
    this.rate3=this.rate3.bind(this)
    this.react0=this.react0.bind(this)
    this.react1=this.react1.bind(this)
    this.react2=this.react2.bind(this)
    this.react3=this.react3.bind(this)
    this.react4=this.react4.bind(this)
    this.react5=this.react5.bind(this)
    
  }
  rate0 (){
    const id=this.props.auth.user._id
    const name='Abdelrahman'
    const data={ reviewer :{ id:id,name:name}, rating:0}
  
    axios
        .put(`http://localhost:3333/courseRequests/raterecomendation/${this.props.objectId}`,data)
        .then( res=>{
          let arr=[]
          arr.push(0)
          this.setState({temp:arr})
          this.forceUpdate()
        }).catch(error => {
          console.log(error.response)

          alert(error.response)
      })  
    }
  rate1(){
    const id=this.props.auth.user._id
    const name='Abdelrahman'
    const data={ reviewer :{ id:id,name:name}, rating:1}
  
    axios
        .put(`http://localhost:3333/courseRequests/raterecomendation/${this.props.objectId}`,data)
        .then( res=>{
          let arr=[]
          arr.push(1)
          this.setState({temp:arr})
          this.forceUpdate()
        }).catch(error => {
          console.log(error.response.data)

          alert(error.response)
      })  
    }
  rate2(){
   
    const id=this.props.auth.user._id
    const name='Abdelrahman'
    const data={ reviewer :{
      id:id,name:name
    }, rating:2}
  
    console.log(this.props.objectId)
    axios
        .put(`http://localhost:3333/courseRequests/raterecomendation/${this.props.objectId}`,data)
        .then( res=>{
          let arr=[]
          arr.push(2)
          this.setState({temp:arr})
          this.forceUpdate()

        }).catch(error => {
          alert(error.response)
      })  }  
  rate3(){
    const id=this.props.auth.user._id
    const name='Abdelrahman'
    const data={ reviewer :{
      id:id,name:name
    }, rating:3}
  
    axios
        .put(`http://localhost:3333/courseRequests/raterecomendation/${this.props.objectId}`,data)
        .then( res=>{
          let arr=[]
          arr.push(3)
          this.setState({temp:arr})
          this.forceUpdate()

        }).catch(error => {
          console.log(error.response.data)

          alert(error.response)
      })  }
      react0(){
        const id=this.props.auth.user._id
        const  data={ reviewerId : id , rating:0 }
        axios
            .put(`http://localhost:3333/posts/ratePost/${this.props.objectId}`,data)
            .then( res=>{
              let arr=[]
              arr.push(0)
              this.setState({temp:arr})
              this.forceUpdate()


            }).catch(error => {
              console.log(error.response.data)
    
              alert(error.response)
          })  }
      react1(){
        const id=this.props.auth.user._id
        const  data={ reviewerId : id , rating:1 }
        axios
            .put(`http://localhost:3333/posts/ratePost/${this.props.objectId}`,data)
            .then( res=>{
              let arr=[]
              arr.push(1)
              this.setState({temp:arr})
              this.forceUpdate()


            }).catch(error => {
              console.log(error.response.data)
    
              alert(error.response)
          })  }
      react2(){
       
        const id=this.props.auth.user._id
        const  data={ reviewerId : id , rating:2 }
      
        console.log(this.props.objectId)
        axios
            .put(`http://localhost:3333/posts/ratePost/${this.props.objectId}`,data)
            .then( res=>{
              let arr=[]
              arr.push(2)
              this.setState({temp:arr})
              this.forceUpdate()

            }).catch(error => {
              console.log(error.response.data)
    
              alert(error.response)
          })  }  
      react3(){
        const id=this.props.auth.user._id
        const  data={ reviewerId : id , rating:3 }

      
        axios
            .put(`http://localhost:3333/posts/ratePost/${this.props.objectId}`,data)
            .then( res=>{
              let arr=[]
              arr.push(3)
              this.setState({temp:arr})
              this.forceUpdate()

            }).catch(error => {
              console.log(error.response.data)
    
              alert(error.response)
          })  }    
          react4(){
            const id=this.props.auth.user._id
            const  data={ reviewerId : id , rating:4 }

          
            axios
                .put(`http://localhost:3333/posts/ratePost/${this.props.objectId}`,data)
                .then( res=>{
                  let arr=[]
                  arr.push(4)
                  this.setState({temp:arr})
                  this.forceUpdate()

                }).catch(error => {
                  console.log(error.response.data)
        
                  alert(error.response)
              })  }
          react5(){
           
            const id=this.props.auth.user._id
            const  data={ reviewerId : id , rating:5 }

          
            console.log(this.props.objectId)
            axios
                .put(`http://localhost:3333/posts/ratePost/${this.props.objectId}`,data)
                .then( res=>{
                  let arr=[]
                  arr.push(5)
                  this.setState({temp:arr})
                  this.forceUpdate()

        
                }).catch(error => {
                  console.log(error.response.data)
        
                  alert(error.response)
              })  }  
  handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    if(newValue!=null) {
    if(newValue.label===newValue.value) this.setState({content: newValue.label})
    else  this.setState({masterclass:{name: newValue.label , id: newValue.value}})
  }
    console.groupEnd();
  };
  handleChangeComment = (event) => {
    this.setState({content: event.target.value})
     
   }
  handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  }
  componentDidMount() {
    let returnrdvalue = []
    const id=this.props.auth.user._id
    if (this.props.tag === 'CourseRequest'){
      axios
        .get(`http://localhost:3333/courseRequests/${this.props.objectId}`)
        .then(res => {
          if (res.data.data != null) {
            const recomendations = res.data.data.recomendations
            const userRate1 = res.data.data.ratings.map((rate)=> {
              if(rate.reviewer.id==id) return rate.rate
            })
            this.setState({number:recomendations.length})
            this.setState({number1:res.data.data.ratings.length})
            // if(userRate1 != undefined) this.setState({userRate:userRate1})
            for (let index = 0; index <3 && index < recomendations.length; index++) returnrdvalue.push(<CommentCard id={recomendations[recomendations.length-index-1].expert.id} displayedName={recomendations[recomendations.length-index-1].expert.name} content={recomendations[recomendations.length-index-1].content} masterclass={recomendations[recomendations.length-index-1].masterClass} />)
            this.setState({ comments: returnrdvalue , temp:userRate1 })
            
          }
          // this.setState({userRate:tempValue[0]})


        })
        let arr = []
        this.props.masterclasses.map((masterclass) => {
          arr.push({
            label: masterclass.name,
            value: masterclass._id
          })
        })
        this.setState({ masterclasses: arr })
      }
      if (this.props.tag === 'Post'){
        // console.log(this.props.objectId)
        axios
          .get(`http://localhost:3333/posts/${this.props.objectId}`)
          .then(res => {
            if (res.data.data != null) {
              const comments = res.data.data.comments
              const userRate1 = res.data.data.reacts.map((rate)=> {
                if(rate.member.id==id) return rate.rating
              })
              this.setState({number:comments.length})
              this.setState({number1:res.data.data.reacts.length})
              for (let index = 0; index <3 && index < comments.length; index++) returnrdvalue.push(<CommentCard id={comments[comments.length-index-1].member.id} displayedName={comments[comments.length-index-1].member.name} content={comments[comments.length-index-1].content}  />)
              this.setState({ comments: returnrdvalue  , temp:userRate1 })
            }
            this.setState({ showBtnLike: true })
  
          })
        
        }

  }
  onClickView() {
    if (this.props.type != undefined & this.props.objectId != undefined) window.location.href = `http://localhost:3000/${this.props.type}/${this.props.objectId}`
  }
  handleSubmit(){
    let data=null
    const id=this.props.auth.user._id
    if(this.state.masterclass !=null) data={ expertId:id, masterClass:this.state.masterclass}
    else data={ expertId:id, content:this.state.content}
    console.log(this.props.objectId)
    axios
        .put(`http://localhost:3333/courseRequests/giveRecomendation/${this.props.objectId}`,data)
        .then( res=>{
          const temp=this.state.comments.unshift(<h6>test</h6>)
          this.setState({comments:temp})
        }).catch(error => {
          alert(error.response)
      })
  }
  handleSubmitComment(){
    let data=null
    const id=this.props.auth.user._id
    data={ memberId:id, content:this.state.content}
    console.log(this.props.objectId)
    console.log(this.state.content)
    axios
        .put(`http://localhost:3333/posts/giveComment/${this.props.objectId}`,data)
        .then( res=>{
          const temp=this.state.comments.unshift(<h6>test</h6>)
          this.setState({comments:temp})
        }).catch(error => {
          console.log(error.response.data)
          alert(error.response.data)
      })
  }
  cousrseRequest_Post(){
    if(this.props.tag === 'CourseRequest'){
      return <div > <Form onSubmit={this.handleSubmit}> <Form.Row>
      <Col style={colStyle} >
      <CreatableSelect
        isClearable
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        options={this.state.masterclasses}
        placeholder="Type or Select your recommendation ..."
        
      />
      </Col>
      <Col>
        <Button variant="info" type="submit">Send</Button>
      </Col>
    </Form.Row>
  </Form>
  </div>
    }
    if(this.state.showBtnLike){
      return   <div >
      <Form onSubmit={this.handleSubmitComment}>
     <Row>
       <Col style={colStyleBtn} >
       <Form.Control placeholder="Type your Comment"  onChange={this.handleChangeComment}/>

       </Col>
       <Col>
         <Button variant="info" type="submit">Send</Button>
       </Col>
     </Row>
   </Form>
   </div>
    }
  }
  rate_React(){
    // console.log(this.state.showBtnRate)
    // console.log(this.state.showBtnLike)

      const popover = (
        <ButtonGroup     {...this.props}  size="lg"  >
        <Button variant="light" onClick={this.rate1}> <i className="far fa-thumbs-up"/></Button>
        <Button variant="light" onClick={this.rate2}><i className="far fa-star"/></Button>
        <Button variant="light" onClick={this.rate3}> <i className="far fa-thumbs-down"/></Button>
      </ButtonGroup>
    
      );
      const popover1 = (      
        <ButtonGroup     {...this.props}   size="lg" > 
        <Button variant="light" onClick={this.react1}> <i className="far fa-grin-hearts"/> </Button>
        <Button variant="light" onClick={this.react2}><i className="far fa-grin-tears"/></Button>
        <Button variant="light" onClick={this.react3}> <i className="far fa-laugh-wink"/></Button>
        <Button variant="light" onClick={this.react4}><i className="far fa-meh-rolling-eyes"/></Button>
        <Button variant="light" onClick={this.react5}> <i className="far fa-angry"/></Button>
      </ButtonGroup>
    
      );
    if(this.props.tag === 'CourseRequest'){
      return  <div className="d-flex flex-column" style={{ marginBottom: 5 }}>
      <ButtonGroup className="mt-3">
      <OverlayTrigger placement="top" overlay={popover}     delay={{ show: 250, hide: 800 }}>
        {this.getBtnRate()}
        </OverlayTrigger>
        <Button variant="light" >Recommend</Button>
      </ButtonGroup>
    </div>
    }
    if(this.state.showBtnLike){
      return   <div className="d-flex flex-column" style={{ marginBottom: 5 }}>
      <ButtonGroup className="mt-3">
      <OverlayTrigger placement="top" overlay={popover1}     delay={{ show: 250, hide: 800 }}>
        {this.getBtnReact()}
        </OverlayTrigger>

        <Button variant="light" >Comment</Button>
      </ButtonGroup>
    </div>
    }
  }
  getBtnReact=()=>{           
    if(this.state.temp[0] ===undefined) return <Button variant="light"  > React</Button>
    if(this.state.temp[0] ===0) return <Button variant="light"  > React</Button>
    if(this.state.temp[0] ===1) return <Button variant="light" onClick={this.react0}> <i className="far fa-grin-hearts"/> </Button>
    if(this.state.temp[0]===2) return  <Button variant="light" onClick={this.react0}><i className="far fa-grin-tears"/></Button>
    if(this.state.temp[0]===3) return  <Button variant="light" onClick={this.react0}> <i className="far fa-laugh-wink"/></Button>
    if(this.state.temp[0]===4) return   <Button variant="light" onClick={this.react0}><i className="far fa-meh-rolling-eyes"/></Button>
    if(this.state.temp[0]===5) return  <Button variant="light" onClick={this.react0}> <i className="far fa-angry"/></Button>
 }
   getBtnRate=()=>{
     console.log(this.state.temp[0])
     if(this.state.temp[0] ===undefined) return <Button variant="light"  >Rate</Button>
     if(this.state.temp[0] ===0) return <Button variant="light"  >Rate</Button>
     if(this.state.temp[0] ===1) return <Button variant="light" onClick={this.rate0} > <i className="far fa-thumbs-up"/></Button>
     if(this.state.temp[0]===2) return <Button variant="light" onClick={this.rate0} ><i className="far fa-star"/></Button>
     if(this.state.temp[0]===3) return <Button variant="light" onClick={this.rate0} ><i className="far fa-thumbs-down"/></Button>
  }

    render() {
    const btnView = this.props.tag === 'Task' || this.props.tag === 'Project' ? { display: 'block' } : { display: 'none' }
    const secondPart = (this.props.tag === 'CourseRequest')  || this.state.showBtnLike ? { display: 'block' } : { display: 'none' }
    const type = (this.props.tag === 'CourseRequest')   ? `${this.state.number} recommenation`: (this.props.tag === 'Post')   ? `${this.state.number} comment`:''
    const type1 = (this.props.tag === 'CourseRequest')   ? `${this.state.number1} rate`: (this.props.tag === 'Post')   ? `${this.state.number1} react`:''
    return (
      <div style={{ marginBottom: '13px' }}>
        <Card>
          <IdentityCard     {...this.props}
 tag={this.props.tag} date={this.props.date} id={this.props.ownerId} displayedName={this.props.displayedName} tagColor={this.props.tagColor} />
          <Card.Body>
            <Card.Text>
              {this.props.description}
            </Card.Text>
            
          </Card.Body>

          <div style={btnView}>
          
            <ButtonToolbar >
              <Button variant="light" block onClick={this.onClickView}> View </Button>
            </ButtonToolbar>
          </div>
          <div style={secondPart}>
          <div>{type1},{type}</div>
            {this.rate_React()}

            <div>
              {this.state.comments}
              {this.cousrseRequest_Post()}
            </div>
          </div>

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

export default connect(mapStateToProps,{})(PlatformCard);
// export default ;
