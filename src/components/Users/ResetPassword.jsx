import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { resetPassword } from '../../actions'
import { Form, TextField, Button } from '../Shared'

const ResetPassword = ({ auth, resetPassword }) => {
  let email = ''

  const handleEmail = (e, value) => {
    email = value
  }

  const handleReset = () => {
    resetPassword(email)
  }

  return (
    <Form onSubmit={handleReset} name='handle-reset'>
      <div className='w-full flex flex-col items-center'>
        <div className='w-11/12 md:w-8/12'>
          <TextField label='Epost' style={{ width: '100%' }} onChange={handleEmail} />
        </div>
        <Button type='submit' label='Återställ lösenord' primary />
      </div>
    </Form>
  )
}

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { auth } = state
  return { auth, ownProps }
}

export default connect(mapStateToProps, { resetPassword })(ResetPassword)
