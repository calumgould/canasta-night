import '../styles/Nav.css'

import React from 'react'
import { Link, useHistory } from 'react-router-dom'

const Nav = () => {
  const history = useHistory()

  return (
    <header>
      <div
        style={{
          margin: '0 auto',
          padding: '1.45rem 1.0875rem',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <h3 style={{ margin: '0 1em' }}>
          <Link to="/" className="navLink">
            HOME
          </Link>
        </h3>
        <h3 style={{ margin: '0 1em' }}>
          <Link to="/about" className="navLink">
            ABOUT
          </Link>
        </h3>
        <h3 style={{ margin: '0 1em' }}>
          <Link to="/scores" className="navLink">
            SCORES
          </Link>
        </h3>
      </div>
    </header>
  )
}

export default Nav
