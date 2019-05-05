import React, { Component } from "react";
import axios from "axios";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import PlatformCard from "../newComponents/PlatformCard";
import PostCard from "../../testComponents/PostCard";
import { Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
// import classnames from 'classnames'
// import { loginUser } from '../../actions/authActions'

class HomePage extends Component {
  state = {
    items: [],
    recommended: [],
    loaded: false,
    loaded2: false,
    masterclasses:[]
  };

  componentDidMount() {
    const id=this.props.auth.user._id
    axios
      .get(`http://localhost:3333/users/platform/${id}`)
      .then(res => {
        this.setState({ items: res.data });
        this.setState({ loaded: true });
        // console.log(res.data)
      });
    axios
      .get(`http://localhost:3333/users/${id}`)
      .then(res => {
        this.setState({ recommended: res.data.data.recomended });
        this.setState({ loaded2: true });
      })

        this.setState({ masterclasses: this.props.info.masterclass});
    
  }
  getRecommended() {
    var shownData = [];
    // console.log(this.state.recommended)
    if (this.state.loaded2)
      this.state.recommended.map(post => {
        if (post.owner) {
          // console.log(post)

          shownData.unshift(
            <PlatformCard 
              displayedName={post.owner.name}
              date={post.date}
              tag={post.type === 'postRequest' ? 'Post' : post.type}
              type={post.type==='Task' ? 'tasks':(post.type==='Project'? 'projects': undefined)}
              description={post.data.name}
              ownerId={post.owner.id}
              objectId={post.data !=null? post.data.id:undefined}
              tagColor='warning'
              masterclasses={post.type==='CourseRequest'?this.state.masterclasses :undefined}

            />
          );

        }
      });
    return shownData;
  }
  getPlatform() {
    var shownData = [];
    if (this.state.loaded) {
      this.state.items.map(post => {
        // console.log(post)

        shownData.unshift(
          <PlatformCard 
            displayedName={post.owner.name}
            date={post.date}
            tag={post.type === 'postRequest' ? 'Post' : post.type}
            type={post.type==='Task' ? 'tasks':(post.type==='Project'? 'projects': undefined)}
            description={post.data !=null? post.data.name:post.description}
            ownerId={post.owner.id}
            objectId={post.data !=null? post.data.id:undefined}
            tagColor='dark'
            masterclasses={post.type==='CourseRequest'?this.state.masterclasses :undefined}

          />
        )
        shownData.push(<br />)
      });
      return shownData;
    } else {
      return <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>;
    }
  }
  render() {
    return (
      <div style={{backgroundColor: "#2e2e2e",backgroundSize: "cover",}}>
        <div style={{
          margin: '0 auto',
          width: '40%'
        }}>
        <PostCard/>
          <div >{this.getRecommended()}</div>
          <div>{this.getPlatform()}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps =(state)=>({
  auth:state.auth,
  errors:state.errors,
  info:state.info

})

export default connect(mapStateToProps,{})(HomePage);

