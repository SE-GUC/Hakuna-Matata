

import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Start from './components/auth/Start'
import StartAs from './components/auth/StartAs'
import HomePage from './components/search/HomePage'

// import StartHeader from './components/auth/StartHeader.js';
// import LoginForm from './components/LoginForm'




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      id:'',
      tags:[],
      notClose: true,
    }
    this.handleChangetoken = this.handleChangetoken.bind(this)

    //this.handleSubmit = this.handleSubmit.bind(this)
    //this.handleClickClose = this.handleClickClose.bind(this)
  }
  handleChangetoken(payload) {
    this.setState({ token:payload.token  })
    this.setState({ id :payload.id  })
    this.setState({ tags:payload.tags  })
  

  }
  render() {
    return (
      <div className="App" style={{
        background:'black'
      }}>
      {console.log('this.state.tags')}
      {console.log(this.state.id)}
      
      <Router>
      <Route exact path="/HomePage" render={() => (
            <HomePage id={this.state.id}  />
          )} />
          <Route exact path="/" render={() => (
            <Start id={this.state.id} handleChangetoken={this.handleChangetoken} />
          )} />
                    <Route exact path="/startAS" render={() => (
            <StartAs id={this.state.id} tags={this.state.tags}  />
          )} />
       
      </Router>
      </div>
    );
  }
}

export default App;
