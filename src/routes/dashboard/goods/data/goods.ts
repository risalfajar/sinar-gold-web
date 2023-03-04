import {GoodsType} from "./goodsType"
import {DocumentData, FirestoreDataConverter, PartialWithFieldValue, QueryDocumentSnapshot, serverTimestamp} from "firebase/firestore"

export type Goods = {
	id: string
	created: Date | null
	type: GoodsType
	category: string
	kindCode: string
	chamferCode: string
	storefrontCode: string
	supplierCode: string
	itemType: string
	photoUrl: string
}

export const goodsConverter: FirestoreDataConverter<Goods> = {
	toFirestore(data: PartialWithFieldValue<Goods>): DocumentData {
		delete data.id
		if (!data.created) data.created = serverTimestamp()
		return data
	},
	fromFirestore(snapshot: QueryDocumentSnapshot): Goods {
		const data = snapshot.data({serverTimestamps: 'estimate'})
		return {...data, id: snapshot.id, created: data.created?.toDate()} as Goods
	}
}
