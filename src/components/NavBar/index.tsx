import {NavLink} from 'react-router-dom'
import {useAuth} from '../../hooks/useAuth'
import {useSeries} from '../../hooks/useSeries'
import {Disclosure} from '@headlessui/react'
import type {Series} from '../../lib/model'

type NavBarProps = {
    open: boolean
    handleToggle: () => void
}
export function NavBar(props: NavBarProps) {
    const {user} = useAuth()
    const {series} = useSeries()

    const linkClassNames = ({isActive}: {isActive: boolean}) =>
        `${
            isActive ? 'bg-active' : undefined
        } w-full rounded-lg hover:bg-hover normal-case mx-4 py-2 px-4 text-sm text-left text-black`

    const listItemFactory = (serie: Series) => {
        const items = [
            <NavLink
                key={`team-${serie.id}`}
                to={`/series/${serie.id}/teams`}
                data-testid={`menu-team-${serie.id}`}
                className={linkClassNames}
            >
                Lag
            </NavLink>,
            <NavLink
                key={`matches-${serie.id}`}
                data-testid={`menu-matches-${serie.id}`}
                to={`/series/${serie.id}/matches`}
                className={linkClassNames}
            >
                Matcher
            </NavLink>,
            <NavLink
                key={`table-${serie.id}`}
                data-testid={`menu-table-${serie.id}`}
                to={`/series/${serie.id}/table`}
                className={linkClassNames}
            >
                Tabell
            </NavLink>,
        ]

        if (user.admin) {
            items.push(
                <NavLink key={`reset-${serie.id}`} to={`/series/${serie.id}/reset`} className={linkClassNames}>
                    Nollställ
                </NavLink>
            )
        }
        return (
            <Disclosure key={serie.id}>
                {({open}) => (
                    <>
                        <Disclosure.Button
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
                            className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-base hover:bg-hover focus:outline-none"
                        >
                            <span>{serie.text}</span>
                            <span className={'material-icons-outlined h-5 w-5'}>
                                {open ? 'expand_more' : 'expand_less'}
                            </span>
                        </Disclosure.Button>
                        <Disclosure.Panel className="flex flex-col">{items}</Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        )
    }

    const open = props.open ? 'ease-linear duration-200 translate-x-4/6' : 'ease-linear duration-200 -translate-x-full'
    return (
        <div
            className={`bg-black/10 z-40 absolute top-0 left-0 w-screen h-screen ${
                props.open ? undefined : 'invisible'
            }`}
            onClick={() => props.handleToggle()}
        >
            <div className={`w-4/6 max-w-md bg-white shadow fixed top-0 ${open}`}>
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
                    {!user.isAnonymous && (
                        <NavLink to={'/my-matches'} className={linkClassNames}>
                            Mina matcher
                        </NavLink>
                    )}
                    <NavLink to={'/todays-matches'} className={linkClassNames}>
                        Dagens matcher
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
