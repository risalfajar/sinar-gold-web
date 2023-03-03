import {FirestoreRepository} from "$lib/common/data/firestoreRepository"
import {collection, CollectionReference} from "firebase/firestore"
import {Firestore, Storage} from "$lib/firebase"
import {COLLECTION_GOODS_NON_DIAMOND} from "$lib/constants"
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import {compressImage} from "$lib/common/utils/imageCompressor"
import {NonDiamondGoods, nonDiamondGoodsConverter} from "./goods"

export default class NonDiamondGoodsRepository extends FirestoreRepository<NonDiamondGoods> {
	getCollectionRef(): CollectionReference<NonDiamondGoods> {
		return collection(Firestore, COLLECTION_GOODS_NON_DIAMOND).withConverter(nonDiamondGoodsConverter)
	}

	getId(item: NonDiamondGoods): string {
		return item.id
	}

	async saveWithImage(item: NonDiamondGoods, photo?: File) {
		if (photo) {
			item.id = this.getDocRefForItem(item).id
			item.photoUrl = await this.saveImage(item.id, photo)
		}
		return super.save(item)
	}

	private async saveImage(id: string, image: File) {
		const imageRef = ref(Storage, `${COLLECTION_GOODS_NON_DIAMOND}/${id}`)
		const compressedImage = await compressImage(image)
		const uploadResult = await uploadBytes(imageRef, compressedImage)
		return getDownloadURL(uploadResult.ref)
	}
}
