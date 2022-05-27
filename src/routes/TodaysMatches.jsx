import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import Match from '../components/Match'
import { connect } from 'react-redux'
import { saveMatch, loadTodaysMatches, unloadMatches } from '../actions'

function getToday() {
  return new Date().toLocaleDateString('sv-SE')
}

function TodaysMatches (props) {
  const [today, setToday] = useState() 
  let interval = null

  useEffect(() => {
    clearInterval(interval)
    props.loadTodaysMatches(today)

    interval = setInterval(() => {
      setToday(getToday())
    }, 1000 * 10)
    return props.unloadMatches
  }, [today])

  return (
    <div>
      <div className='flex flex-wrap'>
        {props.matches.map((match, index) =>
          <div key={'match-' + index} className='basis-full md:basis-1/2 lg:basis-1/3 px-2 py-2'>
            <Match saveMatch={props.saveMatch} match={match} user={props.user} />
          </div>)}
      </div>
    </div>
  )
}

TodaysMatches.propTypes = {
  user: PropTypes.object,
  matches: PropTypes.array.isRequired,
  loadTodaysMatches: PropTypes.func.isRequired,
  unloadMatches: PropTypes.func.isRequired,
  saveMatch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { matches, user } = state
  return { matches, user, ownProps }
}

export default connect(mapStateToProps, { saveMatch, loadTodaysMatches, unloadMatches })(TodaysMatches)
