import GoodsRepository from "../../data/repository"
import {NonDiamondGoods} from "./goods"
import {FieldPath, OrderByDirection, query, Query, where} from "firebase/firestore"
import {GoodsType} from "../../data/goodsType"

export default class NonDiamondGoodsRepository extends GoodsRepository<NonDiamondGoods> {
	getQuery(order?: string | FieldPath, direction?: OrderByDirection): Query<NonDiamondGoods> {
		return query(
			super.getQuery(order, direction),
			where('type', '==', GoodsType.NON_DIAMOND)
		)
	}
}
