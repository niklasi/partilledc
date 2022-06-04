import {useLoaderData, useParams} from 'react-router-dom'
import Match from '../../components/Match'
import {getMatchesBySeries, saveMatch} from '../../lib/api'
import {useAuth} from '../../hooks/useAuth'
import * as allSeries from '../../series.json'
import Print from '../../components/Match/Print'

export async function loader({params}) {
    return getMatchesBySeries(params.series)
}

function Matches() {
    const {series} = useParams()
    const matches = useLoaderData()
    const {user} = useAuth()

    const isCompanySeries = allSeries.companySeries.filter((s) => s.id === series).length > 0
    return (
        <div>
            <Print matches={matches} isCompanySeries={isCompanySeries} />
            <div className="print:hidden flex flex-wrap">
                {matches.map((match, index) => (
                    <div key={'match-' + index} className="basis-full md:basis-1/2 lg:basis-1/3 px-2 py-2">
                        <Match saveMatch={saveMatch} match={match} user={user} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Matches
