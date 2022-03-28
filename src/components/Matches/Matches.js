import React from 'react'
import PropTypes from 'prop-types'
import Match from './Match'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { connect } from 'react-redux'
import { saveMatch, loadTodaysMatches, loadMyMatches, loadMatches, unloadMatches } from '../../actions'
import allSeries from '../../series.json'
import Print from './Print'

const GridLayout = WidthProvider(Responsive)
const defaultProps = {
  className: 'layout',
  cols: { lg: 12, md: 12, sm: 6, xs: 6, xxs: 6 },
  rowHeight: 180
}

class Matches extends React.Component {
  constructor (props) {
    super(props)
    this.interval = null
  }

  componentDidMount () {
    this.getMatches(this.props.route.path, this.props.params.series)
  }

  getMatches (path, series) {
    clearInterval(this.interval)

    switch (path) {
      case '/series/:series/matches':
        this.props.loadMatches(series)
        break
      case '/todays-matches': {
        const today = () => new Date().toLocaleDateString('sv-SE')
        let currentDay = today()
        this.props.loadTodaysMatches(currentDay)

        this.interval = setInterval(() => {
          if (currentDay !== today()) {
            currentDay = today()
            this.props.loadTodaysMatches(currentDay)
          }
        }, 1000 * 60)
        break
      }
      case '/my-matches':
        this.props.loadMyMatches(this.props.user.uid)
        break
      default:
        console.log('No matching path')
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params !== this.props.params) {
      this.getMatches(nextProps.route.path, nextProps.params.series)
    }
  }

  componentWillUnmount () {
    this.props.unloadMatches()
  }

  render () {
    const isCompanySeries = allSeries.companySeries.filter(s => s.id === this.props.params.series).length > 0
    return (
      <div>
        <Print matches={this.props.matches} isCompanySeries={isCompanySeries} />
        <GridLayout key='layout' {...defaultProps}>
          {this.props.matches.map((match, index) =>
            <div key={'match-' + index} data-grid={{ x: (index % 2) * 6, y: index + 1, w: 6, h: 1, isDraggable: false }}>
              <Match saveMatch={this.props.saveMatch} match={match} user={this.props.user} />
            </div>)}
        </GridLayout>
      </div>
    )
  }
}

Matches.propTypes = {
  params: PropTypes.object.isRequired,
  user: PropTypes.object,
  matches: PropTypes.array.isRequired,
  loadMatches: PropTypes.func.isRequired,
  loadTodaysMatches: PropTypes.func.isRequired,
  loadMyMatches: PropTypes.func.isRequired,
  unloadMatches: PropTypes.func.isRequired,
  saveMatch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { matches, user } = state
  return { matches, user, ownProps }
}

export default connect(mapStateToProps, { saveMatch, loadTodaysMatches, loadMyMatches, loadMatches, unloadMatches })(Matches)
