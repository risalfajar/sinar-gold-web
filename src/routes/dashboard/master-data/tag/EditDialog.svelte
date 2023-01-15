<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import WeightInput from "$lib/common/ui/form/WeightInput.svelte"
    import {Tag} from "$lib/master-data/tag/tag"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import MasterDataEditDialog from "$lib/master-data/MasterDataEditDialog.svelte"

    type T = Tag

    const defaultData: T = {
        id: "",
        description: "",
        weight: 0
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.description.length > 0
</script>

<MasterDataEditDialog {isFormValid} {data} {repository}>
    <TextInput label="Keterangan" bind:value={data.description}/>
    <WeightInput label="Berat Bandrol" bind:value={data.weight}/>
</MasterDataEditDialog>
