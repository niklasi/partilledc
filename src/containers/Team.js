import React, { Component } from 'react'
import { Card, CardHeader } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

class Team extends Component {

  render () {
    const team = this.props.team

    const {palette} = getMuiTheme()

    return <Card>
             <CardHeader avatar={<Avatar size={35} backgroundColor={palette.accent1Color}>
                                   {team.teamRanking}
                                 </Avatar>} title={team.teamName} subtitle={<div>{'Kontakt: ' + team.contact}<div>{'Tel: ' + team.phone}</div><div>{'Email: ' + team.email}</div></div>} />
           </Card>
  }
}

Team.propTypes = {
  team: React.PropTypes.object.isRequired
}

export default Team
