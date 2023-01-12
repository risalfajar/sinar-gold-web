import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_MASTER_DATA, NODE_POINT} from "$lib/constants"
import {Point} from "$lib/master-data/point/point"

export default class PointRepository extends MapDatabaseRepository<Point> {
    protected primaryKey: keyof Point = "id"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_POINT}`)
    }
}
