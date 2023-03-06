<script lang="ts">
	import TableContainer from "$lib/common/ui/container/table/TableContainer.svelte"
	import DataTable from "$lib/common/ui/table/DataTable.svelte"
	import SearchInput from "$lib/common/ui/form/SearchInput.svelte"
	import NonMemberRepository from "./data/repository"
	import {readable} from "svelte/store"
	import {createRender, createTable} from "svelte-headless-table"
	import {addSortBy, addTableFilter} from "svelte-headless-table/plugins"
	import {getRowData} from "$lib/common/utils/tableUtils"
	import TableActions from "$lib/common/ui/table/TableActions.svelte"
	import {closeModal, deleteConfirmationModal, loadingModal, triggerModal} from "$lib/common/utils/modalUtils"
	import {modalStore} from "@skeletonlabs/skeleton"
	import {errorToast, successToast} from "$lib/common/utils/toastUtils"
	import {NonMember} from "./data/non-member"

	const repository = new NonMemberRepository()
	const data = readable<NonMember[]>([], (set) => repository.listenAll(set))
	const table = createTable(data, {
		sort: addSortBy({initialSortKeys: [{id: 'name', order: 'asc'}]}),
		tableFilter: addTableFilter()
	})
	const columns = table.createColumns([
		table.column({
			header: 'Nama',
			accessor: 'name'
		}),
		table.column({
			header: 'No HP',
			accessor: 'phoneNumber'
		}),
		table.column({
			id: 'address',
			header: 'Alamat',
			accessor: (item) => item.address.slice(0, 20).concat(item.address.length > 20 ? '...' : '')
		}),
		table.display({
			id: 'actions',
			header: 'Actions',
			cell: (cell, state) => createRender(TableActions, {showEditButton: false})
				.on('delete', () => showDeleteConfirmationDialog(getRowData(state, cell)))
		})
	])
	const tableViewModel = table.createViewModel(columns)
	const {filterValue} = tableViewModel.pluginStates.tableFilter


	function showDeleteConfirmationDialog(item: NonMember) {
		modalStore.trigger({
			...deleteConfirmationModal,
			body: `Apakah kamu yakin ingin menghapus data ${item.name}?`,
			response: (r) => r && deleteItem(item),
		})
	}

	async function deleteItem(item: NonMember) {
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
</script>

<TableContainer>
    <SearchInput slot="search" bind:value={$filterValue}/>
    <DataTable model={tableViewModel}/>
</TableContainer>
