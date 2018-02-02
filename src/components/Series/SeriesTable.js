import React from 'react'
import PropTypes from 'prop-types'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
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

    const displayMatchp = companySeries ? undefined : 'none'
    const displaySetAndGame = companySeries ? 'none' : undefined

    return <Table selectable={false}>
      <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>
            {companySeries ? 'Lag' : 'Spelare'}
          </TableHeaderColumn>
          <TableHeaderColumn>
                   Matcher
                 </TableHeaderColumn>
          <TableHeaderColumn style={{display: displayMatchp}}>
                   Matchp
                 </TableHeaderColumn>
          <TableHeaderColumn style={{display: displaySetAndGame}}>
                   Set
                 </TableHeaderColumn>
          <TableHeaderColumn style={{display: displaySetAndGame}}>
                   Gem
                 </TableHeaderColumn>
          <TableHeaderColumn>
                   Poäng
                 </TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {this.props.seriesTable.map(team => <TableRow key={team.id}>
          <TableRowColumn style={{whiteSpace: 'normal'}}>
            {team.teamName}
          </TableRowColumn>
          <TableRowColumn style={{whiteSpace: 'normal'}}>
            {team.matches}
          </TableRowColumn>
          <TableRowColumn style={{whiteSpace: 'normal', display: displayMatchp}}>
            {`${team.matchp.won.points}-${team.matchp.lost.points}`}
          </TableRowColumn>
          <TableRowColumn style={{whiteSpace: 'normal', display: displaySetAndGame}}>
            {`${team.matchp.won.sets}-${team.matchp.lost.sets}`}
          </TableRowColumn>
          <TableRowColumn style={{whiteSpace: 'normal', display: displaySetAndGame}}>
            {`${team.matchp.won.games}-${team.matchp.lost.games}`}
          </TableRowColumn>
          <TableRowColumn style={{whiteSpace: 'normal'}}>
            {team.teamp}
          </TableRowColumn>
        </TableRow>)}
      </TableBody>
    </Table>
  }
}

SeriesTable.propTypes = {
  seriesTable: PropTypes.array.isRequired,
  loadSeriesTable: PropTypes.func.isRequired,
  unloadSeriesTable: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const {seriesTable} = state
  const params = ownProps.params || {}
  const series = params.series || ownProps.series
  return {seriesTable, series}
}

export default connect(mapStateToProps, {loadSeriesTable, unloadSeriesTable})(SeriesTable)
