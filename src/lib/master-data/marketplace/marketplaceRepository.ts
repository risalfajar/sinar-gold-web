import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_MARKETPLACE, NODE_MASTER_DATA} from "$lib/constants"
import {Marketplace} from "$lib/master-data/marketplace/marketplace"

export default class MarketplaceRepository extends MapDatabaseRepository<Marketplace> {
    protected getId(item: Marketplace): string {
        return item.code
    }

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_MARKETPLACE}`)
    }
}
