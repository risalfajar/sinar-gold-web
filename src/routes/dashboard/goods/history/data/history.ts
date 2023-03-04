import {DocumentData, FirestoreDataConverter, PartialWithFieldValue, QueryDocumentSnapshot, serverTimestamp} from "firebase/firestore"
import {DiamondGoods} from "../../diamond/data/goods"
import {NonDiamondGoods} from "../../non-diamond/data/goods"

export type GoodsHistory = {
	id: string
	created: Date | null
	type: HistoryType
	goods: DiamondGoods | NonDiamondGoods
	oldGoods?: DiamondGoods | NonDiamondGoods
}

export enum HistoryType {
	IN = "IN",
	MOVE = "MOVE",
	SOLD = "SOLD",
}

export const goodsHistoryConverter: FirestoreDataConverter<GoodsHistory> = {
	toFirestore(data: PartialWithFieldValue<GoodsHistory>): DocumentData {
		delete data.id
		if (!data.created) data.created = serverTimestamp()
		return data
	},
	fromFirestore(snapshot: QueryDocumentSnapshot): GoodsHistory {
		const data = snapshot.data()
		return {
			...data,
			id: snapshot.id,
			created: data.created?.toDate(),
			goods: {...data.goods, created: data.goods.created?.toDate()}
		} as GoodsHistory
	}
}
