import React from 'react'
import TextField from 'material-ui/TextField'

const Input = (props) => {
  return <TextField style={props.style} type={props.type} floatingLabelText={props.label} onChange={props.onChange} />
}

export default Input
