import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_CHAMFER, NODE_MASTER_DATA} from "$lib/constants"
import {Chamfer} from "$lib/master-data/chamfer/chamfer"

export default class ChamferRepository extends MapDatabaseRepository<Chamfer> {
    protected primaryKey: keyof Chamfer = "code"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_CHAMFER}`)
    }
}
