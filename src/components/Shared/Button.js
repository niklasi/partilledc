import React from 'react'
import FlatButton from 'material-ui/FlatButton'

const Button = (props) => {
  return <FlatButton type={props.type} label={props.label} primary={props.primary} />
}

export default Button
