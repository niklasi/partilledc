import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { resetPassword } from '../../actions'
import { Form, TextField, Button } from '../Shared'

const GridLayout = WidthProvider(Responsive)
const defaultProps = {
  className: 'layout',
  cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 },
  rowHeight: 60
}

const dataGridItem = {
  x: 2, y: 1, w: 8, h: 1, isDraggable: false
}

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
      <GridLayout key='layout' {...defaultProps}>
        <div key='reset-row-1' data-grid={dataGridItem}>
          <TextField label='Epost' style={{ width: '100%' }} onChange={handleEmail} />
        </div>
        <div key='reset-row-2' data-grid={dataGridItem}>
          <Button type='submit' fullWidth label='Återställ lösenord' primary />
        </div>
      </GridLayout>
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
