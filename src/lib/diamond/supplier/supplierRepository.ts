import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_DIAMOND, NODE_MASTER_DATA, NODE_SUPPLIER} from "$lib/constants"
import {DiamondSupplier} from "./supplier"

export default class DiamondSupplierRepository extends MapDatabaseRepository<DiamondSupplier> {
    protected primaryKey: keyof DiamondSupplier = "code"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_DIAMOND}/${NODE_SUPPLIER}`)
    }
}
