<script lang="ts">
    import TableContainer from "$lib/common/ui/container/table/TableContainer.svelte"
    import SearchInput from "$lib/common/ui/form/SearchInput.svelte"
    import {readable, Readable, Subscriber} from "svelte/store"
    import {ModalSettings, modalStore} from "@skeletonlabs/skeleton"
    import DataTable from "$lib/common/ui/table/DataTable.svelte"
    import {deleteConfirmationModal} from "$lib/common/utils/dialogUtils"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import {Schema} from "read-excel-file"
    import {createDataTable} from "$lib/common/utils/tableUtils"
    import {DiamondShape} from "$lib/diamond/shape/shape"
    import DiamondEditDialog from "./DiamondEditDialog.svelte"

    type T = DiamondShape

    export let repository: MapDatabaseRepository<T>
    export let schema: Schema

    const data: Readable<T[]> = readable([], function start(set: Subscriber<T[]>) {
        return repository.listenChildren(items => set(items ?? []))
    })
    const tableViewModel = createDataTable(data, schema, "code", showEditDialog, showDeleteConfirmationDialog)
    const {filterValue} = tableViewModel.pluginStates.tableFilter

    function showEditDialog(data?: T) {
        const dialog: ModalSettings = {
            type: 'component',
            title: `${data ? 'Edit' : 'Tambah'} Item`,
            component: {
                ref: DiamondEditDialog,
                props: {data, repository, schema}
            }
        }
        modalStore.trigger(dialog)
    }

    function showDeleteConfirmationDialog(item: T) {
        modalStore.trigger({
            ...deleteConfirmationModal,
            body: `Apakah kamu yakin ingin menghapus item ${item.name}?`,
            response: (r) => r && deleteItem(item.code),
        })
    }

    async function deleteItem(itemCode: string) {
        try {
            await repository.remove(itemCode)
            successToast('Berhasil menghapus item')
        } catch (err) {
            console.error(err)
            errorToast('Gagal menghapus item')
        }
    }
</script>

<TableContainer>
    <SearchInput slot="search" bind:value={$filterValue}/>
    <svelte:fragment slot="buttons">
        <button class="btn btn-filled-primary" on:click={() => showEditDialog()}>Tambah Data</button>
    </svelte:fragment>
    <DataTable model={tableViewModel}/>
</TableContainer>
