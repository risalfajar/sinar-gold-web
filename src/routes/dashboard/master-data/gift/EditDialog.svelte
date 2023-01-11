<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import MasterDataEditDialog from "../MasterDataEditDialog.svelte"
    import {Gift} from "$lib/master-data/gift/gift"
    import NumberInput from "$lib/common/ui/form/NumberInput.svelte"

    type T = Gift

    const defaultData: T = {
        id: "",
        name: "",
        point: 0,
        stock: 0
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.name.length > 0
</script>

<MasterDataEditDialog {isFormValid} {data} {repository}>
    <TextInput label="Nama Hadiah" bind:value={data.name}/>
    <NumberInput label="Poin" bind:value={data.point}/>
    <NumberInput label="Stock" bind:value={data.stock}/>
</MasterDataEditDialog>
