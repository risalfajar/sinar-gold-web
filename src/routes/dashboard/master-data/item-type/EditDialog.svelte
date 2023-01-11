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
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import MasterDataEditDialog from "../MasterDataEditDialog.svelte"

    type T = ItemType

    const defaultData: T = {
        id: "",
        name: "",
        groupCode: ""
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.name.length > 0 && data.groupCode.length > 0
</script>

<MasterDataEditDialog {isFormValid} {data} {repository}>
    <Select label="Kode Group" options={$groups} bind:value={data.groupCode}/>
    <TextInput label="Tipe Barang" bind:value={data.name}/>
</MasterDataEditDialog>
