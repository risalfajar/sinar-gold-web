<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import Select from "$lib/common/ui/form/Select.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import MasterDataEditDialog from "$lib/master-data/MasterDataEditDialog.svelte"
    import {groupCodes} from "$lib/stores.js"
    import {NoteDescription} from "$lib/master-data/note-description/noteDescription"

    type T = NoteDescription

    const defaultData: T = {
        id: "",
        groupCode: "",
        description: ""
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.description.length > 0 && data.groupCode.length > 0
</script>

<MasterDataEditDialog {isFormValid} {data} {repository}>
    <Select label="Kode Group" options={$groupCodes} bind:value={data.groupCode}/>
    <TextInput label="Keterangan" bind:value={data.description}/>
</MasterDataEditDialog>
