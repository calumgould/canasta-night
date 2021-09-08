import React from 'react'
import { DateTime } from 'luxon'
import { LocationProps, Player } from '../Types'

const PlayerDetails = ({
  location
} : {
  location: LocationProps
}) => {
  const { player } : { player: Player } = location.state

  return (
    <div>
      <h1>{player.name}</h1>
      <h2>{DateTime.fromISO(player.createdAt).toLocaleString()}</h2>
      <h3>{player.id}</h3>
    </div>
  )
}

export default PlayerDetails
