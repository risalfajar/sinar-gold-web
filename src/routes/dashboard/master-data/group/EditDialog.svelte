<script lang="ts" context="module">
    import {readable} from "svelte/store"
    import DiamondStoneTypeRepository from "$lib/diamond/stone-type/repository"

    const stoneRepository = new DiamondStoneTypeRepository()
    const stoneTypes = readable([], (set) => {
        stoneRepository.getChildren().then(items => {
            const names = items.map(it => it.name)
            set(names)
        })
    })
</script>

<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import Select from "$lib/common/ui/form/Select.svelte"
    import {Group} from "$lib/master-data/group/group"
    import PriceInput from "$lib/common/ui/form/PriceInput.svelte"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import MasterDataEditDialog from "$lib/master-data/MasterDataEditDialog.svelte"

    type T = Group

    const defaultData: T = {
        code: "",
        name: "",
        type: "",
        price: 0,
        capital: 0,
        diamond: ""
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.code.length > 0
        && data.name.length > 0
        && data.type.length > 0
        && data.diamond.length > 0
</script>

<MasterDataEditDialog {isFormValid} {data} {repository}>
    <TextInput label="Kode Group" disabled={isEditMode} bind:value={data.code}/>
    <TextInput label="Nama Group" bind:value={data.name}/>
    <TextInput label="Jenis Group" bind:value={data.type}/>
    <PriceInput label="Harga" bind:value={data.price}/>
    <PriceInput label="Harga Modal" bind:value={data.capital}/>
    <Select label="Berlian" options={$stoneTypes} hint="-Pilih Jenis Batu-" bind:value={data.diamond}/>
</MasterDataEditDialog>
