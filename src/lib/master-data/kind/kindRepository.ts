import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_KIND, NODE_MASTER_DATA} from "$lib/constants"
import {Kind} from "$lib/master-data/kind/kind"

export default class KindRepository extends MapDatabaseRepository<Kind> {
    protected getId(item: Kind): string {
        return item.code
    }

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_KIND}`)
    }
}
