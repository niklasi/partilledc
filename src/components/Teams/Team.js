import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

class Team extends Component {
  render () {
    const team = this.props.team

    const { palette } = getMuiTheme()

    return (
      <Card>
        <CardHeader
          style={{ overflow: 'hidden' }}
          avatar={<Avatar size={35} backgroundColor={palette.accent1Color}>{team.teamRanking}</Avatar>}
          title={team.teamName}
          subtitle={<div>{team.contact}<div>{team.phone}</div><div>{team.email}</div></div>}
        />
      </Card>
    )
  }
}

Team.propTypes = {
  team: PropTypes.object.isRequired
}

export default Team
