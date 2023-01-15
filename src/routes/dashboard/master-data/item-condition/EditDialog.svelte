<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import MasterDataEditDialog from "$lib/master-data/MasterDataEditDialog.svelte"
    import {ItemCondition} from "$lib/master-data/item-condition/itemCondition"

    type T = ItemCondition

    const defaultData: T = {
        condition: "",
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.condition.length > 0
</script>

<MasterDataEditDialog {isFormValid} {data} {repository}>
    <TextInput label="Nama Hadiah" bind:value={data.condition}/>
</MasterDataEditDialog>
