import {OrderModel} from "./model"
import {Salesman} from "$lib/master-data/salesman/salesman"
import {OrderMaterial} from "./material"
import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, serverTimestamp, SetOptions} from "firebase/firestore"
import firebase from "firebase/compat"
import SnapshotOptions = firebase.firestore.SnapshotOptions

export type CraftsmanOrder = {
    id: string,
    created?: Date,
    craftsman: string,
    salesman: Salesman,
    models: OrderModel[],
    material: OrderMaterial
}

export const craftsmanOrderConverter: FirestoreDataConverter<CraftsmanOrder> = {
    toFirestore(model: CraftsmanOrder, options?: SetOptions): DocumentData {
        model.models.forEach(it => delete it.photoFile)
        const any = model as any
        if (!any.created) any.created = serverTimestamp()
        delete any.id
        return any
    },
    fromFirestore(snap: QueryDocumentSnapshot, options: SnapshotOptions | undefined): CraftsmanOrder {
        const data = snap.data()
        return {...data, id: snap.id, created: data.created?.toDate()} as CraftsmanOrder
    }
}
