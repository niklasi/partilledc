import Button from '../Shared/Button'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../hooks/useAuth'
import {useSeries} from '../../hooks/useSeries'
import type {Series} from '../../lib/model'

type NavBarProps = {
    open: boolean
    handleToggle: () => void
}
export function NavBar(props: NavBarProps) {
    const navigate = useNavigate()
    const {user} = useAuth()
    const {series} = useSeries()

    const listItemFactory = (serie: Series) => {
        const items = [
            <Button
                key={`team-${serie.id}`}
                onClick={() => navigate(`/series/${serie.id}/teams`)}
                data-testid={`menu-team-${serie.id}`}
                label="Lag"
                className="w-full normal-case mx-4 px-4 text-base text-left text-black"
            />,
            <Button
                key={`matches-${serie.id}`}
                data-testid={`menu-matches-${serie.id}`}
                onClick={() => navigate(`/series/${serie.id}/matches`)}
                label="Matcher"
                className="w-full normal-case mx-4 px-4 text-base text-left text-black"
            />,
            <Button
                key={`table-${serie.id}`}
                data-testid={`menu-table-${serie.id}`}
                onClick={() => navigate(`/series/${serie.id}/table`)}
                label="Tabell"
                className="w-full normal-case mx-4 px-4 text-base text-left text-black"
            />,
        ]

        if (user.admin) {
            items.push(
                <Button
                    key={`reset-${serie.id}`}
                    onClick={() => navigate(`/series/${serie.id}/reset`, {state: {slug: serie.slug}})}
                    label="Nollställ"
                    className="w-full normal-case mx-4 px-4 text-base text-left text-black"
                />
            )
        }
        return (
            <div key={serie.id} className="my-2 px-2 w-full" data-testid={serie.text.split(' ').join('-')}>
                <Button className="text-lg normal-case text-black text-left w-full" label={serie.text} />
                {items}
            </div>
        )
    }

    const myMatches = () => {
        if (!user.isAnonymous) {
            return (
                <Button
                    onClick={() => navigate('/my-matches')}
                    label="Mina matcher"
                    className="w-full normal-case px-4 text-base text-left text-black"
                />
            )
        }
    }

    const open = props.open ? 'ease-linear duration-200 translate-x-4/6' : 'ease-linear duration-200 -translate-x-full'
    return (
        <div
            className={`bg-black/10 z-40 absolute top-0 left-0 w-screen h-screen ${
                props.open ? undefined : 'invisible'
            }`}
            onClick={() => props.handleToggle()}
        >
            <div className={`w-4/6 bg-white shadow fixed top-0 ${open}`}>
                <div className="flex flex-col space-x-2 overflow-scroll h-screen safe-top">
                    <p className="text-2xl pl-4 text-gray-500">Lagserier</p>
                    {series
                        .filter((s) => s.type === 'CompanySeries')
                        .filter((x) => x.active === true)
                        .map(listItemFactory)}
                    <hr />
                    <p className="text-2xl pl-4 text-gray-500">Motionsserier</p>
                    {series
                        .filter((s) => s.type === 'ExerciseSeries')
                        .filter((x) => x.active === true)
                        .map(listItemFactory)}
                    <hr />
                    {myMatches()}
                    <Button
                        onClick={() => navigate('/todays-matches')}
                        label="Dagens matcher"
                        className="w-full normal-case px-4 text-base text-left text-black"
                    />
                </div>
            </div>
        </div>
    )
}
