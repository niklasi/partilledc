import {useState} from 'react'

function RegisterResult(props) {
    const [match, setMatch] = useState(props.match)

    const resultFactory = (result, set) => {
        const teamFieldFactory = (team) => {
            const changeScore = (e) => {
                const value = e.target.value

                match.result[set][team] = value
                if (value === 4 && match.result.length - 1 === set) {
                    match.result.push({home: 0, away: 0})
                }
                props.onChangeResult(match)
                setMatch(match)
            }

            const currentValue = result[team] || 0

            return (
                <select key={team + '-' + set} defaultValue={currentValue} className="m-1" onChange={changeScore}>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>
            )
        }

        return ['home', 'away'].map(teamFieldFactory)
    }

    return <div className="flex flex-row flex-wrap">{match.result.map(resultFactory)}</div>
}

export default RegisterResult
