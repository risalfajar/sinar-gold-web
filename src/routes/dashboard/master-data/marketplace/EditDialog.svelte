<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import MasterDataEditDialog from "../MasterDataEditDialog.svelte"
    import {Marketplace} from "$lib/master-data/marketplace/marketplace"

    type T = Marketplace

    const defaultData: T = {
        code: "",
        name: "",
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.code.length > 0 && data.name.length > 0
</script>

<MasterDataEditDialog {isFormValid} {data} {repository}>
    <TextInput label="Kode Marketplace" bind:value={data.code}/>
    <TextInput label="Nama Marketplace" bind:value={data.name}/>
</MasterDataEditDialog>
