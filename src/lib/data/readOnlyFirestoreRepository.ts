import {
    CollectionReference,
    doc,
    documentId,
    DocumentSnapshot,
    FieldPath,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    OrderByDirection,
    query,
    Query,
    QuerySnapshot,
    Unsubscribe,
    where,
} from 'firebase/firestore'
import {DateTime} from 'luxon'

export abstract class ReadOnlyFirestoreRepository<T> {
    abstract getId(item: T): string

    abstract getCollectionRef(): CollectionReference<T>

    getQuery(order: string | FieldPath = documentId(), direction?: OrderByDirection): Query<T> {
        return query(this.getCollectionRef(), orderBy(order, direction))
    }

    async get(itemId: string): Promise<T | undefined> {
        const docRef = doc(await this.getCollectionRef(), itemId)
        const snapshot = await getDoc(docRef)
        return this.convertObject(snapshot)
    }

    async getAll(): Promise<T[]> {
        const snapshot = await getDocs(await this.getQuery())
        return this.convertObjects(snapshot)
    }

    async getByDate(start: Date, end: Date) {
        const startDate = DateTime.fromJSDate(start).startOf('day').toJSDate()
        const endDate = DateTime.fromJSDate(end).endOf('day').toJSDate()
        const q = query(this.getCollectionRef(), orderBy('created'), where('created', '>=', startDate), where('created', '<=', endDate))
        const snapshot = await getDocs(q)
        return this.convertObjects(snapshot)
    }

    listen(itemId: string, onChange: (data: T | null) => any): Unsubscribe {
        return onSnapshot(doc(this.getCollectionRef(), itemId), (snapshot) => {
            const data = this.convertObject(snapshot) ?? null
            onChange(data)
        })
    }

    listenAll(onChange: (data: T[]) => any): Unsubscribe {
        return onSnapshot(this.getQuery(), (snapshot) => {
            const data: T[] = this.convertObjects(snapshot)
            onChange(data)
        })
    }

    convertObject(snapshot: DocumentSnapshot<T>): T | undefined {
        return snapshot.data()
    }

    convertObjects(snapshot: QuerySnapshot<T>): T[] {
        return snapshot.docs
            .map(val => this.convertObject(val))
            .filter(val => val != null) as T[]
    }

    protected getDocRefForItem(item: T) {
        const itemId = this.getId(item)
        const alreadyHaveId = itemId != null && itemId.length > 0
        return alreadyHaveId ? doc(this.getCollectionRef(), itemId) : doc(this.getCollectionRef())
    }
}
