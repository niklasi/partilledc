import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { registerUser } from '../actions'

const RegisterUser = ({registerUser}) => {
  let username = ''
  let password = ''

  const handleUsername = (e, value) => {
    username = value
  }

  const handlePassword = (e, value) => {
    password = value
  }

  const handleSignIn = () => {
    registerUser(username, password)
  }

  return <div style={{marginLeft: '20px'}}>
           <TextField floatingLabelText='Epost' onChange={handleUsername} />
           <br />
           <TextField floatingLabelText='Lösenord' type='password' onChange={handlePassword} />
           <br />
           <FlatButton label='Skapa konto' primary onTouchTap={handleSignIn} />
         </div>
}

RegisterUser.propTypes = {
  registerUser: React.PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {ownProps}
}

export default connect(mapStateToProps, {registerUser})(RegisterUser)
