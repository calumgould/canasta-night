import React, { ChangeEvent } from 'react'

const TextInput = ({
  type = 'text',
  name = '',
  title = '',
  value = '',
  placeholder = '',
  onChange
} : {
  type?: string
  name?: string
  title?: string
  value?: string
  placeholder?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}) => (
  <label>
    {title}
    <input
      className="text-input"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </label>
)

export default TextInput
