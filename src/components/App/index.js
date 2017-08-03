import React from 'react'
import PropTypes from 'prop-types' 
import { withRouter } from 'react-router'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router'
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
  }

  handleToggle () {
    this.setState({open: !this.state.open})
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.user.isAnonymous !== nextProps.user.isAnonymous) {
      this.props.router.push('/')
    }
  }

  render () {
    const listItemFactory = (serie) => <ListItem key={serie.id} primaryText={serie.text} nestedItems={[ <ListItem key={'team-' + serie.id}> <Link to={'/series/' + serie.id + '/teams'} onClick={this.handleToggle}> Lag </Link> </ListItem>, <ListItem key={'matches-' + serie.id}> <Link to={'/series/' + serie.id + '/matches'} onClick={this.handleToggle}> Matcher </Link> </ListItem>, <ListItem key={'table-' + serie.id}> <Link to={'/series/' + serie.id + '/table'} onClick={this.handleToggle}> Tabell </Link> </ListItem> ]} />
    const menu = () => {
      if (this.props.user.isAnonymous) {
        const menuItems = [{to: '/register-user', text: 'Ny användare'}, {to: '/sign-in', text: 'Logga in'}]
        return menuItems.map(item => <MenuItem key={item.text}>
                                     <Link to={item.to}>
                                     {item.text}
                                     </Link>
                                     </MenuItem>)
      }
      return <MenuItem primaryText='Logga ut' onTouchTap={this.props.signOut} />
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

    return <div>
             <AppBar
               style={{position: 'fixed', top: '0px', height: '60px'}}
               key='AppBar'
               title=''
               onLeftIconButtonTouchTap={this.handleToggle}
               iconElementRight={<IconMenu iconButtonElement={<IconButton> {rightIcon()} </IconButton>} targetOrigin={{horizontal: 'right', vertical: 'top'}} anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                                   {menu()}
                                 </IconMenu>} />
             <div style={{marginTop: '60px'}}>
             {this.props.children}
              </div>
             <Drawer docked={false} onRequestChange={(open) => this.setState({open})} open={this.state.open}>
               <List>
                 <Subheader>
                   Företagsserier
                 </Subheader>
                 {series.companySeries.map(listItemFactory)}
                 <Subheader>
                   Motionsserier
                 </Subheader>
                 {series.exerciseSeries.map(listItemFactory)}
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
