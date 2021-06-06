import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Pressable from '../components/Pressable'

const Home = () => {
  const history = useHistory()

  return (
    <div>
      <Pressable
        onClick={() => console.log('pressed')}
        bordered
      >
        Test
      </Pressable>
    </div>
  )
}

export default Home
