import {Salesman} from "$lib/master-data/salesman/salesman"
import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, serverTimestamp} from "firebase/firestore"

export type CraftsmanOrder = {
    id: string
    created?: Date
    finished?: Date
    craftsman: string
    salesman: Salesman
    modelCount: number
    material: OrderMaterial
    advancesTotal: number
    finishedWeight: number
    laborCost: number
    totalCost: number
}

export type OrderMaterial = {
    rate: string
    goldWeight: number
    sampleWeight: number
    jewelWeight: number
}

export const craftsmanOrderConverter: FirestoreDataConverter<CraftsmanOrder> = {
    toFirestore(model: CraftsmanOrder): DocumentData {
        const any = model as any
        if (!any.created) any.created = serverTimestamp()
        delete any.id
        return any
    },
    fromFirestore(snap: QueryDocumentSnapshot): CraftsmanOrder {
        const data = snap.data()
        return {...data, id: snap.id, created: data.created?.toDate(), finished: data.finished?.toDate()} as CraftsmanOrder
    }
}
