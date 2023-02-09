import {FirestoreRepository} from "$lib/common/data/firestoreRepository"
import {CraftsmanOrder, craftsmanOrderConverter} from "../order"
import {collection, CollectionReference, FieldPath, OrderByDirection, query, Query, where} from "firebase/firestore"
import {Firestore} from "$lib/firebase"
import {COLLECTION_CRAFTSMAN_ORDER} from "$lib/constants"

export default class CraftsmanOrderRepository extends FirestoreRepository<CraftsmanOrder> {
    private readonly salesmanCode?: string
    private readonly craftsmanName?: string

    constructor(salesmanCode?: string, craftsmanName?: string) {
        super()
        this.salesmanCode = salesmanCode
        this.craftsmanName = craftsmanName
    }

    getCollectionRef(): CollectionReference<CraftsmanOrder> {
        return collection(Firestore, COLLECTION_CRAFTSMAN_ORDER)
            .withConverter(craftsmanOrderConverter)
    }

    getQuery(order?: string | FieldPath, direction?: OrderByDirection): Query<CraftsmanOrder> {
        let q = super.getQuery(order, direction)
        if (this.salesmanCode)
            q = query(q, where('salesman.code', '==', this.salesmanCode))
        if (this.craftsmanName)
            q = query(q, where('craftsman', '==', this.craftsmanName))
        return q
    }

    getId(item: CraftsmanOrder): string {
        return item.id
    }
}
