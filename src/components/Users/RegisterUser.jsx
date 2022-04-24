import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../../actions'
import { Form, TextField, Button } from '../Shared'

const RegisterUser = ({ registerUser }) => {
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

  return (
    <Form onSubmit={handleRegisterUser} name='register-user'>
      <div className='w-full flex flex-col items-center'>
        <div className='w-11/12 md:w-8/12'>
          <TextField label='Epost' style={{ width: '100%' }} onChange={handleUsername} />
        </div>
        <div className='w-11/12 md:w-8/12'>
          <TextField label='Lösenord' style={{ width: '100%' }} type='password' onChange={handlePassword} />
        </div>
        <Button type='submit' label='Skapa konto' primary />
      </div>
    </Form>
  )
}

RegisterUser.propTypes = {
  registerUser: PropTypes.func.isRequired
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps, { registerUser })(RegisterUser)
