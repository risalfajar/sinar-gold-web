import {
    CollectionReference,
    doc,
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
    protected readonly dateField: string = 'created'

    abstract getId(item: T): string

    abstract getCollectionRef(): CollectionReference<T>

    getQuery(order?: string | FieldPath, direction?: OrderByDirection): Query<T> {
        if (order)
            return query(this.getCollectionRef(), orderBy(order, direction))
        else
            return query(this.getCollectionRef())
    }

    async get(itemId: string): Promise<T | undefined> {
        const docRef = doc(await this.getCollectionRef(), itemId)
        const snapshot = await getDoc(docRef)
        return this.convertObject(snapshot)
    }

    getAll(): Promise<T[]> {
        return this.getDocs(this.getQuery())
    }

    async getByDate(start: Date, end: Date) {
        const startDate = DateTime.fromJSDate(start).startOf('day').toJSDate()
        const endDate = DateTime.fromJSDate(end).endOf('day').toJSDate()
        const q = query(this.getQuery(this.dateField), where(this.dateField, '>=', startDate), where(this.dateField, '<=', endDate))
        return this.getDocs(q)
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

    listenByDate(start: Date, end: Date, onChange: (data: T[]) => any) {
        const startDate = DateTime.fromJSDate(start).startOf('day').toJSDate()
        const endDate = DateTime.fromJSDate(end).endOf('day').toJSDate()
        const q = query(this.getQuery(this.dateField), where(this.dateField, '>=', startDate), where(this.dateField, '<=', endDate))
        return onSnapshot(q, (snapshot) => {
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

    protected async getDocs(query: Query<T>) {
        const snapshot = await getDocs(query)
        return this.convertObjects(snapshot)
    }

    protected getDocRefForItem(item: T) {
        const itemId = this.getId(item)
        const alreadyHaveId = itemId != null && itemId.length > 0
        return alreadyHaveId ? doc(this.getCollectionRef(), itemId) : doc(this.getCollectionRef())
    }
}
