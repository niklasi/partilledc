import {matchPoints} from '../../lib/partilledc-score'

function PrintMatches(props) {
    const formatMatchPoints = (score) => `${score.home.points}-${score.away.points}`
    const colMapper = ({text, result = []}) => (
        <td key={text}>
            {result
                .filter((r) => r.home !== 0 || r.away !== 0)
                .map((r) => r.home + '-' + r.away)
                .join(', ')}
        </td>
    )
    return (
        <table className="hidden print:table border-collapse w-full">
            <thead className="text-left h-14">
                <tr className="divide-y divide-solid border">
                    <th>{props.isCompanySeries ? 'Lag' : 'Spelare'}</th>
                    <th>Speltid</th>
                    <th>{props.isCompanySeries ? 'Dubbel' : 'Match'}</th>
                    {props.isCompanySeries && <th>1:a singel</th>}
                    {props.isCompanySeries && <th>2:a singel</th>}
                    <th>Resultat</th>
                </tr>
            </thead>
            <tbody>
                {props.matches.map((match, index) => (
                    <tr key={`print-match-${index}`} className="divide-y divide-solid border">
                        <td>{`${match.homeTeam.teamName} - ${match.awayTeam.teamName}`}</td>
                        <td>{match.date + ' kl ' + match.time}</td>
                        {match.matches.map(colMapper)}
                        <td>{formatMatchPoints(matchPoints(match.matches.map((m) => m.result)))}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default PrintMatches
