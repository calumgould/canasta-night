import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const Error = () => (
  <div
    style={{
      flex: 1,
      textAlign: 'center'
    }}
  >
    <FontAwesomeIcon
      icon={faExclamationTriangle}
      size="5x"
      color="orange"
    />
    <h1 style={{ paddingTop: 20 }}>
      404 Page not found
    </h1>
  </div>
)

export default Error
