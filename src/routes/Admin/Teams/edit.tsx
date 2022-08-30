import { useState } from 'react'
import {Form, redirect, useLoaderData, useParams} from 'react-router-dom'
import { createTeam, deleteTeam, getAllSeries, getTeamsBySeries, saveTeam } from '../../../lib/api'
import {TextField, Button, Dialog} from '../../../components/Shared'
import { Listbox } from '../../../components/Shared/Listbox'

async function movingDirection(fromSeries: string, toSeries: string): Promise<'up' | 'down'> {
    const series = await getAllSeries()
    const moveFromSeries = series.find(x => x.id === fromSeries)
    if (!moveFromSeries.groupId) return 'up'
    const moveToSeries = series.find(x => x.id === toSeries)
    
    if (moveFromSeries.groupId !== moveToSeries.groupId) return 'up'

    return moveFromSeries.division > moveToSeries.division ? 'up' : 'down' 
}

async function updateTeamRankingsForSeries(seriesId: string) {
    const seriesTeams = await getTeamsBySeries(seriesId)
    await Promise.all(seriesTeams.map((t, index) => {
        t.teamRanking = index + 1 
        return saveTeam(t)
    }))
}

export async function action({request}) {

    const formData = await request.formData()

    const id: string = formData.get('id')
    const currentSeries: string = formData.get('current_series')

    if (request.method === 'DELETE') {
        await deleteTeam(id)
        await updateTeamRankingsForSeries(currentSeries)
        return redirect(`/admin/${currentSeries}/teams`)
    }


    const teamRanking: number = formData.get('ranking')
    const teamName: string = formData.get('team')
    const contact: string = formData.get('contact')
    const phone: string = formData.get('phone')
    const email: string = formData.get('email')
    const series: string = formData.get('series[id]')

    const team = {id, teamRanking, teamName, contact, phone, email, series}
    if (id) {
        const isChangingSeries = team.series !== currentSeries
        if (isChangingSeries) {
            const direction = await movingDirection(currentSeries, team.series) 
            // temp values that will get updated when all teams gets updated
            team.teamRanking = direction === 'down' ? 0 : 100    
        }

        await saveTeam(team)

        if (isChangingSeries) {
            await updateTeamRankingsForSeries(currentSeries)
            await updateTeamRankingsForSeries(team.series)
        }

    } else {
        const teams = await getTeamsBySeries(team.series) 
        team.teamRanking = teams.length
        await createTeam(team)
    }

    return redirect(`/admin/${currentSeries}/teams`)
}

export async function loader({params}) {
    const teams = await getTeamsBySeries(params.series)
    const series = await getAllSeries()
    return {team: teams.find(x => x.id === params.teamId), series}
}

export default function Edit() {
    const [open, setOpen] = useState(false)
    const {team, series} = useLoaderData() as Awaited<ReturnType<typeof loader>>
    const {series: currentSeriesId} = useParams()
    const currentSeries = series.find(x => x.id === currentSeriesId)
    const isExerciseSeries = currentSeries?.type === 'ExerciseSeries' 

    function handleToggleDialog() {
        setOpen(!open)
    }

    const actions = [
        <Button key="cancel" label="Nej" secondary onClick={handleToggleDialog} />,
        <Form key='form-delete' method="delete">
            <input type="hidden" name="id" value={team?.id} />
            <input type="hidden" name="current_series" value={currentSeriesId} />
            <Button
            key="reset"
            label="Ja"
            primary
            />
        </Form>
    ]

    return (
        <>
            <Form method="post">
                <div className="w-full flex flex-col items-center">
                    <div className="w-11/12 md:w-8/12 my-4 flex flex-col">
                    {team?.id && <Button onClick={(evt) => {
                        evt.preventDefault()
                        handleToggleDialog()
                    }} label={`Ta bort ${isExerciseSeries ? 'spelare' : 'lag'}`} secondary className='self-end' />}
                        <input type="hidden" name="id" value={team?.id} />
                        <input type="hidden" name="ranking" value={team?.teamRanking} />
                        <input type="hidden" name="current_series" value={currentSeriesId} />
                        <TextField name="team" label={isExerciseSeries ? 'Spelare' : 'Lag'} defaultValue={team?.teamName} type="text" className="w-full" />
                        <TextField name="contact" label="Kontakt" defaultValue={team?.contact} type="text" className={`w-full ${isExerciseSeries ? 'hidden' : ''}`} />
                        <TextField name="phone" label="Telefon" defaultValue={team?.phone} type="text" className="w-full" />
                        <TextField name="email" label="Epost" defaultValue={team?.email} type="text" className="w-full" />
                        <Listbox name="series" selectedItem={currentSeriesId} data={series.filter(x => x.type === currentSeries.type).map(x => ({id: x.id, display: x.text}))}  />
                    </div>
                    <Button type="submit" label="Spara" primary />
                </div>
            </Form>
            {team?.id && <Dialog title={`Ta bort ${team.teamName}`} actions={actions} open={open}>
                Är du säker?
            </Dialog>}
        </>
    )
}
