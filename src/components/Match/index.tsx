import {useState} from 'react'
import Card from '../Shared/Card'
import TextField from '../Shared/TextField'
import Dialog from '../Shared/Dialog'
import Button from '../Shared/Button'
import RegisterResult from './RegisterResult'
import {matchPoints} from '../../lib/partilledc-score'
import {saveMatch} from '../../lib/api'

const colMapper = ({text, result = []}) => (
    <p key={text} className="text-sm whitespace-normal">
        {result
            .filter((r) => r.home !== 0 || r.away !== 0)
            .map((r) => r.home + '-' + r.away)
            .join(', ')}
    </p>
)

function Match(props) {
    let timerId = null
    const [open, setOpen] = useState(false)
    const [requirePin, setRequirePin] = useState(isPinEnabled())
    const [wrongPin, setWrongPin] = useState(true)
    const [editMatch, setEditMatch] = useState({text: '', result: [{home: 0, away: 0}]})

    function isPinEnabled() {
        return props.user.uid === 'c7RECUVjoIM1iHB7jvldxScB0C62'
    }

    function handleOpen(match) {
        setEditMatch(match)
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

    const header = (item) => {
        const tryOpen = () => {
            if (!props.user.isAnonymous) {
                handleOpen(item)
            }
        }
        return <Button label={item.text} primary className="normal-case" onClick={tryOpen} />
    }

    const view = (requirePin) => {
        if (requirePin) {
            return (
                <TextField
                    hintText="Ange pin"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    onChange={(e, newValue) => setWrongPin(newValue !== '1958')}
                />
            )
        }

        return <RegisterResult onChangeResult={handleChangeResult} match={editMatch} />
    }

    const formatMatchPoints = (score) => `${score.home.points}-${score.away.points}`
    return (
        <Card
            avatar={formatMatchPoints(matchPoints(match.matches.map((m) => m.result)))}
            title={`${match.homeTeam.teamName} - ${match.awayTeam.teamName}`}
            subtitle={'Bana ' + match.lane + ' ' + match.date + ' kl ' + match.time}
        >
            <div className="flex flex-row justify-between">
                {match.matches.map((match, index) => {
                    return (
                        <div key={`match-${index}`} className="flex flex-col flex-wrap items-center">
                            {header(match)}
                            {colMapper(match)}
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
