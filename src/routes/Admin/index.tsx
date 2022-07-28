import {Link, useLoaderData} from 'react-router-dom'
    
import {getAllSeries} from '../../lib/api'

export async function loader() {
    return getAllSeries()
}
function Admin() {
    const series = useLoaderData() as Awaited<ReturnType<typeof loader>>
    const data = series.map(x => ({id: x.id, display: x.text}))

    if (!data) return null

    return (<table className="md:table-fixed border border-collapse w-full">
        <thead className="text-left text-gray-400 h-14">
            <tr className="divide-y divide-solid border">
                <th className="font-normal text-xs px-3">Titel</th>
                <th className="font-normal text-xs">Typ</th>
                <th className="font-normal text-xs"></th>
                <th className="font-normal text-xs"></th>
            </tr>
        </thead>
        <tbody className="text-sm text-left">
            {series.map((serie) => {
                return (
                    <tr key={serie.id} className="divide-y divide-solid border h-12">
                        <td className="px-3">{serie.text}</td>
                        <td>{serie.type === 'CompanySeries' ? 'Lagserie' : 'Motionserie'}</td>
                        <td><Link className="underline" to={`${serie.id}/teams`}>Lag</Link></td>
                        <td><Link className="underline" to={`${serie.id}/matches`}>Matcher</Link></td>
                    </tr>
                )
            })}
        </tbody>
    </table>)
}

export default Admin

