<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import Select from "$lib/common/ui/form/Select.svelte"
    import {ItemType} from "$lib/master-data/item-type/itemType"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import MasterDataEditDialog from "../MasterDataEditDialog.svelte"
    import {groupCodes} from "$lib/stores.js"

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
    <Select label="Kode Group" options={$groupCodes} bind:value={data.groupCode}/>
    <TextInput label="Tipe Barang" bind:value={data.name}/>
</MasterDataEditDialog>
