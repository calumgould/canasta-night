import './styles/App.css'
import React from 'react'
import {
  Route, BrowserRouter as Router, Switch
} from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Error from './pages/Error'
import Stats from './pages/Stats'
import UserDetails from './pages/UserDetails'
import { User } from './Types'

export default function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/stats/:id" component={(props: any) => <UserDetails {...props} />} />
        <Route path="/stats" component={Stats} />
        <Route component={Error} />
      </Switch>
    </Router>
  )
}
