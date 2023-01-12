import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
import {DatabaseReference, ref} from "firebase/database"
import {Database} from "$lib/firebase"
import {NODE_GOLD_PRICE, NODE_MASTER_DATA} from "$lib/constants"
import {GoldPrice} from "$lib/master-data/gold-price/goldPrice"

export default class GoldPriceRepository extends MapDatabaseRepository<GoldPrice> {
    protected primaryKey: keyof GoldPrice = "id"

    getDocumentReference(): DatabaseReference {
        return ref(Database, `${NODE_MASTER_DATA}/${NODE_GOLD_PRICE}`)
    }
}
