

import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>Lirtenhub</h1>
      <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/profile">profile</Link>
    </header>
  )
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '5px'
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none'
}

export default Header;