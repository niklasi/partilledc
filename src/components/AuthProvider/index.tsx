import {useState, createContext, ReactNode} from 'react'
import {firebaseAuth} from '../../firebase'
import type {User} from '../../lib/model'

interface AuthContextType {
    user: User
}

export const AuthContext = createContext<AuthContextType>(null!)
const defaultUser: User = {isAnonymous: true, requiresPin: false}

export function AuthProvider({children}: {children: ReactNode}) {
    let [user, setUser] = useState<User>(defaultUser)

    firebaseAuth.onAuthStateChanged((fbUser) => {
        setUser(
            fbUser
                ? {
                      id: fbUser.uid,
                      isAnonymous: fbUser.isAnonymous,
                      requiresPin: fbUser.uid === 'c7RECUVjoIM1iHB7jvldxScB0C62',
                  }
                : defaultUser
        )
    })

    let value = {user}

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
