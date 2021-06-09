import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pressable from '../components/Pressable'
import {
  Game,
  HistoryProps,
  LocationProps
} from '../Types'

const Games = ({
  history,
  location
} : {
  history: HistoryProps,
  location: LocationProps,
}) => {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    const getGames = async () => {
      const fetchedGames: Game[] = await axios.get('http://localhost:8000/games')
        .then((res) => res.data)

      setGames(fetchedGames)
    }
    getGames()
  }, [])

  const showGames = games.map((game) => (
    <Pressable
      key={game.id}
      style={{ margin: 15 }}
      onClick={() => history.push(`${location.pathname}/${game.id}`, { game })}
    >
      {game.title}
    </Pressable>
  ))

  return (
    <div style={{
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      textAlign: 'center'
    }}
    >
      {showGames}
    </div>
  )
}

export default Games
