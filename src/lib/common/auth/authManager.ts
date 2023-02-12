import {type NextOrObserver, onAuthStateChanged, type ParsedToken, signInWithEmailAndPassword, signOut as authSignOut, type User} from 'firebase/auth'
import {CUSTOM_CLAIMS_ROLE, USERNAME_SUFFIX} from "$lib/constants"
import {Auth} from '$lib/firebase'
import type {Unsubscribe} from "firebase/firestore"
import {Role} from "$lib/users/types/role"

export function signIn(username: string, password: string) {
    return signInWithEmailAndPassword(Auth, username + USERNAME_SUFFIX, password)
}

export async function getUserId(): Promise<string | undefined> {
    return (await getUser())?.uid
}

export async function getRole(): Promise<Role | null> {
    const claims = await getCustomClaims()
    return claims?.[CUSTOM_CLAIMS_ROLE]
}

async function getCustomClaims(): Promise<ParsedToken | undefined> {
    const user = await getUser()
    const idTokenResult = await user?.getIdTokenResult(false)
    return idTokenResult?.claims
}

export function listenUser(onChange: NextOrObserver<User>): Unsubscribe {
    return onAuthStateChanged(Auth, onChange)
}

export function getUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(Auth, user => {
            unsubscribe()
            // @ts-ignore
            resolve(user)
        }, reject)
    })
}

export async function signOut() {
    await authSignOut(Auth)
    localStorage.clear()
}
