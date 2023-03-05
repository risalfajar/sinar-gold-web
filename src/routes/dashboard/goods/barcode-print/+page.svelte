<script lang="ts">
	import TableContainer from "$lib/common/ui/container/table/TableContainer.svelte"
	import DataTable from "$lib/common/ui/table/DataTable.svelte"
	import SearchInput from "$lib/common/ui/form/SearchInput.svelte"
	import DiamondGoodsRepository from "../diamond/data/repository"
	import {derived, Readable, writable} from "svelte/store"
	import {DiamondGoods} from "../diamond/data/goods"
	import {createRender, createTable} from "svelte-headless-table"
	import {addSortBy, addTableFilter} from "svelte-headless-table/plugins"
	import {LOCALE_INDONESIA} from "$lib/constants"
	import TableActions from "./TableActions.svelte"
	import {getRowData} from "$lib/common/utils/tableUtils"
	import {triggerModal} from "$lib/common/utils/modalUtils"
	import PrintDialog from "./PrintDialog.svelte"
	import {chamfers, storefronts} from "$lib/stores"
	import Select from "$lib/common/ui/form/Select.svelte"
	import {GoodsType} from "../data/goodsType"
	import {NonDiamondGoods} from "../non-diamond/data/goods"
	import NonDiamondGoodsRepository from "../non-diamond/data/repository"

	const repository = new DiamondGoodsRepository()
	const storefront = writable('')
	const chamfer = writable('')
	const type = writable('')
	const data: Readable<DiamondGoods[] | NonDiamondGoods[]> = derived([storefront, chamfer, type], ([storefront, chamfer, type], set) => {
		if (type == GoodsType.DIAMOND)
			return new DiamondGoodsRepository().listenByStorefront(storefront, chamfer, set)
		else if (type == GoodsType.NON_DIAMOND)
			return new NonDiamondGoodsRepository().listenByStorefront(storefront, chamfer, set)
	}, [])
	const table = createTable(data, {
		sort: addSortBy({initialSortKeys: [{id: 'id', order: 'asc'}]}),
		tableFilter: addTableFilter()
	})
	const columns = table.createColumns([
		table.column({
			id: 'created',
			header: 'Tanggal',
			accessor: (item) => item.created!.toLocaleDateString(LOCALE_INDONESIA),
		}),
		table.column({
			header: 'Kode Barcode',
			accessor: 'id'
		}),
		table.column({
			id: 'groupCode',
			header: 'Kode Group',
			accessor: (item) => item.groupCode
		}),
		table.column({
			header: 'Kode Talang',
			accessor: 'chamferCode'
		}),
		table.column({
			id: 'name',
			header: 'Nama Barang',
			accessor: (item) => item.details.name
		}),
		table.column({
			id: 'weight',
			header: 'Berat',
			accessor: (item) => item.details.weight,
			cell: (cell) => cell.value + ' gram'
		}),
		table.column({
			id: 'price',
			header: 'Harga Barang',
			accessor: (item) => {
				if (item.type === GoodsType.NON_DIAMOND)
					return (item as NonDiamondGoods).details.price.toLocaleString(LOCALE_INDONESIA)
				else if (item.type === GoodsType.DIAMOND)
					return (item as DiamondGoods).diamond.price.toLocaleString(LOCALE_INDONESIA)
			},
		}),
		table.display({
			id: 'actions',
			header: 'Actions',
			cell: (cell, state) => createRender(TableActions)
				.on('print', () => print(getRowData(state, cell)))
		})
	])
	const tableViewModel = table.createViewModel(columns)
	const {filterValue} = tableViewModel.pluginStates.tableFilter

	function print(data: DiamondGoods) {
		triggerModal({
			type: 'component',
			component: {
				ref: PrintDialog,
				props: {data}
			},
			modalClasses: '!w-fit'
		})
	}
</script>

<TableContainer>
    <svelte:fragment slot="search">
        <Select label="Etalase" class="!w-auto" options={$storefronts.map(it => it.code)} bind:value={$storefront}/>
        <Select label="Talang" class="!w-auto" options={$chamfers.map(it => it.code)} bind:value={$chamfer}/>
        <Select label="Jenis" class="!w-auto" options={['Berlian', 'Non Berlian']} values={[GoodsType.DIAMOND, GoodsType.NON_DIAMOND]}
                bind:value={$type}/>
        <SearchInput bind:value={$filterValue}/>
    </svelte:fragment>

    <DataTable model={tableViewModel}/>
</TableContainer>
