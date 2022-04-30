import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router'
// import AppBar from 'material-ui/AppBar'
import { Header } from './Header'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
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
    const listItemFactory = (serie) => {
      const items = [
        <ListItem key={`team-${serie.id}`}>
          <Link data-testid={`menu-team-${serie.id}`} to={`/series/${serie.id}/teams`} onClick={this.handleToggle}> Lag </Link>
        </ListItem>,
        <ListItem key={`matches-${serie.id}`}>
          <Link data-testid={`menu-matches-${serie.id}`} to={`/series/${serie.id}/matches`} onClick={this.handleToggle}> Matcher </Link>
        </ListItem>,
        <ListItem key={`table-${serie.id}`}>
          <Link data-testid={`menu-table-${serie.id}`} to={`/series/${serie.id}/table`} onClick={this.handleToggle}> Tabell </Link>
        </ListItem>
      ]
      if (this.props.user.uid === 'EcTzkTApzDXWR07vMbwmuXfkIHm2' || this.props.user.uid === 't9Q8UPdd1oOvyA4PN4C4VeBMeaW2') {
        items.push(
          <ListItem key={'reset-' + serie.id}>
            <Link to={{ pathname: '/series/' + serie.id + '/reset', state: { slug: serie.slug } }} onClick={this.handleToggle}> Nollställ </Link>
          </ListItem>)
      }
      return <ListItem data-testid={serie.text.split(' ').join('-')} id={serie.id} key={serie.id} primaryText={serie.text} nestedItems={items} />
    }

    const myMatches = () => {
      if (!this.props.user.isAnonymous) {
        return (
          <ListItem>
            <Link to='/my-matches' onClick={this.handleToggle}> Mina matcher
            </Link>
          </ListItem>
        )
      }
    }

    const rightIcon = () => {
      return this.props.user.isAnonymous ? <span className='material-icons-outlined'>lock</span> : <span className='material-icons-outlined'>lock_open</span> 
    }


    // if (('standalone' in window.navigator) && window.navigator.standalone) {
    //   iphoneXFix = { marginTop: '30px' }
    //   marginTop = '80px'
    // }

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
        <div>
          {this.props.children}
        </div>
        <Drawer docked={false} onRequestChange={(open) => this.setState({ open })} open={this.state.open}>
          <div className='flex flex-col space-x-2'>
            <p className='text-2xl pl-4 text-gray-500'>
              Lagserier
            </p>
            {series.companySeries.filter(x => x.active === true).map(listItemFactory)}
            <hr />
            <p className='text-2xl pl-4 text-gray-500'>
              Motionsserier
            </p>
            {series.exerciseSeries.filter(x => x.active === true).map(listItemFactory)}
            <hr />
            {myMatches()}
            <ListItem>
              <Link to='/todays-matches' onClick={this.handleToggle}> Dagens matcher
              </Link>
            </ListItem>
          </div>
        </Drawer>
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
