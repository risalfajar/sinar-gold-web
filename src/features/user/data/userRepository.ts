import {collection, CollectionReference, Unsubscribe,} from 'firebase/firestore'
import {Firestore} from 'src/config/firebase'
import {throwError} from 'svelte-preprocess/dist/modules/errors'
import {User, userConverter} from "src/features/user/types/user"
import {FirestoreRepository} from "src/lib/data/firestoreRepository"
import {getUserId} from "src/lib/auth/authManager"
import {COLLECTION_USERS} from "src/features/common/constants"

export class UserRepository extends FirestoreRepository<User> {

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
}
