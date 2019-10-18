import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { connect } from 'react-redux'
import { loadScrapedSeries } from '../../actions'
import allSeries from '../../series.json'

class Reset extends React.Component {
  componentDidMount () {
    this.props.loadScrapedSeries(this.props.slug)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.slug !== this.props.slug) {
      this.props.loadScrapedSeries(nextProps.slug)
    }
  }

  render () {
    const companySeries = allSeries.companySeries.filter(s => s.id === this.props.series).length > 0
    const displayContact = companySeries ? undefined : 'none'
    const teams = this.props.scrapedData.teams || []
    const matches = this.props.scrapedData.matches || []

    return (<div>
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>
            Ranking
            </TableHeaderColumn>
            <TableHeaderColumn>
            Lag
            </TableHeaderColumn>
            <TableHeaderColumn style={{display: displayContact}}>
            Kontakt
            </TableHeaderColumn>
            <TableHeaderColumn>
            Telefon
            </TableHeaderColumn>
            <TableHeaderColumn>
            Email
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {teams.map((team, index) => <TableRow key={'team-' + index}>
            <TableRowColumn style={{whiteSpace: 'normal'}}>
              {team.team_ranking}
            </TableRowColumn>
            <TableRowColumn style={{whiteSpace: 'normal'}}>
              {team.team_name}
            </TableRowColumn>
            <TableRowColumn style={{whiteSpace: 'normal', display: displayContact}}>
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
      <hr />
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>
            Datum
            </TableHeaderColumn>
            <TableHeaderColumn>
            Tid
            </TableHeaderColumn>
            <TableHeaderColumn>
            Lag
            </TableHeaderColumn>
            <TableHeaderColumn>
            Banor
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {matches.map((match, index) => <TableRow key={'match-' + index}>
            <TableRowColumn style={{whiteSpace: 'normal'}}>
              {match.date}
            </TableRowColumn>
            <TableRowColumn style={{whiteSpace: 'normal'}}>
              {match.time}
            </TableRowColumn>
            <TableRowColumn style={{whiteSpace: 'normal'}}>
              {match.home_team}-{match.away_team}
            </TableRowColumn>
            <TableRowColumn style={{whiteSpace: 'normal'}}>
              {match.lanes}
            </TableRowColumn>
          </TableRow>)}
        </TableBody>
      </Table>
    </div>)
  }
}

const mapStateToProps = (state, ownProps) => {
  const {scrapedData} = state
  const params = ownProps.params || {}
  const series = params.series || ownProps.series
  const slug = ownProps.location.state.slug
  return {scrapedData, series, slug}
}

export default connect(mapStateToProps, {loadScrapedSeries})(Reset)
