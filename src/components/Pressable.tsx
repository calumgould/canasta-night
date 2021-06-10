import React, { CSSProperties, ReactChild } from 'react'
import '../styles/components.css'

const Pressable = ({
  onClick,
  style,
  children,
  bordered = false,
  disabled
} : {
  onClick: () => void
  style?: CSSProperties
  children: ReactChild
  bordered?: boolean
  disabled?: boolean
}) => (
  <button
    className={(bordered) ? 'pressable-bordered' : 'pressable'}
    style={{ ...style, opacity: disabled ? 0.5 : 1 }}
    onClick={onClick}
    type="button"
    disabled={disabled}
  >
    <h2>
      {children}
    </h2>
  </button>
)

export default Pressable
