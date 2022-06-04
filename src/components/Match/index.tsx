import {useState} from 'react'
import Card from '../Shared/Card'
import TextField from '../Shared/TextField'
import Dialog from '../Shared/Dialog'
import Button from '../Shared/Button'
import RegisterResult from './RegisterResult'
import {useAuth} from '../../hooks/useAuth'
import {matchPoints} from '../../lib/partilledc-score'
import {saveMatch} from '../../lib/api'
import type * as model from '../../lib/model'

type MatchProps = {
    saveMatch: (match: model.Match) => Promise<void>
    match: model.Match
    user: any
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
    let timerId = null
    const {user} = useAuth()
    const [open, setOpen] = useState(false)
    const [requirePin, setRequirePin] = useState(isPinEnabled())
    const [wrongPin, setWrongPin] = useState(true)
    const [editMatch, setEditMatch] = useState<model.MatchResult>({text: '', result: [{home: 0, away: 0}]})

    function isPinEnabled() {
        return user.uid === 'c7RECUVjoIM1iHB7jvldxScB0C62'
    }

    function handleOpen(matchResult: model.MatchResult) {
        setEditMatch(matchResult)
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
        setRequirePin(false)
        enablePin()
    }

    function enablePin() {
        if (!requirePin) return
        clearTimeout(timerId)
        timerId = setTimeout(() => {
            setRequirePin(true)
            setWrongPin(true)
        }, 1000 * 60 * 2)
    }

    function handleChangeResult(matchResult) {
        const match = props.match
        match.matches = match.matches.map((m) => {
            if (m.text === editMatch.text) return matchResult
            return m
        })
        saveMatch(match)
    }

    const match = props.match

    const actions = [
        <Button key="close_button" label="Stäng" primary onClick={handleClose} disabled={requirePin && wrongPin} />,
    ]

    const header = (item: model.MatchResult) => {
        const tryOpen = () => {
            if (!user.isAnonymous) {
                handleOpen(item)
            }
        }
        return <Button label={item.text} primary className="normal-case" onClick={tryOpen} />
    }

    const view = (requirePin: boolean) => {
        if (requirePin) {
            return (
                <TextField
                    hintText="Ange pin"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    onChange={(_: any, newValue: string) => setWrongPin(newValue !== '1958')}
                />
            )
        }

        return <RegisterResult onChangeResult={handleChangeResult} match={editMatch} />
    }

    const formatMatchPoints = (score: ReturnType<typeof matchPoints>) => `${score.home.points}-${score.away.points}`
    return (
        <Card
            avatar={formatMatchPoints(matchPoints(match.matches))}
            title={`${match.homeTeam.teamName} - ${match.awayTeam.teamName}`}
            subtitle={'Bana ' + match.lane + ' ' + match.date + ' kl ' + match.time}
        >
            <div className="flex flex-row justify-between">
                {match.matches.map((matchResult, index) => {
                    return (
                        <div key={`match-${index}`} className="flex flex-col flex-wrap items-center">
                            {header(matchResult)}
                            {colMapper(matchResult)}
                        </div>
                    )
                })}
            </div>
            {open && (
                <Dialog title={requirePin ? 'Ange pin' : 'Resultat'} actions={actions} open={open}>
                    {view(requirePin)}
                </Dialog>
            )}
        </Card>
    )
}

export default Match
