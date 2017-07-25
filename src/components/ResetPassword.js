import React from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import { resetPassword } from '../actions'
import { Form, TextField, Button } from './Shared'

const ResetPassword = ({auth, resetPassword}) => {
  let email = ''

  const handleEmail = (e, value) => {
    email = value
  }

  const handleReset = () => {
    resetPassword(email)
  }

  return <div style={{marginLeft: '20px'}}>
           <Form onSubmit={handleReset} name={'handle-reset'}>
           <a>Skicka instruktioner som beskriver hur du återställer ditt lösenord.</a>
           <br />
           <TextField label='Epost' onChange={handleEmail} />
           <br />
           <Button type='submit' label='Skicka' primary />
           </Form>
         </div>
}

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const {auth} = state
  return {auth, ownProps}
}

export default connect(mapStateToProps, {resetPassword})(ResetPassword)
