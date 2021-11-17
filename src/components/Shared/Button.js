import React from 'react'
import FlatButton from 'material-ui/FlatButton'

const Button = (props) => {
  return (
    <FlatButton
      type={props.type}
      fullWidth={props.fullWidth}
      label={props.label}
      primary={props.primary}
      secondary={props.secondary}
      disabled={props.disabled}
    />
  )
}

export default Button
