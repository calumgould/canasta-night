import React from 'react'
import Pressable from '../components/Pressable'

const Home = () => (
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

export default Home
