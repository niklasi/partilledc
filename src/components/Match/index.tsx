import {useState} from 'react'
import Card from '../Shared/Card'
import Dialog from '../Shared/Dialog'
import Button from '../Shared/Button'
import {Pin} from '../Pin'
import RegisterResult from './RegisterResult'
import {useAuth} from '../../hooks/useAuth'
import {matchPoints} from '../../lib/partilledc-score'
import {saveMatch} from '../../lib/api'
import type * as model from '../../lib/model'

type MatchProps = {
    saveMatch: (match: model.Match) => Promise<void>
    match: model.Match
    user: model.User
}
const colMapper = ({text, result = []}) => (
    <p key={text} className="text-sm whitespace-normal">
        {result
            .filter((r) => r.home !== 0 || r.away !== 0)
            .map((r) => r.home + '-' + r.away)
            .join(', ')}
    </p>
)

function Match(props: MatchProps) {
    const {user} = useAuth()
    const [openEditMatchResult, setOpenEditMatchResult] = useState(false)
    const [editMatchResult, setEditMatchResult] = useState<model.MatchResult>({text: '', result: [{home: 0, away: 0}]})

    function handleOpen(matchResult: model.MatchResult) {
        setEditMatchResult(matchResult)
        setOpenEditMatchResult(true)
    }

    function handleClose() {
        setOpenEditMatchResult(false)
    }

    function handleChangeResult(matchResult: model.MatchResult) {
        const match = props.match
        match.matches = match.matches.map((m) => {
            if (m.text === editMatchResult.text) return matchResult
            return m
        })
        saveMatch(match)
    }

    const match = props.match

    const actions = [<Button key="close_button" label="Stäng" primary onClick={handleClose} />]

    const header = (item: model.MatchResult) => {
        const tryOpen = () => {
            if (!user.isAnonymous) {
                handleOpen(item)
            }
        }
        return <Button label={item.text} primary className="normal-case" onClick={tryOpen} />
    }

    const formatMatchPoints = (score: ReturnType<typeof matchPoints>) => `${score.home.points}-${score.away.points}`
    return (
        <Card
            className="h-32"
            avatar={formatMatchPoints(matchPoints(match.matches))}
            title={`${match.homeTeam.teamName} - ${match.awayTeam.teamName}`}
            subtitle={'Bana ' + match.lane + ' ' + match.date + ' kl ' + match.time}
        >
            <div className="flex flex-row justify-between my-1">
                {match.matches.map((matchResult, index) => {
                    return (
                        <div key={`match-${index}`} className="flex flex-col flex-wrap items-center">
                            {header(matchResult)}
                            {colMapper(matchResult)}
                        </div>
                    )
                })}
            </div>
            {openEditMatchResult && (
                <Dialog title="Resultat" actions={actions} open={openEditMatchResult}>
                    <Pin required={user.requiresPin}>
                        <RegisterResult onChangeResult={handleChangeResult} matchResult={editMatchResult} />
                    </Pin>
                </Dialog>
            )}
        </Card>
    )
}

export default Match
