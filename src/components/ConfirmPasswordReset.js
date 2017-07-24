import React from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { confirmPasswordReset } from '../actions'

const ConfirmPasswordReset = ({auth, location, confirmPasswordReset}) => {
  let password = ''

  const handlePassword = (e, value) => {
    password = value
  }

  const handleConfirmReset = () => {
    console.log(location.query.oobCode)
    confirmPasswordReset(location.query.oobCode, password)
  }

  return <div style={{marginLeft: '20px'}}>
           <a>Ange ditt nya lösenord</a>
           <br />
           <TextField type='password' floatingLabelText='Lösenord' onChange={handlePassword} />
           <br />
           <FlatButton label='Skicka' primary onTouchTap={handleConfirmReset} />
         </div>
}

ConfirmPasswordReset.propTypes = {
  confirmPasswordReset: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const {auth} = state
  return {auth, ownProps}
}

export default connect(mapStateToProps, {confirmPasswordReset})(ConfirmPasswordReset)
