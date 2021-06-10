import axios, { AxiosError } from 'axios'
import React, { FormEvent, useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import { useToasts } from 'react-toast-notifications'
import DatePicker from 'react-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import Pressable from '../components/Pressable'
import {
  Game, HistoryProps, LocationProps, User
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

  const initialGameState = {
    title:     '',
    timestamp: DateTime.now().toISO(),
    players:   []
  }

  const [player, setPlayer] = useState<string>('')
  const [game, setGame] = useState<Game>(initialGameState)
  const [showNewGame, setShowNewGame] = useState<boolean>(false)

  const [users, setUsers] = useState<User[]>([])

  const getUsers = async () => {
    const fetchedUsers: User[] = await axios.get('http://localhost:8000/users')
      .then((res) => res.data)

    setUsers(fetchedUsers)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const createPlayer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:8000/users', {
        name:       player,
        created_at: DateTime.now().toISO()
      })
      getUsers()
      addToast(response.data, { appearance: 'success' })
      setPlayer('')
    } catch (error) {
      const axiosError: AxiosError = error
      addToast(axiosError?.response?.data, { appearance: 'error' })
    }
  }

  const createGame = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:8000/games', {
        timestamp: game?.timestamp || DateTime.now().toISO(),
        title:     game?.title
      })
      addToast(`Successfully created game: ${response.data[0].title}`, { appearance: 'success' })
      setGame({ ...game, ...response.data[0] })
    } catch (error) {
      const axiosError: AxiosError = error
      addToast(axiosError?.response?.data, { appearance: 'error' })
    }
  }

  const showUsers = users.map((user) => (
    <Pressable
      key={user.id}
      style={{ margin: 15 }}
      bordered={!game.players.includes(user)}
      onClick={() => setGame({ ...game, players: [...game.players, user ] })}
    >
      {user.name}
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
              setGame(initialGameState)
              setShowNewGame(false)
            }}
          />

          <h2>
            Choose Players
          </h2>

          {showUsers}

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
              <input type="text" name="title" value={game?.title} onChange={(e) => setGame({ ...game, title: e.target.value })} />
            </label>
            <label>
              Date:
              <DatePicker
                selected={DateTime.fromISO(game.timestamp).toJSDate()}
                onChange={(date: Date) => setGame({ ...game, timestamp: DateTime.fromJSDate(date).toISO() })}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                locale="en-GB"
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
