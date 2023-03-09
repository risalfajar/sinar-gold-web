import {DocumentData, FirestoreDataConverter, PartialWithFieldValue, QueryDocumentSnapshot, serverTimestamp} from "firebase/firestore"

export type NonMember = {
	id: string
	created: Date | null
	name: string
	phoneNumber: string
	address: string
	keywords?: string[]
}

export const nonMemberConverter: FirestoreDataConverter<NonMember> = {
	toFirestore(data: PartialWithFieldValue<NonMember>): DocumentData {
		delete data.id
		if (!data.created) data.created = serverTimestamp()
		return data
	},
	fromFirestore(snapshot: QueryDocumentSnapshot): NonMember {
		const data = snapshot.data({serverTimestamps: 'estimate'})
		return {...data, id: snapshot.id, created: data.created?.toDate()} as NonMember
	}
}
