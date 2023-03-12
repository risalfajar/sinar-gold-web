import {ReadOnlyFirestoreRepository} from "$lib/common/data/readOnlyFirestoreRepository"
import {Sales, salesConverter} from "./sales"
import {collection, CollectionReference} from "firebase/firestore"
import {Firestore, Functions} from "$lib/firebase"
import {COLLECTION_SALES} from "$lib/constants"
import {httpsCallable, HttpsCallableResult} from "firebase/functions"

export default class SalesRepository extends ReadOnlyFirestoreRepository<Sales> {
	protected readonly dateField: string = 'createdAt'

	getCollectionRef(): CollectionReference<Sales> {
		return collection(Firestore, COLLECTION_SALES).withConverter(salesConverter)
	}

	getId(item: Sales): string {
		return item.id
	}

	create(data: Sales): Promise<HttpsCallableResult> {
		const callable = httpsCallable(Functions, 'createSales')
		return callable(data)
	}
}
