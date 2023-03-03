import {DocumentData, FirestoreDataConverter, PartialWithFieldValue, QueryDocumentSnapshot, serverTimestamp} from "firebase/firestore"

export type NonDiamondGoods = {
	id: string
	created: Date | null
	category: string
	kindCode: string
	chamferCode: string
	storefrontCode: string
	supplierCode: string
	itemType: string
	photoUrl: string
	details: {
		name: string
		internCode: string
		markis: string
		weight: number
		realWeight: number
		stockWeight: number
		plasticWeight: number
		attributeWeight: number
		attributeName: string
		attributePrice: number
	}
}

export const nonDiamondGoodsConverter: FirestoreDataConverter<NonDiamondGoods> = {
	toFirestore(data: PartialWithFieldValue<NonDiamondGoods>): DocumentData {
		delete data.id
		if (!data.created) data.created = serverTimestamp()
		return data
	},
	fromFirestore(snapshot: QueryDocumentSnapshot): NonDiamondGoods {
		const data = snapshot.data({serverTimestamps: 'estimate'})
		return {...data, id: snapshot.id, created: data.created?.toDate()} as NonDiamondGoods
	}
}
