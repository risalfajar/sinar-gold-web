import {FirestoreRepository} from "$lib/common/data/firestoreRepository"
import {GoodsHistory, goodsHistoryConverter, HistoryType} from "./history"
import {collection, onSnapshot, query, where} from "firebase/firestore"
import {COLLECTION_GOODS_HISTORY} from "$lib/constants"
import {Firestore} from "$lib/firebase"
import {DateTime} from "luxon"

export default class GoodsHistoryRepository extends FirestoreRepository<GoodsHistory> {
	getCollectionRef() {
		return collection(Firestore, COLLECTION_GOODS_HISTORY).withConverter(goodsHistoryConverter)
	}

	getId(item: GoodsHistory): string {
		return item.id
	}

	listenByTypeAndDate(type: HistoryType | string, start: Date, end: Date, onChange: (data: GoodsHistory[]) => any) {
		const startDate = DateTime.fromJSDate(start).startOf('day').toJSDate()
		const endDate = DateTime.fromJSDate(end).endOf('day').toJSDate()
		const q = query(
			this.getQuery('created'),
			where('type', '==', type),
			where('created', '>=', startDate),
			where('created', '<=', endDate)
		)
		return onSnapshot(q, (snapshot) => {
			const data: GoodsHistory[] = this.convertObjects(snapshot)
			onChange(data)
		})
	}
}
