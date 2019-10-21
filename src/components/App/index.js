import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import LockOpen from 'material-ui/svg-icons/action/lock-open'
import LockClosed from 'material-ui/svg-icons/action/lock-outline'
import series from '../../series.json'
import { signOut } from '../../actions'

/* eslint-disable react/jsx-indent */
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {open: false}
    this.handleToggle = this.handleToggle.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  handleToggle () {
    this.setState({open: !this.state.open})
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

  signOut (evt) {
    evt.preventDefault()
    this.props.signOut()
  }

  menu () {
    if (this.props.user.isAnonymous) {
      const menuItems = [{to: '/register-user', text: 'Ny användare'}, {to: '/sign-in', text: 'Logga in'}]
      return menuItems.map(item => <MenuItem key={item.text}>
        <Link to={item.to}>
          {item.text}
        </Link>
      </MenuItem>)
    }

    return <MenuItem disabled={this.props.user.uid === 'c7RECUVjoIM1iHB7jvldxScB0C62'} primaryText='Logga ut' onTouchTap={this.signOut} />
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.user.isAnonymous !== nextProps.user.isAnonymous) {
      nextProps.user.isAnonymous ? this.props.router.push('/') : this.props.router.goBack()
    }
  }

  render () {
    const listItemFactory = (serie) => {
      const items = [
        <ListItem key={'team-' + serie.id}>
          <Link to={'/series/' + serie.id + '/teams'} onClick={this.handleToggle}> Lag </Link>
        </ListItem>,
        <ListItem key={'matches-' + serie.id}>
          <Link to={'/series/' + serie.id + '/matches'} onClick={this.handleToggle}> Matcher </Link>
        </ListItem>,
        <ListItem key={'table-' + serie.id}>
          <Link to={'/series/' + serie.id + '/table'} onClick={this.handleToggle}> Tabell </Link>
        </ListItem>
      ]
      if (this.props.user.uid === 'EcTzkTApzDXWR07vMbwmuXfkIHm2' ||
        this.props.user.uid === 't9Q8UPdd1oOvyA4PN4C4VeBMeaW2') {
        items.push(<ListItem key={'reset-' + serie.id}>
          <Link to={{pathname: '/series/' + serie.id + '/reset', state: {slug: serie.slug}}} onClick={this.handleToggle}> Admin </Link>
        </ListItem>)
      }
      return <ListItem key={serie.id} primaryText={serie.text} nestedItems={items} />
    }

    const myMatches = () => {
      if (!this.props.user.isAnonymous) {
        return <ListItem>
          <Link to={'/my-matches'} onClick={this.handleToggle}> Mina matcher
          </Link>
        </ListItem>
      }
    }

    const rightIcon = () => {
      return this.props.user.isAnonymous ? <LockClosed /> : <LockOpen />
    }

    let display = 'flex'
    let marginTop = '60px'
    if (window.location !== window.parent.location) {
      display = 'none'
      marginTop = '0px'
    }

    if (('standalone' in window.navigator) && window.navigator.standalone) {
      var iphoneXFix = {marginTop: '30px'}
      var iphoneXTitleFix = {marginTop: '22px'}
      marginTop = '80px'
    }

    return <div>
      <AppBar
        style={{display, position: 'fixed', top: '0px', height: marginTop}}
        titleStyle={iphoneXTitleFix}
        iconStyleLeft={iphoneXFix}
        iconStyleRight={iphoneXFix}
        key='AppBar'
        title={this.title()}
        onLeftIconButtonTouchTap={this.handleToggle}
        iconElementRight={<IconMenu iconButtonElement={<IconButton> {rightIcon()} </IconButton>} targetOrigin={{horizontal: 'right', vertical: 'top'}} anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
          {this.menu()}
        </IconMenu>} />
      <div style={{marginTop}}>
        {this.props.children}
      </div>
      <Drawer containerStyle={iphoneXFix} docked={false} onRequestChange={(open) => this.setState({open})} open={this.state.open}>
        <List>
          <Subheader style={{fontSize: '24px'}}>
                   Lagserier
          </Subheader>
          {series.companySeries.filter(x => x.active === true).map(listItemFactory)}
          <Divider />
          <Subheader style={{fontSize: '24px'}}>
                   Motionsserier
          </Subheader>
          {series.exerciseSeries.filter(x => x.active === true).map(listItemFactory)}
          <Divider />
          {myMatches()}
          <ListItem>
            <Link to={'/todays-matches'} onClick={this.handleToggle}> Dagens matcher
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </div>
  }
}

App.propTypes = {
  routes: PropTypes.array,
  children: PropTypes.element,
  user: PropTypes.object,
  signOut: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const {user} = state
  return {user, ownProps}
}

export default connect(mapStateToProps, {signOut})(withRouter(App))
/* eslint-enable react/jsx-indent */
