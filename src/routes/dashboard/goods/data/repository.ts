import {FirestoreRepository} from "$lib/common/data/firestoreRepository"
import {collection, CollectionReference, onSnapshot, query, where} from "firebase/firestore"
import {Firestore, Storage} from "$lib/firebase"
import {COLLECTION_GOODS} from "$lib/constants"
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import {compressImage} from "$lib/common/utils/imageCompressor"
import {Goods, goodsConverter} from "./goods"

export default class GoodsRepository<T extends Goods = Goods> extends FirestoreRepository<T> {
	getCollectionRef(): CollectionReference<T> {
		// @ts-ignore
		return collection(Firestore, COLLECTION_GOODS).withConverter(goodsConverter)
	}

	getId(item: T): string {
		return item.id
	}

	listenByChamfer(storefront: string, chamfer: string, itemType: string, onChange: (data: T[]) => any) {
		const q = query(
			this.getQuery('details.name'),
			where('storefrontCode', '==', storefront),
			where('chamferCode', '==', chamfer),
			where('itemType', '==', itemType),
		)
		return onSnapshot(q, (snapshot) => {
			const data = this.convertObjects(snapshot)
			onChange(data)
		})
	}

	async saveWithImage(item: T, photo?: File) {
		if (photo) {
			item.id = this.getDocRefForItem(item).id
			item.photoUrl = await this.saveImage(item.id, photo)
		}
		return super.save(item)
	}

	private async saveImage(id: string, image: File) {
		const imageRef = ref(Storage, `${COLLECTION_GOODS}/${id}`)
		const compressedImage = await compressImage(image)
		const uploadResult = await uploadBytes(imageRef, compressedImage)
		return getDownloadURL(uploadResult.ref)
	}
}
