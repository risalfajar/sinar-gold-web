import {DatabaseReference, get, onValue, Unsubscribe} from "firebase/database"

export default abstract class DatabaseRepository<T> {
    abstract getDocumentReference(): DatabaseReference

    async get() {
        const snapshot = await get(this.getDocumentReference())
        return snapshot.val()
    }

    listen(onChange: (document: T) => unknown): Unsubscribe {
        return onValue(this.getDocumentReference(), snapshot => onChange(snapshot.val()))
    }
}
