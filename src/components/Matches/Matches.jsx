import { useEffect } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from '../../withRouter'
import Match from './Match'
import { connect } from 'react-redux'
import { saveMatch, loadTodaysMatches, loadMyMatches, loadMatches, unloadMatches } from '../../actions'
import allSeries from '../../series.json'
import Print from './Print'

function Matches (props) {
  const series = props.params.series
  let interval = null

  useEffect(() => {
    getMatches(series)
    return props.unloadMatches
  }, [series])

  function getMatches (series) {
    clearInterval(interval)

    switch (props.name) {
      case 'Matcher':
        props.loadMatches(series)
        break
      case 'Dagens matcher': {
        const today = () => new Date().toLocaleDateString('sv-SE')
        let currentDay = today()
        props.loadTodaysMatches(currentDay)

        interval = setInterval(() => {
          if (currentDay !== today()) {
            currentDay = today()
            props.loadTodaysMatches(currentDay)
          }
        }, 1000 * 60)
        break
      }
      case 'Mina matcher':
        props.loadMyMatches(props.user.uid)
        break
      default:
        console.log('No matching path')
    }
  }

  const isCompanySeries = allSeries.companySeries.filter(s => s.id === props.params.series).length > 0
  return (
    <div>
      <Print matches={props.matches} isCompanySeries={isCompanySeries} />
      <div className='print:hidden flex flex-wrap'>
        {props.matches.map((match, index) =>
          <div key={'match-' + index} className='basis-full md:basis-1/2 lg:basis-1/3 px-2 py-2'>
            <Match saveMatch={props.saveMatch} match={match} user={props.user} />
          </div>)}
      </div>
    </div>
  )
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

export default withRouter(connect(mapStateToProps, { saveMatch, loadTodaysMatches, loadMyMatches, loadMatches, unloadMatches })(Matches))
