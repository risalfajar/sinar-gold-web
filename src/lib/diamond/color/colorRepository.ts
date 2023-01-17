import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_COLOR, NODE_DIAMOND, NODE_MASTER_DATA} from "$lib/constants"
import {DiamondColor} from "$lib/diamond/color/color"

export default class DiamondColorRepository extends MapDatabaseRepository<DiamondColor> {
    primaryKey: keyof DiamondColor = "code"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_DIAMOND}/${NODE_COLOR}`)
    }
}
