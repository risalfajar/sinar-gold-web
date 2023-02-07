import {FirestoreRepository} from "$lib/common/data/firestoreRepository"
import {CraftsmanOrder, craftsmanOrderConverter} from "./order"
import {collection, CollectionReference, FieldPath, OrderByDirection, query, Query, SetOptions, where} from "firebase/firestore"
import {Firestore, Storage} from "$lib/firebase"
import {COLLECTION_CRAFTSMAN_ORDER} from "$lib/constants"
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"
import {compressImage} from "$lib/common/utils/imageCompressor"

export default class CraftsmanOrderRepository extends FirestoreRepository<CraftsmanOrder> {
    private readonly salesmanCode?: string
    private readonly craftsmanName?: string

    constructor(salesmanCode?: string, craftsmanName?: string) {
        super()
        this.salesmanCode = salesmanCode
        this.craftsmanName = craftsmanName
    }

    getCollectionRef(): CollectionReference<CraftsmanOrder> {
        return collection(Firestore, COLLECTION_CRAFTSMAN_ORDER)
            .withConverter(craftsmanOrderConverter)
    }

    getQuery(order?: string | FieldPath, direction?: OrderByDirection): Query<CraftsmanOrder> {
        let q = super.getQuery(order, direction)
        if (this.salesmanCode)
            q = query(q, where('salesman.code', '==', this.salesmanCode))
        if (this.craftsmanName)
            q = query(q, where('craftsman', '==', this.craftsmanName))
        return q
    }

    getId(item: CraftsmanOrder): string {
        return item.id
    }

    async save(item: CraftsmanOrder, options: SetOptions = {merge: true}): Promise<string> {
        for (const model of item.models) {
            const index = item.models.indexOf(model)
            item.models[index].photoUrl = await this.saveImage(model.photoFile!, item.id, index.toString())
        }

        return super.save(item, options)
    }

    private async saveImage(image: File, id: string, fileName: string): Promise<string> {
        const imageRef = ref(Storage, `${COLLECTION_CRAFTSMAN_ORDER}/${id}/${fileName}`)
        const compressedImage = await compressImage(image)
        const uploadResult = await uploadBytes(imageRef, compressedImage)
        return getDownloadURL(uploadResult.ref)
    }
}
