import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DateTime } from 'luxon'
import { useToasts } from 'react-toast-notifications'
import {
  LocationProps, Game, Round, Score, Player
} from '../Types'
import '../styles/Table.css'

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
  const { addToast } = useToasts()

  const [gameDetails, setGameDetails] = useState<Game>()

  const { game } : { game: Game } = location.state

  console.log({ game })

  useEffect(() => {
    const getDetails = async () => {
      const details: any = await axios.get(`${process.env.REACT_APP_BASE_URL}/games/${game.id}`)
        .then((res) => res.data)

      console.log({ details })

      setGameDetails(details)
    }

    getDetails()
  }, [])

  if (!gameDetails) {
    return <h1>Loading...</h1>
  }

  const playerNames = gameDetails.players.map((player) => (
    <th key={`${player.id}`}>
      {player.name}
    </th>
  ))

  const roundDetails = gameDetails.rounds.map((round) => (
    <tr key={round.id}>
      <td>
        {round.round_number}
      </td>
      <td>
        {round.dealer}
      </td>
      {round.scores.map((score) => (
        <td key={score.id}>
          {score.score}
        </td>
      ))}
      {}
    </tr>
  ))

  const addRound = async (event: any) => {
    event.preventDefault()

    const dealer = event.target[1].value
    const dealerId = gameDetails.players.find((p) => p.name === dealer)?.id

    const scores = gameDetails.players.map((player, index: number) => ({
      player_id:  player.id,
      score:      parseInt(event.target[index + 2].value, 10),
      extra_data: {
        fourRedThrees: false,
        concealed:     false
      }
    }))

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/rounds/new`, {
        game_id:      gameDetails.id,
        dealer_id:    dealerId,
        round_number: (gameDetails.rounds.length + 1),
        scores
      })

      addToast(`${response.data}`, { appearance: 'success' })
    } catch (error) {
      addToast(error?.response?.data?.error?.message, { appearance: 'error' })
    }
  }

  const newRoundRow = (
    <tr>
      <td>
        <input type="submit" value="+ New Round" form="newRoundForm" />
      </td>
      <td>
        <select
          name="dealer"
          form="newRoundForm"
          required
        >
          {gameDetails.players.map((player) => (
            <option key={player.id} value={player.name}>{player.name}</option>
          ))}
        </select>
      </td>
      {gameDetails.players.map((player) => (
        <td key={player.id}>
          <input
            type="text"
            name={player.name}
            form="newRoundForm"
            required
          />
        </td>
      ))}
    </tr>
  )

  const buildTable = (
    <table>
      <thead>
        <tr>
          <th>Round</th>
          <th>Dealer</th>
          {playerNames}
        </tr>
      </thead>
      <tbody>
        {roundDetails}
        {newRoundRow}
        <tr>
          <th colSpan={2}>Total</th>
          {gameDetails.totalScores.map((score) => (
            <td key={score.player_id}>{score.total_score}</td>
          ))}
        </tr>
      </tbody>
    </table>
  )

  return (
    <div>

      <form method="POST" id="newRoundForm" onSubmit={addRound} />

      <h1>{gameDetails.title}</h1>
      <h2>{DateTime.fromISO(gameDetails.timestamp).toLocaleString()}</h2>
      <h3>{gameDetails.id}</h3>

      {buildTable}

    </div>
  )
}

export default GameDetails
