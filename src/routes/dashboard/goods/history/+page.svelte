<script lang="ts">
	import TableContainer from "$lib/common/ui/container/table/TableContainer.svelte"
	import {derived, Readable, writable} from "svelte/store"
	import SearchInput from "$lib/common/ui/form/SearchInput.svelte"
	import {triggerModal} from "$lib/common/utils/modalUtils"
	import GoodsHistoryRepository from "./data/repository"
	import {createRender, createTable} from "svelte-headless-table"
	import {addSortBy, addTableFilter} from "svelte-headless-table/plugins"
	import {LOCALE_INDONESIA} from "$lib/constants"
	import DataTable from "$lib/common/ui/table/DataTable.svelte"
	import DateRangePicker from "$lib/common/ui/form/DateRangePicker.svelte"
	import {GoodsHistory, HistoryType} from "./data/history"
	import TypeLabel from "./TypeLabel.svelte"
	import {GoodsType} from "../data/goodsType"
	import DiamondDetailsDialog from '../diamond/DetailsDialog.svelte'
	import NonDiamondDetailsDialog from '../non-diamond/DetailsDialog.svelte'
	import Select from "$lib/common/ui/form/Select.svelte"

	const repository = new GoodsHistoryRepository()
	const type = writable('')
	const startDate = writable(new Date())
	const endDate = writable(new Date())
	const data: Readable<GoodsHistory[]> = derived([type, startDate, endDate], ([type, start, end], set) => {
		return repository.listenByTypeAndDate(type, start, end, set)
	}, [])
	const table = createTable(data, {
		sort: addSortBy({initialSortKeys: [{id: 'created', order: 'asc'}]}),
		tableFilter: addTableFilter()
	})
	const columns = table.createColumns([
		table.column({
			id: 'created',
			header: 'Tanggal',
			accessor: (item) => item.created!.toLocaleDateString(LOCALE_INDONESIA),
		}),
		table.column({
			id: 'type',
			header: 'Keterangan',
			accessor: (item) => item.type,
			cell: cell => createRender(TypeLabel, {type: cell.value})
		}),
		table.column({
			id: 'id',
			header: 'Kode Barcode',
			accessor: (item) => item.goods.id
		}),
		table.column({
			id: 'chamfer',
			header: 'Kode Talang',
			accessor: (item) => item.goods.chamferCode
		}),
		table.column({
			id: 'name',
			header: 'Nama Barang',
			accessor: (item) => item.goods.details.name
		}),
		table.column({
			id: 'weight',
			header: 'Berat',
			accessor: (item) => item.goods.details.weight + ' gram',
		}),
	])
	const tableViewModel = table.createViewModel(columns)
	const {filterValue} = tableViewModel.pluginStates.tableFilter

	function openDetailsDialog(item: GoodsHistory) {
		triggerModal({
			type: 'component',
			component: {
				ref: item.goods.type === GoodsType.DIAMOND ? DiamondDetailsDialog : NonDiamondDetailsDialog,
				props: {data: item.goods}
			},
			modalClasses: '!w-fit'
		})
	}
</script>

<TableContainer>
    <svelte:fragment slot="search">
        <Select label="Jenis Transaksi" options={["Barang Masuk", "Barang Pindah", "Barang Terjual"]}
                values={[HistoryType.IN, HistoryType.MOVE, HistoryType.SOLD]} bind:value={$type}/>
        <DateRangePicker label="Tanggal" bind:start={$startDate} bind:end={$endDate}/>
        <SearchInput bind:value={$filterValue}/>
    </svelte:fragment>

    <DataTable model={tableViewModel} clickable on:click={(e) => openDetailsDialog(e.detail)}/>
</TableContainer>
