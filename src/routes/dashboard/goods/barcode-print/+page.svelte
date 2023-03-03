<script lang="ts">
	import TableContainer from "$lib/common/ui/container/table/TableContainer.svelte"
	import DataTable from "$lib/common/ui/table/DataTable.svelte"
	import SearchInput from "$lib/common/ui/form/SearchInput.svelte"
	import DateRangePicker from "$lib/common/ui/form/DateRangePicker.svelte"
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

	const repository = new DiamondGoodsRepository()
	const startDate = writable(new Date())
	const endDate = writable(new Date())
	const data: Readable<DiamondGoods[]> = derived([startDate, endDate], (values, set) => {
		const start = values[0]
		const end = values[1]
		return repository.listenByDate(start, end, set)
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
			accessor: (item) => item.details.groupCode
		}),
		table.column({
			header: 'Kode Talang',
			accessor: 'chamferCode'
		}),
		table.column({
			header: 'Kode Jenis',
			accessor: 'kindCode'
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
			accessor: (item) => item.diamond.price.toLocaleString(LOCALE_INDONESIA),
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
        <DateRangePicker label="Tanggal" bind:start={$startDate} bind:end={$endDate}/>
        <SearchInput bind:value={$filterValue}/>
    </svelte:fragment>

    <DataTable model={tableViewModel}/>
</TableContainer>
