import {DatabaseReference, get, onValue, set, Unsubscribe} from "firebase/database"

export default abstract class DatabaseRepository<T> {
    abstract getDocumentReference(): DatabaseReference

    async get() {
        const snapshot = await get(this.getDocumentReference())
        return snapshot.val()
    }

    listen(onChange: (document: T) => unknown): Unsubscribe {
        return onValue(this.getDocumentReference(), snapshot => onChange(snapshot.val()))
    }

    save(document: T) {
        return set(this.getDocumentReference(), document)
    }
}
