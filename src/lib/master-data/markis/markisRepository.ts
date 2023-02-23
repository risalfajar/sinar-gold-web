import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_MARKIS, NODE_MASTER_DATA} from "$lib/constants"
import {Markis} from "$lib/master-data/markis/markis"

export default class MarkisRepository extends MapDatabaseRepository<Markis> {
    primaryKey: keyof Markis = "code"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_MARKIS}`)
    }
}
