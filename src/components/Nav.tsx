import '../styles/Nav.css'

import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => (
  <header>
    <div
      style={{
        margin:         '0 auto',
        padding:        '1.45rem 1.0875rem',
        display:        'flex',
        flexDirection:  'row',
        alignItems:     'center',
        justifyContent: 'center'
      }}
    >
      <h3 style={{ margin: '0 1em' }}>
        <Link to="/" className="navLink">
          Home
        </Link>
      </h3>
      <h3 style={{ margin: '0 1em' }}>
        <Link to="/stats" className="navLink">
          Stats
        </Link>
      </h3>
      <h3 style={{ margin: '0 1em' }}>
        <Link to="/games" className="navLink">
          Games
        </Link>
      </h3>
    </div>
  </header>
)

export default Nav
