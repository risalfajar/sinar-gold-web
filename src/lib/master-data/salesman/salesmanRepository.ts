import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_MASTER_DATA, NODE_SALESMAN} from "$lib/constants"
import {Salesman} from "$lib/master-data/salesman/salesman"

export default class SalesmanRepository extends MapDatabaseRepository<Salesman> {
    protected getId(item: Salesman): string {
        return item.code
    }

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_SALESMAN}`)
    }
}
