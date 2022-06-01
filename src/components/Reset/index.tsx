import {useState, useEffect} from 'react'
import {useLoaderData, useParams} from 'react-router-dom'
import Dialog from '../Shared/Dialog'
import Button from '../Shared/Button'
import {resetSeries} from '../../actions'
import {useAuth} from '../../hooks/useAuth'
import {getScrapedSeries} from '../../lib/api'
import * as allSeries from '../../series.json'

export async function loader({params}) {
    const slug = [...allSeries.companySeries, ...allSeries.exerciseSeries].find((x) => x.id === params.series).slug
    return getScrapedSeries(slug)
}

function Reset(props) {
    const [open, setOpen] = useState(false)
    const {series} = useParams()
    const scrapedData = useLoaderData()
    const {user} = useAuth()
    const slug = 'FAKE'

    function handleToggleDialog() {
        setOpen(!open)
    }

    const uid = user.uid
    const seriesName = [...allSeries.companySeries, ...allSeries.exerciseSeries].find((x) => x.id === series).text

    const companySeries = allSeries.companySeries.filter((s) => s.id === series).length > 0
    const displayContact = companySeries ? undefined : 'hidden'
    const teams = props.scrapedData.teams || []
    const matches = props.scrapedData.matches || []
    const actions = [
        <Button key="cancel" label="Avbryt" secondary onClick={handleToggleDialog} />,
        <Button
            key="reset"
            label="Nollställ"
            primary
            onClick={() => {
                props.resetSeries(series, slug, uid)
                handleToggleDialog()
            }}
        />,
    ]

    return (
        <div>
            <table className="md:table-fixed border border-collapse w-full">
                <thead className="text-left text-gray-400 h-14">
                    <tr className="divide-y divide-solid border">
                        <th className="hidden md:table-cell font-normal text-xs px-3">Ranking</th>
                        <th className="font-normal text-xs px-3 md:px-0">Lag</th>
                        <th className={`font-normal text-xs ${displayContact}`}>Kontakt</th>
                        <th className="font-normal text-xs">Telefon</th>
                        <th className="font-normal text-xs">Email</th>
                    </tr>
                </thead>
                <tbody className="text-sm text-left">
                    {teams.map((team, index) => (
                        <tr key={'team-' + index} className="divide-y divide-solid border h-12">
                            <td className="hidden md:table-cell px-3">{team.team_ranking}</td>
                            <td className="px-3 md:px-0">{team.team_name}</td>
                            <td className={displayContact}>{team.contact}</td>
                            <td>{team.phone}</td>
                            <td>{team.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <table className="md:table-fixed border border-collapse w-full">
                <thead className="text-left text-gray-400 h-14">
                    <tr className="divide-y divide-solid border h-12">
                        <th className="font-normal text-xs px-3">Datum</th>
                        <th className="font-normal text-xs">Tid</th>
                        <th className="font-normal text-xs">Lag</th>
                        <th className="font-normal text-xs">Banor</th>
                    </tr>
                </thead>
                <tbody className="text-sm text-left">
                    {matches.map((match, index) => (
                        <tr key={'match-' + index} className="divide-y divide-solid border h-12">
                            <td className="px-3">{match.date}</td>
                            <td>{match.time}</td>
                            <td>
                                {match.home_team}-{match.away_team}
                            </td>
                            <td>{match.lanes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Button label="Nollställ serien" className="w-full text-white bg-secondary" onClick={handleToggleDialog} />
            <Dialog title={'Nollställ ' + seriesName} actions={actions} open={open}>
                Du är på väg att nollställa serien. Detta innebär att nuvarande resultat i serien kommer att tas bort
                och lag och spelschema kommer att ersättas med det som finns på denna sidan.
            </Dialog>
        </div>
    )
}

export default Reset
