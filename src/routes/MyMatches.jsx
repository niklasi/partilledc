import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import Match from '../components/Match'
import { connect } from 'react-redux'
import { saveMatch, loadMyMatches, unloadMatches } from '../actions'
import allSeries from '../series.json'

function MyMatches (props) {

  useEffect(() => {
    props.loadMyMatches(props.user.uid)
    return props.unloadMatches
  }, [props.user.uid])

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

MyMatches.propTypes = {
  user: PropTypes.object,
  matches: PropTypes.array.isRequired,
  loadMyMatches: PropTypes.func.isRequired,
  unloadMatches: PropTypes.func.isRequired,
  saveMatch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { matches, user } = state
  return { matches, user, ownProps }
}

export default connect(mapStateToProps, { saveMatch, loadMyMatches, unloadMatches })(MyMatches)
