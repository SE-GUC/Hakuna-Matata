import React, { Component } from 'react';
import axios from 'axios'
import '../../bootstrap.css'
import { Card } from 'react-bootstrap'
import HistoryCard from './HistoryCard';
import History from './save.png'
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    }
  }
  componentDidMount() {
    // const id=store.get('payload').id
    console.log('here')
    const handle = '5cb30836830d0d0496cbe505'
    axios
      .get(`http://localhost:3333/users/history/${handle}/`)
      .then(res => this.setState({ history: res.data.data }))


  }
  getHistory() {
    let array = []
    this.state.history.map((history) => (
      array.push(<HistoryCard key={history._id} history={history} ></HistoryCard>)


    ))
    return array
  }
  render() {
    console.log('here')
    return (
      <div style={{
        backgroundColor: "#e5e8e8"
      }}>

        <div
          style={{ position: 'absolute', right: '400px' }} >
          <Card bsPrefix='Card' style={{ width: '800px', height: '80px', fontSize: '50px', borderRadius: '5px' }}>
            <Card.Img style={{ width: '80px', position: 'absolute', top: '-3px', right: '500px' }} src={History}></Card.Img>
            <Card.Body>
              <Card.Text style={{ position: 'absolute', right: '220px', top: '-3px', backgroundColor: 'transparent' }}>
                History
    </Card.Text>
            </Card.Body>
          </Card><br></br>
          {this.getHistory()}


        </div>
      </div>
    )
  }

}

export default LoginForm;
