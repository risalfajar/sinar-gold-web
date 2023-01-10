<script lang="ts" context="module">
    import GroupRepository from "$lib/master-data/group/groupRepository"
    import {readable} from "svelte/store"
    import {Group} from "$lib/master-data/group/group"
    // TODO extract store
    const groupRepository = new GroupRepository()
    const groups = readable<Group[]>([], (set) => {
        groupRepository
            .getChildren()
            .then(groups => set(groups.map(it => it.name)))
    })
</script>

<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import FormDialog from "$lib/common/ui/dialog/FormDialog.svelte"
    import Select from "$lib/common/ui/form/Select.svelte"
    import {modalStore} from "@skeletonlabs/skeleton"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"
    import {ItemType} from "$lib/master-data/item-type/itemType"
    import ItemTypeRepository from "$lib/master-data/item-type/itemTypeRepository"

    const repository = new ItemTypeRepository()
    const defaultData: ItemType = {
        id: "",
        name: "",
        groupCode: ""
    }

    export {dataArgs as data}

    let dataArgs: ItemType | null = null
    let data = dataArgs ? {...dataArgs} as ItemType : defaultData
    let isSaving = false

    $: isEditMode = dataArgs != null
    $: isFormValid = data.name.length > 0 && data.groupCode.length > 0

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
    <Select label="Kode Group" options={$groups} bind:value={data.groupCode}/>
    <TextInput label="Tipe Barang" bind:value={data.name}/>
</FormDialog>
