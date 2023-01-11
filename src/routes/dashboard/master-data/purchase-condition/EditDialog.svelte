<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import MasterDataEditDialog from "../MasterDataEditDialog.svelte"
    import NumberInput from "$lib/common/ui/form/NumberInput.svelte"
    import {PurchaseCondition} from "$lib/master-data/purchase-condition/purchaseCondition"
    import PriceInput from "$lib/common/ui/form/PriceInput.svelte"

    type T = PurchaseCondition

    const defaultData: T = {
        code: "",
        discount: 0,
        percentage: 0
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.code.length > 0
</script>

<MasterDataEditDialog {isFormValid} {data} {repository}>
    <TextInput label="Kode Kondisi Pembelian" bind:value={data.code}/>
    <PriceInput label="Potongan Harga" bind:value={data.discount}/>
    <NumberInput label="Persentase" max="100" bind:value={data.percentage}/>
</MasterDataEditDialog>
