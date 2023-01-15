import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_CASH_CATEGORY, NODE_MASTER_DATA} from "$lib/constants"
import {CashCategory} from "$lib/master-data/cash-category/cashCategory"

export default class CashCategoryRepository extends MapDatabaseRepository<CashCategory> {
    protected primaryKey: keyof CashCategory = "category"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_CASH_CATEGORY}`)
    }
}
