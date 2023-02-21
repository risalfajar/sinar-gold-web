import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_CRAFTSMAN, NODE_MASTER_DATA} from "$lib/constants"
import {Craftsman} from "$lib/master-data/craftsman/craftsman"

export default class CraftsmanRepository extends MapDatabaseRepository<Craftsman> {
    primaryKey: keyof Craftsman = "name"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_CRAFTSMAN}`)
    }

    async update(oldItem: Craftsman, newItem: Craftsman): Promise<void> {
        await this.remove(oldItem.name)
        await this.save(newItem)
    }
}
