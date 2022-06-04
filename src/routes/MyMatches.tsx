import {useLoaderData} from 'react-router-dom'
import Match from '../components/Match'
import {getMatchesByUser, saveMatch} from '../lib/api'
import {useAuth} from '../hooks/useAuth'
import * as model from '../lib/model'

export async function loader({params}) {
    return getMatchesByUser(params.user?.uid || '')
}

function MyMatches() {
    const matches = useLoaderData() as model.Match[]
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

export default MyMatches
