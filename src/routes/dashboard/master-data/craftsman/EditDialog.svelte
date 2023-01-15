<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import MasterDataEditDialog from "$lib/master-data/MasterDataEditDialog.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import {Craftsman} from "$lib/master-data/craftsman/craftsman"

    type T = Craftsman

    const defaultData: T = {
        name: ""
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.name.length > 0
</script>

<MasterDataEditDialog {repository} {data} {isFormValid}>
    <TextInput label="Nama Tukang" bind:value={data.name}/>
</MasterDataEditDialog>
