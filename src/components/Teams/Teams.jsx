import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Team from './Team'
import { loadTeams, unloadTeams } from '../../actions'

function Teams (props) {
  const { series } = useParams()
  
  useEffect(() => {
    props.loadTeams(series)
    return props.unloadTeams
  }, [series])

  return (
    <div className='flex flex-wrap'>
      {props.teams.map((team, index) =>
        <div key={'team-' + index} className='basis-full md:basis-1/2 lg:basis-1/3 px-2 py-2'>
          <Team team={team} />
        </div>)}
    </div>
  )
}

Teams.propTypes = {
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
