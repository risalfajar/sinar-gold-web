<script lang="ts">
    import {onMount} from "svelte"
    import readXlsxFile, {Schema} from "read-excel-file"
    import {Group} from "$lib/master-data/group/group"
    import GroupRepository from "$lib/master-data/group/groupRepository"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"
    import {Writable, writable} from "svelte/store"
    import {createTableFromSchema} from "$lib/common/utils/tableUtils"
    import DataTable from "$lib/common/ui/table/DataTable.svelte"
    import FormDialog from "$lib/common/ui/dialog/FormDialog.svelte"
    import {modalStore} from "@skeletonlabs/skeleton"

    const repository = new GroupRepository()
    const schema: Schema = {
        'Kode Group': {
            prop: 'code',
            type: String,
            required: true
        },
        'Nama Group': {
            prop: 'name',
            type: String,
            required: true
        },
        'Jenis Group': {
            prop: 'type',
            type: String,
            required: true
        },
        'Harga': {
            prop: 'price',
            type: Number,
            required: true
        },
        'Harga Modal': {
            prop: 'capital',
            type: Number,
            required: true
        },
        'Berlian': {
            prop: 'diamond',
            type: String,
            required: true
        },
    }
    const data: Writable<Group[]> = writable([])
    const table = createTableFromSchema(schema, data)

    export let file: File

    let isSaving: boolean = false

    onMount(readFile)

    async function readFile() {
        const {rows, errors} = await readXlsxFile(file, {schema})

        if (errors.length > 0) {
            errorToast('Terjadi kesalahan dalam mengimport data')
            console.error(errors)
            return
        }

        $data = rows.map(row => {
            return {...row} as Group
        })
    }

    async function save() {
        isSaving = true
        const failedItems: Group[] = []
        await saveItems()
        handleFailedItems()
        isSaving = false

        function saveItems() {
            return Promise.allSettled(
                $data.map(async item => {
                    try {
                        await repository.set(item)
                    } catch (err) {
                        console.error(err)
                        failedItems.push(item)
                    }
                })
            )
        }

        function handleFailedItems() {
            if (failedItems.length === 0) {
                successToast('Berhasil mengimport item')
                modalStore.close()
            } else {
                $data = failedItems
                errorToast(`Gagal mengimport ${failedItems.length} item, silahkan coba lagi`)
            }
        }
    }
</script>

<FormDialog {isSaving} isFormValid={$data.length > 0} on:save={save}>
    <p>Anda akan mengimport {$data.length} item</p>
    <DataTable model={table}/>
</FormDialog>
