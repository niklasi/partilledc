import {useLoaderData} from 'react-router-dom'
import {getMatchesBySeries, getTeamsBySeries} from '../../../lib/api'

export async function loader({params}) {
    const teams = await getTeamsBySeries(params.series)
    return getMatchesBySeries(params.series)
}

export function Matches() {
    const matches = useLoaderData() as Awaited<ReturnType<typeof loader>>
    return (
        <table className="md:table-fixed border border-collapse w-full">
            <thead className="text-left text-gray-400 h-14">
                <tr className="divide-y divide-solid border">
                    <th className="font-normal text-xs px-3">Hemma</th>
                    <th className="font-normal text-xs">Borta</th>
                    <th className="font-normal text-xs w-24">Datum</th>
                    <th className="font-normal text-xs w-8">Tid</th>
                    <th className="font-normal text-xs w-12">Bana</th>
                </tr>
            </thead>
            <tbody className="text-sm text-left">
                {matches.map((match, index) => {
                    return (
                        <tr key={match.id} className="divide-y divide-solid border h-12">
                            <td className="px-3">{match.homeTeam.teamName}</td>
                            <td>{match.awayTeam.teamName}</td>
                            <td className="w-24"><input className="w-full" value={match.date} /></td>
                            <td className="w-8"><input className="w-full" value={match.time} /></td>
                            <td className="w-12"><input className="w-full" value={match.lane} /></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
