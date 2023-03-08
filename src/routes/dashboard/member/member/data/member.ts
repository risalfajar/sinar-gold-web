import {DocumentData, FirestoreDataConverter, PartialWithFieldValue, QueryDocumentSnapshot, serverTimestamp} from "firebase/firestore"

export type Member = {
	id: string
	created: Date | null
	name: string
	idNumber: string
	birthDate: Date
	phoneNumber: string
	email: string
	address: string
	subDistrict: string
	urbanVillage: string
	city: string
	point: number
	keywords: string[]
}

export const memberConverter: FirestoreDataConverter<Member> = {
	toFirestore(data: PartialWithFieldValue<Member>): DocumentData {
		delete data.id
		if (!data.created) data.created = serverTimestamp()
		return data
	},
	fromFirestore(snapshot: QueryDocumentSnapshot): Member {
		const data = snapshot.data({serverTimestamps: 'estimate'})
		return {...data, id: snapshot.id, created: data.created?.toDate(), birthDate: data.birthDate.toDate()} as Member
	}
}
