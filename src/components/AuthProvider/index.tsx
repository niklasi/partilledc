import {useState, createContext, ReactNode} from 'react'
import {firebaseAuth} from '../../firebase'
import type {User} from '../../lib/model'

interface AuthContextType {
    user: User
}

const defaultUser: User = {isAnonymous: true, requiresPin: false, admin: false, disableLogout: false}
export const AuthContext = createContext<AuthContextType>({user: defaultUser})

export function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User>(defaultUser)

    firebaseAuth.onAuthStateChanged((fbUser) => {
        if (user?.id === fbUser?.uid) return
        setUser(
            fbUser
                ? {
                      id: fbUser.uid,
                      isAnonymous: fbUser.isAnonymous,
                      requiresPin: fbUser.uid === 'c7RECUVjoIM1iHB7jvldxScB0C62',
                      admin:
                          fbUser.uid === 'EcTzkTApzDXWR07vMbwmuXfkIHm2' ||
                          fbUser.uid === 't9Q8UPdd1oOvyA4PN4C4VeBMeaW2' ||
                          fbUser.email === 'niklas@ingholt.com',
                      disableLogout: fbUser.uid === 'c7RECUVjoIM1iHB7jvldxScB0C62',
                  }
                : defaultUser
        )
    })

    const value = {user}

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
