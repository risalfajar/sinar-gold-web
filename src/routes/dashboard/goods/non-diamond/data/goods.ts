import {Goods} from "../../data/goods"

export type NonDiamondGoods = Goods & {
	details: {
		name: string
		internCode: string
		markis: string
		weight: number
		realWeight: number
		stockWeight: number
		plasticWeight: number
		attributeWeight: number
		attributeName: string
		attributePrice: number
	}
}
