import React from 'react'
import {
  Route, BrowserRouter as Router, Switch
} from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Error from './pages/Error'
import Stats from './pages/Stats'
import PlayerDetails from './pages/PlayerDetails'
import Games from './pages/Games'
import GameDetails from './pages/GameDetails'

const App = () => (
  <Router>
    <Nav />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/stats/:id" component={(props: any) => <PlayerDetails {...props} />} />
      <Route path="/stats" component={Stats} />
      <Route path="/games/:id" component={GameDetails} />
      <Route path="/games" component={Games} />
      <Route component={Error} />
    </Switch>
  </Router>
)

export default App
