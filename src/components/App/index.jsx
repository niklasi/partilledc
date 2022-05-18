import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { withRouter } from '../../withRouter'
import { Header } from './Header'
import { Navigation } from './Navigation'
import { connect } from 'react-redux'
import Button from '../Shared/Button'
import series from '../../series.json'
import { signOut } from '../../actions'
import '@fontsource/material-icons-outlined'

function App (props) {
  const [open, setOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navigate = useNavigate()
  const isAnonymous = props.user.isAnonymous

  useEffect(() => {
      isAnonymous ? navigate('/') : window.history.back()
  }, [])


  function handleToggle () {
    setOpen(!open)
  }

  function handleToggleUserMenu () {
    setUserMenuOpen(!userMenuOpen)
  }

  function title () {
    const seriesNames = series.companySeries
      .concat(series.exerciseSeries)
      .filter(x => x.id === props.params.series)
      .map(x => x.text)

    return 'Fix title'
    // const routes = this.props.routes
    // const routeName = routes[routes.length - 1].name

    // return seriesNames.length > 0 ? `${seriesNames} - ${routeName}` : routeName
  }

  function handleSignOut (evt) {
    evt.preventDefault()
    props.signOut()
  }

  function menu () {
    if (isAnonymous) {
      const menuItems = [{ to: '/register-user', text: 'Ny användare' }, { to: '/sign-in', text: 'Logga in' }]
      return menuItems.map(item =>
        <div key={item.text} className='w-full'>
          <Link to={item.to}>
            <Button label={item.text} className='normal-case w-full text-black' /> 
        </Link></div>)
    }

    return (<div className='w-full my-2'>
              <Button className='text-black' disabled={props.user?.uid === 'c7RECUVjoIM1iHB7jvldxScB0C62'} label='Logga ut' onClick={handleSignOut} />
            </div>)
  }



  return (
    <div>
      <Header
        key='AppBar'
        data-testid='menu'
        title={title()}
        toggleSidebar={handleToggle}
        toggleUserMenu={handleToggleUserMenu}
        user={props.user}
      />
      <div className={`bg-transparent z-40 absolute top-0 left-0 w-screen h-screen ${userMenuOpen ? undefined : 'hidden'}`} onClick={() => handleToggleUserMenu()}>
        <div className='bg-white flex flex-col z-50 shadow fixed top-1 right-3'>
          {menu()}
        </div>
      </div>
      <div className='safe-left safe-right'>
        <Outlet />
      </div>
      <Navigation open={open} user={props.user} handleToggle={handleToggle} />
    </div>
  )
}

App.propTypes = {
  routes: PropTypes.array,
  children: PropTypes.element,
  user: PropTypes.object,
  signOut: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { user } = state
  return { user, ownProps }
}

export default withRouter(connect(mapStateToProps, { signOut })(App))
/* eslint-enable react/jsx-indent */
