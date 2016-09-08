import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class RegisterResult extends React.Component {
  constructor (props) {
    super(props)
    this.state = {result: [{home: 0, away: 0}]}
  }

  render () {
    const styles = {
      customWidth: {
        width: 35,
        marginRight: 15
      }
    }

    const selectFieldFactory = (result, set) => {
      const handleChange = (e, index, value) => {
        let state = this.state
        console.log('value', e)
        if (value === 4 && state.length - 1 === index) {
          state.push({home: 0, away: 0})
          this.setState({result: state})
        }
      }
      return <div key={'result-' + set}>
               <SelectField
                 key={'team-' + set + '-homeTeam'}
                 value={result.home}
                 style={styles.customWidth}
                 onChange={handleChange}>
                 <MenuItem value={0} primaryText='0' />
                 <MenuItem value={1} primaryText='1' />
                 <MenuItem value={2} primaryText='2' />
                 <MenuItem value={3} primaryText='3' />
                 <MenuItem value={4} primaryText='4' />
               </SelectField>
               <SelectField
                 key={'team-' + set + '-awayTeam'}
                 value={result.away}
                 style={styles.customWidth}
                 onChange={handleChange}>
                 <MenuItem value={0} primaryText='0' />
                 <MenuItem value={1} primaryText='1' />
                 <MenuItem value={2} primaryText='2' />
                 <MenuItem value={3} primaryText='3' />
                 <MenuItem value={4} primaryText='4' />
               </SelectField>
             </div>
    }

    return <div>
             {this.state.result.map(selectFieldFactory)}
           </div>
  }
}

// RegisterResult.propTypes = {
//   result: React.PropTypes.object.isRequired
// }

export default RegisterResult
