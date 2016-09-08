import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { connect } from 'react-redux'
import { loadSeriesTable, unloadSeriesTable } from '../actions'

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
                   Matchp
                 </TableHeaderColumn>
                 <TableHeaderColumn>
                   Lagp
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
                                                       {team.matchp}
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
  params: React.PropTypes.object.isRequired,
  seriesTable: React.PropTypes.array.isRequired,
  loadSeriesTable: React.PropTypes.func.isRequired,
  unloadSeriesTable: React.PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const {seriesTable} = state
  return {seriesTable, ownProps}
}

export default connect(mapStateToProps, {loadSeriesTable, unloadSeriesTable})(SeriesTable)
