import {FirestoreRepository} from "$lib/common/data/firestoreRepository"
import {Member, memberConverter} from "./member"
import {collection, CollectionReference, getDocs, query, SetOptions, where} from "firebase/firestore"
import {Firestore} from "$lib/firebase"
import {COLLECTION_MEMBERS} from "$lib/constants"

export default class MemberRepository extends FirestoreRepository<Member> {
	getCollectionRef(): CollectionReference<Member> {
		return collection(Firestore, COLLECTION_MEMBERS).withConverter(memberConverter)
	}

	getId(item: Member): string {
		return item.id
	}

	async getByKeyword(keyword: string) {
		const q = query(
			this.getQuery('name'),
			where('keywords', 'array-contains-any', keyword.toLowerCase().split(' '))
		)
		const snapshot = await getDocs(q)
		return this.convertObjects(snapshot)
	}

	async save(item: Member, options: SetOptions = {merge: true}): Promise<string> {
		item.keywords = item.name.toLowerCase().split(' ')
		return super.save(item, options)
	}
}
