import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_CUT_GRADE, NODE_DIAMOND, NODE_MASTER_DATA} from "$lib/constants"
import {Diamond} from "$lib/diamond/diamond"

export default class DiamondCutGradeRepository extends MapDatabaseRepository<Diamond> {
    primaryKey: keyof Diamond = "code"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_DIAMOND}/${NODE_CUT_GRADE}`)
    }
}
