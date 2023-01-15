<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import MasterDataEditDialog from "$lib/master-data/MasterDataEditDialog.svelte"
    import {GroupType} from "$lib/master-data/group-type/groupType"

    type T = GroupType

    const defaultData: T = {
        type: "",
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.type.length > 0
</script>

<MasterDataEditDialog {isFormValid} {data} {repository}>
    <TextInput label="Kode Jenis Group" bind:value={data.type}/>
</MasterDataEditDialog>
