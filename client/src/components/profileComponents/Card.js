import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import female from './assessments/p.jpg';
import male from './assessments/man.jpg';

class Card extends Component {

    getProfilePic(){
        if(this.props.type%2===0) return female
        if(this.props.type%2===1) return male
        return''

    }
    render() {
        return (
            <div
                style={{ width: '10rem' }}>
                <img className="App-img" src={this.getProfilePic()}  alt="this is  here :("/>
                <div style={{
                    color: '#333'
                }}>
                    <p style={{
                        fontSize: '40 px',
                        textAlign: 'center',

                    }}>{this.props.user.fullName}</p>
                    <p>he is intrested in football and any thing else</p>
                    <Link to={{
                        pathname: `/member/${this.props.user._id}`,

                    }} >View Profile</Link>
                </div>
            </div>
        )
    }
}



export default Card