import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import Match from '../../components/Match'
import { connect } from 'react-redux'
import { saveMatch, loadMatches, unloadMatches } from '../../actions'
import allSeries from '../../series.json'
import Print from '../../components/Match/Print'

function Matches (props) {
  const {series} = useParams()

  useEffect(() => {
    props.loadMatches(series)
    return props.unloadMatches
  }, [series])

  const isCompanySeries = allSeries.companySeries.filter(s => s.id === series).length > 0
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
  user: PropTypes.object,
  matches: PropTypes.array.isRequired,
  loadMatches: PropTypes.func.isRequired,
  unloadMatches: PropTypes.func.isRequired,
  saveMatch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { matches, user } = state
  return { matches, user, ownProps }
}

export default connect(mapStateToProps, { saveMatch, loadMatches, unloadMatches })(Matches)
