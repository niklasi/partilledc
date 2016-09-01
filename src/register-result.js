import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class RegisterResult extends React.Component {
  constructor (props) {
    super(props)
    this.handleChangeTeamOne = this.handleChangeTeamOne.bind(this)
    this.handleChangeTeamTwo = this.handleChangeTeamTwo.bind(this)
    this.state = {sets: [0], teamOne: [0], teamTwo: [0]}
  }

  handleChangeTeamOne (event, index, value) {
    console.log(event)
    this.setState({teamOne: value})
  }

  handleChangeTeamTwo (event, index, value) {
    this.setState({teamTwo: value})
  }

  render () {
    const styles = {
      customWidth: {
        width: 35,
        marginRight: 15
      }
    }

    const teams = [{value: this.state.teamOne}, {value: this.state.teamTwo}]

    const selectFieldFactory = (set) => {
      const teamFieldFactory = (team, teamNumber) => {
        const handleChange = (event, index, value) => {
          if (teamNumber === 0) {
            let values = this.state.teamOne
            if (values.length - 1 >= set) {
              values[set] = value
            } else {
              values.push(value)
            }

            this.setState({teamOne: values})
          } else {
            let values = this.state.teamTwo
            if (values.length - 1 >= set) {
              values[set] = value
            } else {
              values.push(value)
            }

            this.setState({teamTwo: values})
          }

          if (value === 4 && this.state.sets.length - 1 <= set) {
            let sets = this.state.sets
            sets.push(set + 1)
            this.setState({sets: sets})
          }
        }

        return <SelectField
                 key={'team-' + set + '-' + teamNumber}
                 value={team.value[set] || 0}
                 style={styles.customWidth}
                 onChange={handleChange}>
                 <MenuItem value={0} primaryText='0' />
                 <MenuItem value={1} primaryText='1' />
                 <MenuItem value={2} primaryText='2' />
                 <MenuItem value={3} primaryText='3' />
                 <MenuItem value={4} primaryText='4' />
               </SelectField>
      }

      return teams.map(teamFieldFactory)
    }

    return <div>
             {this.state.sets.map(selectFieldFactory)}
           </div>
  }
}

export default RegisterResult
