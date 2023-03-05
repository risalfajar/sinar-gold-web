<script lang="ts">
	import TableContainer from "$lib/common/ui/container/table/TableContainer.svelte"
	import DataTable from "$lib/common/ui/table/DataTable.svelte"
	import SearchInput from "$lib/common/ui/form/SearchInput.svelte"
	import MemberRepository from "./data/repository"
	import {readable} from "svelte/store"
	import {createRender, createTable} from "svelte-headless-table"
	import {addSortBy, addTableFilter} from "svelte-headless-table/plugins"
	import {LOCALE_INDONESIA} from "$lib/constants"
	import {getRowData} from "$lib/common/utils/tableUtils"
	import {Member} from "./data/member"
	import TableActions from "$lib/common/ui/table/TableActions.svelte"
	import Button from "$lib/common/ui/button/Button.svelte"
	import {closeModal, deleteConfirmationModal, loadingModal, triggerModal} from "$lib/common/utils/modalUtils"
	import EditDialog from "./EditDialog.svelte"
	import {modalStore} from "@skeletonlabs/skeleton"
	import {errorToast, successToast} from "$lib/common/utils/toastUtils"

	const repository = new MemberRepository()
	const data = readable<Member[]>([], (set) => repository.listenAll(set))
	const table = createTable(data, {
		sort: addSortBy({initialSortKeys: [{id: 'name', order: 'asc'}]}),
		tableFilter: addTableFilter()
	})
	const columns = table.createColumns([
		table.column({
			id: 'created',
			header: 'Tanggal',
			accessor: (item) => item.created!.toLocaleDateString(LOCALE_INDONESIA),
		}),
		table.column({
			header: 'Nama',
			accessor: 'name'
		}),
		table.column({
			header: 'No HP',
			accessor: 'phoneNumber'
		}),
		table.column({
			header: 'Email',
			accessor: 'email'
		}),
		table.column({
			header: 'Sisa Poin',
			accessor: 'point'
		}),
		table.column({
			id: 'address',
			header: 'Alamat',
			accessor: (item) => item.address.slice(0, 20).concat(item.address.length > 20 ? '...' : '')
		}),
		table.display({
			id: 'actions',
			header: 'Actions',
			cell: (cell, state) => createRender(TableActions)
				.on('edit', () => openEditDialog(getRowData(state, cell)))
				.on('delete', () => showDeleteConfirmationDialog(getRowData(state, cell)))
		})
	])
	const tableViewModel = table.createViewModel(columns)
	const {filterValue} = tableViewModel.pluginStates.tableFilter

	function openEditDialog(member?: Member) {
		triggerModal({
			type: 'component',
			component: {
				ref: EditDialog,
				props: member && {data: member} // passing data with undefined value cause error
			},
			modalClasses: '!w-fit',
			meta: {mandatory: true}
		})
	}

	function showDeleteConfirmationDialog(item: Member) {
		modalStore.trigger({
			...deleteConfirmationModal,
			body: `Apakah kamu yakin ingin menghapus member ${item.name}?`,
			response: (r) => r && deleteItem(item),
		})
	}

	async function deleteItem(item: Member) {
		triggerModal(loadingModal)
		try {
			await repository.delete(item.id)
			successToast('Berhasil menghapus member')
		} catch (err) {
			console.error(err)
			errorToast('Gagal menghapus member')
		}
		closeModal()
	}
</script>

<TableContainer>
    <SearchInput slot="search" bind:value={$filterValue}/>
    <svelte:fragment slot="buttons">
        <Button class="variant-filled-primary" on:click={() => openEditDialog()}>Tambah Member</Button>
    </svelte:fragment>
    <DataTable model={tableViewModel}/>
</TableContainer>
