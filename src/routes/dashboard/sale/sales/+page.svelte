<script lang="ts">
	import TableContainer from "$lib/common/ui/container/table/TableContainer.svelte"
	import SearchInput from "$lib/common/ui/form/SearchInput.svelte"
	import Button from "$lib/common/ui/button/Button.svelte"
	import DateRangePicker from "$lib/common/ui/form/DateRangePicker.svelte"
	import {derived, Readable, writable} from "svelte/store"
	import {triggerModal} from "$lib/common/utils/modalUtils"
	import EditDialog from "./EditDialog.svelte"
	import SalesRepository from "./data/repository"
	import {createRender, createTable} from "svelte-headless-table"
	import {Sales} from "./data/sales"
	import {LOCALE_INDONESIA} from "$lib/constants"
	import PrintTableActions from "$lib/common/ui/table/PrintTableActions.svelte"
	import DataTable from "$lib/common/ui/table/DataTable.svelte"
	import DetailsDialog from "./DetailsDialog.svelte"

	const repository = new SalesRepository()
	const startDate = writable(new Date())
	const endDate = writable(new Date())
	const data: Readable<Sales[]> = derived([startDate, endDate], ([start, end], set) => repository.listenByDate(start, end, set), [])

	const table = createTable(data)
	const columns = table.createColumns([
		table.column({
			id: 'created',
			header: 'Tanggal',
			accessor: (item) => item.createdAt!.toLocaleDateString(LOCALE_INDONESIA)
		}),
		table.column({
			header: 'Nomor Faktur',
			accessor: 'id'
		}),
		table.column({
			id: 'salesmanCode',
			header: 'Kode Sales',
			accessor: (item) => item.customer.salesmanCode
		}),
		table.column({
			id: 'customerName',
			header: 'Nama Customer',
			accessor: (item) => item.customer.name
		}),
		table.column({
			id: 'itemCount',
			header: 'Jumlah Item',
			accessor: (item) => Object.keys(item.goods).length + ' item'
		}),
		table.column({
			id: 'priceTotal',
			header: 'Total Harga',
			accessor: (item) => item.priceDetails.sale.toLocaleString(LOCALE_INDONESIA)
		}),
		table.display({
			id: 'Actions',
			header: 'Actions',
			cell: (cell, state) => createRender(PrintTableActions)
				.on('print', () => {/*TODO*/
				})
		})
	])

	function openCreateDialog() {
		triggerModal({
			type: 'component',
			component: {
				ref: EditDialog
			},
			meta: {mandatory: true}
		})
	}

	function openDetailsDialog(data: Sales) {
		triggerModal({
			type: 'component',
			component: {
				ref: DetailsDialog,
				props: {data}
			}
		})
	}
</script>

<TableContainer>
    <svelte:fragment slot="search">
        <DateRangePicker label="Tanggal" bind:start={$startDate} bind:end={$endDate}/>
        <SearchInput/>
    </svelte:fragment>
    <Button slot="buttons" class="variant-filled-primary" on:click={openCreateDialog}>Buat Penjualan</Button>

    <DataTable model={table.createViewModel(columns)} clickable on:click={(e) => openDetailsDialog(e.detail)}/>
</TableContainer>
