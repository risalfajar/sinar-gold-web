import {Readable, readable, Subscriber} from "svelte/store"
import {Unsubscribe} from "firebase/firestore"
import {UserRepository} from "$lib/users/data/userRepository"
import {User} from "$lib/users/types/user"
import GroupRepository from "$lib/master-data/group/groupRepository"
import CraftsmanRepository from "$lib/master-data/craftsman/craftsmanRepository"
import SalesmanRepository from "$lib/master-data/salesman/salesmanRepository"
import {Salesman} from "$lib/master-data/salesman/salesman"

export const currentUser: Readable<User | null> = readable(null, function start(set: Subscriber<User | null>) {
    const repository = new UserRepository()
    let unsubscribe: Unsubscribe | null

    repository.listenCurrentUser(user => set(user))
        .then(unsub => unsubscribe = unsub)

    return function stop() {
        unsubscribe?.()
    }
})

export const groupCodes = readable<string[]>([], (set) => {
    const groupRepository = new GroupRepository()
    groupRepository
        .getChildren()
        .then(groups => set(groups.map(it => it.code)))
})

export const craftsmans = readable<string[]>([], set => {
    const repository = new CraftsmanRepository()
    return repository.listenChildren(items => set(items.map(it => it.name)))
})

export const salesmans = readable<Salesman[]>([], set => {
    const repository = new SalesmanRepository()
    return repository.listenChildren(items => set(items))
})
