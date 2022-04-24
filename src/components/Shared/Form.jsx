import React from 'react'

const Form = (props) => {
  const onSubmit = (evt) => {
    evt.preventDefault()
    if (props.onSubmit) props.onSubmit()
  }

  return (
    <div>
      <form onSubmit={onSubmit} name={props.name}>
        {props.children}
      </form>
    </div>
  )
}

export default Form
