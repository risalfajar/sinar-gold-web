import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_MASTER_DATA, NODE_SUPPLIER} from "$lib/constants"
import {Supplier} from "$lib/master-data/supplier/supplier"

export default class SupplierRepository extends MapDatabaseRepository<Supplier> {
    protected primaryKey: keyof Supplier = "code"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_SUPPLIER}`)
    }
}
