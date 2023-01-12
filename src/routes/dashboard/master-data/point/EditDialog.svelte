<script lang="ts">
    import WeightInput from "$lib/common/ui/form/WeightInput.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import MasterDataEditDialog from "../MasterDataEditDialog.svelte"
    import {Point} from "$lib/master-data/point/point"
    import Select from "$lib/common/ui/form/Select.svelte"
    import {groups} from "$lib/stores.js"
    import NumberInput from "$lib/common/ui/form/NumberInput.svelte"

    type T = Point

    const defaultData: T = {
        id: "",
        groupCode: "",
        point: 0,
        weight: 0
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.groupCode.length > 0
</script>

<MasterDataEditDialog {isFormValid} {data} {repository}>
    <Select label="Kode Group" options={$groups} bind:value={data.groupCode}/>
    <WeightInput label="Gram" bind:value={data.weight}/>
    <NumberInput label="Poin" bind:value={data.point}/>
</MasterDataEditDialog>
