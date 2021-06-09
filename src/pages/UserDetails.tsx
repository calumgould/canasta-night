import { DateTime } from 'luxon'
import React from 'react'
import { LocationProps, User } from '../Types'

const UserDetails = ({
  location
} : {
  location: LocationProps
}) => {
  const { user } : { user: User } = location.state

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>{DateTime.fromISO(user.created_at).toLocaleString()}</h2>
      <h3>{user.id}</h3>
    </div>
  )
}

export default UserDetails
