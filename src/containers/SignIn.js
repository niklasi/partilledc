import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { signIn } from '../actions'

const SignIn = ({auth, signIn}) => {
  let username = ''
  let password = ''
  console.log('sign in', auth)
  const handleUsername = (e, value) => {
    username = value
  }

  const handlePassword = (e, value) => {
    password = value
  }

  const handleSignIn = () => {
    signIn(username, password)
  }

  return <div><TextField
      floatingLabelText='Epost'
      onChange={handleUsername}
    /><br />
    <TextField
      floatingLabelText='Lösenord'
      type='password'
      onChange={handlePassword}
    /><br /><FlatButton label='Logga in' primary onTouchTap={handleSignIn}/></div>
}

SignIn.propTypes = {
  signIn: React.PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const {auth} = state
  return {auth, ownProps}
}

export default connect(mapStateToProps, {signIn})(SignIn)
