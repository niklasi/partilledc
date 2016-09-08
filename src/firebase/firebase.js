import { initializeApp } from 'firebase'
import { firebaseConfig } from './config'

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = firebaseApp.auth()
export const firebaseDb = firebaseApp.database()
