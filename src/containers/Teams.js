import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { connect } from 'react-redux'
import { loadTeams, unloadTeams } from '../actions'

class Teams extends React.Component {

  componentDidMount () {
    this.props.loadTeams(this.props.params.series)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params !== this.props.params) {
      this.props.loadTeams(nextProps.params.series)
    }
  }

  componentWillUnmount () {
    this.props.unloadTeams()
  }

  render () {
    return <Table selectable={false}>
             <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
               <TableRow>
                 <TableHeaderColumn>
                   Lag
                 </TableHeaderColumn>
                 <TableHeaderColumn>
                   Kontakt
                 </TableHeaderColumn>
                 <TableHeaderColumn>
                   Telefon
                 </TableHeaderColumn>
                 <TableHeaderColumn>
                   E-post
                 </TableHeaderColumn>
               </TableRow>
             </TableHeader>
             <TableBody displayRowCheckbox={false}>
               {this.props.teams.map(team => <TableRow key={team.id}>
                                               <TableRowColumn style={{whiteSpace: 'normal'}}>
                                                 {team.teamName}
                                               </TableRowColumn>
                                               <TableRowColumn style={{whiteSpace: 'normal'}}>
                                                 {team.contact}
                                               </TableRowColumn>
                                               <TableRowColumn style={{whiteSpace: 'normal'}}>
                                                 {team.phone}
                                               </TableRowColumn>
                                               <TableRowColumn style={{whiteSpace: 'normal'}}>
                                                 {team.email}
                                               </TableRowColumn>
                                             </TableRow>)}
             </TableBody>
           </Table>
  }
}

Teams.propTypes = {
  params: React.PropTypes.object.isRequired,
  teams: React.PropTypes.array.isRequired,
  loadTeams: React.PropTypes.func.isRequired,
  unloadTeams: React.PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const {teams} = state
  return {teams, ownProps}
}

export default connect(mapStateToProps, {loadTeams, unloadTeams})(Teams)
