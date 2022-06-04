import {useState, createContext, ReactNode} from 'react'
import {firebaseAuth} from '../../firebase'

interface AuthContextType {
    user: any
}

export const AuthContext = createContext<AuthContextType>(null!)
const defaultUser = {isAnonymous: true}

export function AuthProvider({children}: {children: ReactNode}) {
    let [user, setUser] = useState<any>(defaultUser)

    firebaseAuth.onAuthStateChanged((fbUser) => {
        setUser(fbUser ?? defaultUser)
    })

    let value = {user}

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
