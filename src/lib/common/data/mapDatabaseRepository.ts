import DatabaseRepository from "$lib/common/data/databaseRepository"
import {child, push, remove, runTransaction, set, Unsubscribe} from "firebase/database"
import {ItemAlreadyExistError} from "$lib/errors"

export default abstract class MapDatabaseRepository<T> extends DatabaseRepository<Record<string, T>> {
    abstract primaryKey: keyof T

    async getChildren(): Promise<T[]> {
        const data = await this.get()
        return Object.values(data ?? {})
    }

    listenChildren(onChange: (document: T[]) => unknown): Unsubscribe {
        return this.listen(document => onChange(Object.values(document ?? {})))
    }

    create(item: T) {
        const ref = this.getChildRef(item)
        const data = {...item, [this.primaryKey]: ref.key}

        return runTransaction(ref, (item) => {
            if (item)
                throw new ItemAlreadyExistError()
            else
                return data
        })
    }

    update(oldItem: T, newItem: T) {
        const ref = this.getChildRef(oldItem)
        return set(ref, {...newItem, [this.primaryKey]: ref.key})
    }

    save(item: T) {
        const ref = this.getChildRef(item)
        return set(ref, {...item, [this.primaryKey]: ref.key})
    }

    remove(itemId: string) {
        return remove(child(this.getDocumentReference(), itemId))
    }

    protected getChildRef(item: T) {
        const itemId = item[this.primaryKey] as string

        if (itemId && itemId.length > 0)
            return child(this.getDocumentReference(), itemId)
        else
            return push(this.getDocumentReference())
    }
}
