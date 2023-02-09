import {FirestoreRepository} from "$lib/common/data/firestoreRepository"
import {CashAdvance, cashAdvanceConverter} from "../advance"
import {collection, CollectionReference, FieldPath, OrderByDirection, Query} from "firebase/firestore"
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

    getQuery(order: string | FieldPath = 'created', direction?: OrderByDirection): Query<CashAdvance> {
        return super.getQuery(order, direction)
    }

    getId(item: CashAdvance): string {
        return item.id
    }
}
