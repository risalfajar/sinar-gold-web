import {FirestoreRepository} from "$lib/common/data/firestoreRepository"
import {GoodsHistory, goodsHistoryConverter} from "./history"
import {collection} from "firebase/firestore"
import {COLLECTION_GOODS_HISTORY} from "$lib/constants"
import {Firestore} from "$lib/firebase"

export default class GoodsHistoryRepository extends FirestoreRepository<GoodsHistory> {
	getCollectionRef() {
		return collection(Firestore, COLLECTION_GOODS_HISTORY).withConverter(goodsHistoryConverter)
	}

	getId(item: GoodsHistory): string {
		return item.id
	}
}
