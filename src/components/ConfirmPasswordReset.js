import React from 'react'
import PropTypes from 'prop-types' 
import { connect } from 'react-redux'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { confirmPasswordReset } from '../actions'
import { Form, TextField, Button } from './Shared'

const GridLayout = WidthProvider(Responsive)

const defaultProps = {
  className: 'layout',
  cols: {lg: 12, md: 12, sm: 12, xs: 12, xxs: 12},
  rowHeight: 60
}

const dataGridItem = {
  x: 2, y: 1, w: 8, h: 1, isDraggable: false
}

const ConfirmPasswordReset = ({auth, location, confirmPasswordReset}) => {
  let password = ''

  const handlePassword = (e, value) => {
    password = value
  }

  const handleConfirmReset = () => {
    confirmPasswordReset(location.query.oobCode, password)
  }

  return (
    <Form onSubmit={handleConfirmReset} name={'confirm-password-reset'}>
    <GridLayout key='layout' {...defaultProps}>
    <div key={"confirm-reset-row-1"} data-grid={dataGridItem}>
    <TextField type='password' label='Nytt lösenord' style={{width: '100%'}} onChange={handlePassword} />
    </div>
    <div key={"confirm-reset-row-2"} data-grid={dataGridItem}>
    <Button type='submit' fullWidth label='Uppdatera' primary />
    </div>
    </GridLayout>
    </Form>
  )
}

ConfirmPasswordReset.propTypes = {
  confirmPasswordReset: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const {auth} = state
  return {auth, ownProps}
}

export default connect(mapStateToProps, {confirmPasswordReset})(ConfirmPasswordReset)
