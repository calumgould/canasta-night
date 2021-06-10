import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pressable from '../components/Pressable'
import {
  HistoryProps, LocationProps, User
} from '../Types'

const Stats = ({
  history,
  location
} : {
  history: HistoryProps,
  location: LocationProps,
}) => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers: User[] = await axios.get('http://localhost:8000/users')
        .then((res) => res.data)

      setUsers(fetchedUsers)
    }
    getUsers()
  }, [])

  const showUsers = users.map((user) => (
    <Pressable
      key={user.id}
      style={{ margin: 15 }}
      onClick={() => history.push(`${location.pathname}/${user.id}`, { user })}
    >
      {user.name}
    </Pressable>
  ))

  return (
    <div style={{
      flex:          1,
      flexDirection: 'row',
      flexWrap:      'wrap',
      textAlign:     'center'
    }}
    >
      {showUsers}
    </div>
  )
}

export default Stats
