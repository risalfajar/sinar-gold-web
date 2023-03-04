import {DiamondGoods} from "./goods"
import {FieldPath, OrderByDirection, Query, query, where} from "firebase/firestore"
import GoodsRepository from "../../data/repository"
import {GoodsType} from "../../data/goodsType"

export default class DiamondGoodsRepository extends GoodsRepository<DiamondGoods> {
	getQuery(order?: string | FieldPath, direction?: OrderByDirection): Query<DiamondGoods> {
		return query(
			super.getQuery(order, direction),
			where('type', '==', GoodsType.DIAMOND)
		)
	}
}
