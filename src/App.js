import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Responsive, WidthProvider } from 'react-grid-layout'
const GridLayout = WidthProvider(Responsive)
import AppBar from 'material-ui/AppBar'
import DatePicker from 'material-ui/DatePicker'
import Match from './match'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Divider from 'material-ui/Divider'

const matches = [
  {teams: 'Lirarnas lag - Konkurrenterna', lanes: [{lane: 3, time: 20}, {lane: 3, time: 21}, {lane: 4, time: 21}]},
  {teams: 'Lirarnas lag - Konkurrenterna', lanes: [{lane: 3, time: 20}, {lane: 3, time: 21}, {lane: 4, time: 21}]},
  {teams: 'Lirarnas lag - Konkurrenterna', lanes: [{lane: 3, time: 20}, {lane: 3, time: 21}, {lane: 4, time: 21}]},
  {teams: 'Lirarnas lag - Konkurrenterna', lanes: [{lane: 3, time: 20}, {lane: 3, time: 21}, {lane: 4, time: 21}]},
  {teams: 'Lirarnas lag - Konkurrenterna', lanes: [{lane: 3, time: 20}, {lane: 3, time: 21}, {lane: 4, time: 21}]},
  {teams: 'Lirarnas lag - Konkurrenterna', lanes: [{lane: 3, time: 20}, {lane: 3, time: 21}, {lane: 4, time: 21}]},
  {teams: 'Lirarnas lag - Konkurrenterna', lanes: [{lane: 3, time: 20}, {lane: 3, time: 21}, {lane: 4, time: 21}]},
  {teams: 'Lirarnas lag - Konkurrenterna', lanes: [{lane: 3, time: 20}, {lane: 3, time: 21}, {lane: 4, time: 21}]}
]

const defaultProps = {className: 'layout',
  cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
  rowHeight: 180
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {open: false}
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle () {
    this.setState({open: !this.state.open})
  }

  render () {
    const {palette} = getMuiTheme()
    return <MuiThemeProvider>
             <div>
               <AppBar key='AppBar' iconElementLeft={<IconMenu iconButtonElement={<IconButton>
                                                                                    <MenuIcon color={palette.alternateTextColor} />
                                                                                  </IconButton>}>
                                                       <MenuItem primaryText='Refresh' />
                                                       <MenuItem primaryText='Help' />
                                                       <Divider />
                                                       <MenuItem primaryText='Sign out' />
                                                     </IconMenu>} iconElementRight={<DatePicker id='datepicker' />} />
               <GridLayout key='layout' {...defaultProps}>
                 {matches.map((match, index) => <div key={'match-' + index} data-grid={{x: (index % 3) * 4, y: 0, w: 4, h: 1, isDraggable: false}}>
                                                  <Match />
                                                </div>)}
               </GridLayout>
             </div>
           </MuiThemeProvider>
  }
}

export default App
