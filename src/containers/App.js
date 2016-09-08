import React from 'react'
import AppBar from 'material-ui/AppBar'
import DatePicker from 'material-ui/DatePicker'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { loadSeries, unloadSeries } from '../actions'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {open: false}
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle () {
    this.setState({open: !this.state.open})
  }

  componentDidMount () {
    this.props.loadSeries()
  }

  componentWillUnmount () {
    this.props.unloadSeries()
  }

  render () {
    const listItemFactory = (serie) => <ListItem key={serie.id} primaryText={serie.text} nestedItems={[ <ListItem key={'team-' + serie.id}> <Link to={'/series/' + serie.id + '/teams'} onClick={this.handleToggle}> Lag </Link> </ListItem>, <ListItem key={'matches-' + serie.id}> <Link to={'/series/' + serie.id + '/matches'} onClick={this.handleToggle}> Matcher </Link> </ListItem>, <ListItem key={'table-' + serie.id}> <Link to={'/series/' + serie.id + '/table'} onClick={this.handleToggle}> Tabell </Link> </ListItem> ]} />

    return <div>
             <AppBar key='AppBar' onLeftIconButtonTouchTap={this.handleToggle} iconElementRight={<DatePicker id='datepicker' />} />
             {this.props.children}
             <Drawer open={this.state.open}>
               <List>
                 <Subheader>
                   Företagsserier
                 </Subheader>
                 {this.props.series.map(listItemFactory)}
                 <Subheader>
                   Motionsserier
                 </Subheader>
                 <ListItem primaryText='Herrsingel div 1' />
                 <ListItem primaryText='Herrsingel div 2' />
                 <ListItem primaryText='Herrsingel div 3' />
                 <Divider />
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
  series: React.PropTypes.array.isRequired,
  loadSeries: React.PropTypes.func.isRequired,
  unloadSeries: React.PropTypes.func.isRequired,
  children: React.PropTypes.element
}

const mapStateToProps = (state, ownProps) => {
  const {series} = state
  return {series, ownProps}
}

export default connect(mapStateToProps, {loadSeries, unloadSeries})(App)
