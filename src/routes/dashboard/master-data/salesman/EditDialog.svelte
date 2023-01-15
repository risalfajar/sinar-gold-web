<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import {Salesman} from "$lib/master-data/salesman/salesman"
    import MasterDataEditDialog from "$lib/master-data/MasterDataEditDialog.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"

    type T = Salesman

    const defaultData: T = {
        code: "",
        name: ""
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.code.length > 0 && data.name.length > 0
</script>

<MasterDataEditDialog {repository} {data} {isFormValid}>
    <TextInput label="Kode Salesman" disabled={isEditMode} bind:value={data.code}/>
    <TextInput label="Nama Salesman" bind:value={data.name}/>
</MasterDataEditDialog>
