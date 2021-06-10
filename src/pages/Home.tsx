import axios, { AxiosError } from 'axios'
import React, { FormEvent, useState } from 'react'
import { DateTime } from 'luxon'
import { useToasts } from 'react-toast-notifications'
import DatePicker from 'react-datepicker'
import Pressable from '../components/Pressable'
import { Game } from '../Types'
import 'react-datepicker/dist/react-datepicker.css'

const Home = () => {
  const { addToast } = useToasts()

  const [player, setPlayer] = useState<string>('')
  const [game, setGame] = useState<Game>({
    title:     '',
    timestamp: DateTime.now().toISO()
  })

  const createPlayer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:8000/users', {
        name:       player,
        created_at: DateTime.now().toISO()
      })
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
      addToast(response.data, { appearance: 'success' })
      // setGame({})
    } catch (error) {
      const axiosError: AxiosError = error
      addToast(axiosError?.response?.data, { appearance: 'error' })
    }
  }

  const testButtons = ['users', 'games', 'rounds'].map((table) => (
    <Pressable
      key={table}
      onClick={async () => {
        await axios.get(`http://localhost:8000/${table}`)
          .then((res) => console.log(res.data))
      }}
      style={{ marginRight: 15 }}
      bordered
    >
      {`get ${table}`.capitalizeWords()}
    </Pressable>
  ))

  return (
    <div>
      <div style={{
        flex: 1, flexDirection: 'row'
      }}
      >
        {testButtons}
      </div>

      <form onSubmit={createPlayer}>
        <label>
          Player:
          <input type="text" name="title" value={player} onChange={(e) => setPlayer(e.target.value)} />
        </label>
        <input type="submit" value="Add Player" />
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
  )
}

export default Home
