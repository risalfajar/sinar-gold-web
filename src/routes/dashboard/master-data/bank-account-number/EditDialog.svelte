<script lang="ts" context="module">
    import {readable} from "svelte/store"
    import BankRepository from "$lib/master-data/bank/bankRepository"
    import {Bank} from "$lib/master-data/bank/bank"

    const bankCodes = readable<Bank[]>([], (set) => {
        const repository = new BankRepository()
        repository
            .getChildren()
            .then(banks => set(banks.map(bank => bank.bankCode)))
    })
</script>

<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import MasterDataEditDialog from "$lib/master-data/MasterDataEditDialog.svelte"
    import NumberInput from "$lib/common/ui/form/NumberInput.svelte"
    import {Cost} from "$lib/master-data/cost/cost"
    import PriceInput from "$lib/common/ui/form/PriceInput.svelte"
    import Select from "$lib/common/ui/form/Select.svelte"
    import {BankAccountNumber} from "$lib/master-data/bank-account-number/bankAccountNumber"

    type T = BankAccountNumber

    const defaultData: T = {
        id: "",
        number: "",
        bankCode: "",
        name: ""
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.number.length > 0
        && data.name.length > 0
        && data.bankCode.length > 0
</script>

<MasterDataEditDialog {isFormValid} {data} {repository}>
    <TextInput label="No Rekening" bind:value={data.number}/>
    <TextInput label="Nama Rekening" bind:value={data.name}/>
    <Select label="Kode Bank" options={$bankCodes} bind:value={data.bankCode}/>
</MasterDataEditDialog>
