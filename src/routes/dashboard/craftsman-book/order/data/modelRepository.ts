import {FirestoreRepository} from "$lib/common/data/firestoreRepository"
import {modelConverter, OrderModel} from "./model"
import {collection, CollectionReference, SetOptions} from "firebase/firestore"
import {Firestore, Storage} from "$lib/firebase"
import {COLLECTION_CRAFTSMAN_ORDER, COLLECTION_CRAFTSMAN_ORDER_MODEL} from "$lib/constants"
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import {compressImage} from "$lib/common/utils/imageCompressor"

export default class CraftsmanOrderModelRepository extends FirestoreRepository<OrderModel> {
    private readonly orderId: string

    constructor(orderId: string) {
        super()
        this.orderId = orderId
    }

    getCollectionRef(): CollectionReference<OrderModel> {
        return collection(Firestore, COLLECTION_CRAFTSMAN_ORDER, this.orderId, COLLECTION_CRAFTSMAN_ORDER_MODEL)
            .withConverter(modelConverter)
    }

    getId(item: OrderModel): string {
        return item.id
    }

    async save(item: OrderModel, options: SetOptions = {merge: true}): Promise<string> {
        const modelId = this.getDocRefForItem(item).id
        item.id = modelId
        item.photoUrl = await this.saveImage(item.photoFile!, item.id, modelId)
        return super.save(item, options)
    }

    private async saveImage(image: File, orderId: string, modelId: string): Promise<string> {
        const imageRef = ref(Storage, `${COLLECTION_CRAFTSMAN_ORDER}/${orderId}/${COLLECTION_CRAFTSMAN_ORDER_MODEL}/${modelId}`)
        const compressedImage = await compressImage(image)
        const uploadResult = await uploadBytes(imageRef, compressedImage)
        return getDownloadURL(uploadResult.ref)
    }
}
