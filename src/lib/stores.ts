import {Readable, readable, Subscriber} from "svelte/store"
import {Unsubscribe} from "firebase/firestore"
import {UserRepository} from "../routes/dashboard/users/data/userRepository"
import {User} from "../routes/dashboard/users/types/user"

export const currentUser: Readable<User | null> = readable(null, function start(set: Subscriber<User | null>) {
    const repository = new UserRepository()
    let unsubscribe: Unsubscribe | null

    repository.listenCurrentUser(user => set(user))
        .then(unsub => unsubscribe = unsub)

    return function stop() {
        unsubscribe?.()
    }
})
