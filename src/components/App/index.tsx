import {useState} from 'react'
import {Outlet} from 'react-router-dom'
import {Header} from '../Header'
import {NavBar} from '../NavBar'
import {useAuth} from '../../hooks/useAuth'
import {useTitle} from '../../hooks/useTitle'
import '@fontsource/material-icons-outlined'

function App() {
    const [open, setOpen] = useState(false)
    const {user} = useAuth()
    const title = useTitle()

    function handleToggle() {
        setOpen(!open)
    }

    return (
        <>
            <Header key="AppBar" data-testid="menu" title={title} toggleSidebar={handleToggle} user={user} />
            <div className="safe-left safe-right">
                <Outlet />
            </div>
            <NavBar open={open} handleToggle={handleToggle} />
        </>
    )
}

export default App
/* eslint-enable react/jsx-indent */
