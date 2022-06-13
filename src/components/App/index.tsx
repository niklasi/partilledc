import {useState} from 'react'
import {Outlet} from 'react-router-dom'
import {Header} from '../Header'
import {NavBar} from '../NavBar'
import {Menu} from './Menu'
import {useAuth} from '../../hooks/useAuth'
import {useTitle} from '../../hooks/useTitle'
import '@fontsource/material-icons-outlined'

function App() {
    const [open, setOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const {user} = useAuth()
    const title = useTitle()

    function handleToggle() {
        setOpen(!open)
    }

    function handleToggleUserMenu() {
        setUserMenuOpen(!userMenuOpen)
    }

    return (
        <>
            <Header
                key="AppBar"
                data-testid="menu"
                title={title}
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
                <div className="bg-white flex flex-col z-50 shadow fixed top-1 right-3">
                    <Menu />
                </div>
            </div>
            <div className="safe-left safe-right">
                <Outlet />
            </div>
            <NavBar open={open} handleToggle={handleToggle} />
        </>
    )
}

export default App
/* eslint-enable react/jsx-indent */
