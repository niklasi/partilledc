import React from 'react'
import PropTypes from 'prop-types'
import { Table, TableHeader, TableBody, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { matchPoints } from '../../lib/partilledc-score'

class PrintMatches extends React.Component {
  render () {
    const formatMatchPoints = (score) => `${score.home.points}-${score.away.points}`
    const colMapper = ({ text, result = [] }) =>
      <TableRowColumn key={text} style={{ whiteSpace: 'normal' }}>
        {result.filter(r => r.home !== 0 || r.away !== 0).map(r => r.home + '-' + r.away).join(', ')}
      </TableRowColumn>
    return (
      <Table className='match-result-table' selectable={false}>
        <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>
              {this.props.isCompanySeries ? 'Lag' : 'Spelare'}
            </TableHeaderColumn>
            <TableHeaderColumn>
              Speltid
            </TableHeaderColumn>
            <TableHeaderColumn>
              {this.props.isCompanySeries ? 'Dubbel' : 'Match'}
            </TableHeaderColumn>
            {this.props.isCompanySeries &&
              <TableHeaderColumn>
                1:a singel
              </TableHeaderColumn>}
            {this.props.isCompanySeries &&
              <TableHeaderColumn>
                2:a singel
              </TableHeaderColumn>}
            <TableHeaderColumn>
              Resultat
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.props.matches.map((match, index) =>
            <TableRow key={`print-match-${index}`}>
              <TableRowColumn style={{ whiteSpace: 'normal' }}>
                {`${match.homeTeam.teamName} - ${match.awayTeam.teamName}`}
              </TableRowColumn>
              <TableRowColumn style={{ whiteSpace: 'normal' }}>
                {match.date + ' kl ' + match.time}
              </TableRowColumn>
              {match.matches.map(colMapper)}
              <TableRowColumn style={{ whiteSpace: 'normal' }}>
                {formatMatchPoints(matchPoints(match.matches.map(m => m.result)))}
              </TableRowColumn>
            </TableRow>)}
        </TableBody>
      </Table>
    )
  }
}

PrintMatches.propTypes = {
  isCompanySeries: PropTypes.bool,
  matches: PropTypes.array.isRequired
}

export default PrintMatches
