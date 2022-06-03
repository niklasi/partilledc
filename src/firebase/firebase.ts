import {initializeApp} from 'firebase/app'
import {getAuth, signInWithEmailAndPassword as fbSignInWithEmailAndPassword, connectAuthEmulator} from 'firebase/auth'
import {
    getDatabase,
    connectDatabaseEmulator,
    ref as dbRef,
    orderByChild as dbOrderByChild,
    equalTo as dbEqualTo,
    query as dbQuery,
    get as dbGet,
    set as dbSet,
} from 'firebase/database'
import {getFunctions, connectFunctionsEmulator} from 'firebase/functions'
import {firebaseConfig} from './config'

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseDb = getDatabase(firebaseApp)
export let functionUrl = 'https://us-central1-project-8539870983476533695.cloudfunctions.net'
export const ref = dbRef
export const orderByChild = dbOrderByChild
export const equalTo = dbEqualTo
export const query = dbQuery
export const get = dbGet
export const set = dbSet
export const signInWithEmailAndPassword = fbSignInWithEmailAndPassword

const useEmulator = window.location.hostname === 'localhost'

if (useEmulator) {
    connectDatabaseEmulator(firebaseDb, 'localhost', 9000)
    connectAuthEmulator(firebaseAuth, 'http://localhost:9099')
    connectFunctionsEmulator(getFunctions(firebaseApp), 'localhost', 5001)
    functionUrl = 'http://localhost:5001/project-8539870983476533695/us-central1'
}
