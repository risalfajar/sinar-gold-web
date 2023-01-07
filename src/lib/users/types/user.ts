import {Role} from "./role"
import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, serverTimestamp} from "firebase/firestore"

export type User = {
    username: string
    password: string
    name: string
    role: Role
    pages: string[]
    created?: Date
}

export const userConverter: FirestoreDataConverter<User> = {
    toFirestore: (user: User): DocumentData => {
        const data = {...user} as any
        delete data.username
        if (!data.created)
            data.created = serverTimestamp()
        return data
    },
    fromFirestore: (snap: QueryDocumentSnapshot): User => {
        const data = snap.data()
        return {...data, username: snap.id, created: data.created?.toDate()} as User
    }
}
