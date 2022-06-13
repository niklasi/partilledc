import {SeriesTableItem} from 'src/lib/model'

type SeriesTableProps = {
    isCompanySeries: boolean
    tableData: SeriesTableItem[]
}

function SeriesTable(props: SeriesTableProps) {
    const displayMatchp = props.isCompanySeries ? undefined : 'hidden'
    const displaySetAndGame = props.isCompanySeries ? 'hidden' : undefined

    const seriesTable = props.tableData
    return (
        <table className="md:table-fixed border border-collapse w-full">
            <thead className="text-left text-gray-400 h-14">
                <tr className="divide-y divide-solid border">
                    <th className="font-normal text-xs px-3">{props.isCompanySeries ? 'Lag' : 'Spelare'}</th>
                    <th className="font-normal text-xs">Matcher</th>
                    <th className={`font-normal text-xs ${displayMatchp}`}>Matchp</th>
                    <th className={`font-normal text-xs ${displaySetAndGame}`}>Set</th>
                    <th className={`font-normal text-xs ${displaySetAndGame}`}>Gem</th>
                    <th className="font-normal text-xs">Poäng</th>
                </tr>
            </thead>
            <tbody className="text-sm text-left">
                {seriesTable.map((team) => {
                    return (
                        <tr key={team.id} className="divide-y divide-solid border h-12">
                            <td className="px-3">{team.teamName}</td>
                            <td>{team.matches}</td>
                            <td className={displayMatchp}>{`${team.matchp.won.points}-${team.matchp.lost.points}`}</td>
                            <td className={displaySetAndGame}>{`${team.matchp.won.sets}-${team.matchp.lost.sets}`}</td>
                            <td className={displaySetAndGame}>
                                {`${team.matchp.won.games}-${team.matchp.lost.games}`}
                            </td>
                            <td>{team.teamp}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default SeriesTable
