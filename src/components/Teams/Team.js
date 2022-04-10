import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'

class Team extends Component {
  render () {
    const team = this.props.team

    return (
      <Card>
        <CardHeader
          style={{ overflow: 'hidden' }}
          avatar={<Avatar size={35} backgroundColor className='bg-secondary'>{team.teamRanking}</Avatar>}
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
