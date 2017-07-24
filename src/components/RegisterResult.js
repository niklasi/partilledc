import React from 'react'
import PropTypes from 'prop-types' 
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const styles = {
  customWidth: {
    width: 35,
    marginRight: 15
  }
}

class RegisterResult extends React.Component {
  constructor (props) {
    super(props)
    this.state = {match: props.match}
  }

  render () {
    const resultFactory = (result, set) => {
      const teamFieldFactory = (team) => {
        const changeScore = (e, value) => {
          let match = this.state.match

          match.result[set][team] = value
          if (value === 4 && match.result.length - 1 === set) {
            match.result.push({home: 0, away: 0})
          }
          this.props.onChangeResult(match)
          this.setState({match})
        }

        return <SelectField
                 key={team + '-' + set}
                 value={result[team] || 0}
                 style={styles.customWidth}
                 onChange={changeScore}>
                 <MenuItem value={0} primaryText='0' />
                 <MenuItem value={1} primaryText='1' />
                 <MenuItem value={2} primaryText='2' />
                 <MenuItem value={3} primaryText='3' />
                 <MenuItem value={4} primaryText='4' />
               </SelectField>
      }

      return ['home', 'away'].map(teamFieldFactory)
    }

    return <div>
             {this.state.match.result.map(resultFactory)}
           </div>
  }
}

RegisterResult.propTypes = {
  match: PropTypes.object.isRequired,
  onChangeResult: PropTypes.func.isRequired
}

export default RegisterResult
