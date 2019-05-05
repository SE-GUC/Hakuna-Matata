import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import {Card} from "react-bootstrap";

class ShowAllTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tasks:[]
        }
      }
    componentDidMount(){
        axios
        .get(`http://localhost:3333/consultancyAgencies`)
        .then(res => this.setState({ tasks: res.data.data }))
    }
    getRow(){
        let returnedData=[]
        let array=this.state.tasks
    for(let x=0 ;x<array.length;x++){
      returnedData.push(
        <Card>
        <Card.Body>
          <Card.Title>{array[x].consultancyAgencyName}</Card.Title>
          <div style={{
            position:'absolute',
            right:10
          }}>
          <Link to={`/users/${array[x]._id}`} style={{ color: "black" }}>
          View
          </Link>
          </div>
        </Card.Body>
        <br></br>
        <Card.Footer>
          <small className="text-muted">Last updated {array[x].date}</small>
        </Card.Footer>
      </Card>
      )
      }
      return  returnedData
      }
  render() {
    return (
<Card>
<Card.Header>

  </Card.Header>
  <Card.Body>
  {
    this.getRow()
  }
  
  </Card.Body>
</Card>
    );
  }
}
export default ShowAllTask;
