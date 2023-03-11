import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_BANK_ACCOUNT_NUMBER, NODE_MASTER_DATA} from "$lib/constants"
import {BankAccountNumber} from "$lib/master-data/bank-account-number/bankAccountNumber"

export default class BankAccountNumberRepository extends MapDatabaseRepository<BankAccountNumber> {
    primaryKey: keyof BankAccountNumber = "id"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_BANK_ACCOUNT_NUMBER}`)
    }
}
