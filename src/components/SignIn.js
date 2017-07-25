import React from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { signIn } from '../actions'
import { Form, TextField, Button } from './Shared'

const SignIn = ({auth, signIn}) => {
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
    <div style={{marginLeft: '20px'}}>
    <Form onSubmit={handleSignIn} name={'sign-in'}>
    <TextField label='Epost' onChange={handleUsername} />
    <br />
    <TextField label='Lösenord' type='password' onChange={handlePassword} />
    <br />
    <Button type='submit' label='Logga in' primary />
    <br />
    </Form>
    <Link to='/reset-password'> Problem att logga in?
    </Link>
    </div>
  )
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const {auth} = state
  return {auth, ownProps}
}

export default connect(mapStateToProps, {signIn})(SignIn)
