import {useEffect} from 'react'
import {useLoaderData, useParams} from 'react-router-dom'
import Match from '../../components/Match'
import {saveMatch} from '../../actions'
import {getMatchesBySeries} from '../../lib/api'
import * as allSeries from '../../series.json'
import Print from '../../components/Match/Print'

export async function loader({params}) {
    return getMatchesBySeries(params.series)
}

function Matches(props) {
    const {series} = useParams()
    const matches = useLoaderData()

    const isCompanySeries = allSeries.companySeries.filter((s) => s.id === series).length > 0
    return (
        <div>
            <Print matches={matches} isCompanySeries={isCompanySeries} />
            <div className="print:hidden flex flex-wrap">
                {matches.map((match, index) => (
                    <div key={'match-' + index} className="basis-full md:basis-1/2 lg:basis-1/3 px-2 py-2">
                        <Match saveMatch={props.saveMatch} match={match} user={props.user || {}} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Matches
