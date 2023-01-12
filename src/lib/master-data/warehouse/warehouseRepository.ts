import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_MASTER_DATA, NODE_WAREHOUSE} from "$lib/constants"
import {Warehouse} from "$lib/master-data/warehouse/warehouse"

export default class WarehouseRepository extends MapDatabaseRepository<Warehouse> {
    protected primaryKey: keyof Warehouse = "code"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_WAREHOUSE}`)
    }
}
