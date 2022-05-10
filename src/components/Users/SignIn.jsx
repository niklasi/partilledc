import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { signIn } from '../../actions'
import { Form, TextField, Button } from '../Shared'

const SignIn = ({ auth, signIn }) => {
  let username = ''
  let password = ''

  const handleUsername = (e) => {
    username = e.target.value
  }

  const handlePassword = (e) => {
    password = e.target.value
  }

  const handleSignIn = () => {
    signIn(username, password)
  }

  return (
    <Form onSubmit={handleSignIn} name='sign-in'>
      <div className='w-full flex flex-col items-center'>
        <div className='w-11/12 md:w-8/12 my-4'>
          <TextField label='Epost' type='email' onChange={handleUsername} className='w-full' />
        </div>
        <div className='w-11/12 md:w-8/12'>
          <TextField label='Lösenord' type='password' className='w-full' onChange={handlePassword} />
        </div>
        <Button type='submit' label='Logga in' primary />
        <div className='my-3.5'>
          <Link to='/reset-password'>
            <Button className='text-xs' label='Problem att logga in?' secondary />
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
