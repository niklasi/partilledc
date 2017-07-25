import React from 'react'
import TextField from 'material-ui/TextField'

const Input = (props) => {
    return <TextField style={props.style} floatingLabelText={props.label} onChange={props.onChange} />
}

export default Input
