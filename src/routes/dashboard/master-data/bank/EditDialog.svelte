<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import MasterDataEditDialog from "$lib/master-data/MasterDataEditDialog.svelte"
    import {Bank} from "$lib/master-data/bank/bank"

    type T = Bank

    const defaultData: T = {
        id: "",
        number: "",
        bankCode: "",
        bankName: ""
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.number.length > 0
        && data.bankCode.length > 0
        && data.bankName.length > 0
</script>

<MasterDataEditDialog {isFormValid} {data} {repository}>
    <TextInput label="No Akun" bind:value={data.number}/>
    <TextInput label="Kode Bank" bind:value={data.bankCode}/>
    <TextInput label="Nama Bank" bind:value={data.bankName}/>
</MasterDataEditDialog>
