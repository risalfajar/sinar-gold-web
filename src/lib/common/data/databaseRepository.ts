import {DatabaseReference, onValue, set, Unsubscribe} from "firebase/database"

export default abstract class DatabaseRepository<T> {
    abstract getDocumentReference(): DatabaseReference

    listen(onChange: (document: T) => unknown): Unsubscribe {
        return onValue(this.getDocumentReference(), snapshot => onChange(snapshot.val()))
    }

    save(document: T) {
        return set(this.getDocumentReference(), document)
    }
}
