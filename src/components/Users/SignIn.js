import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { signIn } from '../../actions'
import { Form, TextField, Button } from '../Shared'

const SignIn = ({ auth, signIn }) => {
  let username = ''
  let password = ''

  const handleUsername = (e, value) => {
    username = value
  }

  const handlePassword = (e, value) => {
    password = value
  }

  const handleSignIn = () => {
    signIn(username, password)
  }

  return (
    <Form onSubmit={handleSignIn} name='sign-in'>
      <div className='w-full flex flex-col items-center'>
        <div className='w-11/12 md:w-8/12'>
          <TextField label='Epost' style={{ width: '100%' }} onChange={handleUsername} />
        </div>
        <div className='w-11/12 md:w-8/12'>
          <TextField label='Lösenord' type='password' style={{ width: '100%' }} onChange={handlePassword} />
        </div>
        <Button type='submit' label='Logga in' primary />
        <div className='my-3.5'>
          <Link to='/reset-password'>
            <Button href='/reset-password' labelStyle={{ fontSize: '10px' }} label='Problem att logga in?' secondary />
          </Link>
        </div>
      </div>
    </Form>
  )
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps, { signIn })(SignIn)
