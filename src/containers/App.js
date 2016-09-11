import React from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import series from '../series.json'

class App extends React.Component {
  constructor (props) {
    super(props)
    console.log(props.routes)
    this.state = {open: false}
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle () {
    this.setState({open: !this.state.open})
  }

  render () {
    const listItemFactory = (serie) => <ListItem key={serie.id} primaryText={serie.text} nestedItems={[ <ListItem key={'team-' + serie.id}> <Link to={'/series/' + serie.id + '/teams'} onClick={this.handleToggle}> Lag </Link> </ListItem>, <ListItem key={'matches-' + serie.id}> <Link to={'/series/' + serie.id + '/matches'} onClick={this.handleToggle}> Matcher </Link> </ListItem>, <ListItem key={'table-' + serie.id}> <Link to={'/series/' + serie.id + '/table'} onClick={this.handleToggle}> Tabell </Link> </ListItem> ]} />

    return <div>
             <AppBar key='AppBar' title={this.props.routes[1].component.title} onLeftIconButtonTouchTap={this.handleToggle} />
             {this.props.children}
             <Drawer open={this.state.open}>
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
  routes: React.PropTypes.array,
  children: React.PropTypes.element
}

const mapStateToProps = (state, ownProps) => {
  // const {series} = state
  return {ownProps}
// return {series, ownProps}
}

export default connect(mapStateToProps)(App)
// export default connect(mapStateToProps, {loadSeries, unloadSeries})(App)
