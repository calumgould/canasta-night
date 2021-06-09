import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import { DateTime } from 'luxon'
import Pressable from '../components/Pressable'
import { Game } from '../Types'

const Home = () => {
  const [player, setPlayer] = useState<string>('')
  const [game, setGame] = useState<Game>()

  const createPlayer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:8000/users', {
        name: player,
        created_at: Math.floor(DateTime.now().toSeconds())
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const createGame = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:8000/games', {
        timestamp: Math.floor(DateTime.now().toSeconds()),
        title: game?.title
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div style={{
        flex: 1, flexDirection: 'row'
      }}
      >
        <Pressable
          onClick={async () => {
            await axios.get('http://localhost:8000/users')
              .then((res) => res.data)
              .then((users) => console.log(users))
          }}
          style={{ marginRight: 15 }}
          bordered
        >
          Get Users
        </Pressable>

        <Pressable
          onClick={async () => {
            await axios.get('http://localhost:8000/games')
              .then((res) => res.data)
              .then((games) => console.log(games))
          }}
          bordered
        >
          Get Games
        </Pressable>

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
          <input type="text" name="title" onChange={(e) => setGame({ ...game, title: e.target.value })} />
        </label>
        <input type="submit" value="Create Game" />
      </form>
    </div>
  )
}

export default Home
