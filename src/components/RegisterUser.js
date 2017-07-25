import React from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import { registerUser } from '../actions'
import { Form, TextField, Button } from './Shared'

const RegisterUser = ({registerUser}) => {
  let username = ''
  let password = ''

  const handleUsername = (e, value) => {
    username = value
  }

  const handlePassword = (e, value) => {
    password = value
  }

  const handleRegisterUser = (evt) => {
    registerUser(username, password)
  }

  return <div style={{marginLeft: '20px'}}>
    <Form onSubmit={handleRegisterUser} name={'register-user'}>
    <TextField label='Epost' onChange={handleUsername} />
    <br />
    <TextField label='Lösenord' type='password' onChange={handlePassword} />
    <br />
    <Button type='submit' label='Skapa konto' primary />
    </Form>
    </div>
}

RegisterUser.propTypes = {
  registerUser: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {ownProps}
}

export default connect(mapStateToProps, {registerUser})(RegisterUser)
