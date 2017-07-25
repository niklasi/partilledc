import React from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import { confirmPasswordReset } from '../actions'
import { Form, TextField, Button } from './Shared'

const ConfirmPasswordReset = ({auth, location, confirmPasswordReset}) => {
  let password = ''

  const handlePassword = (e, value) => {
    password = value
  }

  const handleConfirmReset = () => {
    confirmPasswordReset(location.query.oobCode, password)
  }

  return <div style={{marginLeft: '20px'}}>
          <Form onSubmit={handleConfirmReset} name={'confirm-password-reset'}>
           <a>Ange ditt nya lösenord</a>
           <br />
           <TextField type='password' label='Lösenord' onChange={handlePassword} />
           <br />
           <Button type='submit' label='Skicka' primary />
           </Form>
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
