import React, { CSSProperties, ReactChild } from 'react'
import '../styles/components.css'

const Pressable = ({
  onClick,
  style,
  children,
  bordered = false
} : {
    onClick: () => void
    style?: CSSProperties
    children: ReactChild
    bordered?: boolean
}) => (
  <button
    className={(bordered) ? 'pressable-bordered' : 'pressable'}
    style={style}
    onClick={onClick}
    type="button"
  >
    <h2>
      {children}
    </h2>
  </button>
)

export default Pressable
