<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import MasterDataEditDialog from "$lib/master-data/MasterDataEditDialog.svelte"
    import {GoldPrice} from "$lib/master-data/gold-price/goldPrice"
    import Select from "$lib/common/ui/form/Select.svelte"
    import {groupCodes} from "$lib/stores"
    import PriceInput from "$lib/common/ui/form/PriceInput.svelte"

    type T = GoldPrice

    const defaultData: T = {
        groupCode: "",
        groupName: "",
        price: 0,
        capital: 0
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.groupCode.length > 0 && data.groupName.length > 0
</script>

<MasterDataEditDialog {isFormValid} {data} {repository}>
    <Select label="Kode Group" options={$groupCodes} bind:value={data.groupCode}/>
    <TextInput label="Nama Group" bind:value={data.groupName}/>
    <PriceInput label="Harga" bind:value={data.price}/>
    <PriceInput label="Harga Modal" bind:value={data.capital}/>
</MasterDataEditDialog>
