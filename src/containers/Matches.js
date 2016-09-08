import React from 'react'
import Match from './Match'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { connect } from 'react-redux'
import { loadTodaysMatches, loadMatches, unloadMatches } from '../actions'

const GridLayout = WidthProvider(Responsive)
const defaultProps = {className: 'layout',
  cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
  rowHeight: 180
}

class Matches extends React.Component {

  constructor (props) {
    super(props)
    this.interval = null
  }

  componentDidMount () {
    this.getMatches(this.props.params.series)
  }

  getMatches (series) {
    clearInterval(this.interval)

    if (series) {
      this.props.loadMatches(series)
    } else {
      const today = () => new Date().toLocaleDateString('sv-SE')
      let currentDay = today()
      this.props.loadTodaysMatches(currentDay)

      this.interval = setInterval(() => {
        if (currentDay !== today()) {
          currentDay = today()
          this.props.loadTodaysMatches(currentDay)
        }
      }, 1000 * 60)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params !== this.props.params) {
      this.getMatches(nextProps.params.series)
    }
  }

  componentWillUnmount () {
    this.props.unloadMatches()
  }

  render () {
    return <GridLayout key='layout' {...defaultProps}>
             {this.props.matches.map((match, index) => <div key={'match-' + index} data-grid={{x: (index % 3) * 4, y: index + 1, w: 4, h: 1, isDraggable: false}}>
                                                         <Match match={match} />
                                                       </div>)}
           </GridLayout>
  }
}

Matches.propTypes = {
  params: React.PropTypes.object.isRequired,
  matches: React.PropTypes.array.isRequired,
  loadMatches: React.PropTypes.func.isRequired,
  loadTodaysMatches: React.PropTypes.func.isRequired,
  unloadMatches: React.PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const {matches} = state
  return {matches, ownProps}
}

export default connect(mapStateToProps, {loadTodaysMatches, loadMatches, unloadMatches})(Matches)
