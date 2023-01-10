import DatabaseRepository from "$lib/common/data/databaseRepository"
import {child, remove, set, Unsubscribe} from "firebase/database"

export default abstract class MapDatabaseRepository<T> extends DatabaseRepository<Record<string, T>> {
    protected abstract getId(item: T): string

    async getChildren(): Promise<T[]> {
        const data = await this.get()
        return Object.values(data ?? {})
    }

    listenChildren(onChange: (document: T[]) => unknown): Unsubscribe {
        return this.listen(document => onChange(Object.values(document ?? {})))
    }

    set(item: T) {
        const ref = this.getChildRef(item)
        return set(ref, item)
    }

    remove(itemId: string) {
        return remove(child(this.getDocumentReference(), itemId))
    }

    protected getChildRef(item: T) {
        const itemId = this.getId(item)

        if (itemId.length === 0)
            throw Error("Item Id can't be blank")

        return child(this.getDocumentReference(), itemId)
    }
}
