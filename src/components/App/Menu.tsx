import {useAuth} from '../../hooks/useAuth'
import {Link} from 'react-router-dom'
import Button from '../Shared/Button'
import {firebaseAuth} from '../../firebase'

export function Menu() {
    const {user} = useAuth()

    function handleSignOut(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        evt.preventDefault()
        firebaseAuth.signOut()
    }

    if (user.isAnonymous) {
        const menuItems = [
            {to: '/register-user', text: 'Ny användare'},
            {to: '/sign-in', text: 'Logga in'},
        ]
        return (
            <>
                {menuItems.map((item) => (
                    <div key={item.text} className="w-full">
                        <Link to={item.to}>
                            <Button label={item.text} className="normal-case w-full text-black" />
                        </Link>
                    </div>
                ))}
            </>
        )
    }
    return (
        <div className="w-full my-2">
            <Button className="text-black" disabled={user.disableLogout} label="Logga ut" onClick={handleSignOut} />
        </div>
    )
}
