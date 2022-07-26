import {useState} from 'react'
import {SetResult} from './SetResult'
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
                setMatchResult({...matchResult})
            }

            const currentValue = result[team] || 0

            return (
                <div key={`lb-container-${team}-${set}`} className="w-12 m-1">
                    <SetResult selectedValue={currentValue} onChange={changeScore} />
                </div>
            )
        }

        return (
            <div key={`container-${set}`} className="relative flex flex-row justify-start">
                {['home', 'away'].map(teamFieldFactory)}
            </div>
        )
    }

    return <div className="flex flex-row flex-wrap w-full">{matchResult.result.map(resultFactory)}</div>
}

export default RegisterResult
