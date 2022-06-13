import {useState} from 'react'
import {MatchResult} from 'src/lib/model'

type RegisterResultProps = {
    matchResult: MatchResult
    onChangeResult: (match: MatchResult) => void
}

type Result = MatchResult['result'][0]

function RegisterResult(props: RegisterResultProps) {
    const [matchResult, setMatchResult] = useState(props.matchResult)

    const resultFactory = (result: Result, set: number) => {
        const teamFieldFactory = (team: 'home' | 'away') => {
            const changeScore = (value: number) => {
                matchResult.result[set][team] = value
                if (value === 4 && matchResult.result.length - 1 === set) {
                    matchResult.result.push({home: 0, away: 0})
                }
                props.onChangeResult(matchResult)
                setMatchResult(matchResult)
            }

            const currentValue = result[team] || 0

            return (
                <select
                    key={team + '-' + set}
                    defaultValue={currentValue}
                    className="m-1"
                    onChange={(e) => changeScore(+e.target.value)}
                >
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

    return <div className="flex flex-row flex-wrap">{matchResult.result.map(resultFactory)}</div>
}

export default RegisterResult
