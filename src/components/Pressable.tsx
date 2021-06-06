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
  <div style={style}>
    <button
      className={(bordered) ? 'pressable-bordered' : 'pressable'}
      onClick={onClick}
      type="button"
    >
      <h2>
        {children}
      </h2>
    </button>
  </div>
)

export default Pressable
