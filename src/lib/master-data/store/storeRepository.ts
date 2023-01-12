import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_MASTER_DATA, NODE_STORE} from "$lib/constants"
import {Store} from "$lib/master-data/store/store"

export default class StoreRepository extends MapDatabaseRepository<Store> {
    protected primaryKey: keyof Store = "code"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_STORE}`)
    }
}
