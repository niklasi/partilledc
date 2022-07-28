import {Link, useLoaderData} from 'react-router-dom'
import {useCurrentSerie} from '../../../hooks/useCurrentSerie'
import {getTeamsBySeries} from '../../../lib/api'

export async function loader({params}) {
    return getTeamsBySeries(params.series)
}

export default function List() {
    const teams = useLoaderData() as Awaited<ReturnType<typeof loader>>
    const serie = useCurrentSerie()

    const isCompanySeries = serie.type === 'CompanySeries'

    return (
        <table className="md:table-fixed border border-collapse w-full">
            <thead className="text-left text-gray-400 h-14">
                <tr className="divide-y divide-solid border">
                    <th className="font-normal text-xs px-3">{isCompanySeries ? 'Lag' : 'Spelare'}</th>
                    <th className="font-normal text-xs">Kontakt</th>
                    <th className="font-normal text-xs">Telefon</th>
                    <th className="font-normal text-xs">Email</th>
                    <th className="font-normal text-xs"></th>
                </tr>
            </thead>
            <tbody className="text-sm text-left">
                {teams.map((team) => {
                    return (
                        <tr key={team.id} className="divide-y divide-solid border h-12">
                            <td className="px-3">{team.teamName}</td>
                            <td>{team.contact}</td>
                            <td>{team.phone}</td>
                            <td>{team.email}</td>
                            <td className="text-right">
                                <Link className="underline" to={team.id}>
                                    Editera
                                </Link>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
