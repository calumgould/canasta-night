import axios from 'axios'
import { DateTime } from 'luxon'
import React, { useEffect, useState } from 'react'
import { LocationProps, Game } from '../Types'

/*
    [{
        id: number
        timestamp: number
        title: string
        players: string[]
        rounds: [{
            round: number
            dealer: string
            scores: [{
                player: string
                score: number
                extra_data: {
                    concealed: boolean
                    fourRedThrees: boolean
                }
            }]
        }]
    }]
*/

const GameDetails = ({
  location
} : {
  location: LocationProps
}) => {
  const { game } : { game: Game } = location.state

  const [gameDetails, setGameDetails] = useState<any>()

  useEffect(() => {
    const getDetails = async () => {
      const scores = await axios.get(`http://localhost:8000/games/scores/${game.id}`)
        .then((res) => res.data)

      const rounds = await axios.get(`http://localhost:8000/games/rounds/${game.id}`)
        .then((res) => res.data)

      const mappedRounds = rounds.map((round: any) => {
        const filteredScores = scores.filter((score: any) => score.round_id === round.id)
        return {
          id: round.id,
          dealer_id: round.dealer_id,
          round_number: round.round_number,
          scores: filteredScores
        }
      })

      const players = await axios.get(`http://localhost:8000/games/users/${game.id}`)
        .then((res) => res.data.map((player: { name: string }) => player.name))

      const fullDetails = {
        ...game,
        players,
        rounds: mappedRounds
      }

      console.log({ fullDetails })

      setGameDetails(fullDetails)
    }

    getDetails()
  }, [])

  if (!gameDetails) {
    return <h1>Loading...</h1>
  }

  const playerNames = gameDetails.players.map((player: string) => (
    <h4>{player}</h4>
  ))

  const roundDetails = gameDetails.rounds.map((round: any) => (
    <div style={{ paddingTop: 15, paddingBottom: 15 }}>
      <h4>
        Round Number:
        {' '}
        {round.round_number}
      </h4>
      <h3>Scores</h3>
      {round.scores.map((score: any) => (
        <h4>
          {score.name}
          {' '}
          :
          {' '}
          {score.score}
        </h4>
      ))}
    </div>
  ))

  return (
    <div>
      <h1>{gameDetails.title}</h1>
      <h2>{DateTime.fromISO(gameDetails.timestamp).toLocaleString()}</h2>
      <h3>{gameDetails.id}</h3>
      <div style={{ paddingTop: 15, paddingBottom: 15 }}>
        <h3>Players:</h3>
        {playerNames}
      </div>
      {roundDetails}
    </div>
  )
}

export default GameDetails
