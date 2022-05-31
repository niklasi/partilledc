import {useLoaderData} from 'react-router-dom'
import Match from '../components/Match'
import {getMatchesByUser} from '../lib/api'

export async function loader({params}) {
    return getMatchesByUser(params.user?.uid || '')
}

function MyMatches() {
    const matches = useLoaderData()
    return (
        <div>
            <div className="flex flex-wrap">
                {matches.map((match, index) => (
                    <div key={'match-' + index} className="basis-full md:basis-1/2 lg:basis-1/3 px-2 py-2">
                        <Match saveMatch={props.saveMatch} match={match} user={props.user || {}} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyMatches
