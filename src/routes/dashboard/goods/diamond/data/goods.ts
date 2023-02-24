import {DocumentData, FirestoreDataConverter, PartialWithFieldValue, QueryDocumentSnapshot, serverTimestamp} from "firebase/firestore"

export type DiamondGoods = {
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
		groupCode: string
		internCode: string
		markis: string
		type: string
		weight: number
		realWeight: number
		stockWeight: number
		plasticWeight: number
		attributeWeight: number
		attributeName: string
		attributePrice: number
	}
	diamond: {
		stoneType: string
		amounts: string[]
		giaCode: string[]
		weight: number
		price: number
	}
}

export const diamondGoodsConverter: FirestoreDataConverter<DiamondGoods> = {
	toFirestore(data: PartialWithFieldValue<DiamondGoods>): DocumentData {
		delete data.id
		if (!data.created) data.created = serverTimestamp()
		return data
	},
	fromFirestore(snapshot: QueryDocumentSnapshot): DiamondGoods {
		const data = snapshot.data({serverTimestamps: 'estimate'})
		return {...data, id: snapshot.id, created: data.created?.toDate()} as DiamondGoods
	}
}
