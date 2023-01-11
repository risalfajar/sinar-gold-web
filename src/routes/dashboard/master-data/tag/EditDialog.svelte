<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import FormDialog from "$lib/common/ui/dialog/FormDialog.svelte"
    import {modalStore} from "@skeletonlabs/skeleton"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"
    import WeightInput from "$lib/common/ui/form/WeightInput.svelte"
    import TagRepository from "$lib/master-data/tag/tagRepository"
    import {Tag} from "$lib/master-data/tag/tag"

    const repository = new TagRepository()
    const defaultData: Tag = {
        id: "",
        description: "",
        weight: 0
    }

    export {dataArgs as data}

    let dataArgs: Tag | null = null
    let data = dataArgs ? {...dataArgs} as Tag : defaultData
    let isSaving = false

    $: isEditMode = dataArgs != null
    $: isFormValid = data.description.length > 0

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
    <TextInput label="Keterangan" bind:value={data.description}/>
    <WeightInput label="Berat Bandrol" bind:value={data.weight}/>
</FormDialog>
