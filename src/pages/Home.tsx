import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import { DateTime } from 'luxon'
import Pressable from '../components/Pressable'
import { Game } from '../Types'

const Home = () => {
  const [player, setPlayer] = useState<string>('')
  const [game, setGame] = useState<Partial<Game>>()

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
          <input type="text" name="title" onChange={(e) => setGame({ ...game, title: e.target.value })} />
        </label>
        <input type="submit" value="Create Game" />
      </form>
    </div>
  )
}

export default Home
