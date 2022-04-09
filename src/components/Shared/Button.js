import React from 'react'
import { overrideTailwindClasses as tailwindOverride } from 'tailwind-override'

const Button = (props) => {
  return (
    <button type={props.type} disabled={props.disabled} className={tailwindOverride(`${props.secondary ? 'text-secondary' : 'text-primary'} disabled:opacity-50 text-sm uppercase p-2 hover:bg-gray-100 disabled:hover:bg-inherit ${props.className ?? ''}`)}>
      {props.label}
    </button>
  )
}

export default Button
