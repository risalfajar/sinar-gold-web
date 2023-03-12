import {derived, Readable, readable, Subscriber} from "svelte/store"
import {Unsubscribe} from "firebase/firestore"
import {UserRepository} from "$lib/users/data/userRepository"
import {User} from "$lib/users/types/user"
import GroupRepository from "$lib/master-data/group/groupRepository"
import CraftsmanRepository from "$lib/master-data/craftsman/craftsmanRepository"
import SalesmanRepository from "$lib/master-data/salesman/salesmanRepository"
import {Salesman} from "$lib/master-data/salesman/salesman"
import StorefrontRepository from "$lib/master-data/storefront/storefrontRepository"
import {Storefront} from "$lib/master-data/storefront/storefront"
import {Kind} from "$lib/master-data/kind/kind"
import KindRepository from "$lib/master-data/kind/kindRepository"
import {Group} from "$lib/master-data/group/group"
import {ItemType} from "$lib/master-data/item-type/itemType"
import ItemTypeRepository from "$lib/master-data/item-type/itemTypeRepository"
import SupplierRepository from "$lib/master-data/supplier/supplierRepository"
import {Supplier} from "$lib/master-data/supplier/supplier"
import ChamferRepository from "$lib/master-data/chamfer/chamferRepository"
import {Chamfer} from "$lib/master-data/chamfer/chamfer"
import WarehouseRepository from "$lib/master-data/warehouse/warehouseRepository"
import {Warehouse} from "$lib/master-data/warehouse/warehouse"
import MarkisRepository from "$lib/master-data/markis/markisRepository"
import {Markis} from "$lib/master-data/markis/markis"
import DiamondStoneTypeRepository from "$lib/diamond/stone-type/repository"
import {Diamond} from "$lib/diamond/diamond"
import {BankAccountNumber} from "$lib/master-data/bank-account-number/bankAccountNumber"
import BankAccountNumberRepository from "$lib/master-data/bank-account-number/bankAccountNumberRepository"

export const currentUser: Readable<User | null> = readable(null, function start(set: Subscriber<User | null>) {
	const repository = new UserRepository()
	let unsubscribe: Unsubscribe | null

	repository.listenCurrentUser(user => set(user))
		.then(unsub => unsubscribe = unsub)

	return function stop() {
		unsubscribe?.()
	}
})

// Master Data Stores
export const craftsmans = readable<string[]>([], set => {
	const repository = new CraftsmanRepository()
	return repository.listenChildren(items => set(items.map(it => it.name)))
})
export const groups = readable<Group[]>([], set => new GroupRepository().listenChildren(set))
export const groupCodes = derived(groups, (groups) => groups.map(it => it.code))
export const salesmans = readable<Salesman[]>([], set => new SalesmanRepository().listenChildren(set))
export const kinds = readable<Kind[]>([], set => new KindRepository().listenChildren(set))
export const chamfers = readable<Chamfer[]>([], set => new ChamferRepository().listenChildren(set))
export const storefronts = readable<Storefront[]>([], set => new StorefrontRepository().listenChildren(set))
export const itemTypes = readable<ItemType[]>([], set => new ItemTypeRepository().listenChildren(set))
export const suppliers = readable<Supplier[]>([], set => new SupplierRepository().listenChildren(set))
export const warehouses = readable<Warehouse[]>([], set => new WarehouseRepository().listenChildren(set))
export const markis = readable<Markis[]>([], set => new MarkisRepository().listenChildren(set))
export const bankAccounts = readable<BankAccountNumber[]>([], set => new BankAccountNumberRepository().listenChildren(set))

// Diamond stores
export const stoneTypes = readable<Diamond[]>([], set => new DiamondStoneTypeRepository().listenChildren(set))
