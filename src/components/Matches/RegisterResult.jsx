import PropTypes from 'prop-types'

class RegisterResult extends React.Component {
  constructor (props) {
    super(props)
    this.state = { match: props.match }
  }

  render () {
    const resultFactory = (result, set) => {
      const teamFieldFactory = (team) => {
        const changeScore = (e) => {
          const value = e.target.value
          const match = this.state.match

          match.result[set][team] = value
          if (value === 4 && match.result.length - 1 === set) {
            match.result.push({ home: 0, away: 0 })
          }
          this.props.onChangeResult(match)
          this.setState({ match })
        }

        const currentValue = result[team] || 0

        return (
          <select
            key={team + '-' + set}
            className='m-1'
            onChange={changeScore}
          >
            <option value={0} selected={0 === currentValue}>0</option>
            <option value={1} selected={1 === currentValue}>1</option>
            <option value={2} selected={2 === currentValue}>2</option>
            <option value={3} selected={3 === currentValue}>3</option>
            <option value={4} selected={4 === currentValue}>4</option>
          </select>
        )
      }

      return ['home', 'away'].map(teamFieldFactory)
    }

    return (
      <div className='flex flex-row flex-wrap'>
          {this.state.match.result.map(resultFactory)}
      </div>
    )
  }
}

RegisterResult.propTypes = {
  match: PropTypes.object.isRequired,
  onChangeResult: PropTypes.func.isRequired
}

export default RegisterResult
