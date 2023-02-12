import {FirestoreRepository} from "$lib/common/data/firestoreRepository"
import {collection, CollectionReference, SetOptions} from "firebase/firestore"
import {depositConverter, OrderDeposit} from "../deposit"
import {Firestore, Storage} from "$lib/firebase"
import {COLLECTION_CRAFTSMAN_ORDER, COLLECTION_CRAFTSMAN_ORDER_DEPOSIT} from "$lib/constants"
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import {compressImage} from "$lib/common/utils/imageCompressor"

export default class DepositRepository extends FirestoreRepository<OrderDeposit> {
    private readonly orderId: string

    constructor(orderId: string) {
        super()
        this.orderId = orderId
    }

    getId(item: OrderDeposit): string {
        return item.id
    }

    getCollectionRef(): CollectionReference<OrderDeposit> {
        return collection(Firestore, COLLECTION_CRAFTSMAN_ORDER, this.orderId, COLLECTION_CRAFTSMAN_ORDER_DEPOSIT)
            .withConverter(depositConverter)
    }

    async save(item: OrderDeposit, options: SetOptions = {merge: true}): Promise<string> {
        item.id = this.getDocRefForItem(item).id
        item.photoUrl = await this.saveImage(item.photoFile!, this.orderId, item.id)
        return super.save(item, options)
    }

    private async saveImage(image: File, orderId: string, depositId: string): Promise<string> {
        const imageRef = ref(Storage, `${COLLECTION_CRAFTSMAN_ORDER}/${orderId}/${COLLECTION_CRAFTSMAN_ORDER_DEPOSIT}/${depositId}`)
        const compressedImage = await compressImage(image)
        const uploadResult = await uploadBytes(imageRef, compressedImage)
        return getDownloadURL(uploadResult.ref)
    }
}
