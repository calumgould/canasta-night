import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Pressable from '../components/Pressable'

const Home = () => {
  const history = useHistory()

  return (
    <div>
      <Pressable
        onClick={async () => {
          await fetch('http://localhost:8000/users')
            .then((res) => res.json())
            .then((users) => console.log(users))
        }}
        bordered
      >
        Get Users
      </Pressable>
    </div>
  )
}

export default Home
