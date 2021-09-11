import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DateTime } from 'luxon'
import { useToasts } from 'react-toast-notifications'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {
  LocationProps, Game, ExtraData
} from '../Types'
import '../styles/Table.css'

const GameDetails = ({
  location
} : {
  location: LocationProps
}) => {
  const { addToast } = useToasts()

  const [gameDetails, setGameDetails] = useState<Game>()
  const [extraData, setExtraData] = useState<{[key in string] : Partial<ExtraData>} | null>()

  const animatedComponents = makeAnimated()

  const { game } : { game: Game } = location.state

  const extraDataOptions = [{
    label: 'Concealed',
    value: 'concealed'
  }, {
    label: 'Four Red Threes',
    value: 'fourRedThrees'
  }]

  const extraDataAbbreviation: {[key in keyof ExtraData] : string} = {
    fourRedThrees: '4RT',
    concealed:     'C'
  }

  const getDetails = async () => {
    const details: any = await axios.get(`${process.env.REACT_APP_BASE_URL}/games/${game.id}`)
      .then((res) => res.data)

    console.log({ details })

    setGameDetails(details)
  }

  useEffect(() => {
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
        {round.roundNumber}
      </td>
      <td>
        {round.dealer}
      </td>
      {gameDetails.players.map((player) => {
        const score = (round.scores.find((entry) => entry.name === player.name))

        const extra = (Object.keys(score?.extraData!) as (keyof ExtraData)[])

        return (
          <td key={score?.id}>
            {score?.score}
            {extra.map((key) => `(${extraDataAbbreviation[key]})`)}
          </td>
        )
      })}
    </tr>
  ))

  const addRound = async (event: any) => {
    event.preventDefault()

    const dealer = event.target[1].value
    const dealerId = gameDetails.players.find((p) => p.name === dealer)?.id

    const scores = gameDetails.players.map((player, index: number) => ({
      playerId:  player.id,
      // score for each player at index after dealer
      score:     parseInt(event.target[index + 2].value, 10),
      extraData: extraData?.[player.id] || {}
    }))

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/rounds`, {
        gameId:      gameDetails.id,
        dealerId,
        roundNumber: (gameDetails.rounds.length + 1),
        scores
      })

      addToast(`${response.data}`, { appearance: 'success' })
      getDetails()
      setExtraData(null)
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
          {gameDetails.players
            .filter((player) => player.name !== gameDetails?.rounds[gameDetails?.rounds?.length - 1]?.dealer)
            .map((player) => (
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

          <label htmlFor="extraData">Extra</label>
          <Select
            isMulti
            name="extraData"
            components={animatedComponents}
            isClearable
            defaultValue={extraData}
            onChange={(selectedOptions) => {
              const data = selectedOptions?.reduce((
                acc: {[key: string] : boolean },
                curr: { label: string, value: string }
              ) => ({
                ...acc,
                [curr.value]: true
              }), {})

              setExtraData({
                ...extraData,
                [player.id]: data
              })
            }}
            options={extraDataOptions}
            styles={{
              option: (existingStyles) => ({
                ...existingStyles,
                color: 'black'
              })
            }}
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
        {gameDetails.winner ? null : newRoundRow}
        <tr>
          <th colSpan={2}>Total</th>
          {gameDetails.players.map((player) => {
            const totalScore = gameDetails.totalScores.find((entry) => entry.playerId === player.id)?.totalScore

            return (
              <td key={player.id}>
                {totalScore}
              </td>
            )
          })}
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

      {gameDetails.winner ? (
        <h1>
          {gameDetails.winner.name}
          {' '}
          wins!
        </h1>
      ) : null}

    </div>
  )
}

export default GameDetails
