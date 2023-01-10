<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import FormDialog from "$lib/common/ui/dialog/FormDialog.svelte"
    import Select from "$lib/common/ui/form/Select.svelte"
    import {modalStore} from "@skeletonlabs/skeleton"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"
    import GroupRepository from "$lib/master-data/group/groupRepository"
    import {Group} from "$lib/master-data/group/group"
    import PriceInput from "$lib/common/ui/form/PriceInput.svelte"

    const repository = new GroupRepository()
    const defaultData: Group = {
        code: "",
        name: "",
        type: "",
        price: 0,
        capital: 0,
        diamond: ""
    }

    export {dataArgs as data}

    let dataArgs: Group | null = null
    let data = dataArgs ? {...dataArgs} as Group : defaultData
    let isSaving = false

    $: isEditMode = dataArgs != null
    $: isFormValid = data.code.length > 0
        && data.name.length > 0
        && data.type.length > 0
        && data.diamond.length > 0

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
    <TextInput label="Kode Group" disabled={isEditMode} bind:value={data.code}/>
    <TextInput label="Nama Group" bind:value={data.name}/>
    <TextInput label="Jenis Group" bind:value={data.type}/>
    <PriceInput label="Harga" bind:value={data.price}/>
    <PriceInput label="Harga Modal" bind:value={data.capital}/>
    <!--  TODO clarify  -->
    <Select label="Berlian" options={[data.diamond]} bind:value={data.diamond}/>
</FormDialog>
