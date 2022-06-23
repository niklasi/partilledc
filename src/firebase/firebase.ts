import {initializeApp} from 'firebase/app'
import {getAuth, connectAuthEmulator} from 'firebase/auth'
import {getDatabase, connectDatabaseEmulator} from 'firebase/database'
import {getFunctions, connectFunctionsEmulator} from 'firebase/functions'
import {firebaseConfig} from './config'

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseDb = getDatabase(firebaseApp)
export let functionUrl = 'https://us-central1-project-8539870983476533695.cloudfunctions.net'

const useEmulator = window.location.hostname === 'localhost' || window.location.port === '3000'

if (useEmulator) {
    const hostname = window.location.hostname
    connectDatabaseEmulator(firebaseDb, hostname, 9000)
    connectAuthEmulator(firebaseAuth, `http://${hostname}:9099`)
    connectFunctionsEmulator(getFunctions(firebaseApp), hostname, 5001)
    functionUrl = `http://${hostname}:5001/project-8539870983476533695/us-central1`
}
