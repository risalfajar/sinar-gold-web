<script lang="ts">
    import TableContainer from "$lib/common/ui/container/table/TableContainer.svelte"
    import SearchInput from "$lib/common/ui/form/SearchInput.svelte"
    import {readable, Readable, Subscriber} from "svelte/store"
    import {createRender, createTable} from "svelte-headless-table"
    import TableActions from "$lib/common/ui/table/TableActions.svelte"
    import {ModalSettings, modalStore} from "@skeletonlabs/skeleton"
    import DataTable from "$lib/common/ui/table/DataTable.svelte"
    import {deleteConfirmationModal} from "$lib/common/utils/dialogUtils"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"
    import {addSortBy, addTableFilter} from "svelte-headless-table/plugins"
    import GroupRepository from "$lib/master-data/group/groupRepository"
    import {Group} from "$lib/master-data/group/group"
    import {getRowData} from "$lib/common/utils/tableUtils"
    import EditDialog from './EditDialog.svelte'
    import ImportDialog from "./ImportDialog.svelte"
    import Icon from "$lib/common/ui/icon/Icon.svelte"

    const repository = new GroupRepository()
    const data: Readable<Group[]> = readable([], function start(set: Subscriber<Group[]>) {
        return repository.listenChildren(items => set(items ?? []))
    })

    const table = createTable(data, {
        sort: addSortBy({initialSortKeys: [{id: 'name', order: 'asc'}]}),
        tableFilter: addTableFilter()
    })
    const columns = table.createColumns([
        table.column({
            header: 'Nama Group',
            accessor: 'name',
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

    let fileInput: HTMLInputElement

    function openEditDialog(data?: Group) {
        const dialog: ModalSettings = {
            type: 'component',
            title: `${data ? 'Edit' : 'Tambah'} Group`,
            component: {
                ref: EditDialog,
                props: {data}
            }
        }
        modalStore.trigger(dialog)
    }

    function showDeleteConfirmationDialog(item: Group) {
        modalStore.trigger({
            ...deleteConfirmationModal,
            body: `Apakah kamu yakin ingin menghapus group ${item.name}?`,
            response: (r) => r && deleteItem(item.code),
        })
    }

    async function deleteItem(itemCode: string) {
        try {
            await repository.remove(itemCode)
            successToast('Berhasil menghapus group')
        } catch (err) {
            console.error(err)
            errorToast('Gagal menghapus group')
        }
    }

    function importData() {
        const fileToImport = fileInput.files?.[0]
        // make user able to select the same file again
        fileInput.value = ''

        const dialog: ModalSettings = {
            type: 'component',
            title: 'Import Data',
            component: {
                ref: ImportDialog,
                props: {file: fileToImport}
            }
        }
        modalStore.trigger(dialog)
    }
</script>

<TableContainer>
    <SearchInput slot="search" bind:value={$filterValue}/>
    <svelte:fragment slot="buttons">
        <button class="btn btn-filled-success" on:click={() => fileInput.click()}>
            <Icon name="Excel" class="mr-2"/>
            Import Excel
        </button>
        <button class="btn btn-filled-primary" on:click={() => openEditDialog()}>Tambah Data</button>
        <input class="hidden" type="file" accept=".xls, .xlsx" bind:this={fileInput} on:change={importData}/>
    </svelte:fragment>
    <DataTable model={tableViewModel}/>
</TableContainer>
