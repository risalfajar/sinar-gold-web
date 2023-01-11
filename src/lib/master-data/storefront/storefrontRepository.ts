import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_MASTER_DATA, NODE_STOREFRONT} from "$lib/constants"
import {Storefront} from "$lib/master-data/storefront/storefront"

export default class StorefrontRepository extends MapDatabaseRepository<Storefront> {
    protected getId(item: Storefront): string {
        return item.code
    }

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_STOREFRONT}`)
    }
}
