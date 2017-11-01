import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Avatar from 'material-ui/Avatar'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RegisterResult from './RegisterResult'
import { matchPoints } from '../../lib/partilledc-score'

const colMapper = ({ text, result = [] }) => <TableRowColumn key={text} style={{whiteSpace: 'normal'}}>
  {result.filter(r => r.home !== 0 || r.away !== 0).map(r => r.home + '-' + r.away).join(', ')}
</TableRowColumn>

class Match extends Component {
  constructor (props) {
    super(props)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.changeResult = this.changeResult.bind(this)
    this.isPinEnabled = this.isPinEnabled.bind(this)
    this.requirePin = this.requirePin.bind(this)
    this.state = {open: false, requirePin: this.isPinEnabled(), wrongPin: true, match: {text: '', result: [{home: 0, away: 0}]}}
  }

  isPinEnabled () {
    return this.props.user.uid === 'c7RECUVjoIM1iHB7jvldxScB0C62'
  }

  handleOpen (match) {
    this.setState({open: true, match})
  }

  handleClose () {
    this.setState({open: false})
    this.setState({requirePin: false})
    this.requirePin()
  }

  requirePin () {
    if (!this.isPinEnabled()) return
    clearTimeout(this.timerId)
    this.timerId = setTimeout(() => {
      this.setState({requirePin: true, wrongPin: true})
    }, 1000 * 60 * 2)
  }

  changeResult (matchResult) {
    let match = this.props.match
    match.matches = match.matches.map(m => {
      if (m.text === this.state.match.text) return matchResult
      return m
    })
    this.props.saveMatch(match)
  }

  render () {
    const match = this.props.match

    const actions = [
      <FlatButton label='Stäng' primary onTouchTap={this.handleClose} disabled={this.state.requirePin && this.state.wrongPin} />
    ]

    const {palette} = getMuiTheme()

    const header = (item) => {
      const open = () => {
        if (!this.props.user.isAnonymous) {
          this.handleOpen(item)
        }
      }
      return <TableHeaderColumn key={item.text} style={{paddingLeft: '5px'}}>
        <FlatButton
          label={item.text}
          primary
          labelStyle={{textTransform: 'none'}}
          onTouchTap={open} />
      </TableHeaderColumn>
    }

    const view = (requirePin) => {
      if (requirePin) {
        return <TextField hintText='Ange pin' pattern='[0-9]*' inputMode='numeric' onChange={(e, newValue) => this.setState({wrongPin: newValue !== '1958'})} />
      }

      return <RegisterResult onChangeResult={this.changeResult} match={this.state.match} />
    }

    const formatMatchPoints = (score) => `${score.home.points}-${score.away.points}`
    return <Card>
      <CardHeader style={{overflow: 'hidden'}} avatar={<Avatar size={35} backgroundColor={palette.accent1Color}>
        {formatMatchPoints(matchPoints(match.matches.map(m => m.result)))}
      </Avatar>} title={`${match.homeTeam.teamName} - ${match.awayTeam.teamName}`} subtitle={'Bana ' + match.lane + ' ' + match.date + ' kl ' + match.time} />
      <Table selectable={false} multiselectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
          <TableRow>
            {match.matches.map(header)}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            {match.matches.map(colMapper)}
          </TableRow>
        </TableBody>
      </Table>
      <Dialog
        title={this.state.requirePin ? 'Ange pin' : 'Resultat'}
        actions={actions}
        contentStyle={{width: '100%', maxWidth: 'none'}}
        modal
        open={this.state.open}>
        { view(this.state.requirePin) }
      </Dialog>
    </Card>
  }
}

Match.propTypes = {
  match: PropTypes.object.isRequired,
  saveMatch: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default Match
