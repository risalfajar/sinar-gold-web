import type firebase from 'firebase/auth'
import {NextOrObserver, onAuthStateChanged, signInWithEmailAndPassword, signOut as authSignOut, Unsubscribe, User} from 'firebase/auth'
import {Auth} from 'src/config/firebase'
import {CUSTOM_CLAIMS_ROLE, USERNAME_SUFFIX} from "src/features/common/constants"
import {Role} from "src/features/user/types/role"

export function signIn(username: string, password: string) {
    return signInWithEmailAndPassword(Auth, username + USERNAME_SUFFIX, password)
}

export async function getUserId(): Promise<string | undefined> {
    return (await getUser())?.uid
}

export async function getRole(): Promise<Role> {
    const claims = await getCustomClaims()
    return claims?.[CUSTOM_CLAIMS_ROLE]
}

async function getCustomClaims(): Promise<firebase.ParsedToken | undefined> {
    const user = await getUser()
    const idTokenResult = await user?.getIdTokenResult(false)
    return idTokenResult?.claims
}

export function listenUser(onChange: NextOrObserver<User>): Unsubscribe {
    return onAuthStateChanged(Auth, onChange)
}

export function getUser(): Promise<firebase.User | null> {
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
