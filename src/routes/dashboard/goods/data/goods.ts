import {GoodsType} from "./goodsType"
import {DocumentData, FirestoreDataConverter, PartialWithFieldValue, QueryDocumentSnapshot, serverTimestamp} from "firebase/firestore"
import {GoodsStatus} from "./goodsStatus"

export type Goods = {
	id: string
	created: Date | null
	type: GoodsType
	status: GoodsStatus
	groupCode: string
	kindCode: string
	chamferCode: string
	storefrontCode: string
	supplierCode: string
	itemType: string
	photoUrl: string
	details: GoodsDetails
}

export type GoodsDetails = {
	name: string
	internCode: string
	markis: string
	weight: number
	price: number
	realWeight: number
	stockWeight: number
	plasticWeight: number
	attribute: {
		name: string
		weight: number
		price: number
	}
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
