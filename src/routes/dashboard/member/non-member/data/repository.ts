import {FirestoreRepository} from "$lib/common/data/firestoreRepository"
import {NonMember, nonMemberConverter} from "./non-member"
import {collection, CollectionReference} from "firebase/firestore"
import {Firestore} from "$lib/firebase"
import {COLLECTION_NON_MEMBERS} from "$lib/constants"

export default class NonMemberRepository extends FirestoreRepository<NonMember> {
	getCollectionRef(): CollectionReference<NonMember> {
		return collection(Firestore, COLLECTION_NON_MEMBERS).withConverter(nonMemberConverter)
	}

	getId(item: NonMember): string {
		return item.id
	}
}
