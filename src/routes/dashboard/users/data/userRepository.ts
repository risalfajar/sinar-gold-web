import {collection, CollectionReference, Unsubscribe,} from 'firebase/firestore'
import {throwError} from 'svelte-preprocess/dist/modules/errors'
import {getUserId} from "$lib/auth/authManager"
import {COLLECTION_USERS} from "$lib/constants"
import {ReadOnlyFirestoreRepository} from "$lib/data/readOnlyFirestoreRepository"
import {httpsCallable, HttpsCallableResult} from 'firebase/functions'
import {User, userConverter} from "../types/user"
import {Firestore, Functions} from '$lib/firebase'

export class UserRepository extends ReadOnlyFirestoreRepository<User> {

    getId(item: User): string {
        return item.username
    }

    getCollectionRef(): CollectionReference<User> {
        return collection(Firestore, COLLECTION_USERS).withConverter(userConverter)
    }

    async listenCurrentUser(onChange: (user: User | null) => any): Promise<Unsubscribe> {
        const uid = await getUserId() ?? throwError('User is not logged in')
        return this.listen(uid, onChange)
    }

    save(user: User): Promise<HttpsCallableResult> {
        const callable = httpsCallable(Functions, 'createUser')
        return callable(user)
    }
}
