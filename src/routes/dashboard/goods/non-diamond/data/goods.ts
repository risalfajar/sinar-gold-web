import {Goods, GoodsDetails} from "../../data/goods"

export type NonDiamondGoods = Omit<Goods, "details"> & { details: GoodsDetails & { price: number } }
