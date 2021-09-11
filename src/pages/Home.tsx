import axios from 'axios'
import React, { FormEvent, useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import { useToasts } from 'react-toast-notifications'
import DatePicker from 'react-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import Pressable from '../components/Pressable'
import {
  HistoryProps, LocationProps, Player
} from '../Types'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/components.css'
import TextInput from '../components/TextInput'

const Home = ({
  history,
  location
} : {
  history: HistoryProps
  location: LocationProps
}) => {
  const { addToast } = useToasts()

  const [player, setPlayer] = useState<string>('')
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([])
  const [selectedTime, setSelectedTime] = useState<DateTime>(DateTime.now())
  const [showNewGame, setShowNewGame] = useState<boolean>(false)

  const [players, setPlayers] = useState<Player[]>([])

  const getPlayers = async () => {
    const fetchedPlayers: Player[] = await axios.get(`${process.env.REACT_APP_BASE_URL}/players`)
      .then((res) => res.data)

    setPlayers(fetchedPlayers)
  }

  useEffect(() => {
    getPlayers()
  }, [])

  const createPlayer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/players`, {
        name:      player,
        createdAt: DateTime.now().toISO()
      })
      getPlayers()

      addToast(`Added player: ${player}`, { appearance: 'success' })

      setPlayer('')
    } catch (error) {
      addToast(error?.response?.data?.error?.message, { appearance: 'error' })
    }
  }

  const createGame = async (event: any) => {
    event.preventDefault()

    const title = event.target[0].value
    const playerIds = selectedPlayers.map((p) => p.id)

    try {
      if (selectedPlayers.length < 2) {
        throw new Error('A game must have at least 2 players')
      }

      await axios.post(`${process.env.REACT_APP_BASE_URL}/games`, {
        title,
        timestamp:  selectedTime?.toISO() || DateTime.now().toISO(),
        playerIds
      })

      addToast(`Created game: ${title}`, { appearance: 'success' })
      setSelectedPlayers([])
      setSelectedTime(DateTime.now())
    } catch (error) {
      addToast(error?.response?.data?.error?.message || error?.message, { appearance: 'error' })
      setSelectedPlayers([])
    }
  }

  const showPlayers = players.map((p) => (
    <Pressable
      key={p.id}
      style={{ margin: 15 }}
      bordered={!selectedPlayers.includes(p)}
      onClick={() => {
        const alreadySelected = selectedPlayers.find((selected) => selected.id === p.id)

        if (alreadySelected) {
          const filteredPlayers = selectedPlayers.filter((selected) => selected.id !== alreadySelected.id)

          setSelectedPlayers(filteredPlayers)
        } else {
          setSelectedPlayers([...selectedPlayers, p])
        }
      }}
    >
      {p.name}
    </Pressable>
  ))

  return (
    <div>
      <div style={{ textAlign: 'center', paddingTop: 20 }}>
        <Pressable
          onClick={() => setShowNewGame(true)}
          disabled={showNewGame}
        >
          New Game
        </Pressable>
      </div>

      {showNewGame ? (
        <div style={{
          margin:       20,
          padding:      50,
          borderStyle:  'solid',
          borderWidth:  3,
          borderRadius: 20,
          borderColor:  'yellowgreen',
          position:     'relative',
          textAlign:    'center'
        }}
        >
          <FontAwesomeIcon
            icon={faTimesCircle}
            size="1x"
            color="yellowgreen"
            style={{ position: 'absolute', top: 20, right: 20 }}
            className="pressable-icon"
            onClick={() => {
              setPlayer('')
              setShowNewGame(false)
            }}
          />

          <h2>
            Choose Players
          </h2>

          {showPlayers}

          <form onSubmit={createPlayer} style={{ paddingBottom: 20 }}>
            <TextInput
              name="title"
              value={player}
              onChange={(e) => setPlayer(e.target.value)}
              placeholder="Create new player"
            />
            <input type="submit" value="Create" />
          </form>

          <form onSubmit={createGame}>
            <label>
              Title:
              <input type="text" name="title" />
            </label>
            <label>
              Date:
              <DatePicker
                selected={selectedTime.toJSDate()}
                onChange={(date: Date) => setSelectedTime(DateTime.fromJSDate(date))}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                onFocus={(e) => e.target.blur()}
              />
            </label>
            <input type="submit" value="Create Game" />
          </form>
        </div>
      ) : null}
    </div>
  )
}

export default Home
