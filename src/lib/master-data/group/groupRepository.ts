import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_GROUP, NODE_MASTER_DATA} from "$lib/constants"
import {Group} from "$lib/master-data/group/group"

export default class GroupRepository extends MapDatabaseRepository<Group> {
    protected primaryKey: keyof Group = "code"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_GROUP}`)
    }
}
