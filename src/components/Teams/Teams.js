import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Team from './Team'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { loadTeams, unloadTeams } from '../../actions'

const GridLayout = WidthProvider(Responsive)
const defaultProps = {className: 'layout',
  breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
  cols: {lg: 12, md: 12, sm: 6, xs: 6, xxs: 6},
  isDraggable: false,
  rowHeight: 100
}

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
    return <GridLayout key='layout' {...defaultProps}>
      {this.props.teams.map((team, index) => <div key={'team-' + index} data-grid={{x: (index % 2) * 6, y: index + 1, w: 6, h: 1}}>
        <Team team={team} />
      </div>)}
    </GridLayout>
  }
}

Teams.propTypes = {
  params: PropTypes.object.isRequired,
  teams: PropTypes.array.isRequired,
  loadTeams: PropTypes.func.isRequired,
  unloadTeams: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const {teams} = state
  return {teams, ownProps}
}

// Teams.title = 'Lag'
export default connect(mapStateToProps, {loadTeams, unloadTeams})(Teams)
