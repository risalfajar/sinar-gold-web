<script lang="ts">
    import TableContainer from "$lib/common/ui/container/table/TableContainer.svelte"
    import SearchInput from "$lib/common/ui/form/SearchInput.svelte"
    import {readable, Readable, Subscriber} from "svelte/store"
    import {ModalSettings, modalStore} from "@skeletonlabs/skeleton"
    import DataTable from "$lib/common/ui/table/DataTable.svelte"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"
    import Icon from "$lib/common/ui/icon/Icon.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import {Schema} from "read-excel-file"
    import ImportDialog from "../../routes/dashboard/master-data/ImportDialog.svelte"
    import {createDataTable} from "$lib/common/utils/tableUtils"
    import {deleteConfirmationModal} from "$lib/common/utils/modalUtils"

    type T = $$Generic

    export let repository: MapDatabaseRepository<T>
    export let schema: Schema
    export let initialSortKey: keyof T
    export let editDialog: any
    export let enableImport: boolean = true

    const data: Readable<T[]> = readable([], function start(set: Subscriber<T[]>) {
        return repository.listenChildren(items => set(items ?? []))
    })
    const tableViewModel = createDataTable(data, schema, initialSortKey, showEditDialog, showDeleteConfirmationDialog)
    const {filterValue} = tableViewModel.pluginStates.tableFilter

    let fileInput: HTMLInputElement

    function showImportDialog() {
        const fileToImport = fileInput.files?.[0]
        // make user able to select the same file again
        fileInput.value = ''

        const dialog: ModalSettings = {
            type: 'component',
            title: 'Import Data',
            component: {
                ref: ImportDialog,
                props: {
                    file: fileToImport,
                    repository,
                    schema
                }
            }
        }
        modalStore.trigger(dialog)
    }

    function showEditDialog(data?: T) {
        const dialog: ModalSettings = {
            type: 'component',
            title: `${data ? 'Edit' : 'Tambah'} Item`,
            component: {
                ref: editDialog,
                props: {data, repository}
            },
            meta: {mandatory: true}
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
        {#if enableImport}
            <button class="btn btn-filled-success" on:click={() => fileInput.click()}>
                <Icon name="Excel" class="mr-2 fill-white"/>
                Import Excel
            </button>
        {/if}
        <button class="btn btn-filled-primary" on:click={() => showEditDialog()}>Tambah Data</button>
        <input class="hidden" type="file" accept=".xls, .xlsx" bind:this={fileInput} on:change={showImportDialog}/>
    </svelte:fragment>
    <DataTable model={tableViewModel}/>
</TableContainer>
