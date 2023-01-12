import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_ITEM_CONDITION, NODE_MASTER_DATA} from "$lib/constants"
import {ItemCondition} from "$lib/master-data/item-condition/itemCondition"

export default class ItemConditionRepository extends MapDatabaseRepository<ItemCondition> {
    protected primaryKey: keyof ItemCondition = "condition"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_ITEM_CONDITION}`)
    }
}
