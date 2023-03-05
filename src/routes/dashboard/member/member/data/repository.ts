import {FirestoreRepository} from "$lib/common/data/firestoreRepository"
import {Member, memberConverter} from "./member"
import {collection, CollectionReference} from "firebase/firestore"
import {Firestore} from "$lib/firebase"
import {COLLECTION_MEMBERS} from "$lib/constants"

export default class MemberRepository extends FirestoreRepository<Member> {
	getCollectionRef(): CollectionReference<Member> {
		return collection(Firestore, COLLECTION_MEMBERS).withConverter(memberConverter)
	}

	getId(item: Member): string {
		return item.id
	}
}
