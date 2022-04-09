import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { confirmPasswordReset } from '../../actions'
import { Form, TextField, Button } from '../Shared'

const ConfirmPasswordReset = ({ auth, location, confirmPasswordReset }) => {
  let password = ''

  const handlePassword = (e, value) => {
    password = value
  }

  const handleConfirmReset = () => {
    confirmPasswordReset(location.query.oobCode, password)
  }

  return (
    <Form onSubmit={handleConfirmReset} name='confirm-password-reset'>
      <div className='w-full flex flex-col items-center'>
        <div className='w-11/12 md:w-8/12'>
          <TextField type='password' label='Nytt lösenord' style={{ width: '100%' }} onChange={handlePassword} />
        </div>
        <Button type='submit' label='Uppdatera' primary />
      </div>
    </Form>
  )
}

ConfirmPasswordReset.propTypes = {
  confirmPasswordReset: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { auth } = state
  return { auth, ownProps }
}

export default connect(mapStateToProps, { confirmPasswordReset })(ConfirmPasswordReset)
