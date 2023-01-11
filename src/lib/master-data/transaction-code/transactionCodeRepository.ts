import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_MASTER_DATA, NODE_TRANSACTION_CODE} from "$lib/constants"
import {TransactionCode} from "$lib/master-data/transaction-code/transactionCode"

export default class TransactionCodeRepository extends MapDatabaseRepository<TransactionCode> {
    protected getId(item: TransactionCode): string {
        return item.code
    }

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_TRANSACTION_CODE}`)
    }
}
