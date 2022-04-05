import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadSeriesTable, unloadSeriesTable } from '../../actions'
import allSeries from '../../series.json'

class SeriesTable extends React.Component {
  componentDidMount () {
    this.props.loadSeriesTable(this.props.series)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.series !== this.props.series) {
      this.props.loadSeriesTable(nextProps.series)
    }
  }

  componentWillUnmount () {
    this.props.unloadSeriesTable()
  }

  render () {
    const companySeries = allSeries.companySeries.filter(s => s.id === this.props.series).length > 0

    const displayMatchp = companySeries ? undefined : 'hidden'
    const displaySetAndGame = companySeries ? 'hidden' : undefined

    const seriesTable = this.props.seriesTable[this.props.series] || []
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
      // <Table selectable={false}>
      //   <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
      //     <TableRow>
      //       <TableHeaderColumn>
      //         {companySeries ? 'Lag' : 'Spelare'}
      //       </TableHeaderColumn>
      //       <TableHeaderColumn>
      //         Matcher
      //       </TableHeaderColumn>
      //       <TableHeaderColumn style={{ display: displayMatchp }}>
      //         Matchp
      //       </TableHeaderColumn>
      //       <TableHeaderColumn style={{ display: displaySetAndGame }}>
      //         Set
      //       </TableHeaderColumn>
      //       <TableHeaderColumn style={{ display: displaySetAndGame }}>
      //         Gem
      //       </TableHeaderColumn>
      //       <TableHeaderColumn>
      //         Poäng
      //       </TableHeaderColumn>
      //     </TableRow>
      //   </TableHeader>
      //   <TableBody displayRowCheckbox={false}>
      //     {seriesTable.map(team =>
      //       <TableRow key={team.id}>
      //         <TableRowColumn style={{ whiteSpace: 'normal' }}>
      //           {team.teamName}
      //         </TableRowColumn>
      //         <TableRowColumn style={{ whiteSpace: 'normal' }}>
      //           {team.matches}
      //         </TableRowColumn>
      //         <TableRowColumn style={{ whiteSpace: 'normal', display: displayMatchp }}>
      //           {`${team.matchp.won.points}-${team.matchp.lost.points}`}
      //         </TableRowColumn>
      //         <TableRowColumn style={{ whiteSpace: 'normal', display: displaySetAndGame }}>
      //           {`${team.matchp.won.sets}-${team.matchp.lost.sets}`}
      //         </TableRowColumn>
      //         <TableRowColumn style={{ whiteSpace: 'normal', display: displaySetAndGame }}>
      //           {`${team.matchp.won.games}-${team.matchp.lost.games}`}
      //         </TableRowColumn>
      //         <TableRowColumn style={{ whiteSpace: 'normal' }}>
      //           {team.teamp}
      //         </TableRowColumn>
      //       </TableRow>)}
      //   </TableBody>
      // </Table>
    )
  }
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

export default connect(mapStateToProps, { loadSeriesTable, unloadSeriesTable })(SeriesTable)
