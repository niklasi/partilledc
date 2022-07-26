import Card from '../Shared/Card'
import type * as model from '../../lib/model'

type TeamProps = {team: model.Team}

function Team({team}: TeamProps) {
    return (
        <Card
            avatar={team.teamRanking}
            title={team.teamName}
            subtitle={
                <div>
                    <p>{team.contact}</p>
                    <p>{team.phone}</p>
                    <p>{team.email}</p>
                </div>
            }
        />
    )
}

export default Team
