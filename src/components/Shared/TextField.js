import React from 'react'
import TextField from 'material-ui/TextField'

const Input = (props) => {
    return <TextField floatingLabelText={props.label} onChange={props.onChange} />
}

export default Input
