import {initializeApp} from 'firebase/app'
import {getAuth, connectAuthEmulator} from 'firebase/auth'
import {getDatabase, connectDatabaseEmulator} from 'firebase/database'
import {getFunctions, connectFunctionsEmulator} from 'firebase/functions'
import {firebaseConfig} from './config'

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseDb = getDatabase(firebaseApp)
export let functionUrl = 'https://us-central1-project-8539870983476533695.cloudfunctions.net'

const useEmulator = window.location.hostname === 'localhost'

if (useEmulator) {
    connectDatabaseEmulator(firebaseDb, 'localhost', 9000)
    connectAuthEmulator(firebaseAuth, 'http://localhost:9099')
    connectFunctionsEmulator(getFunctions(firebaseApp), 'localhost', 5001)
    functionUrl = 'http://localhost:5001/project-8539870983476533695/us-central1'
}
