<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import {generateNumberId} from "$lib/common/utils/uniqueIdGenerator"
    import DiamondEditDialog from "../DiamondEditDialog.svelte"
    import {DiamondShape} from "$lib/diamond/shape/shape"

    type T = DiamondShape

    const defaultData: T = {
        code: generateNumberId(),
        name: ""
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.code.length > 0 && data.name.length > 0
</script>

<DiamondEditDialog {isFormValid} {data} {repository} {isEditMode}>
    <TextInput disabled label="Kode Batu Shape" bind:value={data.code}/>
    <TextInput label="Nama Batu Shape" bind:value={data.name}/>
</DiamondEditDialog>
