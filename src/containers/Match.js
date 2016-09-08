import React, { Component } from 'react'
import { Card, CardHeader } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RegisterResult from './RegisterResult'

const colMapper = ({ match, result = [] }) => <TableRowColumn key={match} style={{whiteSpace: 'normal'}}>
                                                {result.join(', ')}
                                              </TableRowColumn>

class Match extends Component {

  constructor (props) {
    super(props)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.state = {open: false, result: {}}
  }

  handleOpen (result) {
    this.setState({open: true, result})
  }

  handleCancel () {
    this.setState({open: false})
  }

  handleSave () {
    this.setState({open: false})
  }

  render () {
    const match = this.props.match

    const actions = [
      <FlatButton label='Avbryt' secondary onTouchTap={this.handleCancel} />,
      <FlatButton label='Spara' primary onTouchTap={this.handleSave} />
    ]

    const {palette} = getMuiTheme()

    const header = (result) => {
      const open = () => this.handleOpen(result)
      return <TableHeaderColumn key={match} style={{paddingLeft: '5px'}}>
               <FlatButton
                 label={result.match}
                 primary
                 labelStyle={{textTransform: 'none'}}
                 onTouchTap={open} />
             </TableHeaderColumn>
    }

    return <Card>
             <CardHeader avatar={<Avatar size={35} backgroundColor={palette.accent1Color}>
                                   {`${match.homeTeam.matchp}-${match.awayTeam.matchp}`}
                                 </Avatar>} title={`${match.homeTeam.teamName} - ${match.awayTeam.teamName}`} subtitle={'Bana ' + match.lane + ' ' + match.date + ' kl ' + match.time} />
             <Table selectable={false} multiselectable={false}>
               <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                 <TableRow>
                   {match.result.map(header)}
                 </TableRow>
               </TableHeader>
               <TableBody displayRowCheckbox={false}>
                 <TableRow>
                   {match.result.map(colMapper)}
                 </TableRow>
               </TableBody>
             </Table>
             <Dialog
               title={`Resultat - ${this.state.result.match}`}
               actions={actions}
               contentStyle={{width: '100%', maxWidth: 'none'}}
               modal
               open={this.state.open}>
               <RegisterResult result={this.state.result} />
             </Dialog>
           </Card>
  }
}

Match.propTypes = {
  match: React.PropTypes.object.isRequired
}

export default Match
