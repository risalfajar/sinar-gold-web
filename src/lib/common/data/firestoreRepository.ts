import {ReadOnlyFirestoreRepository} from "$lib/common/data/readOnlyFirestoreRepository"
import {deleteDoc, doc, setDoc, SetOptions, UpdateData, updateDoc, writeBatch,} from 'firebase/firestore'
import {Firestore} from 'src/config/firebase'

export abstract class FirestoreRepository<T> extends ReadOnlyFirestoreRepository<T> {
    async update(itemId: string, data: UpdateData<T>) {
        const docRef = doc(this.getCollectionRef(), itemId)
        return updateDoc(docRef, data)
    }

    async save(item: T, options: SetOptions = {merge: true}) {
        const docRef = this.getDocRefForItem(item)
        await setDoc(docRef, item, options)
        return docRef.id
    }

    async saveAll(items: T[], options: SetOptions = {merge: true}) {
        const batch = writeBatch(Firestore)
        items.forEach(item => {
            const docRef = this.getDocRefForItem(item)
            batch.set(docRef, item, options)
        })
        await batch.commit()
    }

    async delete(itemId: string) {
        const docRef = doc(await this.getCollectionRef(), itemId)
        await deleteDoc(docRef)
    }
}
