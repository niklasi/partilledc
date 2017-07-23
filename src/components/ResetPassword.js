import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { resetPassword } from '../actions'

const ResetPassword = ({auth, resetPassword}) => {
  let email = ''

  const handleEmail = (e, value) => {
    email = value
  }

  const handleReset = () => {
    resetPassword(email)
  }

  return <div style={{marginLeft: '20px'}}>
           <a>Skicka instruktioner som beskriver hur du återställer ditt lösenord.</a>
           <br />
           <TextField floatingLabelText='Epost' onChange={handleEmail} />
           <br />
           <FlatButton label='Skicka' primary onTouchTap={handleReset} />
         </div>
}

ResetPassword.propTypes = {
  resetPassword: React.PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const {auth} = state
  return {auth, ownProps}
}

export default connect(mapStateToProps, {resetPassword})(ResetPassword)
