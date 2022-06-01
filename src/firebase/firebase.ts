import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/functions'
import {firebaseConfig} from './config'

export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const firebaseAuth = firebaseApp.auth()
export const firebaseDb = firebaseApp.database()
if (window.location.hostname === 'localhost') {
    // Point to the RTDB emulator running on localhost.
    firebaseDb.useEmulator('localhost', 9000)
    firebaseAuth.useEmulator('http://localhost:9099')
    firebase.functions().useEmulator('localhost', 5001)
}
