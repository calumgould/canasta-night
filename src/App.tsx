import './styles/App.css'
import React from 'react'
import {
  Route, BrowserRouter as Router, Switch
} from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Error from './pages/Error'

export default function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </Router>
  )
}
