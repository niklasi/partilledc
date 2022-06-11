import {
    sendPasswordResetEmail,
    confirmPasswordReset as confirm,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth'
import {firebaseAuth} from '../../firebase'

export async function signIn(email: string, password: string) {
    await signInWithEmailAndPassword(firebaseAuth, email, password)
}

export async function resetPassword(email: string) {
    await sendPasswordResetEmail(firebaseAuth, email)
}

export async function confirmPasswordReset(code: string, password: string) {
    await confirm(firebaseAuth, code, password)
}

export async function createUser(email: string, password: string) {
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
}
