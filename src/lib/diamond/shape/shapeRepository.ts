import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_DIAMOND, NODE_MASTER_DATA, NODE_SHAPE} from "$lib/constants"
import {DiamondShape} from "./shape"

export default class DiamondShapeRepository extends MapDatabaseRepository<DiamondShape> {
    primaryKey: keyof DiamondShape = "code"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_DIAMOND}/${NODE_SHAPE}`)
    }
}
