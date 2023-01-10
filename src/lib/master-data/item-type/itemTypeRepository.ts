import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_ITEM_TYPE, NODE_MASTER_DATA} from "$lib/constants"
import {ItemType} from "$lib/master-data/item-type/itemType"

export default class ItemTypeRepository extends MapDatabaseRepository<ItemType> {
    protected getId(item: ItemType): string {
        return item.id
    }

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_ITEM_TYPE}`)
    }
}
