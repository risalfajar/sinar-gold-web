import {FirestoreRepository} from "$lib/common/data/firestoreRepository"
import {CashAdvance, cashAdvanceConverter} from "../advance"
import {collection, CollectionReference} from "firebase/firestore"
import {Firestore} from "$lib/firebase"
import {COLLECTION_CRAFTSMAN_ORDER, COLLECTION_CRAFTSMAN_ORDER_ADVANCE} from "$lib/constants"

export default class CashAdvanceRepository extends FirestoreRepository<CashAdvance> {
    private readonly orderId: string

    constructor(orderId: string) {
        super()
        this.orderId = orderId
    }

    getCollectionRef(): CollectionReference<CashAdvance> {
        return collection(Firestore, COLLECTION_CRAFTSMAN_ORDER, this.orderId, COLLECTION_CRAFTSMAN_ORDER_ADVANCE)
            .withConverter(cashAdvanceConverter)
    }

    getId(item: CashAdvance): string {
        return item.id
    }
}
