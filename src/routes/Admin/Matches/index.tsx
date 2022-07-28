import {useLoaderData} from 'react-router-dom'
import {getMatchesBySeries} from '../../../lib/api'

export async function loader({params}) {
    return getMatchesBySeries(params.series)
}

export function Matches() {
    const matches = useLoaderData() as Awaited<ReturnType<typeof loader>>
    return <div>Matcher...{matches.length}</div>
}
