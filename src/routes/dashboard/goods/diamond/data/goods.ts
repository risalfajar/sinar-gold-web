import {Goods} from "../../data/goods"

export type DiamondGoods = Goods & {
	details: {
		name: string
		groupCode: string
		internCode: string
		markis: string
		type: string
		weight: number
		realWeight: number
		stockWeight: number
		plasticWeight: number
		attributeWeight: number
		attributeName: string
		attributePrice: number
	}
	diamond: {
		stoneType: string
		amounts: string[]
		giaCode: string[]
		weight: number
		price: number
	}
}
