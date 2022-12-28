import {Readable, readable, Subscriber} from "svelte/store"
import {UserRepository} from "src/features/user/data/userRepository"
import {User} from "src/features/user/types/user"
import {Unsubscribe} from "firebase/firestore"

export const currentUser: Readable<User | null> = readable(null, function start(set: Subscriber<User | null>) {
    const repository = new UserRepository()
    let unsubscribe: Unsubscribe | null

    repository.listenCurrentUser(user => set(user))
        .then(unsub => unsubscribe = unsub)

    return function stop() {
        unsubscribe?.()
    }
})
