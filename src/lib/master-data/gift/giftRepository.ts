import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_GIFT, NODE_MASTER_DATA} from "$lib/constants"
import {Gift} from "$lib/master-data/gift/gift"

export default class GiftRepository extends MapDatabaseRepository<Gift> {
    protected primaryKey: keyof Gift = "id"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_GIFT}`)
    }
}
