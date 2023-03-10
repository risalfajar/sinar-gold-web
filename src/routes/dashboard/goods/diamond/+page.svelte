<script lang="ts">
	import TableContainer from "$lib/common/ui/container/table/TableContainer.svelte"
	import Button from "$lib/common/ui/button/Button.svelte"
	import {derived, Readable, writable} from "svelte/store"
	import SearchInput from "$lib/common/ui/form/SearchInput.svelte"
	import {closeModal, deleteConfirmationModal, loadingModal, triggerModal} from "$lib/common/utils/modalUtils"
	import EditDialog from "./EditDialog.svelte"
	import DiamondGoodsRepository from "./data/repository"
	import {DiamondGoods} from "./data/goods"
	import {createRender, createTable} from "svelte-headless-table"
	import {addSortBy, addTableFilter} from "svelte-headless-table/plugins"
	import {LOCALE_INDONESIA} from "$lib/constants"
	import DataTable from "$lib/common/ui/table/DataTable.svelte"
	import TableActions from "../TableActions.svelte"
	import {getRowData} from "$lib/common/utils/tableUtils"
	import DateRangePicker from "$lib/common/ui/form/DateRangePicker.svelte"
	import {errorToast, successToast} from "$lib/common/utils/toastUtils"
	import {generateNumberId} from "$lib/common/utils/uniqueIdGenerator"
	import DetailsDialog from "./DetailsDialog.svelte"

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
			header: 'Kode Group',
			accessor: 'groupCode',
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
			accessor: (item) => item.details.price.toLocaleString(LOCALE_INDONESIA),
		}),
		table.display({
			id: 'actions',
			header: 'Actions',
			cell: (cell, state) => createRender(TableActions)
				.on('copy', () => copy(getRowData(state, cell)))
				.on('edit', () => openEditDialog(getRowData(state, cell)))
				.on('delete', () => showDeleteConfirmationDialog(getRowData(state, cell)))
		})
	])
	const tableViewModel = table.createViewModel(columns)
	const {filterValue} = tableViewModel.pluginStates.tableFilter

	function openCreateDialog() {
		triggerModal({
			type: 'component',
			component: {
				ref: EditDialog,
				props: {}
			},
			meta: {mandatory: true}
		})
	}

	async function copy(item: DiamondGoods) {
		triggerModal(loadingModal)
		try {
			await repository.save({...item, id: generateNumberId(), created: null})
			successToast('Berhasil menduplikat data')
		} catch (err) {
			console.error(err)
			errorToast('Gagal menduplikat data')
		}
		closeModal()
	}

	function openEditDialog(item: DiamondGoods) {
		triggerModal({
			type: 'component',
			component: {
				ref: EditDialog,
				props: {data: item}
			},
			meta: {mandatory: true}
		})
	}

	function showDeleteConfirmationDialog(item: DiamondGoods) {
		triggerModal({
			...deleteConfirmationModal,
			body: `Apakah kamu yakin ingin menghapus item ${item.id}?`,
			response: (r) => r && deleteItem(item),
		})
	}

	async function deleteItem(item: DiamondGoods) {
		triggerModal(loadingModal)
		try {
			await repository.delete(item.id)
			successToast('Berhasil menghapus data')
		} catch (err) {
			console.error(err)
			errorToast('Gagal menghapus data')
		}
		closeModal()
	}

	function showDetailsDialog(item: DiamondGoods) {
		triggerModal({
			type: 'component',
			component: {
				ref: DetailsDialog,
				props: {data: item}
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
    <Button class="variant-filled-primary" slot="buttons" on:click={openCreateDialog}>Tambah Data Barang</Button>

    <DataTable model={tableViewModel} clickable on:click={(e) => showDetailsDialog(e.detail)}/>
</TableContainer>
