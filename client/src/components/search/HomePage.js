

import React, { Component } from 'react';

class HomeePage extends Component {


  render() {

return (
  <div>
<h2> Arrive</h2>
<h1> {console.log(this.props.id)}</h1>
</div>
    );
  }
}

export default HomeePage;
