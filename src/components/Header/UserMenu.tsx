import {Fragment} from 'react'
import {useAuth} from '../../hooks/useAuth'
import {Link} from 'react-router-dom'
import {Menu, Transition} from '@headlessui/react'
import {firebaseAuth} from '../../firebase'

export function UserMenu() {
    const {user} = useAuth()

    function handleSignOut(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        evt.preventDefault()
        firebaseAuth.signOut()
    }

    return (
        <Menu className="relative inline-block text-left">
            <div>
                <Menu.Button>
                    {user.isAnonymous ? (
                        <span className="mx-2 material-icons-outlined">lock</span>
                    ) : (
                        <span className="mx-2 material-icons-outlined">lock_open</span>
                    )}
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {user.isAnonymous && (
                            <>
                                <Menu.Item>
                                    {({active}) => (
                                        <Link
                                            className={`${
                                                active && 'bg-active'
                                            } group flex text-black w-full items-center rounded-md px-2 py-2 text-sm`}
                                            to="/register-user"
                                        >
                                            Ny användare
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({active}) => (
                                        <Link
                                            className={`${
                                                active && 'bg-active'
                                            } group flex text-black w-full items-center rounded-md px-2 py-2 text-sm`}
                                            to="/sign-in"
                                        >
                                            Logga in
                                        </Link>
                                    )}
                                </Menu.Item>
                            </>
                        )}
                        {!user.isAnonymous && (
                            <Menu.Item disabled={user.disableLogout}>
                                {({active, disabled}) => (
                                    <button
                                        onClick={handleSignOut}
                                        disabled={disabled}
                                        className={`${
                                            active && 'bg-active'
                                        } group flex disabled:text-opacity-30 text-black w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        Logga ut
                                    </button>
                                )}
                            </Menu.Item>
                        )}
                    </Menu.Items>
                </Transition>
            </div>
        </Menu>
    )
}
