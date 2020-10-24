import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { firebaseConfig } from './config'

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = firebaseApp.auth()
export const firebaseDb = firebaseApp.database()
