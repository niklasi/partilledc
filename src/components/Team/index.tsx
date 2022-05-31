import Card from '../Shared/Card'

function Team(props) {
    const team = props.team

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
