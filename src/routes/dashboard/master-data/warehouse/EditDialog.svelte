<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import FormDialog from "$lib/common/ui/dialog/FormDialog.svelte"
    import {modalStore} from "@skeletonlabs/skeleton"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"
    import {Warehouse} from "$lib/master-data/warehouse/warehouse"
    import WarehouseRepository from "$lib/master-data/warehouse/warehouseRepository"

    const repository = new WarehouseRepository()
    const defaultData: Warehouse = {
        code: "",
        name: "",
    }

    export {dataArgs as data}

    let dataArgs: Warehouse | null = null
    let data = dataArgs ? {...dataArgs} as Warehouse : defaultData
    let isSaving = false

    $: isEditMode = dataArgs != null
    $: isFormValid = data.code.length > 0 && data.name.length > 0

    async function save() {
        isSaving = true
        try {
            await repository.set(data)
            successToast('Berhasil menyimpan data')
            modalStore.close()
        } catch (err) {
            console.error(err)
            errorToast('Gagal menyimpan data')
        }
        isSaving = false
    }
</script>

<FormDialog {isFormValid} {isSaving} on:save={save}>
    <TextInput label="Kode Gudang" disabled={isEditMode} bind:value={data.code}/>
    <TextInput label="Nama Gudang" bind:value={data.name}/>
</FormDialog>
