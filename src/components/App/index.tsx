import {useState, useEffect} from 'react'
import {Outlet, Link, useParams, useMatches} from 'react-router-dom'
import {Header} from '../Header'
import {NavBar} from '../NavBar'
import Button from '../Shared/Button'
import * as seriesData from '../../series.json'
import {useAuth} from '../../hooks/useAuth'
import {firebaseAuth} from '../../firebase'
import '@fontsource/material-icons-outlined'

function App(props) {
    const [open, setOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const {series} = useParams()
    const routeMatches = useMatches()
    const {user} = useAuth()
    const isAnonymous = user.isAnonymous

    function handleToggle() {
        setOpen(!open)
    }

    function handleToggleUserMenu() {
        setUserMenuOpen(!userMenuOpen)
    }

    function title() {
        const seriesNames = [...seriesData.companySeries, ...seriesData.exerciseSeries]
            .filter((x) => x.id === series)
            .map((x) => x.text)

        const [route] = routeMatches.slice(-1)
        const title = route.handle?.title ?? ''
        return seriesNames.length > 0 ? `${seriesNames} - ${title}` : title
    }

    function handleSignOut(evt) {
        evt.preventDefault()
        firebaseAuth.signOut()
    }

    function menu() {
        if (isAnonymous) {
            const menuItems = [
                {to: '/register-user', text: 'Ny användare'},
                {to: '/sign-in', text: 'Logga in'},
            ]
            return menuItems.map((item) => (
                <div key={item.text} className="w-full">
                    <Link to={item.to}>
                        <Button label={item.text} className="normal-case w-full text-black" />
                    </Link>
                </div>
            ))
        }

        return (
            <div className="w-full my-2">
                <Button
                    className="text-black"
                    disabled={user.uid === 'c7RECUVjoIM1iHB7jvldxScB0C62'}
                    label="Logga ut"
                    onClick={handleSignOut}
                />
            </div>
        )
    }

    return (
        <div>
            <Header
                key="AppBar"
                data-testid="menu"
                title={title()}
                toggleSidebar={handleToggle}
                toggleUserMenu={handleToggleUserMenu}
                user={user}
            />
            <div
                className={`bg-transparent z-40 absolute top-0 left-0 w-screen h-screen ${
                    userMenuOpen ? undefined : 'hidden'
                }`}
                onClick={() => handleToggleUserMenu()}
            >
                <div className="bg-white flex flex-col z-50 shadow fixed top-1 right-3">{menu()}</div>
            </div>
            <div className="safe-left safe-right">
                <Outlet />
            </div>
            <NavBar open={open} user={user} handleToggle={handleToggle} />
        </div>
    )
}

export default App
/* eslint-enable react/jsx-indent */
