import React, { Component } from 'react';
import Button from './Button'


export class ButtonsDynamic extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    const { tags } = this.props

    var len = tags.length;
    var r;
    switch (len) {
      case (1):
        r = <p style={{
          position: 'absolute', alignItems: 'center', left: '26.1%', justifyContent: 'center', fontSize: '30px',
          color: '#A1A1A1',
        }} ><Button style={{ backgroundColor: '#242424' }}>{tags[0]}</Button> <Button style={{ backgroundColor: '#242424' }}>New Account</Button></p>
        break;
      case (2):
        r = <p style={{
          position: 'absolute', alignItems: 'center', left: '15%', justifyContent: 'center', fontSize: '30px',
          color: '#A1A1A1',
        }} >
          <Button style={{ backgroundColor: '#242424' }}>{tags[0]}</Button>
          <Button style={{ backgroundColor: '#242424' }}>{tags[1]}</Button>
          <Button style={{ backgroundColor: '#242424' }}>New Account</Button></p>
        break;
      case (3):
        console.log(len + 'nada')
        var stylee = { backgroundColor: '#242424' }
        r = <p style={{
          position: 'absolute', left: '15%', justifyContent: 'center',
          color: '#A1A1A1', textAlign: 'center'
        }} >
          <Button style={stylee}>{tags[0]}</Button> <Button style={stylee}>{tags[1]}</Button> <Button style={stylee}>{tags[2]}</Button><br /> <Button style={stylee}>New Account</Button>

        </p>

        break;
      case (4):
        r = <p style={{
          position: 'absolute', alignItems: 'center', left: '5%', justifyContent: 'center', textAlign: 'center',
          color: '#A1A1A1',
        }} >
          <Button style={{ backgroundColor: '#242424' }}>{tags[0]}</Button> <Button style={{ backgroundColor: '#242424' }}>{tags[1]}</Button> <Button style={{ backgroundColor: '#242424' }}>{tags[2]}</Button> <Button style={{ backgroundColor: '#242424' }}>{tags[3]}</Button> <Button style={{ backgroundColor: '#242424' }}>New Account</Button></p>
        break;
      case (5):
        r = <p style={{
          position: 'absolute', alignItems: 'center', left: '5%', justifyContent: 'center', textAlign: 'center',
          color: '#A1A1A1',
        }} >
          <Button style={{ backgroundColor: '#242424' }}>{tags[0]}</Button> <Button style={{ backgroundColor: '#242424' }}>{tags[1]}</Button> <Button style={{ backgroundColor: '#242424' }}>{tags[2]}</Button>
          <Button style={{ backgroundColor: '#242424' }}>{tags[3]}</Button> <Button style={{ backgroundColor: '#242424' }}>{tags[4]}</Button> </p>
        break;
    }

    return (
      <div>
        {r}
        <br /><br />
      </div>)

  }
};


export default ButtonsDynamic;
