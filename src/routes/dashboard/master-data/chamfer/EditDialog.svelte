<script lang="ts" context="module">
    import {readable} from "svelte/store"
    import WarehouseRepository from "$lib/master-data/warehouse/warehouseRepository"
    import {Warehouse} from "$lib/master-data/warehouse/warehouse"

    const warehouseRepository = new WarehouseRepository()
    const warehouses = readable<Warehouse[]>([], (set) => {
        warehouseRepository
            .getChildren()
            .then(warehouses => set(warehouses.map(it => it.name)))
    })
</script>

<script lang="ts">
    import TextInput from "$lib/common/ui/form/TextInput.svelte"
    import FormDialog from "$lib/common/ui/dialog/FormDialog.svelte"
    import Select from "$lib/common/ui/form/Select.svelte"
    import {modalStore} from "@skeletonlabs/skeleton"
    import {errorToast, successToast} from "$lib/common/utils/toastUtils"
    import ChamferRepository from "$lib/master-data/chamfer/chamferRepository"
    import {Chamfer} from "$lib/master-data/chamfer/chamfer"
    import WeightInput from "$lib/common/ui/form/WeightInput.svelte"
    import {Salesman} from "$lib/master-data/salesman/salesman"
    import MapDatabaseRepository from "$lib/common/data/mapDatabaseRepository"
    import MasterDataEditDialog from "../MasterDataEditDialog.svelte"

    type T = Chamfer

    const defaultData: T = {
        code: "",
        name: "",
        weight: 0,
        tagWeight: 0,
        warehouseCode: ""
    }

    export {dataArgs as data}
    export let repository: MapDatabaseRepository<T>

    let dataArgs: T | null = null
    let data = dataArgs ? {...dataArgs} as T : defaultData

    $: isEditMode = dataArgs != null
    $: isFormValid = data.code.length > 0
        && data.name.length > 0
        && data.warehouseCode.length > 0
</script>

<MasterDataEditDialog {isFormValid} {data} {repository}>
    <Select label="Kode Gudang" options={$warehouses} bind:value={data.warehouseCode}/>
    <TextInput label="Kode Talang" disabled={isEditMode} bind:value={data.code}/>
    <TextInput label="Nama Talang" bind:value={data.name}/>
    <WeightInput label="Berat Talang" bind:value={data.weight}/>
    <WeightInput label="Berat Bandrol" bind:value={data.tagWeight}/>
</MasterDataEditDialog>
