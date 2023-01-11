import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_MASTER_DATA, NODE_PURCHASE_CONDITION} from "$lib/constants"
import {PurchaseCondition} from "$lib/master-data/purchase-condition/purchaseCondition"

export default class PurchaseConditionRepository extends MapDatabaseRepository<PurchaseCondition> {
    protected getId(item: PurchaseCondition): string {
        return item.code
    }

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_PURCHASE_CONDITION}`)
    }
}
