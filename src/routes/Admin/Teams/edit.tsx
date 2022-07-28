import {Form, redirect, useLoaderData} from 'react-router-dom'
import { createTeam, getAllSeries, getTeamsBySeries, saveTeam } from '../../../lib/api'
import {TextField, Button} from '../../../components/Shared'
import { Listbox } from '../../../components/Shared/Listbox'

export async function action({request}) {
    const formData = await request.formData()

    const id: string = formData.get('id')
    const teamRanking: number = formData.get('ranking')
    const teamName: string = formData.get('team')
    const contact: string = formData.get('contact')
    const phone: string = formData.get('phone')
    const email: string = formData.get('email')
    const series: string = formData.get('series[id]')
    const currentSeries: string = formData.get('current_series')

    const team = {id, teamRanking, teamName, contact, phone, email, series}
    if (id) {
        await saveTeam(team)
    } else {
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
    const {team, series} = useLoaderData() as Awaited<ReturnType<typeof loader>>

    return (
        <Form method="post">
            <div className="w-full flex flex-col items-center">
                <div className="w-11/12 md:w-8/12 my-4">
                    <input type="hidden" name="id" value={team.id} />
                    <input type="hidden" name="ranking" value={team.teamRanking} />
                    <input type="hidden" name="current_series" value={team.series} />
                    <TextField name="team" label="Lag/Spelare" defaultValue={team.teamName} type="text" className="w-full" />
                    <TextField name="contact" label="Kontakt" defaultValue={team.contact} type="text" className="w-full" />
                    <TextField name="phone" label="Telefon" defaultValue={team.phone} type="text" className="w-full" />
                    <TextField name="email" label="Epost" defaultValue={team.email} type="text" className="w-full" />
                    <Listbox name="series" selectedItem={team.series} data={series.map(x => ({id: x.id, display: x.text}))}  />
                </div>
                <Button type="submit" label="Spara" primary />
            </div>
        </Form>
    )
}
