import {useLoaderData} from 'react-router-dom'
import Match from '../components/Match'
import {getMatchesByDate, saveMatch} from '../lib/api'
import {useAuth} from '../hooks/useAuth'

function getToday() {
    return new Date().toLocaleDateString('sv-SE')
}

export async function loader() {
    return getMatchesByDate(getToday())
}

function TodaysMatches() {
    const matches = useLoaderData() as Awaited<ReturnType<typeof loader>>
    const {user} = useAuth()

    return (
        <div>
            <div className="flex flex-wrap">
                {matches.map((match, index) => (
                    <div key={'match-' + index} className="basis-full md:basis-1/2 lg:basis-1/3 px-2 py-2">
                        <Match saveMatch={saveMatch} match={match} user={user} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TodaysMatches
