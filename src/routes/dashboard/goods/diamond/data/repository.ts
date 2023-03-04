import {FirestoreRepository} from "$lib/common/data/firestoreRepository"
import {DiamondGoods, diamondGoodsConverter} from "./goods"
import {collection, CollectionReference, onSnapshot, query, where} from "firebase/firestore"
import {Firestore, Storage} from "$lib/firebase"
import {COLLECTION_GOODS_DIAMOND} from "$lib/constants"
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import {compressImage} from "$lib/common/utils/imageCompressor"

export default class DiamondGoodsRepository extends FirestoreRepository<DiamondGoods> {
	getCollectionRef(): CollectionReference<DiamondGoods> {
		return collection(Firestore, COLLECTION_GOODS_DIAMOND).withConverter(diamondGoodsConverter)
	}

	getId(item: DiamondGoods): string {
		return item.id
	}

	listenByChamfer(storefront: string, chamfer: string, itemType: string, onChange: (data: DiamondGoods[]) => any) {
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

	async saveWithImage(item: DiamondGoods, photo?: File) {
		if (photo) {
			item.id = this.getDocRefForItem(item).id
			item.photoUrl = await this.saveImage(item.id, photo)
		}
		return super.save(item)
	}

	private async saveImage(id: string, image: File) {
		const imageRef = ref(Storage, `${COLLECTION_GOODS_DIAMOND}/${id}`)
		const compressedImage = await compressImage(image)
		const uploadResult = await uploadBytes(imageRef, compressedImage)
		return getDownloadURL(uploadResult.ref)
	}
}
