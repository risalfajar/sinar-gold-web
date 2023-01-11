<script lang="ts">
    import TableContainer from "$lib/common/ui/container/table/TableContainer.svelte"
    import SearchInput from "$lib/common/ui/form/SearchInput.svelte"
    import {readable, Readable, Subscriber} from "svelte/store"
    import {ModalSettings, modalStore} from "@skeletonlabs/skeleton"
    import DataTable from "$lib/common/ui/table/DataTable.svelte"
    import {deleteConfirmationModal} from "$lib/common/utils/dialogUtils"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"
    import {Group} from "$lib/master-data/group/group"
    import Icon from "$lib/common/ui/icon/Icon.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import {createMasterDataTable} from "./createTable"
    import {Schema} from "read-excel-file"
    import ImportDialog from "./ImportDialog.svelte"
    import {SvelteComponent} from "svelte"

    export let repository: MapDatabaseRepository<any>
    export let schema: Schema
    export let initialSortKey: string
    export let editDialog: SvelteComponent

    const data: Readable<any[]> = readable([], function start(set: Subscriber<any[]>) {
        return repository.listenChildren(items => set(items ?? []))
    })
    const tableViewModel = createMasterDataTable(data, schema, initialSortKey, showEditDialog, showDeleteConfirmationDialog)
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

    function showEditDialog(data?: Group) {
        const dialog: ModalSettings = {
            type: 'component',
            title: `${data ? 'Edit' : 'Tambah'} Item`,
            component: {
                ref: editDialog,
                props: {data, repository}
            }
        }
        modalStore.trigger(dialog)
    }

    function showDeleteConfirmationDialog(item: Group) {
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
        <button class="btn btn-filled-success" on:click={() => fileInput.click()}>
            <Icon name="Excel" class="mr-2"/>
            Import Excel
        </button>
        <button class="btn btn-filled-primary" on:click={() => showEditDialog()}>Tambah Data</button>
        <input class="hidden" type="file" accept=".xls, .xlsx" bind:this={fileInput} on:change={showImportDialog}/>
    </svelte:fragment>
    <DataTable model={tableViewModel}/>
</TableContainer>
