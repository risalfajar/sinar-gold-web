import {Salesman} from "$lib/master-data/salesman/salesman"
import {OrderModel} from "./model"
import {OrderMaterial} from "./order"
import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, serverTimestamp, SnapshotOptions, WithFieldValue} from "firebase/firestore"

export type OrderDeposit = {
    id: string
    created: Date | null
    craftsman: string
    salesman: Salesman
    model: Omit<OrderModel, "photoFile">
    sourceMaterial: OrderMaterial
    finishedMaterial: OrderMaterial
    goldWeightGap: number
    laborCost: number
    pricePerGram: number
    totalCost: number
    photoUrl: string
    photoFile: File | null
}

export const depositConverter: FirestoreDataConverter<OrderDeposit> = {
    toFirestore: function (model: WithFieldValue<OrderDeposit>): DocumentData {
        const any = {...model} as any
        if (!any.created) any.created = serverTimestamp()
        delete any.id
        delete any.photoFile
        return any
    },
    fromFirestore: function (snapshot: QueryDocumentSnapshot, options?: SnapshotOptions | undefined): OrderDeposit {
        const data = snapshot.data()
        return {...data, id: snapshot.id, created: data.created?.toDate()} as OrderDeposit
    }
}
