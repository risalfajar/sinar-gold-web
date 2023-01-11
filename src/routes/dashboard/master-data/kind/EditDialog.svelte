<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import Select from "$lib/common/ui/form/Select.svelte"
    import {Kind} from "$lib/master-data/kind/kind"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import MasterDataEditDialog from "../MasterDataEditDialog.svelte"
    import {groups} from "$lib/stores.js"

    type T = Kind

    const defaultData: T = {
        code: "",
        name: "",
        groupCode: ""
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.code.length > 0
        && data.name.length > 0
        && data.groupCode.length > 0
</script>

<MasterDataEditDialog {isFormValid} {data} {repository}>
    <TextInput label="Kode Jenis" disabled={isEditMode} bind:value={data.code}/>
    <TextInput label="Nama Jenis" bind:value={data.name}/>
    <Select label="Kode Grup" options={$groups} bind:value={data.groupCode}/>
</MasterDataEditDialog>
