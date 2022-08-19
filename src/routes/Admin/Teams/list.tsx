import {Link, useLoaderData, useParams, useNavigate} from 'react-router-dom'
import {useCurrentSerie} from '../../../hooks/useCurrentSerie'
import {getTeamsBySeries, saveTeam} from '../../../lib/api'
import Button from '../../../components/shared/Button'

export async function loader({params}) {
    return getTeamsBySeries(params.series)
}

export default function List() {
    const teams = useLoaderData() as Awaited<ReturnType<typeof loader>>
    const serie = useCurrentSerie()
    const {series} = useParams()
    const navigate = useNavigate()

    const isCompanySeries = serie.type === 'CompanySeries'

    async function moveTeam(direction: 'up' | 'down', index: number) {
        const team = teams[index]
        const switchWithIndex = direction === 'up' ? index - 1 : index + 1
        const switchWithTeam = teams[switchWithIndex]

        team.teamRanking = switchWithIndex + 1
        switchWithTeam.teamRanking = index + 1

        await Promise.all([saveTeam(team), saveTeam(switchWithTeam)])

        navigate(`/admin/${series}/teams`)
    }


    return (
        <>
        <Button className="m-2" primary label='Lägg till nytt lag' onClick={() => navigate('new')} />
        <table className="md:table-fixed border border-collapse w-full">
            <thead className="text-left text-gray-400 h-14">
                <tr className="divide-y divide-solid border">
                    <th className="font-normal text-xs px-3">{isCompanySeries ? 'Lag' : 'Spelare'}</th>
                    <th className={`font-normal text-xs ${isCompanySeries ? '' : 'hidden'}`}>Kontakt</th>
                    <th className="font-normal text-xs">Telefon</th>
                    <th className="font-normal text-xs">Email</th>
                    <th className="font-normal text-xs"></th>
                    <th className="font-normal text-xs w-16"></th>
                </tr>
            </thead>
            <tbody className="text-sm text-left">
                {teams.map((team, index) => {
                    return (
                        <tr key={team.id} className="divide-y divide-solid border h-12">
                            <td className="px-3">{team.teamName}</td>
                            <td className={isCompanySeries ? '' : 'hidden'}>{team.contact}</td>
                            <td>{team.phone}</td>
                            <td>{team.email}</td>
                            <td className="text-right">
                                <Link className="underline" to={team.id}>
                                    Editera
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => moveTeam('down', index)} disabled={index === teams.length - 1} className='disabled:text-gray-300'>
                                    <span className={'material-icons-outlined h-5 w-5'}>
                                        expand_more
                                    </span>
                                </button>
                                <button onClick={() => moveTeam('up', index)} disabled={index === 0} className='disabled:text-gray-300'>
                                    <span className={'material-icons-outlined h-5 w-5'}>
                                        expand_less
                                    </span>
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}
