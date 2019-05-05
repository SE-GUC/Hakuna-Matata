import React, { Component } from 'react';
import female from './assessments/p.jpg';
import male from './assessments/man.jpg';
import Card from './Card';
import axios from 'axios';

class CardList extends Component {
    constructor(props) {
        super(props);
    this.state = {
        users: []
      }
    }
    componentDidMount() {
      //console.log("Hello body")
      axios.get(`http://localhost:3333/members`).then(res => {
        this.setState({ users: res.data })
        console.log(this.state.users[0].fullName)
      })
    }
    getProfilePic(){
        if(this.props.type==='female') return female
        if(this.props.type==='male') return male
        return''

    }
    render() {
    
            return this.state.users.map( (user, index) => (
                <Card key={user._id} user={user} type={index}  />
              ));
        
    }
}



export default CardList