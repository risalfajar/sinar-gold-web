<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import MasterDataEditDialog from "$lib/master-data/MasterDataEditDialog.svelte"
    import NumberInput from "$lib/common/ui/form/NumberInput.svelte"
    import {Cost} from "$lib/master-data/cost/cost"
    import PriceInput from "$lib/common/ui/form/PriceInput.svelte"
    import Select from "$lib/common/ui/form/Select.svelte"

    type T = Cost

    const defaultData: T = {
        code: "",
        amount: 0,
        percentage: 0,
        type: ""
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.code.length > 0 && data.type.length > 0
</script>

<MasterDataEditDialog {isFormValid} {data} {repository}>
    <TextInput label="Kode Intern" disabled={isEditMode} bind:value={data.code}/>
    <PriceInput label="Nominal" bind:value={data.amount}/>
    <NumberInput label="Persentase" max="100" bind:value={data.percentage}/>
    <Select label="Tipe Ongkos" options={["Nominal", "Gram"]} bind:value={data.type}/>
</MasterDataEditDialog>
