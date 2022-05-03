import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router'
import { Header } from './Header'
import { Navigation } from './Navigation'
import { connect } from 'react-redux'
import Button from '../Shared/Button'
import series from '../../series.json'
import { signOut } from '../../actions'
import '@fontsource/material-icons-outlined'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { open: false, userMenuOpen: false }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleToggleUserMenu = this.handleToggleUserMenu.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.menu = this.menu.bind(this)
  }

  handleToggle () {
    this.setState({ open: !this.state.open })
  }

  handleToggleUserMenu () {
    this.setState({ userMenuOpen: !this.state.userMenuOpen })
  }

  title () {
    const seriesNames = series.companySeries
      .concat(series.exerciseSeries)
      .filter(x => x.id === this.props.params.series)
      .map(x => x.text)

    const routes = this.props.routes
    const routeName = routes[routes.length - 1].name

    return seriesNames.length > 0 ? `${seriesNames} - ${routeName}` : routeName
  }

  handleSignOut (evt) {
    evt.preventDefault()
    this.props.signOut()
  }

  menu () {
    if (this.props.user.isAnonymous) {
      const menuItems = [{ to: '/register-user', text: 'Ny användare' }, { to: '/sign-in', text: 'Logga in' }]
      return menuItems.map(item =>
        <div key={item.text} className='w-full'>
          <Link to={item.to}>
            <Button label={item.text} className='normal-case w-full text-black' /> 
        </Link></div>)
    }

    return (<div className='w-full my-2'>
              <Button className='text-black' disabled={this.props.user.uid === 'c7RECUVjoIM1iHB7jvldxScB0C62'} label='Logga ut' onClick={this.handleSignOut} />
            </div>)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.user.isAnonymous !== nextProps.user.isAnonymous) {
      nextProps.user.isAnonymous ? this.props.router.push('/') : this.props.router.goBack()
    }
  }

  render () {

    return (
      <div>
        <Header
          key='AppBar'
          data-testid='menu'
          title={this.title()}
          toggleSidebar={this.handleToggle}
          toggleUserMenu={this.handleToggleUserMenu}
          user={this.props.user}
        />
        <div className={`bg-transparent z-40 absolute top-0 left-0 w-screen h-screen ${this.state.userMenuOpen ? undefined : 'hidden'}`} onClick={() => this.handleToggleUserMenu()}>
          <div className='bg-white flex flex-col z-50 shadow fixed top-1 right-3'>
            {this.menu()}
          </div>
        </div>
        <div className='safe-left safe-right'>
          {this.props.children}
        </div>
        <Navigation open={this.state.open} user={this.props.user} handleToggle={this.handleToggle} />
      </div>
    )
  }
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

export default connect(mapStateToProps, { signOut })(withRouter(App))
/* eslint-enable react/jsx-indent */
