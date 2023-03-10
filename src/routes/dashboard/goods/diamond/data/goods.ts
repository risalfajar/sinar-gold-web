import {Goods, GoodsDetails} from "../../data/goods"

export type DiamondGoods = Omit<Goods, "details"> & { details: GoodsDetails & { diamond: Diamond } }

type Diamond = {
	stoneType: string
	amounts: string[]
	giaCode: string[]
}
