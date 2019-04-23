import React, { Component } from "react";
import axios from "axios";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Card from "./Card.js";
import Post from "../landingPage/Post";
var store = require("store");

export class HomePage extends Component {
  state = {
    partners: [],
    recommended: [],
    loaded: false,
    loaded2:false,
  };

  componentDidMount() {
    axios
      .get(`http://localhost:3333/users/platform/${store.get("payload").id}`)
      .then(res => {
        this.setState({ partners: res.data });
        this.setState({ loaded: true });
        console.log(res.data)
      });
    axios
      .get(`http://localhost:3333/users/${store.get("payload").id}`)
      .then(res => {
        this.setState({ recommended: res.data.data.recomended });
        this.setState({ loaded2: true });
      })
  }
  getRecommended() {
    var shownData = [];
    if (this.state.loaded2&&this.state.recommended)
      this.state.recommended.map(post => {
        shownData.push(
          <Card
            name={post.owner.name}
            date={post.date}
            type={post.type === "postRequest" ? "Post" : post.type}
            description={post.description}
            id={post.owner.id}
            objectId={post.data.id}
            rec="true"
          />
        );
      });
    return shownData;
  }
  getPlatform() {
    var shownData = [];
    if (this.state.loaded)
      this.state.partners.map(post => {
        shownData.push(
          <Card
            name={post.owner.name}
            date={post.date}
            type={post.type === "postRequest" ? "Post" : post.type}
            description={post.description}
            id={post.owner.id}
            objectId={post.data.id}
            rec="false"
          />
        );
      });
    return shownData;
  }
  render() {
    return (
      <div
        style={{
          backgroundColor: "#e5e8e8",
          backgroundSize: "cover"
        }}
      >
      <Post/>
      <div>{this.getRecommended()}</div>
        <div>{this.getPlatform()}</div>
      </div>
    );
  }
}
export default HomePage;
