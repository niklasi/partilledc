import React from 'react'
import { Card, CardHeader } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import MatchResult from './register-result'

class CardExampleExpandable extends React.Component {

  handleOpen () {
    this.setState({open: true})
  }

  handleClose () {
    this.setState({open: false})
  }

  render () {
    const actions = [
      <FlatButton label='Avbryt' secondary onTouchTap={this.handleClose.bind(this)} />,
      <FlatButton label='Spara' primary onTouchTap={this.handleClose.bind(this)} />
    ]

    const {palette} = getMuiTheme()
    const parts = ['Dubbel', '1:a singel', '2:a singel']

    const header = (part) => <TableHeaderColumn key={part} style={{paddingLeft: '5px'}}>
                               <FlatButton
                                 label={part}
                                 primary
                                 labelStyle={{textTransform: 'none'}}
                                 onTouchTap={this.handleOpen.bind(this)} />
                             </TableHeaderColumn>
    return <Card>
             <CardHeader avatar={<Avatar size={35} backgroundColor={palette.accent1Color}>
                                   4-2
                                 </Avatar>} title='Lirarnas lag - Konkurrenterna' subtitle='Bana 3 kl 20 den 8:e mars' />
             <Table selectable={false} multiselectable={false}>
               <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                 <TableRow>
                   {parts.map(header)}
                 </TableRow>
               </TableHeader>
               <TableBody displayRowCheckbox={false}>
                 <TableRow>
                   <TableRowColumn style={{whiteSpace: 'normal'}}>
                     4-2, 4-3, 4-1, 3-3, 4-3, 4-1
                   </TableRowColumn>
                   <TableRowColumn style={{whiteSpace: 'normal'}}>
                     4-2, 4-3, 4-1, 3-3, 4-3, 4-1
                   </TableRowColumn>
                   <TableRowColumn style={{whiteSpace: 'normal'}}>
                     4-2, 4-3, 4-1, 3-3, 4-3, 4-1
                   </TableRowColumn>
                 </TableRow>
               </TableBody>
             </Table>
             <Dialog
               title='Resultat'
               actions={actions}
               contentStyle={{width: '100%', maxWidth: 'none'}}
               modal
               open={this.state ? this.state.open : false}>
               <MatchResult />
             </Dialog>
           </Card>
  }
}

export default CardExampleExpandable
