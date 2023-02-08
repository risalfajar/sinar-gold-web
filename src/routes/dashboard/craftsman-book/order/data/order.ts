import {Salesman} from "$lib/master-data/salesman/salesman"
import {OrderMaterial} from "./material"
import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, serverTimestamp} from "firebase/firestore"
import firebase from "firebase/compat"

export type CraftsmanOrder = {
    id: string,
    created?: Date,
    craftsman: string,
    salesman: Salesman,
    modelCount: number,
    material: OrderMaterial
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
        return {...data, id: snap.id, created: data.created?.toDate()} as CraftsmanOrder
    }
}
