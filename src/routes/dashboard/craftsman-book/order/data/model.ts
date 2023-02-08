import {DocumentData, FirestoreDataConverter, QueryDocumentSnapshot} from "firebase/firestore"

export type OrderModel = {
    id: string
    size: string,
    details: string,
    photoUrl: string,
    photoFile?: File,
    quantity: number
}

export const modelConverter: FirestoreDataConverter<OrderModel> = {
    toFirestore(model: OrderModel): DocumentData {
        const any = model as any
        delete any.photoFile
        delete any.id
        return any
    },
    fromFirestore(snap: QueryDocumentSnapshot): OrderModel {
        const data = snap.data()
        return {...data, id: snap.id} as OrderModel
    }
}
