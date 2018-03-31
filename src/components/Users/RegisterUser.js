import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { registerUser } from '../../actions'
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

const RegisterUser = ({registerUser}) => {
  let username = ''
  let password = ''

  const handleUsername = (e, value) => {
    username = value
  }

  const handlePassword = (e, value) => {
    password = value
  }

  const handleRegisterUser = (evt) => {
    registerUser(username, password)
  }

  return <Form onSubmit={handleRegisterUser} name={'register-user'}>
    <GridLayout key='layout' {...defaultProps}>
      <div key={'register-user-row-1'} data-grid={dataGridItem}>
        <TextField label='Epost' style={{width: '100%'}} onChange={handleUsername} />
      </div>
      <div key={'register-user-row-2'} data-grid={dataGridItem}>
        <TextField label='Lösenord' style={{width: '100%'}} type='password' onChange={handlePassword} />
      </div>
      <div key={'register-user-row-3'} data-grid={dataGridItem}>
        <Button type='submit' fullWidth label='Skapa konto' primary />
      </div>
    </GridLayout>
  </Form>
}

RegisterUser.propTypes = {
  registerUser: PropTypes.func.isRequired
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps, {registerUser})(RegisterUser)
