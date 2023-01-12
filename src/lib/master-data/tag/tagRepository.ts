import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_MASTER_DATA, NODE_TAG} from "$lib/constants"
import {Tag} from "$lib/master-data/tag/tag"

export default class TagRepository extends MapDatabaseRepository<Tag> {
    protected primaryKey: keyof Tag = "id"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_TAG}`)
    }
}
