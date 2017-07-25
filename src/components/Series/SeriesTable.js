import React from 'react'
import PropTypes from 'prop-types' 
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { connect } from 'react-redux'
import { loadSeriesTable, unloadSeriesTable } from '../../actions'
import allSeries from '../../series.json'

class SeriesTable extends React.Component {

  componentDidMount () {
    this.props.loadSeriesTable(this.props.params.series)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params !== this.props.params) {
      this.props.loadSeriesTable(nextProps.params.series)
    }
  }

  componentWillUnmount () {
    this.props.unloadSeriesTable()
  }

  render () {
    const companySeries = allSeries.companySeries.filter(s => s.id === this.props.params.series).length > 0

    const displayMatchp = companySeries ? undefined : 'none'
    const displaySetAndGame = companySeries ? 'none' : undefined

    return <Table selectable={false}>
             <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
               <TableRow>
                 <TableHeaderColumn>
                   Lag
                 </TableHeaderColumn>
                 <TableHeaderColumn>
                   Matcher
                 </TableHeaderColumn>
                 <TableHeaderColumn>
                   Poäng
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
                                                     <TableRowColumn style={{whiteSpace: 'normal'}}>
                                                       {team.teamp}
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
                                                   </TableRow>)}
             </TableBody>
           </Table>
  }
}

SeriesTable.propTypes = {
  params: PropTypes.object.isRequired,
  seriesTable: PropTypes.array.isRequired,
  loadSeriesTable: PropTypes.func.isRequired,
  unloadSeriesTable: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const {seriesTable} = state
  return {seriesTable, ownProps}
}

export default connect(mapStateToProps, {loadSeriesTable, unloadSeriesTable})(SeriesTable)
