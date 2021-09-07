import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pressable from '../components/Pressable'
import {
  HistoryProps, LocationProps, Player
} from '../Types'

const Stats = ({
  history,
  location
} : {
  history: HistoryProps,
  location: LocationProps,
}) => {
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    const getPlayers = async () => {
      const fetchedPlayers: Player[] = await axios.get(`${process.env.REACT_APP_BASE_URL}/players`)
        .then((res) => res.data)

      setPlayers(fetchedPlayers)
    }
    getPlayers()
  }, [])

  const showPlayers = players.map((p) => (
    <Pressable
      key={p.id}
      style={{ margin: 15 }}
      onClick={() => history.push(`${location.pathname}/${p.id}`, { p })}
    >
      {p.name}
    </Pressable>
  ))

  return (
    <div style={{
      flex:          1,
      flexDirection: 'row',
      flexWrap:      'wrap',
      textAlign:     'center'
    }}
    >
      {showPlayers}
    </div>
  )
}

export default Stats
