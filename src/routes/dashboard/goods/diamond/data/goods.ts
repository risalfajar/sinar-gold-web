import {Goods} from "../../data/goods"

export type DiamondGoods = Goods & {
	diamond: {
		stoneType: string
		amounts: string[]
		giaCode: string[]
		weight: number
		price: number
	}
}
