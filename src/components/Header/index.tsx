import type {User} from '../../lib/model'

type HeaderProps = {
    user: User
    title: string
    toggleSidebar: () => void
    toggleUserMenu: () => void
}
export function Header(props: HeaderProps) {
    const rightIcon = () => {
        return props.user.isAnonymous ? (
            <span className="mx-2 material-icons-outlined">lock</span>
        ) : (
            <span className="mx-2 material-icons-outlined">lock_open</span>
        )
    }
    const hiddenInFrame = () => (window.location !== window.parent.location ? 'hidden' : '')
    const standaloneHeight = () => ('standalone' in window.navigator ? 'portrait:h-24' : '')

    return (
        <div className={`${hiddenInFrame()}`}>
            <header
                data-testid="menu"
                className={`${standaloneHeight()} h-16 bg-primary landscape:safe-left landscape:safe-right safe-top text-white flex flex-row items-center space-x-2 fixed top-0 w-full shadow`}
            >
                <button onClick={() => props.toggleSidebar()} className="flex-none mx-2 material-icons-outlined">
                    menu
                </button>
                <p className="grow text-2xl">{props.title}</p>
                <button onClick={() => props.toggleUserMenu()} className="flex-none mr-8">
                    {rightIcon()}
                </button>
            </header>
            <div className={`${standaloneHeight()} h-16`} />
        </div>
    )
}
