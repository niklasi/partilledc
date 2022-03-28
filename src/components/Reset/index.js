import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { loadScrapedSeries, resetSeries } from '../../actions'
import allSeries from '../../series.json'

class Reset extends React.Component {
  constructor (props) {
    super(props)
    this.state = { open: false }
    this.handleToggleDialog = this.handleToggleDialog.bind(this)
  }

  componentDidMount () {
    this.props.loadScrapedSeries(this.props.slug)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.slug !== this.props.slug) {
      this.props.loadScrapedSeries(nextProps.slug)
    }
  }

  handleToggleDialog () {
    const open = this.state.open

    this.setState({ open: !open })
  }

  render () {
    const series = this.props.series
    const slug = this.props.slug
    const uid = this.props.user.uid
    const seriesName = allSeries.companySeries
      .concat(allSeries.exerciseSeries)
      .find(x => x.id === series).text

    const companySeries = allSeries.companySeries.filter(s => s.id === this.props.series).length > 0
    const displayContact = companySeries ? undefined : 'none'
    const teams = this.props.scrapedData.teams || []
    const matches = this.props.scrapedData.matches || []
    const actions = [
      <FlatButton
        key='cancel'
        label='Avbryt'
        secondary
        onClick={this.handleToggleDialog}
      />,
      <FlatButton
        key='reset'
        label='Nollställ'
        primary
        onClick={() => {
          this.props.resetSeries(series, slug, uid)
          this.handleToggleDialog()
        }}
      />
    ]

    return (
      <div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>
                Ranking
              </TableHeaderColumn>
              <TableHeaderColumn>
                Lag
              </TableHeaderColumn>
              <TableHeaderColumn style={{ display: displayContact }}>
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
            {
        teams.map((team, index) =>
          <TableRow key={'team-' + index}>
            <TableRowColumn style={{ whiteSpace: 'normal' }}>
              {team.team_ranking}
            </TableRowColumn>
            <TableRowColumn style={{ whiteSpace: 'normal' }}>
              {team.team_name}
            </TableRowColumn>
            <TableRowColumn style={{ whiteSpace: 'normal', display: displayContact }}>
              {team.contact}
            </TableRowColumn>
            <TableRowColumn style={{ whiteSpace: 'normal' }}>
              {team.phone}
            </TableRowColumn>
            <TableRowColumn style={{ whiteSpace: 'normal' }}>
              {team.email}
            </TableRowColumn>
          </TableRow>)
      }
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
            {
        matches.map((match, index) => (
          <TableRow key={'match-' + index}>
            <TableRowColumn style={{ whiteSpace: 'normal' }}>
              {match.date}
            </TableRowColumn>
            <TableRowColumn style={{ whiteSpace: 'normal' }}>
              {match.time}
            </TableRowColumn>
            <TableRowColumn style={{ whiteSpace: 'normal' }}>
              {match.home_team}-{match.away_team}
            </TableRowColumn>
            <TableRowColumn style={{ whiteSpace: 'normal' }}>
              {match.lanes}
            </TableRowColumn>
          </TableRow>))
      }
          </TableBody>
        </Table>
        <RaisedButton label='Nollställ serien' secondary fullWidth onClick={this.handleToggleDialog} />
        <Dialog
          title={'Nollställ ' + seriesName}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleToggleDialog}
        >
          Du är på väg att nollställa serien. Detta innebär att nuvarande
          resultat i serien kommer att tas bort och lag och spelschema kommer att ersättas med
          det som finns på denna sidan.
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { scrapedData, user } = state
  const params = ownProps.params || {}
  const series = params.series || ownProps.series
  const slug = ownProps.location.state.slug
  return { scrapedData, user, series, slug }
}

export default connect(mapStateToProps, { loadScrapedSeries, resetSeries })(Reset)
