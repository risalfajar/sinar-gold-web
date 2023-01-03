import {collection, CollectionReference, Unsubscribe,} from 'firebase/firestore'
import {Firestore, Functions} from 'src/config/firebase'
import {throwError} from 'svelte-preprocess/dist/modules/errors'
import {User, userConverter} from "src/features/user/types/user"
import {getUserId} from "src/lib/auth/authManager"
import {COLLECTION_USERS} from "src/lib/constants"
import {ReadOnlyFirestoreRepository} from "src/lib/data/readOnlyFirestoreRepository"
import {httpsCallable, HttpsCallableResult} from 'firebase/functions'

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
