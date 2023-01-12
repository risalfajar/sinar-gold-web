import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_COST, NODE_MASTER_DATA} from "$lib/constants"
import {Cost} from "$lib/master-data/cost/cost"

export default class CostRepository extends MapDatabaseRepository<Cost> {
    protected primaryKey: keyof Cost = "code"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_COST}`)
    }
}
