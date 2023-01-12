import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_BANK, NODE_MASTER_DATA} from "$lib/constants"
import {Bank} from "$lib/master-data/bank/bank"

export default class BankRepository extends MapDatabaseRepository<Bank> {
    protected primaryKey: keyof Bank = "id"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_BANK}`)
    }
}
