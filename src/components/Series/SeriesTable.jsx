import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from '../../withRouter'
import { connect } from 'react-redux'
import { loadSeriesTable, unloadSeriesTable } from '../../actions'
import allSeries from '../../series.json'

function SeriesTable (props) {
  const series = props.series

  useEffect(() => {
    props.loadSeriesTable(series)
    return props.unloadSeriesTable
  }, [series])


  const companySeries = allSeries.companySeries.filter(s => s.id === series).length > 0

  const displayMatchp = companySeries ? undefined : 'hidden'
  const displaySetAndGame = companySeries ? 'hidden' : undefined

  const seriesTable = props.seriesTable[series] || []
  return (
    <table className='md:table-fixed border border-collapse w-full'>
      <thead className='text-left text-gray-400 h-14'>
        <tr className='divide-y divide-solid border'>
          <th className='font-normal text-xs px-3'>{companySeries ? 'Lag' : 'Spelare'}</th>
          <th className='font-normal text-xs'>Matcher</th>
          <th className={`font-normal text-xs ${displayMatchp}`}>Matchp</th>
          <th className={`font-normal text-xs ${displaySetAndGame}`}>Set</th>
          <th className={`font-normal text-xs ${displaySetAndGame}`}>Gem</th>
          <th className='font-normal text-xs'>Poäng</th>
        </tr>
      </thead>
      <tbody className='text-sm text-left'>
        {seriesTable.map(team => {
          return (
            <tr key={team.id} className='divide-y divide-solid border h-12'>
              <td className='px-3'>
                {team.teamName}
              </td>
              <td>
                {team.matches}
              </td>
              <td className={displayMatchp}>
                {`${team.matchp.won.points}-${team.matchp.lost.points}`}
              </td>
              <td className={displaySetAndGame}>
                {`${team.matchp.won.sets}-${team.matchp.lost.sets}`}
              </td>
              <td className={displaySetAndGame}>
                {`${team.matchp.won.games}-${team.matchp.lost.games}`}
              </td>
              <td>
                {team.teamp}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

SeriesTable.propTypes = {
  seriesTable: PropTypes.object.isRequired,
  loadSeriesTable: PropTypes.func.isRequired,
  unloadSeriesTable: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { seriesTable } = state
  const params = ownProps.params || {}
  const series = params.series || ownProps.series
  return { seriesTable, series }
}

export default withRouter(connect(mapStateToProps, { loadSeriesTable, unloadSeriesTable })(SeriesTable))
