import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { signIn } from '../../actions'
import { Form, TextField, Button } from '../Shared'

const GridLayout = WidthProvider(Responsive)
const defaultProps = {
  className: 'layout',
  cols: {lg: 12, md: 12, sm: 12, xs: 12, xxs: 12},
  rowHeight: 60
}

const dataGridItem = {
  x: 2, y: 1, w: 8, h: 1, isDraggable: false
}

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
    <Form onSubmit={handleSignIn} name={'sign-in'}>
      <GridLayout key='layout' {...defaultProps}>
        <div key={'sign-in-row-1'} data-grid={dataGridItem}>
          <TextField label='Epost' style={{width: '100%'}} onChange={handleUsername} />
        </div>
        <div key={'sign-in-row-2'} data-grid={dataGridItem}>
          <TextField label='Lösenord' type='password' style={{width: '100%'}} onChange={handlePassword} />
        </div>
        <div key={'sign-in-row-3'} data-grid={dataGridItem}>
          <Button type='submit' fullWidth label='Logga in' primary />
        </div>
        <div key={'sign-in-row-4'} data-grid={dataGridItem}>
          <Link to='/reset-password'>
            <Button fullWidth label='Problem att logga in?' secondary />
          </Link>
        </div>
      </GridLayout>
    </Form>
  )
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps, {signIn})(SignIn)
