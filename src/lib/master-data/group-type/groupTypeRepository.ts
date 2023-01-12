import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_GROUP_TYPE, NODE_MASTER_DATA} from "$lib/constants"
import {GroupType} from "$lib/master-data/group-type/groupType"

export default class GroupTypeRepository extends MapDatabaseRepository<GroupType> {
    protected primaryKey: keyof GroupType = "type"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_GROUP_TYPE}`)
    }
}
