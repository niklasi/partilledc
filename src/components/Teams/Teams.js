import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Team from './Team'
import { loadTeams, unloadTeams } from '../../actions'

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
    return (
      <div className='flex flex-wrap'>
        {this.props.teams.map((team, index) =>
          <div key={'team-' + index} className='basis-full md:basis-1/2 lg:basis-1/3 px-2 py-2'>
            <Team team={team} />
          </div>)}
      </div>
    )
  }
}

Teams.propTypes = {
  params: PropTypes.object.isRequired,
  teams: PropTypes.array.isRequired,
  loadTeams: PropTypes.func.isRequired,
  unloadTeams: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { teams } = state
  return { teams, ownProps }
}

// Teams.title = 'Lag'
export default connect(mapStateToProps, { loadTeams, unloadTeams })(Teams)
