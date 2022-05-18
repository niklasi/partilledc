import PropTypes from 'prop-types'
import { Component } from 'react'
import Card from '../Shared/Card'
import TextField from '../Shared/TextField'
import Dialog from '../Shared/Dialog'
import Button from '../Shared/Button'
import RegisterResult from './RegisterResult'
import { matchPoints } from '../../lib/partilledc-score'

const colMapper = ({ text, result = [] }) =>
  <p key={text} className='text-sm whitespace-normal'>
    {result.filter(r => r.home !== 0 || r.away !== 0).map(r => r.home + '-' + r.away).join(', ')}
  </p>

class Match extends Component {
  constructor (props) {
    super(props)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChangeResult = this.handleChangeResult.bind(this)
    this.isPinEnabled = this.isPinEnabled.bind(this)
    this.requirePin = this.requirePin.bind(this)
    this.state = { open: false, requirePin: this.isPinEnabled(), wrongPin: true, match: { text: '', result: [{ home: 0, away: 0 }] } }
  }

  isPinEnabled () {
    return this.props.user.uid === 'c7RECUVjoIM1iHB7jvldxScB0C62'
  }

  handleOpen (match) {
    this.setState({ open: true, match })
  }

  handleClose () {
    this.setState({ open: false })
    this.setState({ requirePin: false })
    this.requirePin()
  }

  requirePin () {
    if (!this.isPinEnabled()) return
    clearTimeout(this.timerId)
    this.timerId = setTimeout(() => {
      this.setState({ requirePin: true, wrongPin: true })
    }, 1000 * 60 * 2)
  }

  handleChangeResult (matchResult) {
    const match = this.props.match
    match.matches = match.matches.map(m => {
      if (m.text === this.state.match.text) return matchResult
      return m
    })
    this.props.saveMatch(match)
  }

  render () {
    const match = this.props.match

    const actions = [
      <Button key='close_button' label='Stäng' primary onClick={this.handleClose} disabled={this.state.requirePin && this.state.wrongPin} />
    ]

    const header = (item) => {
      const open = () => {
        if (!this.props.user.isAnonymous) {
          this.handleOpen(item)
        }
      }
      return (
        <Button
          label={item.text}
          primary
          className='normal-case'
          onClick={open}
        />
      )
    }

    const view = (requirePin) => {
      if (requirePin) {
        return <TextField hintText='Ange pin' pattern='[0-9]*' inputMode='numeric' onChange={(e, newValue) => this.setState({ wrongPin: newValue !== '1958' })} />
      }

      return <RegisterResult onChangeResult={this.handleChangeResult} match={this.state.match} />
    }

    const formatMatchPoints = (score) => `${score.home.points}-${score.away.points}`
    return (
      <Card
        avatar={formatMatchPoints(matchPoints(match.matches.map(m => m.result)))}
        title={`${match.homeTeam.teamName} - ${match.awayTeam.teamName}`}
        subtitle={'Bana ' + match.lane + ' ' + match.date + ' kl ' + match.time}
      >
        <div className='flex flex-row justify-between'>
          {match.matches.map((match, index) => {
            return (
              <div key={`match-${index}`} className='flex flex-col flex-wrap items-center'>
                {header(match)}
                {colMapper(match)}
              </div>
            )
          })}
        </div>
      {this.state.open && <Dialog
          title={this.state.requirePin ? 'Ange pin' : 'Resultat'}
          actions={actions}
          open={this.state.open}
        >
          {view(this.state.requirePin)}
        </Dialog>}
      </Card>
    )
  }
}

Match.propTypes = {
  match: PropTypes.object.isRequired,
  saveMatch: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default Match
